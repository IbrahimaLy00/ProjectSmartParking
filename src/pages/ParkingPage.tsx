import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllParkingSpots, ParkingSpot } from '../services/parkingService';
import { ParkingIcon } from '../components/ParkingIcon';

const ParkingPage: React.FC = () => {
  const navigate = useNavigate();
  const [parkingSpots, setParkingSpots] = useState<ParkingSpot[]>([]);

  const updateSpots = useCallback(async () => {
    const spots = await getAllParkingSpots();
    setParkingSpots(spots);
  }, []);

  useEffect(() => {
    updateSpots();
    const interval = setInterval(updateSpots, 5000);
    return () => clearInterval(interval);
  }, [updateSpots]);

  const handleReserveClick = useCallback(() => {
    navigate('/reservation');
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Places de Parking</h1>
          <button
            onClick={handleReserveClick}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Réserver
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {parkingSpots.map((spot) => (
            <div
              key={spot.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">{spot.name}</h2>
                <ParkingIcon
                  className={`h-6 w-6 ${
                    spot.status === 'free'
                      ? 'text-green-500'
                      : spot.status === 'occupied'
                      ? 'text-red-500'
                      : 'text-gray-500'
                  }`}
                />
              </div>

              <div
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  spot.status === 'free'
                    ? 'bg-green-100 text-green-800'
                    : spot.status === 'occupied'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {spot.status === 'free'
                  ? 'Disponible'
                  : spot.status === 'occupied'
                  ? 'Occupée'
                  : 'Inconnu'}
              </div>

              {spot.reservation && (
                <div className="mt-4 text-sm text-gray-600">
                  <p>Réservé par: {spot.reservation.name}</p>
                  <p>Date: {spot.reservation.date}</p>
                  <p>Heure: {spot.reservation.time}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParkingPage; 