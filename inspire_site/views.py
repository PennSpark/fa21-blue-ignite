from django.shortcuts import render
from .models import Item

def video(request):
    obj=Item.objects.all()
    return render(request,'video.html',{'obj': obj})