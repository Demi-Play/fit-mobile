from rest_framework import serializers
from .models import Workout

class WorkoutSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Workout
        fields = ['id', 'name', 'description', 'date', 'duration', 'calories_burned', 'notes', 'user']
        read_only_fields = ['id'] 