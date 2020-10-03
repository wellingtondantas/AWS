# Tutorial para deployment de modelos de Machine Learning em instância EC2 AWS by Wellington Dantas

Este tutorial pode ajuda a criar uma instância EC2 e faz rodar nela o Python


### O que eu preciso?
- Uma conta na AWS

- Conhecimentos em Cloud Computer, esse tutorial está bem explicado, porém é preciso de um pouco de conhecimento em EC2

- Tempo e paciência

### O que eu vou ganhar?

- Conhecimento!

- O deploy do seu modelo Python.


## Etapa no Gerenciador do AWS

1. Faça o login no AWS

2. Ir na seção de serviço EC2  

3. Clique em criar uma nova instância "Launch Instance"

4. Procure por pelo sistema linux : exemplo "Ubuntu Server 16.04 LTS (HVM) with SQL Server 2017 Standard"

5. Na instalação da instância não esqueça de colocar os grupos HTTP e HTTPS e seleciona nos dois, o grupo "Anywhere"

6. Crie a sua chave de segurança .pem e faça o download

7. Finalize a criação da instância


## Etapa no cliente servidor FTP FILEZILLA

1. Acesse a instância pelo cliente servidor de FTP

2. Procure pelo caminho /home/ubuntu/ (Geralmente já está neste diretório)

3. Nesta área, você pode criar uma pasta, ou inserir um arquivo .py para testar o funcionamento

4. Envie os arquivos que você precisa para fazer o deploy

5. Envie o arquivo /requirements.txt com todos os pacotes que precisam ser instalado no servidor (Economia de Tempo)


## Etapa no terminal, PUTTY ou outro

1. Conecte-se com a instância, (PUTTY ou outro), com sua chave. 
```
login as: ubuntu
```

2. Faça as atualiações normais como em qualquer instância e espere a atualização terminar
```
ubuntu@ip-000-00-00-000:~$ sudo apt-get update
```

3. Faça a instalação do Python
```
ubuntu@ip-000-00-00-000:~$ sudo apt-get install python3-pip
```

3. Instale os pacotes necessários para funcionamento da aplicação
```
ubuntu@ip-000-00-00-000:~$ sudo pip3 install -r requirements.txt
```

4. Execute o seu arquivo .py 
```
ubuntu@ip-000-00-00-000:~$ python3 app.py
```


## Etapa no Gerenciador do AWS

1. Faça uma nova conexão na instancia EC2. 

2. Copie o endereço: ec2-0-000-000-000.us-east-1.compute.amazonaws.com

3. Cole no navegador da sua preferência com a porta :8080




























