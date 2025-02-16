from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import NutritionViewSet, GoalViewSet

router = DefaultRouter()
router.register(r'nutrition', NutritionViewSet, basename='nutrition')
router.register(r'goals', GoalViewSet, basename='goal')

urlpatterns = router.urls 