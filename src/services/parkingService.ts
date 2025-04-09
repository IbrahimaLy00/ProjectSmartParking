import { subscribeToParkingSpots, reserveParkingSpot, releaseParkingSpot, ParkingSpotData, getParkingSpots, updateParkingSpotStatus, getAvailableSpots } from './firebaseService';
import { doc, setDoc } from 'firebase/firestore';

export interface ParkingSpot extends ParkingSpotData {}

let parkingSpots: ParkingSpot[] = [];

// Écouter les changements en temps réel
subscribeToParkingSpots((spots) => {
  parkingSpots = spots;
});

export const getAllParkingSpots = async (): Promise<ParkingSpot[]> => {
  return getParkingSpots();
};

// Cache pour les spots disponibles
let availableSpotsCache: ParkingSpot[] = [];
let lastAvailableUpdateTime = 0;
const AVAILABLE_CACHE_DURATION = 5000; // 5 secondes

export const getAvailableParkingSpots = async (): Promise<ParkingSpot[]> => {
  // Vérifier si le cache est valide
  if (Date.now() - lastAvailableUpdateTime < AVAILABLE_CACHE_DURATION) {
    return availableSpotsCache;
  }

  const spots = await getAvailableSpots();
  // Filtrer les places qui ont déjà une réservation
  const availableSpots = spots.filter(spot => !spot.reservation);
  availableSpotsCache = availableSpots;
  lastAvailableUpdateTime = Date.now();
  return availableSpots;
};

export const reserveSpot = async (
  spotId: string,
  name: string,
  date: string,
  time: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const spot = parkingSpots.find(s => s.id === spotId);
    
    if (!spot) {
      return { success: false, message: 'Place non trouvée' };
    }

    // Vérifier si la place a déjà une réservation
    if (spot.reservation) {
      return { success: false, message: 'Cette place a déjà une réservation' };
    }

    await reserveParkingSpot(spotId, name, date, time);
    return { success: true, message: 'Réservation effectuée avec succès' };
  } catch (error) {
    console.error('Erreur lors de la réservation:', error);
    return { success: false, message: 'Une erreur est survenue lors de la réservation' };
  }
};

export const updateSpotStatus = async (spotId: string, status: 'free' | 'occupied'): Promise<void> => {
  await updateParkingSpotStatus(spotId, status);
  // Invalider le cache
  lastAvailableUpdateTime = 0;
}; 