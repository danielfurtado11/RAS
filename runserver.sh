#!/bin/bash

# Função para encerrar o processo Django ao receber o sinal de interrupção (Ctrl+C)
cleanup() {
    echo "Recebido sinal de interrupção. Encerrando o servidor Django..."
    kill -TERM $django_pid
    wait $django_pid
    echo "Servidor Django encerrado."
    exit 0
}

# Associar a função de limpeza ao sinal de interrupção
trap cleanup INT

# Ativar o ambiente virtual
source env/bin/activate

# Iniciar o servidor Django em segundo plano e armazenar o PID
cd backend
python manage.py runserver 7200 &
django_pid=$!


cd ../frontend
npm run dev


cleanup
