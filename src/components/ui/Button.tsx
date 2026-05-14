import React from 'react';
import { TouchableOpacity, ActivityIndicator, TouchableOpacityProps, StyleSheet, Animated, GestureResponderEvent } from 'react-native';
import { Typography } from './Typography';
import * as Haptics from 'expo-haptics';

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  children,
  onPress,
  disabled,
  ...props
}: ButtonProps) {
  const scaleValue = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.timing(scaleValue, {
      toValue: 0.98,
      duration: 120,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 120,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = (e: GestureResponderEvent) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (onPress) onPress(e);
  };

  const getVariantStyles = () => {
    if (disabled) {
      return 'bg-charcoal-300 border-charcoal-300';
    }
    switch (variant) {
      case 'primary': return 'bg-semantic-accent-primary';
      case 'secondary': return 'bg-transparent border border-semantic-border-subtle';
      case 'ghost': return 'bg-transparent';
      default: return 'bg-semantic-accent-primary';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm': return 'h-[36px] px-sm rounded-lg';
      case 'md': return 'h-[48px] px-md rounded-xl';
      case 'lg': return 'h-[52px] px-lg rounded-xl';
      default: return 'h-[48px] px-md rounded-xl';
    }
  };

  const getTextColor = (): 'muted' | 'inverse' | 'primary' => {
    if (disabled) return 'muted';
    if (variant === 'primary') return 'inverse';
    return 'primary';
  };

  const baseStyles = `flex-row items-center justify-center ${getVariantStyles()} ${getSizeStyles()} ${className}`;

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <TouchableOpacity
        className={baseStyles}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        disabled={disabled || isLoading}
        activeOpacity={0.9}
        {...props}
      >
        {isLoading ? (
          <ActivityIndicator color={variant === 'primary' ? '#FFF' : '#0F6D5B'} />
        ) : (
          <>
            {leftIcon && <React.Fragment>{leftIcon}</React.Fragment>}
            <Typography
              variant={size === 'sm' ? 'body-sm' : 'body'}
              color={getTextColor()}
              weight="500"
              className={leftIcon ? 'ml-2' : ''}
            >
              {children}
            </Typography>
            {rightIcon && <React.Fragment>{rightIcon}</React.Fragment>}
          </>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}
