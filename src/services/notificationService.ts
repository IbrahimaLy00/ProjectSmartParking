import emailjs from '@emailjs/browser';

// Configuration EmailJS
const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || '';
const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || '';

export interface NotificationData {
  name: string;
  email: string;
  phone: string;
  spotName: string;
  date: string;
  time: string;
}

export const sendEmailNotification = async (data: NotificationData): Promise<boolean> => {
  try {
    // Initialiser EmailJS
    await emailjs.init(EMAILJS_PUBLIC_KEY);

    // Formater la date et l'heure
    const reservationDate = new Date(data.date);
    const formattedDate = reservationDate.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const formattedTime = new Date(`2000-01-01T${data.time}`).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });

    // Préparer les données du template
    const templateParams = {
      to_name: data.name,
      to_email: data.email,
      spot_name: data.spotName,
      reservation_date: formattedDate,
      reservation_time: formattedTime,
      parking_address: "Saint Boniface Parking, Montréal, QC",
      reservation_status: "Confirmée ✅",
      reservation_duration: "24 heures"
    };

    // Envoyer l'email
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('Email envoyé avec succès:', response);
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return false;
  }
};

export const sendSMSNotification = async (data: NotificationData): Promise<boolean> => {
  try {
    // Formater la date et l'heure
    const reservationDate = new Date(data.date);
    const formattedDate = reservationDate.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const formattedTime = new Date(`2000-01-01T${data.time}`).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });

    // Créer le message
    const message = `Saint Boniface Parking - Bonjour ${data.name}, votre réservation pour la place ${data.spotName} a été confirmée pour le ${formattedDate} à ${formattedTime}.`;

    // Envoyer le SMS via l'API du serveur
    const response = await fetch('http://localhost:3001/api/send-sms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: data.phone,
        message: message
      })
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'envoi du SMS');
    }

    console.log('SMS envoyé avec succès');
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'envoi du SMS:', error);
    return false;
  }
}; 