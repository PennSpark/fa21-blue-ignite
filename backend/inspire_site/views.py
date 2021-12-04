from django.shortcuts import render
from .models import Item

import json
import urllib.request
import string
import random
import ssl

def get_random_vid():
    # idk some setting i had to fix on my computer
    ssl._create_default_https_context = ssl._create_unverified_context

    # for some reason the max is 50, but ill do fewer bc why not
    count = 10
    API_KEY = 'AIzaSyDWTu1jFVq0sA8mqCTzrSKVb6FszG8ixrI'

    # make a random search key
    random_choice = ''
    for i in range(3):
        random_choice += random.choice(string.ascii_uppercase + string.digits)
    
    # get the data from the api
    api_data = f'https://www.googleapis.com/youtube/v3/search?key={API_KEY}&maxResults={count}&part=snippet&type=video&q={random_choice}'

    # fetch the url
    the_url = urllib.request.urlopen(api_data)

    # read the data in, as bytes
    data = the_url.read()

    # get the charset of the page
    encoding = the_url.info().get_content_charset('utf-8')

    # decode the data and parse the json into a dict
    results = json.loads(data.decode(encoding))

    # make a list of all the ids
    id_list = []
    for data in results['items']:
        id_list.append((data['id']['videoId']))

    # return a random id
    return 'https://www.youtube.com/watch?v=' + random.choice(id_list)


def video(request):

    if request.method == 'POST':
        item = Item.objects.create(
            video = get_random_vid()
        )
        item.save()

    obj=Item.objects.all()
    return render(request,'video.html',{'obj': obj})