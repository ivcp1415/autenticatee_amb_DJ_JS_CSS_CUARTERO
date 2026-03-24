from django.shortcuts import render

# Create your views here.
from django.shortcuts import render, redirect
from .models import User
from .forms import UserForm

def get_all_users(request):
    # get all teachers
    all_users = User.objects.all()
    print(f"DEBUG: Found {all_users.count()} teachers in DB")  # <--- ADD THIS
    response = {"users": all_users}
    return render(request, "main_page.html", response)

# get specific user
def get_user_by_id(request, pk):
    # get by id
    user_obj = User.objects.get(id=pk)
    context = {'user': user_obj}
    return render(request, 'main_page2.html', context)

def user_form(request):
    # instantiate form
    form = UserForm()

    if request.method == "POST":
        form = UserForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('get_all_users')

    return render(request, 'form.html', {"form": form})

def update_user(request, pk):
    # instantiate form
    user = User.objects.get(id=pk)
    form = UserForm(instance=user)

    if request.method == "POST":
        form = UserForm(request.POST, instance=user)
        if form.is_valid():
            form.save()
            return redirect('get_all_users')

    return render(request, 'form.html', {"form": form})

def delete_user(request, pk):
    user = User.objects.get(id=pk)

    if request.method == "POST":
        user.delete()
        return redirect('get_all_users')
    return render(request, 'delete_user.html', {"user": user})