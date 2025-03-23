import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  onSnapshot, 
  doc, 
  setDoc, 
  query, 
  where, 
  getDocs,
  DocumentData,
  updateDoc
} from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAftnl8Yr57UOPz0ggU9RTQwI3ZcNl5c_8",
  authDomain: "smartpk-1c59a.firebaseapp.com",
  projectId: "smartpk-1c59a",
  storageBucket: "smartpk-1c59a.firebasestorage.app",
  messagingSenderId: "348218177712",
  appId: "1:348218177712:web:16a649f0cb805b0ebaa375",
  measurementId: "G-RX5B238Q7R"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

// Cache pour stocker les données
let parkingSpotsCache: any[] = [];
let lastUpdateTime = 0;
const CACHE_DURATION = 5000; // 5 secondes

// Interface pour les données de parking
export interface ParkingSpotData {
  id: string;
  name: string;
  status: 'free' | 'occupied';
  timestamp: number;
  reservation?: {
    name: string;
    date: string;
    time: string;
  };
}

// Fonction pour écouter les changements en temps réel
export const subscribeToParkingSpots = (callback: (spots: ParkingSpotData[]) => void) => {
  const parkingRef = collection(db, 'parkings');
  
  // Utiliser onSnapshot pour les mises à jour en temps réel
  return onSnapshot(parkingRef, (snapshot) => {
    const spots = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ParkingSpotData[];
    
    parkingSpotsCache = spots;
    lastUpdateTime = Date.now();
    callback(spots);
  });
};

export const getParkingSpots = async (): Promise<ParkingSpotData[]> => {
  // Vérifier si le cache est valide
  if (Date.now() - lastUpdateTime < CACHE_DURATION) {
    return parkingSpotsCache;
  }

  const parkingRef = collection(db, 'parkings');
  const snapshot = await getDocs(parkingRef);
  const spots = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as ParkingSpotData[];
  
  parkingSpotsCache = spots;
  lastUpdateTime = Date.now();
  return spots;
};

// Fonction pour mettre à jour le statut d'une place
export const updateParkingSpotStatus = async (spotId: string, status: 'free' | 'occupied'): Promise<void> => {
  const spotRef = doc(db, 'parkings', spotId);
  await updateDoc(spotRef, {
    status,
    timestamp: Date.now()
  });
};

// Fonction pour réserver une place
export const reserveParkingSpot = async (
  spotId: string,
  name: string,
  date: string,
  time: string
) => {
  return updateParkingSpotStatus(spotId, 'occupied');
};

// Fonction pour libérer une place
export const releaseParkingSpot = async (spotId: string) => {
  return updateParkingSpotStatus(spotId, 'free');
};

// Fonction pour obtenir les places disponibles
export const getAvailableSpots = async (): Promise<ParkingSpotData[]> => {
  const parkingRef = collection(db, 'parkings');
  const q = query(parkingRef, where('status', '==', 'free'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as ParkingSpotData[];
}; 