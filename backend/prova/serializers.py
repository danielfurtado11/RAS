from rest_framework import serializers
from .models import Prova

class ProvaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Prova
        fields = '__all__'


    # If you need custom validation for the questions JSON structure, you can add it here
    #def validate_questions(self, value):
    #    # Implement your validation logic for the structure of questions
    #    # For example, check if each question dict contains all necessary keys
    #    for question in value:
    #        if not all(k in question for k in ('type', 'question_text', 'options', 'correct_answer', 'grading_value')):
    #            raise serializers.ValidationError("Each question must include all required fields.")
    #    return value