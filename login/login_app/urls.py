from django.urls import path
from . import views

urlpatterns = [
    path('get_all_users/', views.get_all_users, name='get_all_users'),
    path('user/<int:pk>', views.get_user_by_id, name='user'),
    path('create/', views.user_form, name='form_post'),
    path('update/', views.user_form, name='form_put'),
    path('', views.login_page, name='log_page'),
    path('login_val/', views.validate_login, name='login'),
    path('update_user/<int:pk>', views.update_user, name='update_user'),
    path('delete_user/<int:pk>', views.delete_user, name='delete_user'),

    # views by rol
    path('admin/', views.get_all_users, name='admins_view'),
    path('teacher/', views.get_all_students, name='teachers_view'),
    path('student/<int:pk>', views.student_dashboard, name='students_view'),
    path('visitor/', views.visitors_page, name='visitors_view'),
    path('teacher_stud/<int:pk>', views.teacher_dashboard, name='teacher_dashboard')

]