import json
import os
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .settings import BASE_DIR
@api_view(['GET'])
def hello_world(request):
    with open(os.path.join(BASE_DIR, 'api/users.json')) as f:
        json_str = f.read()
    return Response(json.loads(json_str))