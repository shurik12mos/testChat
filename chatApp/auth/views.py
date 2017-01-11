from django.http import HttpResponse, JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
import json

def logining(request):
    if request.method == 'POST':
        received_json_data = json.loads(request.body)
        username = received_json_data.get('username', False)
        password = received_json_data.get('password', False)        
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
                response_message = {'status': 'true', 'username': user.username}
            else:
                response_message = {'status': 'false', 'statusText': 'Not active user'}
        else:
            response_message = {'status': 'false', 'statusText': 'Username or password invalid'}
        
        return JsonResponse(response_message)
    
def register(request):   
    if request.method == 'POST':
        received_json_data = json.loads(request.body)
        username = received_json_data.get('username', False)
        password = received_json_data.get('password', False)
        email = received_json_data.get('email', False)
        user = User.objects.create_user(username, email, password)
        user.save()        
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
                response_message = {'status': 'true', 'username': user.username}
            else:
                response_message = {'status': 'false', 'statusText': 'Not active user'}
        else:
            response_message = {'status': 'false', 'statusText': 'Username or password invalid'}

        return JsonResponse(response_message)
