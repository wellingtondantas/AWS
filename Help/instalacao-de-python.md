# Tutorial de instalação Rápida do Python no AWS Amazon EC2 by Wellington Dantas

Este tutorial pode ajuda a criar uma instância EC2 e faz rodar nela o Python


### O que eu preciso?
- Uma conta na AWS

- Conhecimentos em Cloud Computer, esse tutorial está bem explicado, porém é preciso de um pouco de conhecimento em EC2

- Tempo e paciência

### O que eu vou ganhar?

- Conhecimento!

- Um sistema que roda Python.


## Etapa no Gerenciador do AWS

1. Faça o login no AWS

2. Ir na seção de serviço EC2  

3. Clique em criar uma nova instância "Launch Instance"

4. Procure por pelo sistema linux : exemplo "Ubuntu Server 16.04 LTS (HVM) with SQL Server 2017 Standard"

5. Na instalação da instância não esqueça de colocar os grupos HTTP e HTTPS e seleciona nos dois, o grupo "Anywhere"

6. Crie a sua chave de segurança .pem e faça o download

7. Finalize a criação da instância

## Etapa no terminal, PUTTY ou outro

1. Conecte-se com a instância, (PUTTY ou outro), com sua chave. 

2. Faça as atualiações normais como em qualquer instância e espere a atualização terminar
```
ubuntu@ip-000-00-00-000:~$ sudo apt update
```

3. Faça a instalação do Python
```
ubuntu@ip-000-00-00-000:~$ sudo apt install python3-pip -y
```

```
ubuntu@ip-000-00-00-000:~$ pip3 install discord.py
```

## Etapa no cliente servidor FTP FILEZILLA

1. Acesse a instância pelo cliente servidor de FTP

2. Procure pelo caminho /home/ubuntu

3. Nesta área, você pode criar uma pasta, ou inserir um arquivo .py para testar o funcionamento


## Volta para a etapa no terminal

1. Encontre os arquivos que você colocou no caminho
```
ubuntu@ip-000-00-00-000:~$ dir
```

2. Execute o seu arquivo .py 
```
ubuntu@ip-000-00-00-000:~$ python3 name-archive.py
```

3. Instale pacotes, caso seja necessário: exemplo: import numpy as np
```
ubuntu@ip-000-00-00-000:~$ sudo pip3 install numpy
```
































