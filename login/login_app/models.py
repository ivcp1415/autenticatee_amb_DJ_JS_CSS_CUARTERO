from django.db import models

class User(models.Model):
    class Rol(models.TextChoices):
        TEACHER = "Teacher"
        STUDENT = "Student"
        ADMIN = "Admin"
        VISITANT = "Visitant"
    # user
    nom = models.CharField(max_length=30)
    email = models.CharField(max_length=30)
    rol = models.CharField(max_length=30, choices=Rol.choices, default=Rol.STUDENT)
    data_naixement = models.DateField()
    tlf = models.CharField(max_length=15)
    dni = models.CharField(max_length=20)
    codi = models.CharField(max_length=5)
    password = models.CharField(max_length=128)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)





