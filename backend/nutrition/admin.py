from django.contrib import admin
from .models import Nutrition, Goal

@admin.register(Nutrition)
class NutritionAdmin(admin.ModelAdmin):
    list_display = ('meal_type', 'user', 'calories', 'created_at')
    list_filter = ('meal_type', 'user', 'created_at')
    search_fields = ('user__username',)

@admin.register(Goal)
class GoalAdmin(admin.ModelAdmin):
    list_display = ('goal_type', 'user', 'target_weight', 'target_date')
    list_filter = ('goal_type', 'user', 'created_at')
    search_fields = ('user__username',)
