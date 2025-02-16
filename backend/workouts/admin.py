from django.contrib import admin
from .models import Workout

@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    list_display = ('name', 'user', 'duration', 'calories_burned', 'created_at')
    list_filter = ('user', 'created_at')
    search_fields = ('name', 'description', 'user__username')
