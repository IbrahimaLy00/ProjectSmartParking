# Documentation des Composants React

## Pages

### 1. ParkingPage.tsx

Page principale affichant l'état des places de parking.

#### Fonctionnalités :

- Affichage en temps réel des places
- Mise à jour automatique toutes les 5 secondes
- Interface visuelle avec codes couleur
- Affichage des détails de réservation

#### Props :

Aucune prop requise

#### État :

```typescript
const [parkingSpots, setParkingSpots] = useState<ParkingSpot[]>([]);
```

#### Utilisation :

```typescript
<ParkingPage />
```

### 2. ReservationPage.tsx

Page de réservation des places de parking.

#### Fonctionnalités :

- Formulaire de réservation
- Sélection de place disponible
- Validation des données
- Confirmation de réservation
- Redirection après succès

#### Props :

Aucune prop requise

#### État :

```typescript
const [availableSpots, setAvailableSpots] = useState<ParkingSpot[]>([]);
const [formData, setFormData] = useState<FormData>({
  spotId: "",
  name: "",
  email: "",
  phone: "",
  date: "",
  time: "",
});
const [isSubmitted, setIsSubmitted] = useState(false);
const [error, setError] = useState<string | null>(null);
```

#### Utilisation :

```typescript
<ReservationPage />
```

## Composants Communs

### 1. ParkingIcon

Icône représentant l'état d'une place de parking.

#### Props :

```typescript
interface ParkingIconProps {
  status: "free" | "occupied";
  className?: string;
}
```

#### Utilisation :

```typescript
<ParkingIcon status={spot.status} className="h-6 w-6" />
```

## Styles

### 1. Classes Tailwind Utilisées

#### Conteneurs :

- `min-h-screen`: Hauteur minimale plein écran
- `bg-gray-100`: Fond gris clair
- `flex items-center justify-center`: Centrage vertical et horizontal
- `p-8`: Padding de 8 unités
- `rounded-lg`: Coins arrondis
- `shadow-md`: Ombre moyenne

#### Formulaires :

- `space-y-4`: Espacement vertical entre les éléments
- `w-full`: Largeur complète
- `p-2`: Padding de 2 unités
- `border rounded`: Bordure et coins arrondis
- `focus:outline-none focus:ring-2 focus:ring-blue-500`: Style de focus

#### Boutons :

- `bg-blue-500`: Fond bleu
- `text-white`: Texte blanc
- `py-2 px-4`: Padding vertical et horizontal
- `rounded`: Coins arrondis
- `hover:bg-blue-600`: Effet hover

#### États :

- `text-green-500`: Texte vert (disponible)
- `text-red-500`: Texte rouge (occupé)
- `bg-green-100 text-green-800`: Fond vert clair avec texte vert foncé
- `bg-red-100 text-red-800`: Fond rouge clair avec texte rouge foncé

## Gestion des Événements

### 1. Formulaire de Réservation

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  // Logique de soumission
};

const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};
```

### 2. Mise à Jour en Temps Réel

```typescript
useEffect(() => {
  const spots = getParkingSpots();
  setParkingSpots(spots);

  const interval = setInterval(() => {
    const updatedSpots = getParkingSpots();
    setParkingSpots(updatedSpots);
  }, 5000);

  return () => clearInterval(interval);
}, []);
```

## Bonnes Pratiques

### 1. Gestion des États

- Utiliser des états locaux pour les données de formulaire
- Centraliser les états globaux si nécessaire
- Éviter les états redondants

### 2. Performance

- Utiliser `useCallback` pour les fonctions de gestion d'événements
- Utiliser `useMemo` pour les calculs coûteux
- Éviter les re-rendus inutiles

### 3. Accessibilité

- Utiliser des labels appropriés
- Ajouter des attributs ARIA si nécessaire
- Assurer la navigation au clavier

### 4. Validation

- Valider les données côté client
- Afficher des messages d'erreur clairs
- Empêcher la soumission de données invalides

## Maintenance

### 1. Tests

- Tester les composants individuellement
- Tester les interactions utilisateur
- Tester les cas d'erreur

### 2. Documentation

- Maintenir les commentaires à jour
- Documenter les props et les états
- Expliquer la logique complexe

### 3. Refactoring

- Extraire les composants réutilisables
- Simplifier la logique complexe
- Maintenir une structure claire
