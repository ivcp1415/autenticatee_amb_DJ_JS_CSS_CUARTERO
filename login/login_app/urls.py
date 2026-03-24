from django.urls import path
from . import views

urlpatterns = [
    path('get_all_users/', views.get_all_users, name='get_all_users'),
    path('user/<int:pk>', views.get_user_by_id, name='user'),
    path('form/', views.user_form, name='form'),
    path('update_user/<int:pk>', views.update_user, name='update_user'),
    path('delete_user/<int:pk>', views.delete_user, name='delete_user')
]