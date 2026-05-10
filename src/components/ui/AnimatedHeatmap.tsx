import React, { useEffect } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming
} from 'react-native-reanimated';
import { Typography } from './Typography';

interface AnimatedHeatmapProps {
  data: number[]; // 0-4 values representing intensity
}

const CELL_SIZE = 12;
const CELL_MARGIN = 4;

const Cell = ({ intensity, index }: { intensity: number, index: number }) => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withDelay(index * 10, withSpring(1));
    opacity.value = withDelay(index * 10, withTiming(1, { duration: 300 }));
  }, [index, scale, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const getColor = (val: number) => {
    switch (val) {
      case 0: return '#E4E7E5';
      case 1: return '#D8ECE6';
      case 2: return '#5BC9A3';
      case 3: return '#35A287';
      case 4: return '#0F6D5B';
      default: return '#E4E7E5';
    }
  };

  return (
    <Animated.View
      style={[
        styles.cell,
        { backgroundColor: getColor(intensity) },
        animatedStyle
      ]}
    />
  );
};

export function AnimatedHeatmap({ data }: AnimatedHeatmapProps) {
  const { width } = useWindowDimensions();
  const cols = Math.floor((width - 48) / (CELL_SIZE + CELL_MARGIN));

  // Chunk data into columns (weeks)
  const columns = [];
  for (let i = 0; i < data.length; i += 7) {
    columns.push(data.slice(i, i + 7));
  }

  // Keep only the recent columns that fit on screen
  const visibleColumns = columns.slice(Math.max(0, columns.length - cols));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
         <Typography variant="h3">Consistency Heatmap</Typography>
      </View>
      <View style={styles.grid}>
        {visibleColumns.map((col, colIndex) => (
          <View key={`col-${colIndex}`} style={styles.column}>
            {col.map((val, rowIndex) => (
              <Cell
                key={`cell-${colIndex}-${rowIndex}`}
                intensity={val}
                index={colIndex * 7 + rowIndex}
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  header: {
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  column: {
    flexDirection: 'column',
    marginRight: CELL_MARGIN,
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderRadius: 4,
    marginBottom: CELL_MARGIN,
  }
});
