from django.conf.urls import url

from . import views

app_name = 'login'
urlpatterns = [
    url(r'^login/$', views.logining, name='logining'),
    url(r'^register/$', views.register, name='register'),
]