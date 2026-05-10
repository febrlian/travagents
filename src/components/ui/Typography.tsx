import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

interface TypographyProps extends TextProps {
  variant?: 'hero' | 'h1' | 'h2' | 'h3' | 'body' | 'body-sm' | 'caption' | 'overline';
  color?: 'primary' | 'secondary' | 'muted' | 'inverse' | 'accent' | 'success' | 'warning' | 'danger';
  weight?: '400' | '500' | '600';
  className?: string;
  children: React.ReactNode;
}

export function Typography({
  variant = 'body',
  color = 'primary',
  weight,
  className = '',
  children,
  ...props
}: TypographyProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'hero': return 'text-[40px] leading-[46px] tracking-[-0.8px] font-semibold';
      case 'h1': return 'text-[32px] leading-[38px] tracking-[-0.32px] font-semibold';
      case 'h2': return 'text-[24px] leading-[30px] tracking-[-0.24px] font-semibold';
      case 'h3': return 'text-[20px] leading-[26px] tracking-[0px] font-medium';
      case 'body': return 'text-[16px] leading-[26px] tracking-[0px] font-normal';
      case 'body-sm': return 'text-[14px] leading-[21px] tracking-[0px] font-normal';
      case 'caption': return 'text-[12px] leading-[17px] tracking-[0.12px] font-medium';
      case 'overline': return 'text-[11px] leading-[13px] tracking-[0.66px] uppercase font-semibold';
      default: return 'text-[16px] leading-[26px] font-normal';
    }
  };

  const getColorStyles = () => {
    switch (color) {
      case 'primary': return 'text-semantic-text-primary';
      case 'secondary': return 'text-semantic-text-secondary';
      case 'muted': return 'text-semantic-text-muted';
      case 'inverse': return 'text-semantic-text-inverse';
      case 'accent': return 'text-semantic-text-accent';
      case 'success': return 'text-semantic-status-success';
      case 'warning': return 'text-semantic-status-warning';
      case 'danger': return 'text-semantic-status-danger';
      default: return 'text-semantic-text-primary';
    }
  };

  const baseStyles = `${getVariantStyles()} ${getColorStyles()} ${className}`;

  return (
    <Text className={baseStyles} {...props}>
      {children}
    </Text>
  );
}
