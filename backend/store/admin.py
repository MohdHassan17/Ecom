from django.contrib import admin
from .models import Cart, Product, CartItem, ShippingDetails, ConfirmedOrder
# Register your models here.



admin.site.register(Product)
admin.site.register(Cart)
admin.site.register(CartItem)
admin.site.register(ShippingDetails)
admin.site.register(ConfirmedOrder)
