from django.db import models
from django.contrib.auth.models import User



class Product(models.Model):
    image = models.URLField(null=True)
    name = models.CharField(max_length=50)
    price = models.IntegerField()
    description = models.TextField(null=True)
    available_quantity = models.IntegerField()

# Create your models here.

class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)

    def get_cart_total(self):
        cartitem = self.cartitem_set.all()
        total = sum([item.get_total for item in cartitem])
        
        return total
    
    def get_cart_quantity(self):
        cartitem = self.cartitem_set.all()
        total = sum([item.quantity for item in cartitem])
        return total

    


class CartItem(models.Model):
    product  = models.ForeignKey(Product, on_delete=models.CASCADE)
    order  = models.ForeignKey(Cart, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1, null=False)

    @property
    def get_total(self):
        total = self.product.price * self.quantity
        return total


class ShippingDetails(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    address_line1  = models.CharField(max_length=200, null=False, blank=False)
    address_line2 = models.CharField(max_length=200, null=False, blank=False)
    city = models.CharField(max_length=200, null=False, blank=False)
    province = models.CharField(max_length=200, null=False, blank=False)
    zip_code = models.CharField(max_length=200, null=False, blank=False)


class ConfirmedOrder(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    order = models.ForeignKey(Cart, on_delete=models.CASCADE)
    
    shipping = models.ForeignKey(ShippingDetails, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    pending_status = models.CharField(max_length=20)













