# Saint Boniface Parking

Application de gestion de parking pour Saint Boniface.

## Prérequis

### 1. Installation de Node.js

1. Télécharger Node.js depuis [nodejs.org](https://nodejs.org/)
2. Choisir la version LTS (Long Term Support) >= 18.0.0
3. Suivre les instructions d'installation pour votre système d'exploitation :

   - **Windows** : Exécuter l'installateur téléchargé
   - **macOS** : Utiliser l'installateur ou Homebrew (`brew install node`)
   - **Linux** : Utiliser le gestionnaire de paquets de votre distribution

4. Vérifier l'installation en ouvrant un terminal et en tapant :

```bash
node --version  # Doit afficher v18.x.x ou supérieur
npm --version   # Doit afficher 9.x.x ou supérieur
```

### 2. Installation de Git si tu as github not necessary de faire ca

1. Télécharger Git depuis [git-scm.com](https://git-scm.com/)
2. Suivre les instructions d'installation pour votre système d'exploitation
3. Vérifier l'installation :

```bash
git --version
```

## Installation

1. Cloner le projet dans ton editeur de texte SVP

## URL se trouve sur github la ou cest ecrit code tu copies le lien

```bash
git clone [URL]
cd parking-interface
```

2. Installer les dépendances

## si tu es sur powershell tape dabord cette commande: Get-ExecutionPolicy -Scope CurrentUser

```bash
npm install
```

3. Configurer les variables d'environnement

- Copier le fichier `.env.example` en `.env`

```bash
cp .env.example .env
```

- Remplir le fichier `.env` avec les bonnes valeurs des variables d'environnement Firebase

## Démarrage en développement

```bash
npm start
```

L'application sera accessible à l'adresse [http://localhost:3000](http://localhost:3000)

## Scripts disponibles

- `npm start` : Lance l'application en mode développement
- `npm test` : Lance les tests
- `npm run build` : Crée une version de production
- `npm run eject` : Éjecte la configuration de Create React App

## Structure du projet

```
src/
  ├── components/     # Composants réutilisables
  ├── layouts/       # Layouts de l'application
  ├── pages/         # Pages de l'application
  ├── services/      # Services (Firebase, etc.)
  └── App.tsx        # Point d'entrée de l'application
```

## Technologies utilisées

- React
- TypeScript
- Tailwind CSS
- Firebase
- Material-UI

## Contribution

1. Créer une branche pour votre fonctionnalité

```bash
git checkout -b feature/nom-de-la-fonctionnalite
```

2. Commiter vos changements

```bash
git add .
git commit -m "Description des changements"
```

3. Pousser vers GitHub

```bash
git push origin feature/nom-de-la-fonctionnalite
```

4. Créer une Pull Request sur GitHub

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


[![Visitez le site](https://img.shields.io/badge/Visitez_le_site-Cliquez_ici-blue?style=for-the-badge)](https://parking-interface-app-58c7ed9540cd.herokuapp.com/)
