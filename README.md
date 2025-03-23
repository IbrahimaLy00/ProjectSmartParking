# Système de Gestion de Parking Intelligent

Ce projet est une application web de gestion de parking qui permet de suivre en temps réel l'état des places de parking et de gérer les réservations.

## Structure du Projet

```
parking-interface/
├── src/
│   ├── pages/
│   │   ├── ParkingPage.tsx      # Page principale affichant l'état des places
│   │   └── ReservationPage.tsx  # Page de réservation des places
│   ├── services/
│   │   ├── firebaseService.ts   # Configuration et services Firebase
│   │   ├── parkingService.ts    # Logique métier pour le parking
│   │   ├── notificationService.ts # Service de notifications
│   │   └── initializeParkingSpots.ts # Initialisation des places
│   └── App.tsx                  # Composant principal
├── server/
│   └── src/
│       └── index.ts             # Serveur backend pour les notifications
└── package.json                 # Dépendances et scripts
```

## Fonctionnalités

### 1. Suivi en Temps Réel

- Affichage de l'état des places de parking (libre/occupée)
- Mise à jour automatique toutes les 5 secondes
- Interface visuelle avec codes couleur (vert pour libre, rouge pour occupé)

### 2. Système de Réservation

- Formulaire de réservation avec :
  - Sélection de la place
  - Informations personnelles (nom, email, téléphone)
  - Date et heure de réservation
- Vérification de disponibilité en temps réel
- Confirmation par email

### 3. Notifications

- Envoi d'email de confirmation après réservation
- Support pour les notifications SMS (via Twilio)

## Configuration Technique

### Firebase

- Base de données Firestore pour le stockage des données
- Collection "parkings" contenant les places avec les champs :
  - id: identifiant unique
  - name: nom de la place
  - status: 'free' ou 'occupied'
  - timestamp: date de dernière mise à jour
  - reservation: détails de la réservation (si occupée)

### Backend

- Serveur Node.js avec Express
- Gestion des notifications SMS via Twilio
- Port 3001 pour le serveur

### Frontend

- React avec TypeScript
- Tailwind CSS pour le style
- Material-UI pour certains composants
- Port 3000 pour l'application

## Installation et Démarrage

1. Installation des dépendances :

```bash
# Installation des dépendances frontend
npm install

# Installation des dépendances backend
cd server
npm install
```

2. Configuration des variables d'environnement :

- Créer un fichier `.env` dans le dossier `server` avec :

```
TWILIO_ACCOUNT_SID=votre_sid
TWILIO_AUTH_TOKEN=votre_token
TWILIO_PHONE_NUMBER=votre_numero
```

3. Démarrage des services :

```bash
# Démarrer le serveur backend
cd server
npm run dev

# Dans un nouveau terminal, démarrer le frontend
cd ..
npm start
```

## Utilisation

1. Accéder à l'application : http://localhost:3000
2. Voir l'état des places sur la page principale
3. Cliquer sur "Réserver" pour accéder au formulaire de réservation
4. Remplir le formulaire et soumettre la réservation
5. Recevoir la confirmation par email

## Structure des Données

### Place de Parking

```typescript
interface ParkingSpot {
  id: string; // Identifiant unique (ex: 'parking_1')
  name: string; // Nom de la place
  status: "free" | "occupied"; // État de la place
  timestamp: string; // Date de dernière mise à jour
  reservation?: {
    // Détails de la réservation (si occupée)
    name: string;
    date: string;
    time: string;
  };
}
```

### Réservation

```typescript
interface FormData {
  spotId: string; // ID de la place réservée
  name: string; // Nom du client
  email: string; // Email du client
  phone: string; // Téléphone du client
  date: string; // Date de réservation
  time: string; // Heure de réservation
}
```

## Maintenance

### Réinitialisation des Places

Pour réinitialiser toutes les places à l'état "libre" :

```typescript
await resetParkingSpots();
```

### Mise à Jour du Statut

Pour mettre à jour le statut d'une place :

```typescript
await updateSpotStatus(spotId, "free" | "occupied");
```

## Sécurité

- Les clés API et tokens sont stockés dans les variables d'environnement
- Validation des données côté serveur
- Vérification de disponibilité avant réservation

## Support

Pour toute question ou problème :

1. Vérifier les logs dans la console du navigateur
2. Vérifier les logs du serveur backend
3. S'assurer que tous les services (Firebase, Twilio) sont correctement configurés
