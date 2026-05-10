import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS
} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface BottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  snapPoints?: number[];
}

export function AnimatedBottomSheet({
  isVisible,
  onClose,
  children,
  snapPoints = [SCREEN_HEIGHT * 0.4, SCREEN_HEIGHT * 0.8]
}: BottomSheetProps) {
  const translateY = useSharedValue(SCREEN_HEIGHT);
  const opacity = useSharedValue(0);
  const contextY = useSharedValue(0);

  const MAX_TRANSLATE_Y = -snapPoints[snapPoints.length - 1];
  const MIN_TRANSLATE_Y = 0;

  useEffect(() => {
    if (isVisible) {
      translateY.value = withSpring(-snapPoints[0], { damping: 20, stiffness: 200 });
      opacity.value = withTiming(1, { duration: 300 });
    } else {
      translateY.value = withSpring(SCREEN_HEIGHT, { damping: 20, stiffness: 200 });
      opacity.value = withTiming(0, { duration: 300 });
    }
  }, [isVisible]);

  const gesture = Gesture.Pan()
    .onStart(() => {
      contextY.value = translateY.value;
    })
    .onUpdate((event) => {
      translateY.value = Math.max(contextY.value + event.translationY, MAX_TRANSLATE_Y);
    })
    .onEnd((event) => {
      if (event.velocityY > 500 || translateY.value > -snapPoints[0] / 2) {
        translateY.value = withSpring(SCREEN_HEIGHT, { damping: 20, stiffness: 200 });
        runOnJS(onClose)();
      } else if (translateY.value < -(snapPoints[0] + snapPoints[1]) / 2) {
        translateY.value = withSpring(-snapPoints[1], { damping: 20, stiffness: 200 });
      } else {
        translateY.value = withSpring(-snapPoints[0], { damping: 20, stiffness: 200 });
      }
    });

  const bottomSheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  if (!isVisible && translateY.value === SCREEN_HEIGHT) return null;

  return (
    <>
      {isVisible && (
        <TouchableWithoutFeedback onPress={onClose}>
          <Animated.View style={[styles.backdrop, backdropStyle]} />
        </TouchableWithoutFeedback>
      )}
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.sheet, bottomSheetStyle]}>
          <View style={styles.handleIndicator} />
          {children}
        </Animated.View>
      </GestureDetector>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 99,
  },
  sheet: {
    position: 'absolute',
    top: SCREEN_HEIGHT,
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 12,
    paddingHorizontal: 24,
    zIndex: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 20,
  },
  handleIndicator: {
    width: 40,
    height: 4,
    backgroundColor: '#E4E7E5',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 24,
  }
});
