from django.http import HttpResponse, JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.db import Error
import json
from datetime import datetime

from .models import Message

def index(request):    
	try:
		if request.method == 'GET':
			message = getAll(request)
			return JsonResponse({'results': list(message), 'status': 'true', 'lastDate': message.lastDate})
		elif request.method == 'POST':
			message = create(request)
			return JsonResponse({'results': json.dumps(dict(message)), 'status': 'true'})
	except Error:
		return JsonResponse({'results': Error, 'status': 'false'})


def create(request):
    text = json.loads(request.body)
    text = text.get('text', False)
    if text != False:
        message = Message(text=text, user = request.user)
        message.save()
        return {'id': message.id, 'text': message.text, 'user__username': request.user.username, 'created': message.created.__str__()}
    
def getAll(request):    
    lastDate = request.GET.get('lastDate', default = False)
    if lastDate != False:
        messages = Message.objects.filter(created__gt=lastDate).values('id', 'text', 'created',  'user__username')
        lastDate = datetime.now().__str__()
    else:
        messages = Message.objects.all().values('id', 'text', 'created',  'user__username')
        lastDate = datetime.now().__str__()
    messages.lastDate = lastDate
    
    return messages

