from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Fitness API",
        default_version='v1',
        description="API для фитнес-приложения",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@fitness.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    # Swagger URLs
    path('api/swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('api/swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('api/redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    # API URLs
    path('api/', include('users.urls')),
    path('api/', include('workouts.urls')),
    path('api/', include('nutrition.urls')),
] 