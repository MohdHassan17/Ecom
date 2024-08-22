from rest_framework.serializers import ModelSerializer, ReadOnlyField
from django.contrib.auth.models import User
from store.models import ConfirmedOrder, Cart, ShippingDetails
from store.serializers import CartItemSerializer

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'is_superuser']

class CartSerializer(ModelSerializer):
    get_cart_total = ReadOnlyField()
    get_cart_quantity = ReadOnlyField()
    items = CartItemSerializer(many=True, source='cartitem_set')

    class Meta:
        model = Cart
        fields = ['id', 'user', 'items', 'get_cart_total', 'get_cart_quantity'] 

class ShippingDetailsSerializer(ModelSerializer):
    class Meta:
        model = ShippingDetails
        fields = '__all__'

class ConfirmedOrderSerializer(ModelSerializer):
    user = UserSerializer()
    order = CartSerializer()  # This already includes the items
    shipping = ShippingDetailsSerializer()

    class Meta:
        model = ConfirmedOrder
        fields = [
            'id',
            'user',
            'order',
            'pending_status',
            'shipping',
            'created_at'
        ]
