# Documentation des Services

## Services Frontend

### 1. firebaseService.ts

Service principal pour l'interaction avec Firebase.

#### Fonctions principales :

```typescript
// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAftnl8Yr57UOPz0ggU9RTQwI3ZcNl5c_8",
  authDomain: "smartpk-1c59a.firebaseapp.com",
  projectId: "smartpk-1c59a",
  storageBucket: "smartpk-1c59a.firebasestorage.app",
  messagingSenderId: "348218177712",
  appId: "1:348218177712:web:16a649f0cb805b0ebaa375",
  measurementId: "G-RX5B238Q7R",
};
```

#### Fonctions exportées :

- `subscribeToParkingSpots`: Écoute les changements en temps réel des places
- `updateParkingSpotStatus`: Met à jour le statut d'une place
- `reserveParkingSpot`: Réserve une place
- `releaseParkingSpot`: Libère une place
- `getAvailableSpots`: Récupère les places disponibles

### 2. parkingService.ts

Service de gestion des places de parking.

#### Fonctions principales :

- `getParkingSpots`: Récupère toutes les places
- `getAvailableSpots`: Récupère les places disponibles
- `reserveSpot`: Gère la réservation d'une place
- `updateSpotStatus`: Met à jour le statut d'une place

### 3. notificationService.ts

Service de gestion des notifications.

#### Fonctions principales :

- `sendEmailNotification`: Envoie un email de confirmation
- `sendSMSNotification`: Envoie une notification SMS

### 4. initializeParkingSpots.ts

Service d'initialisation des places de parking.

#### Fonctions principales :

- `initializeParkingSpots`: Initialise les places dans la base de données
- `resetParkingSpots`: Réinitialise toutes les places à l'état "libre"

## Services Backend

### 1. Serveur Express (server/src/index.ts)

Gère les notifications et les appels API.

#### Endpoints :

- `POST /api/notify/sms`: Envoie une notification SMS
- `POST /api/notify/email`: Envoie une notification email

#### Configuration :

```typescript
const app = express();
app.use(express.json());
app.use(cors());
```

## Structure des Données

### Collection Firestore "parkings"

```typescript
interface ParkingSpot {
  id: string;
  name: string;
  status: "free" | "occupied";
  timestamp: string;
  reservation?: {
    name: string;
    date: string;
    time: string;
  };
}
```

## Utilisation des Services

### 1. Suivi en Temps Réel

```typescript
// Dans un composant React
useEffect(() => {
  const unsubscribe = subscribeToParkingSpots((spots) => {
    // Mise à jour de l'état avec les nouvelles données
  });
  return () => unsubscribe();
}, []);
```

### 2. Réservation

```typescript
// Dans le formulaire de réservation
const handleReservation = async (spotId: string, userData: FormData) => {
  const result = await reserveSpot(
    spotId,
    userData.name,
    userData.date,
    userData.time
  );
  if (result.success) {
    await sendEmailNotification(userData);
  }
};
```

### 3. Mise à Jour du Statut

```typescript
// Pour libérer une place
await releaseParkingSpot(spotId);

// Pour marquer une place comme occupée
await updateParkingSpotStatus(spotId, "occupied");
```

## Gestion des Erreurs

### 1. Firebase

```typescript
try {
  await updateParkingSpotStatus(spotId, "occupied");
} catch (error) {
  console.error("Erreur Firebase:", error);
  // Gérer l'erreur
}
```

### 2. Notifications

```typescript
try {
  await sendEmailNotification(data);
} catch (error) {
  console.error("Erreur notification:", error);
  // Gérer l'erreur
}
```

## Bonnes Pratiques

1. Toujours vérifier la disponibilité avant une réservation
2. Utiliser les transactions Firestore pour les opérations critiques
3. Gérer les erreurs de manière appropriée
4. Maintenir la cohérence des données
5. Utiliser les types TypeScript pour la sécurité du type

## Maintenance

### 1. Vérification des Services

- Vérifier régulièrement les logs Firebase
- Surveiller les quotas d'API
- Maintenir les dépendances à jour

### 2. Sauvegarde

- Exporter régulièrement les données Firestore
- Maintenir une copie de sauvegarde des configurations

### 3. Monitoring

- Surveiller les performances
- Vérifier les erreurs dans les logs
- Maintenir les métriques de performance
