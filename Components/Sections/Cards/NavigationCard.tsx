import { useTheme } from '@react-navigation/native';
import React from 'react';
interface NavigationCardProps {
  variant: 'large' | 'small';
  title: string;
  comment: string;
}

export const NavigationCard: React.FC<NavigationCardProps> = ({
  variant = 'large',
  title,
  comment,
}) => {
  const {colors} = useTheme();

  return <> 
  
  
  
  
  
  </>;
};
