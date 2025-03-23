import React from 'react';
import { 
  School, 
  Nature, 
  AccessTime, 
  Security, 
  TrendingUp, 
  Group 
} from '@mui/icons-material';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Notre Mission</h1>
        <p className="text-lg text-gray-600">
          Une initiative étudiante pour révolutionner la gestion du stationnement
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Section Étudiants */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <School className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Initiative Étudiante</h2>
          </div>
          <p className="text-gray-600">
            En tant qu'étudiants passionnés, nous avons créé cette solution pour répondre aux défis quotidiens 
            de stationnement sur notre campus. Notre objectif est d'améliorer l'expérience de tous les étudiants 
            et membres du personnel.
          </p>
        </div>

        {/* Section Environnement */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Nature className="h-8 w-8 text-green-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Impact Environnemental</h2>
          </div>
          <p className="text-gray-600">
            En réduisant le temps de recherche de stationnement, nous contribuons à diminuer les émissions 
            de CO2 et à améliorer la qualité de l'air sur notre campus. Chaque minute économisée compte 
            pour notre environnement.
          </p>
        </div>

        {/* Section Temps */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <AccessTime className="h-8 w-8 text-orange-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Gain de Temps</h2>
          </div>
          <p className="text-gray-600">
            Notre solution permet d'économiser un temps précieux en évitant les tours de parking interminables. 
            Les étudiants peuvent se concentrer sur leurs études plutôt que sur la recherche d'une place.
          </p>
        </div>

        {/* Section Innovation */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <TrendingUp className="h-8 w-8 text-purple-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Innovation Technologique</h2>
          </div>
          <p className="text-gray-600">
            Nous utilisons les dernières technologies pour créer une expérience utilisateur intuitive et 
            efficace. Notre plateforme s'adapte aux besoins changeants de notre communauté universitaire.
          </p>
        </div>

        {/* Section Communauté */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Group className="h-8 w-8 text-red-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Communauté</h2>
          </div>
          <p className="text-gray-600">
            Notre projet rassemble les étudiants, le personnel et l'administration dans une vision commune 
            d'amélioration de la vie sur le campus. Ensemble, nous créons un environnement plus durable 
            et plus agréable.
          </p>
        </div>

        {/* Section Sécurité */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Security className="h-8 w-8 text-yellow-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Sécurité et Fiabilité</h2>
          </div>
          <p className="text-gray-600">
            Nous garantissons un système de réservation sécurisé et fiable, permettant aux utilisateurs 
            de planifier leur stationnement en toute confiance. La transparence est au cœur de notre approche.
          </p>
        </div>
      </div>

      {/* Section Vision */}
      <div className="mt-12 bg-blue-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Notre Vision</h2>
        <p className="text-gray-600">
          Saint Boniface Parking représente plus qu'une simple solution de stationnement. C'est un projet 
          qui reflète notre engagement envers l'innovation, la durabilité et l'amélioration de la vie 
          étudiante. En tant qu'étudiants, nous croyons en notre capacité à apporter des changements 
          positifs à notre communauté, et ce projet en est la preuve.
        </p>
      </div>
    </div>
  );
};

export default AboutPage; 