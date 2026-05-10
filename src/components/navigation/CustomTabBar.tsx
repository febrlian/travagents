import React from 'react';
import { View, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,

} from 'react-native-reanimated';
import { Home, Map, PieChart, Users, User } from 'lucide-react-native';

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { width } = useWindowDimensions();
  const TAB_WIDTH = (width - 48) / state.routes.length; // 48 is total horizontal margin/padding

  const indicatorPosition = useSharedValue(0);

  React.useEffect(() => {
    indicatorPosition.value = withSpring(state.index * TAB_WIDTH, {
      damping: 20,
      stiffness: 200,
    });
  }, [state.index, TAB_WIDTH]);

  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorPosition.value }],
    width: TAB_WIDTH,
  }));

  const getIcon = (routeName: string, isFocused: boolean) => {
    const color = isFocused ? '#0F6D5B' : '#8A918D';
    switch (routeName) {
      case 'index': return <Home size={24} color={color} />;
      case 'journey': return <Map size={24} color={color} />;
      case 'insights': return <PieChart size={24} color={color} />;
      case 'community': return <Users size={24} color={color} />;
      case 'profile': return <User size={24} color={color} />;
      default: return <Home size={24} color={color} />;
    }
  };

  return (
    <View style={styles.container}>
      <BlurView intensity={80} tint="light" style={StyleSheet.absoluteFill} />
      <View style={styles.content}>
        <Animated.View style={[styles.indicatorContainer, animatedIndicatorStyle]}>
           <View style={styles.indicator} />
        </Animated.View>

        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              style={styles.tab}
            >
              {getIcon(route.name, isFocused)}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 32,
    left: 24,
    right: 24,
    height: 64,
    borderRadius: 32,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 10,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 0,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    zIndex: 2,
  },
  indicatorContainer: {
    position: 'absolute',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  indicator: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(15, 109, 91, 0.1)',
    borderRadius: 24,
  }
});
