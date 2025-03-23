import React from 'react';
import { Link } from 'react-router-dom';
import { LocalParking, Speed, Security, AccessTime } from '@mui/icons-material';

const HomePage: React.FC = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
          Saint Boniface Parking
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Une solution moderne pour gérer vos places de parking en temps réel
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <div className="rounded-md shadow">
            <Link
              to="/parking"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
            >
              Voir les places disponibles
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="flex justify-center">
                <Speed className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Mise à jour en temps réel</h3>
              <p className="mt-2 text-base text-gray-500">
                Suivez l'état des places de parking en direct
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center">
                <Security className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Réservation sécurisée</h3>
              <p className="mt-2 text-base text-gray-500">
                Réservez votre place en toute sécurité
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center">
                <AccessTime className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Gain de temps</h3>
              <p className="mt-2 text-base text-gray-500">
                Trouvez rapidement une place disponible
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center">
                <LocalParking className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Gestion simplifiée</h3>
              <p className="mt-2 text-base text-gray-500">
                Interface intuitive pour une meilleure expérience
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Prêt à commencer ?
        </h2>
        <p className="mt-2 text-gray-600">
          Réservez votre place de parking dès maintenant
        </p>
        <div className="mt-4">
          <Link
            to="/reservation"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Réserver une place
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 