import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useToastStore } from '../../store/toastStore';
import { Typography } from './Typography';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react-native';

export function Toast() {
  const { isVisible, message, type, hideToast } = useToastStore();
  const insets = useSafeAreaInsets();
  const translateY = useSharedValue(-100);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (isVisible) {
      translateY.value = withSpring(insets.top + 16, {
        damping: 15,
        stiffness: 100,
      });
      opacity.value = withTiming(1, { duration: 300 });
    } else {
      translateY.value = withTiming(-100, { duration: 300 });
      opacity.value = withTiming(0, { duration: 300 });
    }
  }, [isVisible, insets.top]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      opacity: opacity.value,
    };
  });

  if (!isVisible && translateY.value === -100) return null;

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return '#E6F4F1'; // Emerald 50
      case 'error':
        return '#FEF2F2'; // Red 50
      case 'info':
      default:
        return '#F3F4F6'; // Gray 100
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case 'success':
        return '#A7F3D0'; // Emerald 200
      case 'error':
        return '#FECACA'; // Red 200
      case 'info':
      default:
        return '#E5E7EB'; // Gray 200
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle2 size={20} color="#059669" />; // Emerald 600
      case 'error':
        return <AlertCircle size={20} color="#DC2626" />; // Red 600
      case 'info':
      default:
        return <Info size={20} color="#4B5563" />; // Gray 600
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        animatedStyle,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
        },
      ]}
    >
      <View style={styles.content}>
        {getIcon()}
        <Typography variant="body" style={styles.text}>
          {message}
        </Typography>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 16,
    right: 16,
    zIndex: 9999,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    marginLeft: 12,
    flex: 1,
    color: '#1F2937', // Gray 800
  },
});
