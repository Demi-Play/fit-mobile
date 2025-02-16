from django.db import models
from django.utils import timezone
from users.models import User

class Nutrition(models.Model):
    MEAL_TYPES = [
        ('breakfast', 'Breakfast'),
        ('lunch', 'Lunch'),
        ('dinner', 'Dinner'),
        ('snack', 'Snack'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='nutrition_records')
    meal_type = models.CharField(max_length=20, choices=MEAL_TYPES)
    calories = models.IntegerField()
    protein = models.FloatField()
    carbohydrates = models.FloatField()
    fats = models.FloatField()
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'nutrition'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.meal_type} - {self.user.username}"

class Goal(models.Model):
    GOAL_TYPES = [
        ('weight_loss', 'Weight Loss'),
        ('muscle_gain', 'Muscle Gain'),
        ('maintenance', 'Maintenance'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='goals')
    goal_type = models.CharField(max_length=20, choices=GOAL_TYPES)
    target_weight = models.FloatField()
    target_date = models.DateTimeField()
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'goals'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.goal_type} - {self.user.username}"
