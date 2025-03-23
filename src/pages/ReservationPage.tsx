import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAvailableParkingSpots, reserveSpot, ParkingSpot } from '../services/parkingService';
import { sendEmailNotification } from '../services/notificationService';
import { initializeParkingSpots, resetParkingSpots } from '../services/initializeParkingSpots';

interface FormData {
  spotId: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
}

const ReservationPage: React.FC = () => {
  const navigate = useNavigate();
  const [availableSpots, setAvailableSpots] = useState<ParkingSpot[]>([]);
  const [formData, setFormData] = useState<FormData>({
    spotId: '',
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAvailableSpots = async () => {
      try {
        console.log('Chargement des places disponibles...');
        // Réinitialiser les places de parking
        await resetParkingSpots();
        
        // Charger les places disponibles
        const spots = await getAvailableParkingSpots();
        console.log('Places disponibles:', spots);
        setAvailableSpots(spots);
      } catch (err) {
        console.error('Erreur lors du chargement des places:', err);
        setError('Erreur lors du chargement des places disponibles');
      }
    };

    loadAvailableSpots();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      console.log('Tentative de réservation pour:', formData);
      
      // Vérifier si la place est toujours disponible
      const spots = await getAvailableParkingSpots();
      const spot = spots.find((s: ParkingSpot) => s.id === formData.spotId);
      
      if (!spot) {
        console.error('Place non trouvée ou plus disponible');
        setError('Cette place n\'est plus disponible');
        return;
      }

      // Réserver la place
      const result = await reserveSpot(
        formData.spotId,
        formData.name,
        formData.date,
        formData.time
      );

      console.log('Résultat de la réservation:', result);

      if (!result.success) {
        setError(result.message);
        return;
      }

      const selectedSpot = availableSpots.find(spot => spot.id === formData.spotId);

      // Envoyer l'email de confirmation
      const emailSent = await sendEmailNotification({
        name: formData.name,
        email: formData.email, // Utiliser l'email fourni au lieu de test@example.com
        phone: formData.phone,
        spotName: selectedSpot?.name || '',
        date: formData.date,
        time: formData.time
      });

      if (emailSent) {
        setIsSubmitted(true);
        setTimeout(() => {
          navigate('/parking');
        }, 3000);
      } else {
        setError('Erreur lors de l\'envoi de l\'email de confirmation');
      }
    } catch (err) {
      console.error('Erreur lors de la réservation:', err);
      setError('Une erreur est survenue lors de la réservation');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-2xl font-bold text-green-600 mb-4">Réservation confirmée !</h2>
          <p className="text-gray-600">
            Votre réservation a été enregistrée avec succès. Vous recevrez un email de confirmation.
          </p>
          <p className="text-gray-600 mt-4">
            Redirection vers la page des places de parking...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Réserver une place</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {availableSpots.length === 0 ? (
          <div className="text-gray-600">
            Aucune place disponible pour le moment.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Place de parking</label>
              <select
                name="spotId"
                value={formData.spotId}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                title="Sélectionnez une place de parking"
              >
                <option value="">Sélectionnez une place</option>
                {availableSpots.map(spot => (
                  <option key={spot.id} value={spot.id}>
                    {spot.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Nom</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                title="Votre nom complet"
                placeholder="Entrez votre nom"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                title="Votre adresse email"
                placeholder="Entrez votre email"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Téléphone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                title="Votre numéro de téléphone"
                placeholder="Entrez votre numéro de téléphone"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                title="Date de réservation"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Heure</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                title="Heure de réservation"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            >
              Réserver
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ReservationPage; 