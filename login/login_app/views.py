from django.shortcuts import render

# Create your views here.
from django.shortcuts import render, redirect
from .models import User
from .forms import UserForm, LoginForm


def get_all_users(request):
    # get all teachers
    all_users = User.objects.all()
    print(f"DEBUG: Found {all_users.count()} teachers in DB")  # <--- ADD THIS
    response = {"users": all_users}
    return render(request, "admins_view.html", response)

def get_all_students(request):
    # get all students
    all_students = User.objects.filter(rol="Student")
    response = {"students": all_students}
    return render(request, "teachers_view.html", response)

# get specific user
def get_user_by_id(request, pk):
    # get by id
    user_obj = User.objects.get(id=pk)
    context = {'user': user_obj}
    return render(request, 'main_page2.html', context)

def get_student_by_id(request, pk):
    # get by id
    user_obj = User.objects.get(id=pk)
    context = {'user': user_obj}
    return render(request, 'students_view.html', context)

def user_form(request):
    # instantiate form
    form = UserForm()

    if request.method == "POST":
        form = UserForm(request.POST)
        print(form)
        if form.is_valid():
            form.save()
            return redirect('admins_view')

    return render(request, 'form_post.html', {"form": form})

def update_user(request, pk):
    # instantiate form
    user = User.objects.get(id=pk)
    form = UserForm(instance=user)

    if request.method == "POST":
        print(f"DEBUG: Valor que arriba al servidor: '{request.POST.get('data_naixement')}'")

        form = UserForm(request.POST, instance=user)
        if form.is_valid():
            form.save()
            return redirect('get_all_users')
        else:
            print(f"Errors del formulari: {form.errors}")
    else:
        form = UserForm(instance=user)

    return render(request, 'form_put.html', {"form": form, "user": user})

def delete_user(request, pk):
    user = User.objects.get(id=pk)

    if request.method == "POST":
        user.delete()
        return redirect('get_all_users')
    return render(request, 'delete_user.html', {"user": user})

def validate_login(request):
    """
    This functions validates login against bd info.
        -> if method is post, save username and execute a query to db
        -> if username exists validate password.
        -> if password matches, return view, according to rol
    :return:
    """
    form = LoginForm()
    error_msg = None

    if request.method == "POST":
        form = LoginForm(request.POST)

        if form.is_valid():
            captured_email = form.cleaned_data["email"]
            captured_password = form.cleaned_data["password"]

            try:

                user = User.objects.get(email=captured_email)
                print("hello")
                if user.password == captured_password:
                    match user.rol:
                        case "Admin":
                            return redirect('admins_view')
                        case "Visitant":
                            return redirect('visitors_view')
                        case "Teacher":
                            return redirect('teachers_view')
                        case "Student":
                            return redirect('students_view', pk=user.id)
                else:
                    error_msg = "Contrasenya incorrecta"
            except User.DoesNotExist:
                error_msg = "L'usuari no existeix"

    return render(request, "login.html", {"form": form, "msg": error_msg})

def visitors_page(request):
    return render(request, 'visitors_view.html')

def login_page(request):
    return render(request, "login.html")

def teacher_dashboard(request, pk):
    student = User.objects.get(id=pk)
    return render(request, "teacher_student_view.html", {"user": student} )

def student_dashboard(request, pk):
    student = User.objects.get(id=pk)
    return render(request, "students_view.html", {"user": student})
