from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Workout
from .serializers import WorkoutSerializer
from django.db import models

# Create your views here.

class WorkoutViewSet(viewsets.ModelViewSet):
    serializer_class = WorkoutSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Workout.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['get'])
    def statistics(self, request):
        total_workouts = self.get_queryset().count()
        total_calories = self.get_queryset().aggregate(
            total_calories=models.Sum('calories_burned')
        )['total_calories'] or 0
        
        return Response({
            'total_workouts': total_workouts,
            'total_calories_burned': total_calories,
        })
