from django.urls import path
from . import views


urlpatterns = [
    path('create-product/', views.create_product, name='create-product'),
    path('edit-product/<int:pk>/', views.edit_product, name='edit-product'),
    path('delete-product/<int:pk>/', views.delete_product, name='delete_product'),
    path('view-orders/', views.ConfirmedOrderListView.as_view(), name="view-orders"),
    path('manage-order-status/<int:pk>', views.manage_order_status, name="manage-order-status"),
    path('dashboard/', views.DailyDashboardView.as_view(), name="dashboard")
]