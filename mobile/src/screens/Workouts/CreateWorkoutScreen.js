import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { workoutsService } from '../../services/workouts.service';

export default function CreateWorkoutScreen({ navigation }) {
  const [formData, setFormData] = useState({
    name: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
    description: '',
    duration: '',
    calories_burned: '0',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!formData.name || !formData.description || !formData.duration) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const workoutData = {
      ...formData,
      duration: parseInt(formData.duration, 10),
      calories_burned: parseInt(formData.calories_burned, 10),
    };

    setLoading(true);
    try {
      await workoutsService.createWorkout(workoutData);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to create workout');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Workout Name *"
        value={formData.name}
        onChangeText={(text) => setFormData({ ...formData, name: text })}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Description *"
        value={formData.description}
        onChangeText={(text) => setFormData({ ...formData, description: text })}
        mode="outlined"
        multiline
        numberOfLines={2}
        style={styles.input}
      />
      <TextInput
        label="Duration (minutes) *"
        value={formData.duration}
        onChangeText={(text) => setFormData({ ...formData, duration: text })}
        mode="outlined"
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        label="Calories Burned"
        value={formData.calories_burned}
        onChangeText={(text) => setFormData({ ...formData, calories_burned: text })}
        mode="outlined"
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        label="Notes"
        value={formData.notes}
        onChangeText={(text) => setFormData({ ...formData, notes: text })}
        mode="outlined"
        multiline
        numberOfLines={4}
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={handleSubmit}
        loading={loading}
        style={styles.button}
      >
        Create Workout
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
}); 