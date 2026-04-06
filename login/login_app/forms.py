import datetime

from django.forms import ModelForm
from .models import User
from django import forms

class UserForm(ModelForm):
    data_naixement = forms.DateField(
        input_formats=['%d/%m/%Y'],
        widget=forms.TextInput(attrs={'placeholder': 'dd/mm/yyyy'}),
        error_messages={'invalid': 'Format incorrecte. Escriu dd/mm/yyyy'}
    )

    class Meta:
        model = User
        fields = "__all__"

    def __init__(self, *args, **kwargs):
        super(UserForm, self).__init__(*args, **kwargs)
        for field_name, field in self.fields.items():
            # Force the required attribute for every field
            field.required = True

    def clean_data_naixement(self):
        data = self.cleaned_data.get('data_naixement')
        # Si 'input_formats' ja ha funcionat, 'data' ja serà un objecte date de Python
        return data

class LoginForm(ModelForm):
    class Meta:
        model = User
        fields = ["email", "password"]