import React from 'react';
import { LocalParking } from '@mui/icons-material';

interface ParkingIconProps {
  className?: string;
}

export const ParkingIcon: React.FC<ParkingIconProps> = ({ className }) => {
  return <LocalParking className={className} />;
}; 