from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from .serializers import MyTokenObtainPairSerializer, UserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import Product, CartItem, Cart, ShippingDetails, ConfirmedOrder

from .serializers import ProductSerializer, CartItemSerializer, CartSerializer, ShippingDetailsSerializer, ConfirmedOrderSerializer
from django.db.utils import IntegrityError
from django.conf import settings
import requests




class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer

class UserCreateView(APIView):
    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductListView(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


@api_view(['POST'])
def add_to_cart(request):
    user = request.user
    print(f"Authenticated user: {user}")  # Debugging

    product_id = request.data.get('product_id')
    print(f"Product ID from request: {product_id}")  # Debugging

    if not product_id:
        return Response({"error": "Product ID is required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        product = Product.objects.get(id=product_id)
      
    except Product.DoesNotExist:
    
        return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
    except Product.MultipleObjectsReturned:
        return Response({"error": "Multiple products found with the same ID"}, status=status.HTTP_400_BAD_REQUEST)


    
   
    try:
      
        cart,created = Cart.objects.get_or_create(user=user, completed=False)

        cart_item, created = CartItem.objects.get_or_create(order=cart, product=product)
        if not created:
            cart_item.quantity += 1
            cart_item.save()
        else:
            cart_item.quantity = 1
            cart_item.save()

        
        print(f"CartItem: {cart_item}, Created: {created}")  # Debugging

    except IntegrityError as e:
        print(f"IntegrityError: {e}")  # Debugging
        

    serializer = CartItemSerializer(cart_item)
    return Response(serializer.data, status=status.HTTP_201_CREATED)



@api_view(["GET"])
def view_cart(request):
    
    user = request.user
    print(user)
    try:   
        cart = Cart.objects.get(user=user, completed=False)

        serializer = CartSerializer(cart)
    except Cart.DoesNotExist:
        return Response({'Error': 'Please create cart '} , status= status.HTTP_404_NOT_FOUND)

    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["POST"])
def manage_quantity(request):
    user = request.user
    method = request.data.get('method')
    product_id = request.data.get('productId')

    try:
        product = Product.objects.get(id=product_id)
        cart = Cart.objects.get(user=user, completed=False)
        cart_item = CartItem.objects.get(order=cart, product=product)

        if method == 'add':
            cart_item.quantity += 1
            cart_item.save()
        elif method == 'deduct':
            if cart_item.quantity > 1:
                cart_item.quantity -= 1
                cart_item.save()
            else:
                cart_item.delete()
                return Response({'message': 'Item deleted'}, status=status.HTTP_204_NO_CONTENT)
        if method == 'delete':
            cart_item.delete()
            return Response({'message': 'Item deleted'}, status=status.HTTP_204_NO_CONTENT)

        serializer = CartItemSerializer(cart_item)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
    except Cart.DoesNotExist:
        return Response({'error': 'Cart not found'}, status=status.HTTP_404_NOT_FOUND)
    except CartItem.DoesNotExist:
        return Response({'error': 'Cart item not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)    


@api_view(['GET'])
def product_detail(request, pk):
    try:
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = ProductSerializer(product)
    return Response(serializer.data)



class ShippingListCreateView(ListCreateAPIView):
    serializer_class = ShippingDetailsSerializer
    queryset = ShippingDetails.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Filter the queryset to include only the authenticated user's shipping details
        return ShippingDetails.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


@api_view(['POST'])
def confirm_order(request):
    
    user = request.user
    order = request.data.get('order')
    shipping = request.data.get('shipping')

    try:
        cart = Cart.objects.get(id=order , user=user, completed=False)
        print(cart.get_cart_total())
        shipping = ShippingDetails.objects.get(user=user, id=shipping)
        print(shipping)

        completed_order = ConfirmedOrder.objects.create(user=user, order=cart, shipping=shipping)

        cart.completed = True
        cart.save()
    
    except Cart.DoesNotExist as e:
        return Response({"error": "Cart or ShippingDetails not found"}, status=status.HTTP_404_NOT_FOUND)
      

    serializer = ConfirmedOrderSerializer(completed_order)
    
    return Response(serializer.data, status=status.HTTP_201_CREATED)




