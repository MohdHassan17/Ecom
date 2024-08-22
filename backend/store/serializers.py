from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Product, Cart, CartItem, ShippingDetails, ConfirmedOrder

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token
    

    # accounts/serializers.py
from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'is_superuser']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data.get('email')
        )
        return user



class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'image',  'name', 'price', 'description' , 'available_quantity', 'unique_id']

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    get_total = serializers.ReadOnlyField()
    
    class Meta:
        model = CartItem
        fields = ['id', 'quantity', 'product', 'get_total']
        
class CartSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    items = CartItemSerializer(many=True, source='cartitem_set')
    get_cart_total = serializers.ReadOnlyField()
    get_cart_quantity = serializers.ReadOnlyField()

    class Meta:
        model = Cart
        fields = ['id', 'user', 'items', 'get_cart_total', 'get_cart_quantity'] 

class ShippingDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingDetails
        fields = ['id', 'address_line1', 'address_line2', 'city', 'province', 'zip_code']


class ConfirmedOrderSerializer(serializers.ModelSerializer):
   

    class Meta:
        model = ConfirmedOrder
        fields = [
            'id',
            'user',
            'order',
            'shipping',
            'confirmed',
            'created_at'
        ]
