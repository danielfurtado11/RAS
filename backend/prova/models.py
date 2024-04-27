from django.db import models

# Create your models here.


class Prova(models.Model):
    exam_identifier = models.CharField(max_length=50,null=True)
    exam_type = models.CharField(max_length=50,default='enunciado')
    questions = models.JSONField(null=True)  # Field to store questions as a JSON list
    duracao = models.CharField(max_length=20,default='90 minutos')
    UC = models.CharField(max_length=50,null=True)

    def __str__(self):
        return self.exam_identifier
    