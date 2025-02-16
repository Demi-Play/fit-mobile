from django.db import models
from django.utils import timezone
from users.models import User

class Workout(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='workouts')
    name = models.CharField(max_length=255)
    description = models.TextField()
    duration = models.IntegerField(help_text='Duration in minutes')
    calories_burned = models.IntegerField()
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'workouts'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} - {self.user.username}"
