import { db } from './firebaseService';
import { collection, doc, setDoc } from 'firebase/firestore';

const initialSpots = [
  {
    id: 'parking_1',
    name: 'Parking 1',
    status: 'free',
    timestamp: new Date().toISOString()
  },
  {
    id: 'parking_2',
    name: 'Parking 2',
    status: 'free',
    timestamp: new Date().toISOString()
  },
  {
    id: 'parking_3',
    name: 'Parking 3',
    status: 'free',
    timestamp: new Date().toISOString()
  },
  {
    id: 'parking_4',
    name: 'Parking 4',
    status: 'free',
    timestamp: new Date().toISOString()
  }
];

export const initializeParkingSpots = async () => {
  try {
    const parkingRef = collection(db, 'parkings');
    
    for (const spot of initialSpots) {
      const spotRef = doc(parkingRef, spot.id);
      await setDoc(spotRef, spot);
    }
    
    console.log('Places de parking initialisées avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'initialisation des places:', error);
  }
};

export const resetParkingSpots = async () => {
  try {
    const parkingRef = collection(db, 'parkings');
    
    for (const spot of initialSpots) {
      const spotRef = doc(parkingRef, spot.id);
      await setDoc(spotRef, {
        ...spot,
        status: 'free',
        timestamp: new Date().toISOString()
      });
    }
    
    console.log('Places de parking réinitialisées avec succès');
  } catch (error) {
    console.error('Erreur lors de la réinitialisation des places:', error);
  }
}; 