import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/Layout/MainLayout';
import WorkoutList from './pages/Workouts/WorkoutList';
import NutritionList from './pages/Nutrition/NutritionList';
import GoalList from './pages/Goals/GoalList';
import Profile from './pages/Profile/Profile';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import GoalForm from './pages/Goals/GoalForm';
import WorkoutForm from './pages/Workouts/WorkoutForm';
import NutritionForm from './pages/Nutrition/NutritionForm';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path="workouts" element={<WorkoutList />} />
            <Route path="nutrition" element={<NutritionList />} />
            <Route path="goals" element={<GoalList />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/goals/create" element={<ProtectedRoute><GoalForm /></ProtectedRoute>} />
          <Route path="/workouts/create" element={<ProtectedRoute><WorkoutForm /></ProtectedRoute>} />
          <Route path="/nutrition/new" element={<ProtectedRoute><NutritionForm /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App; 