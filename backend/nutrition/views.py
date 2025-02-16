from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Sum
from .models import Nutrition, Goal
from .serializers import NutritionSerializer, GoalSerializer
from django.utils import timezone

# Create your views here.

class NutritionViewSet(viewsets.ModelViewSet):
    serializer_class = NutritionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Nutrition.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['get'])
    def daily_summary(self, request):
        today_meals = self.get_queryset().filter(
            created_at__date=timezone.now().date()
        )
        
        summary = today_meals.aggregate(
            total_calories=Sum('calories'),
            total_protein=Sum('protein'),
            total_carbs=Sum('carbohydrates'),
            total_fats=Sum('fats')
        )
        
        return Response(summary)

class GoalViewSet(viewsets.ModelViewSet):
    serializer_class = GoalSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Goal.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
