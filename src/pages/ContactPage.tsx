import React, { useState } from 'react';
import { Email, Phone, LocationOn, Send } from '@mui/icons-material';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, nous simulerons l'envoi du message
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Contactez-nous</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Informations de contact */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Informations de contact</h3>
          
          <div className="flex items-start space-x-3">
            <Email className="h-6 w-6 text-blue-600 mt-1" />
            <div>
              <h4 className="font-medium text-gray-900">Email</h4>
              <p className="text-gray-600">support@parking-intelligent.com</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Phone className="h-6 w-6 text-blue-600 mt-1" />
            <div>
              <h4 className="font-medium text-gray-900">Téléphone</h4>
              <p className="text-gray-600">+1 512 555 0123</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <LocationOn className="h-6 w-6 text-blue-600 mt-1" />
            <div>
              <h4 className="font-medium text-gray-900">Adresse</h4>
              <p className="text-gray-600">
                Saint Boniface Parking<br />
                Winnipeg, MB
              </p>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Horaires d'ouverture</h4>
            <p className="text-blue-800">
              Lundi - Vendredi: 9h00 - 18h00<br />
              Samedi: 9h00 - 12h00<br />
              Dimanche: Fermé
            </p>
          </div>
        </div>

        {/* Formulaire de contact */}
        <div>
          {isSubmitted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <Send className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-800 mb-2">Message envoyé !</h3>
              <p className="text-green-600">
                Nous vous répondrons dans les plus brefs délais.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nom complet
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Sujet
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Envoyer le message
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 