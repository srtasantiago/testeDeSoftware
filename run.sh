#!/bin/bash

# Variáveis
SRC="src"
BIN="bin"
LIB="lib/postgresql-42.7.3.jar"
MAIN_CLASS="view.TelaUsuario"

# Criar pasta bin se não existir
mkdir -p $BIN

echo "Compilando..."
javac -d $BIN -classpath $LIB \
  $SRC/view/TelaUsuario.java \
  $SRC/controller/UsuarioController.java \
  $SRC/dao/UsuarioDAO.java \
  $SRC/dao/Conexao.java \
  $SRC/model/Usuario.java

if [ $? -ne 0 ]; then
  echo "Erro na compilação."
  exit 1
fi

echo "Executando..."
java -cp "$BIN:$LIB" $MAIN_CLASS
