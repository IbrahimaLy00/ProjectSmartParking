import cv2
import numpy as np
import paho.mqtt.client as mqtt
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore  # Changer pour firestore

# Configuration Firebase
cred = credentials.Certificate("key1.json")
firebase_admin.initialize_app(cred)

# Initialiser Firestore
db = firestore.client()
parking_ref = db.collection('parkings')  # Collection 'parkings'

# Charger les fichiers YOLO (poids et configuration)
cfg_path = "yolov3.cfg"
weights_path = "yolov3.weights"
coco_names_path = "coco.names"

net = cv2.dnn.readNetFromDarknet(cfg_path, weights_path)

# Utiliser CPU car CUDA n'est pas disponible
net.setPreferableBackend(cv2.dnn.DNN_BACKEND_OPENCV)
net.setPreferableTarget(cv2.dnn.DNN_TARGET_CPU)
print("Utilisation du CPU")

with open(coco_names_path, "r") as f:
    classes = [line.strip() for line in f.readlines()]

# Indice de la classe "voiture" dans coco.names
car_class_id = 2  # Voiture
truck_class_id = 7  # Camion

# Définir plus de classes à détecter
vehicle_classes = [
    2,   # car uniquement
]

# Modifier les seuils et le prétraitement
confThreshold = 0.3
nmsThreshold = 0.4

# Définir les zones de parking avec des coordonnées ajustées si nécessaire
parking_zones = [
    (390, 180, 60, 60),    # Zone 1 - légèrement plus grande
    (450, 190, 100, 100),   # Zone 2
    (580, 250, 100, 100),    # Zone 3
    (50, 200, 150, 150)    # Zone 4
]

# Configuration MQTT
broker = "broker.hivemq.com"
port = 1883
publish_topic = "parking/status"
subscribe_topic = "parking/#"

# Fonction pour vérifier si une boîte est dans une zone de parking
def is_in_parking_zone(box, zone):
    box_x, box_y, box_w, box_h = box
    zone_x, zone_y, zone_w, zone_h = zone
    
    x_overlap = max(0, min(box_x + box_w, zone_x + zone_w) - max(box_x, zone_x))
    y_overlap = max(0, min(box_y + box_h, zone_y + zone_h) - max(box_y, zone_y))
    overlap_area = x_overlap * y_overlap
    
    zone_area = zone_w * zone_h
    box_area = box_w * box_h
    
    zone_ratio = overlap_area / zone_area if zone_area > 0 else 0
    box_ratio = overlap_area / box_area if box_area > 0 else 0
    
    return (zone_ratio > 0.1) or (box_ratio > 0.1)

# Callback lorsqu'un message MQTT est reçu
def on_message(client, userdata, message):
    print(f"Message reçu sur le topic {message.topic}: {message.payload.decode()}")

# Initialiser le client MQTT
mqtt_client = mqtt.Client()
mqtt_client.on_message = on_message  # Assigner la fonction de callback
mqtt_client.connect(broker, port, 60)
mqtt_client.subscribe(subscribe_topic)  # Souscrire au topic
mqtt_client.loop_start()  # Démarrer la boucle MQTT en arrière-plan

# Spécifier le chemin de la vidéo
video_path = 'parking_space.mp4'
print(f"Tentative d'ouverture de la vidéo: {video_path}")

cap = cv2.VideoCapture(video_path)
if not cap.isOpened():
    print(f"Erreur: Impossible d'ouvrir la vidéo: {video_path}")
    print("Vérifiez que:")
    print("1. Le fichier existe dans le bon dossier")
    print("2. Le nom du fichier est correct (sensible à la casse)")
    print("3. Le format de la vidéo est supporté")
    exit()

# Si la vidéo est ouverte avec succès
print("Vidéo ouverte avec succès")
print(f"Largeur: {int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))}")
print(f"Hauteur: {int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))}")
print(f"FPS: {cap.get(cv2.CAP_PROP_FPS)}")

frame_count = 0

while True:
    ret, frame = cap.read()
    if not ret:
        print("Fin de la vidéo")
        break

    # Redimensionner l'image si elle est trop grande
    max_dimension = 800  # Taille maximale souhaitée
    height, width = frame.shape[:2]
    if height > max_dimension or width > max_dimension:
        ratio = max_dimension / max(height, width)
        new_width = int(width * ratio)
        new_height = int(height * ratio)
        frame = cv2.resize(frame, (new_width, new_height))

    # Prétraitement de l'image
    blob = cv2.dnn.blobFromImage(
        frame,
        1/255.0,
        (608, 608),
        (0, 0, 0),
        swapRB=True,
        crop=False
    )
    net.setInput(blob)

    # Obtenir les détections
    layer_names = net.getUnconnectedOutLayersNames()
    detections = net.forward(layer_names)

    boxes = []
    confidences = []
    class_ids = []

    # Détection des objets
    for detection in detections:
        for obj in detection:
            scores = obj[5:]
            class_id = np.argmax(scores)
            confidence = scores[class_id]
            
            # Ne détecter que les voitures sans afficher le debug
            if confidence > confThreshold and class_id == 2:  # 2 = voiture
                center_x = int(obj[0] * frame.shape[1])
                center_y = int(obj[1] * frame.shape[0])
                width = int(obj[2] * frame.shape[1])
                height = int(obj[3] * frame.shape[0])
                
                x = int(center_x - width/2)
                y = int(center_y - height/2)
                
                boxes.append([x, y, width, height])
                confidences.append(float(confidence))
                class_ids.append(class_id)

    # Appliquer NMS
    indices = cv2.dnn.NMSBoxes(boxes, confidences, confThreshold, nmsThreshold)

    # Réinitialiser l'état des parkings
    parking_states = [False] * len(parking_zones)

    # Dessiner les détections et vérifier les zones de parking
    if len(indices) > 0:
        for i in indices.flatten():
            x, y, w, h = boxes[i]
            
            # Vérifier les zones de parking
            for idx, zone in enumerate(parking_zones):
                if is_in_parking_zone((x, y, w, h), zone):
                    parking_states[idx] = True
            
            # Dessiner les rectangles de détection
            cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 2)

    # Dessiner les zones de parking
    for idx, zone in enumerate(parking_zones):
        x, y, w, h = zone
        color = (0, 0, 255) if parking_states[idx] else (0, 255, 0)
        cv2.rectangle(frame, (x, y), (x + w, y + h), color, 3)
        status = f"Parking {idx+1} {'Occupé' if parking_states[idx] else 'Libre'}"
        cv2.putText(frame, status, (x, y - 10), 
                    cv2.FONT_HERSHEY_SIMPLEX, 0.7, color, 2)

    # Modifier la partie de mise à jour Firebase (toutes les 30 frames)
    if frame_count % 30 == 0:
        print("\nÉtat des parkings:")
        for idx, state in enumerate(parking_states):
            status = f"Parking {idx+1} {'Occupé' if state else 'Libre'}"
            print(status)
            
            # Mettre à jour Firestore
            parking_ref.document(f'parking_{idx+1}').set({
                'status': "occupied" if state else "free",
                'name': f"Parking {idx+1}",
                'timestamp': firestore.SERVER_TIMESTAMP
            })
        print("Données mises à jour dans Firestore")

    # Afficher le frame
    cv2.imshow("Parking Detection", frame)

    frame_count += 1

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Libérer les ressources
cap.release()
cv2.destroyAllWindows()
mqtt_client.loop_stop()
mqtt_client.disconnect()