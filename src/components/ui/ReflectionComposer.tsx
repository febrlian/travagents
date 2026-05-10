import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Typography } from './Typography';
import { Button } from './Button';
import { ReflectionMood } from '../../types/models';

interface ComposerProps {
  onSave: (mood: ReflectionMood, notes: string) => void;
  onCancel: () => void;
}

const MOODS: { label: string; value: ReflectionMood; emoji: string }[] = [
  { label: 'Peaceful', value: 'peaceful', emoji: '😌' },
  { label: 'Connected', value: 'connected', emoji: '✨' },
  { label: 'Grateful', value: 'grateful', emoji: '🤲' },
  { label: 'Distracted', value: 'distracted', emoji: '💭' },
  { label: 'Rushed', value: 'rushed', emoji: '⏱' },
  { label: 'Struggling', value: 'struggling', emoji: '🥀' },
];

export function ReflectionComposer({ onSave, onCancel }: ComposerProps) {
  const [selectedMood, setSelectedMood] = useState<ReflectionMood | null>(null);
  const [notes, setNotes] = useState('');

  return (
    <View style={styles.container}>
      <Typography variant="h2" style={styles.title}>Reflect on your prayer</Typography>

      <Typography variant="body" color="muted" style={styles.subtitle}>
        How did you feel during your connection?
      </Typography>

      <View style={styles.moodGrid}>
        {MOODS.map(mood => (
          <TouchableOpacity
            key={mood.value}
            style={[
              styles.moodItem,
              selectedMood === mood.value && styles.moodSelected
            ]}
            onPress={() => setSelectedMood(mood.value)}
          >
            <Typography variant="h2" style={{ textAlign: 'center' }}>{mood.emoji}</Typography>
            <Typography variant="caption" color={selectedMood === mood.value ? 'inverse' : 'primary'} style={{ textAlign: 'center', marginTop: 8 }}>
              {mood.label}
            </Typography>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="What distracted you, or what are you grateful for?"
          placeholderTextColor="#8A918D"
          multiline
          value={notes}
          onChangeText={setNotes}
        />
      </View>

      <View style={styles.footer}>
        <Button
          variant="secondary"
          children="Skip"
          onPress={onCancel}
          style={styles.button}
        />
        <Button
          variant="primary"
          children="Save Reflection"
          onPress={() => selectedMood && onSave(selectedMood, notes)}
          disabled={!selectedMood}
          style={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 24,
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  moodItem: {
    width: '30%',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 16,
    backgroundColor: '#F7F8F6',
    borderWidth: 1,
    borderColor: '#E4E7E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moodSelected: {
    backgroundColor: '#0F6D5B',
    borderColor: '#0F6D5B',
  },
  inputContainer: {
    backgroundColor: '#F7F8F6',
    borderRadius: 16,
    padding: 16,
    minHeight: 120,
    marginBottom: 24,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#0E1110',
    fontFamily: 'System',
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
  }
});
