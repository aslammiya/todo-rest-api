from django.contrib import admin
from django.urls import path, include
from home.views import index

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('home.urls')),
    path('', index, name='index'),
]
