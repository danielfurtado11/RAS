from django.shortcuts import render
from rest_framework import viewsets
from . import serializers
from . import models

class ProvaViewSet(viewsets.ModelViewSet):
    queryset = models.Prova.objects.all()
    serializer_class = serializers.ProvaSerializer
