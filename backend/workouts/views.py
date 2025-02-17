from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Workout
from .serializers import WorkoutSerializer
from django.db import models
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

# Create your views here.

class WorkoutViewSet(viewsets.ModelViewSet):
    serializer_class = WorkoutSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Workout.objects.filter(user=self.request.user)

    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['name', 'description', 'duration'],
            properties={
                'name': openapi.Schema(type=openapi.TYPE_STRING, example='Morning Workout'),
                'description': openapi.Schema(type=openapi.TYPE_STRING, example='Morning cardio session'),
                'duration': openapi.Schema(type=openapi.TYPE_INTEGER, example=30),
                'calories_burned': openapi.Schema(type=openapi.TYPE_INTEGER, example=300),
                'notes': openapi.Schema(type=openapi.TYPE_STRING, example='Felt great!'),
                'date': openapi.Schema(type=openapi.TYPE_STRING, format='date', example='2024-03-21'),
            }
        )
    )
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    @action(detail=False, methods=['get'])
    def statistics(self, request):
        total_workouts = self.get_queryset().count()
        total_calories = self.get_queryset().aggregate(
            total_calories=models.Sum('calories_burned')
        )['total_calories'] or 0
        
        return Response({
            'total_workouts': total_workouts,
            'total_calories': total_calories,
        })
