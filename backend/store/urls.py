from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    
    TokenRefreshView
)

urlpatterns = [
   
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('create-user/', views.UserCreateView.as_view(), name='user_create'),
    path('products/', views.ProductListView.as_view(), name='products'),
    path('add-to-cart/', views.add_to_cart, name='add-to-cart'),
    path('view-cart/', views.view_cart, name='view-cart'),
    path('manage-quantity/', views.manage_quantity, name='manage-quantity'),
    path('product-detail/<int:pk>', views.product_detail, name='product-detail'),
    path('shipping-detail/', views.ShippingListCreateView.as_view(), name='shipping-details'),
    path('confirmed-order/', views.confirm_order, name="confirm-order")

]