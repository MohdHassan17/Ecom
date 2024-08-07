from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from django.db import IntegrityError
from rest_framework import status
from django.shortcuts import get_object_or_404

# Import of Models
from store.models import Product, ConfirmedOrder





# Import of Model Serializers

from store.serializers import ProductSerializer
from .serializers import ConfirmedOrderSerializer



# Start of Inventory Management Module

@api_view(['POST'])
def create_product(request): 
    image  = request.data.get('image')
    name = request.data.get('name')
    price = request.data.get('price')
    description = request.data.get('description')
    available_quantity = request.data.get('available_quantity')

    try:
        product = Product.objects.create(image=image, name=name, price=price, description=description, available_quantity=available_quantity)

    except IntegrityError as e:
        print(f"IntegrityError: {e}")  # Debugging
        return Response({"error": "Database integrity error"}, status=status.HTTP_400_BAD_REQUEST)
    
    serializer = ProductSerializer(product)

    return Response(serializer.data, status=status.HTTP_201_CREATED)
    

@api_view(['PUT', 'PATCH'])
def edit_product(request, pk):
    product = get_object_or_404(Product, pk=pk)
    
    # Use the partial=True flag for PATCH requests to allow partial updates
    partial = request.method == 'PATCH'
    serializer = ProductSerializer(product, data=request.data, partial=partial)
    
    if serializer.is_valid():
        try:
            serializer.save()
        except IntegrityError as e:
            print(f"IntegrityError: {e}")  # Debugging
            return Response({"error": "Database integrity error"}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def delete_product(request,pk):
    product = get_object_or_404(Product, pk=pk)
    product.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)



# End of Inventory Management Module



# Start of Order Management Module 
class ConfirmedOrderListView(ListAPIView):
    queryset = ConfirmedOrder.objects.all()
    serializer_class = ConfirmedOrderSerializer


@api_view(['PUT', 'PATCH'])
def manage_order_status(request, pk):
    confirmed_order = get_object_or_404(ConfirmedOrder, pk=pk)
    
    # Use the partial=True flag for PATCH requests to allow partial updates
    partial = request.method == 'PATCH'
    serializer = ConfirmedOrderSerializer(confirmed_order, data=request.data, partial=partial)
    
    if serializer.is_valid():
        try:
            serializer.save()
        except IntegrityError as e:
            print(f"IntegrityError: {e}")  # Debugging
            return Response({"error": "Database integrity error"}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)









# End of Order Management Module