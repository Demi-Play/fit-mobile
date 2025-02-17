import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { Card, Title, Paragraph, FAB, ActivityIndicator } from 'react-native-paper';
import { workoutsService } from '../../services/workouts.service';

export default function WorkoutsScreen({ navigation }) {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadWorkouts = async () => {
    try {
      const data = await workoutsService.getWorkouts();
      setWorkouts(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load workouts');
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadWorkouts();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    loadWorkouts();
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={workouts}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        renderItem={({ item }) => (
          <Card 
            style={styles.card}
            onPress={() => navigation.navigate('WorkoutDetails', { workout: item })}
          >
            <Card.Content>
              <Title>{item.name}</Title>
              <Paragraph>Date: {new Date(item.date).toLocaleDateString()}</Paragraph>
            </Card.Content>
          </Card>
        )}
        keyExtractor={item => item.id.toString()}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('CreateWorkout')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    margin: 8,
    elevation: 4,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
}); 