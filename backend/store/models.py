from django.db import models
from django.contrib.auth.models import User



from django.db import models

class Product(models.Model):
    image = models.URLField(null=True)
    name = models.CharField(max_length=50)
    price = models.IntegerField()
    description = models.TextField(null=True)
    available_quantity = models.IntegerField()
    unique_id = models.CharField(max_length=5, unique=True, blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.unique_id:
            self.unique_id = self.generate_unique_id()
        super(Product, self).save(*args, **kwargs)

    def generate_unique_id(self):
        last_product = Product.objects.all().order_by('id').last()
        if last_product and last_product.unique_id:  # Ensure last_product and unique_id are not None
            last_id = last_product.unique_id
            last_letter = last_id[0]
            last_number = int(last_id[1:])
            
            if last_number == 9999:  # If the number reaches 9999, move to the next letter
                new_letter = chr(ord(last_letter) + 1)
                new_number = 1
            else:
                new_letter = last_letter
                new_number = last_number + 1
        else:
            new_letter = "A"
            new_number = 1

        if new_letter > "Z":  # Safety check: after Z9999, prevent overflow
            raise ValueError("Maximum unique ID reached (Z9999)")

        new_id = f"{new_letter}{str(new_number).zfill(4)}"
        return new_id

    def __str__(self):
        return self.name

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













