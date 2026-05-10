import React from 'react';
import { View, ViewProps } from 'react-native';
import { BlurView } from 'expo-blur';

interface SurfaceProps extends ViewProps {
  elevation?: 0 | 1 | 2 | 3;
  blur?: boolean;
  intensity?: number;
  className?: string;
  children: React.ReactNode;
}

export function Surface({
  elevation = 0,
  blur = false,
  intensity = 50,
  className = '',
  children,
  ...props
}: SurfaceProps) {
  const getElevationStyles = () => {
    switch (elevation) {
      case 1: return 'shadow-sm bg-semantic-background-surface';
      case 2: return 'shadow-md bg-semantic-background-elevated';
      case 3: return 'shadow-xl bg-semantic-background-elevated';
      default: return 'bg-transparent';
    }
  };

  const baseClasses = `rounded-2xl ${getElevationStyles()} ${className}`;

  if (blur) {
    return (
      <View className={`overflow-hidden rounded-2xl ${getElevationStyles()}`} {...props}>
         <BlurView intensity={intensity} style={{ flex: 1 }} tint="light">
           <View className={className}>
              {children}
           </View>
         </BlurView>
      </View>
    );
  }

  return (
    <View className={baseClasses} {...props}>
      {children}
    </View>
  );
}
