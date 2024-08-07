from django.contrib import admin
from django.urls import path, include

urlpatterns = [
   path('adminpanel/', admin.site.urls),
   path('store/', include('store.urls')),
   path('admin/' , include('adminpanel.urls'))
]