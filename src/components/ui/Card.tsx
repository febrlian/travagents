import React from 'react';
import { View, ViewProps } from 'react-native';
import { Surface } from './Surface';

interface CardProps extends ViewProps {
  elevation?: 1 | 2 | 3;
  className?: string;
  children: React.ReactNode;
}

export function Card({
  elevation = 1,
  className = '',
  children,
  ...props
}: CardProps) {
  return (
    <Surface elevation={elevation} className={`p-lg border border-semantic-border-subtle ${className}`} {...props}>
      {children}
    </Surface>
  );
}
