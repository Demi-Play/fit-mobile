from django.contrib.auth import authenticate
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from .models import User
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

User = get_user_model()

# Create your views here.

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['email', 'password'],
            properties={
                'email': openapi.Schema(type=openapi.TYPE_STRING, example='user@example.com'),
                'password': openapi.Schema(type=openapi.TYPE_STRING, example='your_password123'),
            }
        ),
        responses={
            200: openapi.Response(
                description="Успешная авторизация",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'user': openapi.Schema(
                            type=openapi.TYPE_OBJECT,
                            properties={
                                'id': openapi.Schema(type=openapi.TYPE_INTEGER, example=1),
                                'email': openapi.Schema(type=openapi.TYPE_STRING, example='user@example.com'),
                                'username': openapi.Schema(type=openapi.TYPE_STRING, example='username'),
                            }
                        ),
                        'token': openapi.Schema(type=openapi.TYPE_STRING, example='9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b'),
                    }
                )
            ),
            400: 'Неверные учетные данные'
        },
        operation_description="Авторизация пользователя",
        security=[{'Bearer': []}]
    )
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'user': UserSerializer(user).data,
                'token': token.key,
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        """
        Пример запроса для авторизации:
        {
            "email": "user@example.com",
            "password": "your_password123"
        }
        """
        example_request = {
            "email": "user@example.com",
            "password": "your_password123"
        }
        example_response = {
            "user": {
                "id": 1,
                "email": "user@example.com",
                "username": "username"
            },
            "token": "9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b"
        }
        return Response({
            "description": "Endpoint для авторизации пользователя",
            "method": "POST",
            "request_example": example_request,
            "response_example": example_response,
            "authorization": "Не требуется",
            "errors": {
                "400": "Неверные учетные данные",
                "401": "Неавторизован"
            }
        })

class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]
    
    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['email', 'username', 'password', 'password2'],
            properties={
                'email': openapi.Schema(type=openapi.TYPE_STRING, example='newuser@example.com'),
                'username': openapi.Schema(type=openapi.TYPE_STRING, example='newusername'),
                'password': openapi.Schema(type=openapi.TYPE_STRING, example='secure_password123'),
                'password2': openapi.Schema(type=openapi.TYPE_STRING, example='secure_password123'),
            }
        ),
        responses={
            201: openapi.Response(
                description="Успешная регистрация",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'user': openapi.Schema(
                            type=openapi.TYPE_OBJECT,
                            properties={
                                'id': openapi.Schema(type=openapi.TYPE_INTEGER, example=1),
                                'email': openapi.Schema(type=openapi.TYPE_STRING, example='newuser@example.com'),
                                'username': openapi.Schema(type=openapi.TYPE_STRING, example='newusername'),
                            }
                        ),
                        'token': openapi.Schema(type=openapi.TYPE_STRING, example='9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b'),
                    }
                )
            ),
            400: 'Ошибка валидации данных'
        },
        operation_description="Регистрация нового пользователя"
    )
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'user': UserSerializer(user).data,
                'token': token.key,
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        """
        Пример запроса для регистрации:
        {
            "email": "newuser@example.com",
            "username": "newusername",
            "password": "secure_password123",
            "password2": "secure_password123"
        }
        """
        example_request = {
            "email": "newuser@example.com",
            "username": "newusername",
            "password": "secure_password123",
            "password2": "secure_password123"
        }
        example_response = {
            "user": {
                "id": 1,
                "email": "newuser@example.com",
                "username": "newusername"
            },
            "token": "9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b"
        }
        return Response({
            "description": "Endpoint для регистрации нового пользователя",
            "method": "POST",
            "request_example": example_request,
            "response_example": example_response,
            "authorization": "Не требуется",
            "errors": {
                "400": "Ошибка валидации данных",
                "409": "Пользователь с таким email уже существует"
            }
        })

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['GET'])
    def profile(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

    @action(detail=False, methods=['PUT', 'PATCH'])
    def update_profile(self, request):
        serializer = self.get_serializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_queryset(self):
        # Пользователь видит только свой профиль
        if not self.request.user.is_staff:
            return User.objects.filter(id=self.request.user.id)
        return User.objects.all()
