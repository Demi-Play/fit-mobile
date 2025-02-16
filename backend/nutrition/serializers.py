from rest_framework import serializers
from .models import Nutrition, Goal

class NutritionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nutrition
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')

class GoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goal
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at') 