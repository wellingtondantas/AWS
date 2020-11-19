# Tutorial para deployment de modelos de Machine Learning em instância EC2 AWS usando Streamlit by Wellington Dantas

Este tutorial pode ajuda a criar uma instância EC2 e faz rodar nela o Python com tela de Streamlit


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

4. Procure por pelo sistema linux : exemplo "Ubuntu Server 20.04 LTS (HVM), SSD Volume Type"

5. Na instalação da instância não esqueça de colocar o grupo de regra 'Custom TCP' e inserir o Port Range:8501 o grupo "Anywhere"

6. Crie a sua chave de segurança .pem e faça o download

7. Finalize a criação da instância



## Etapa no terminal, PUTTY ou outro

1. Conecte-se com a instância, (PUTTY ou outro), com sua chave. 
```
login as: ubuntu
```

2. Faça as atualiações normais como em qualquer instância e espere a atualização terminar
```
ubuntu@ip-000-00-00-000:~$ sudo apt-get update
```

3. Faça a instalação do Mini conda
```
ubuntu@ip-000-00-00-000:~$ wget https://repo.continuum.io/miniconda/Miniconda3-latest-Linux-x86_64.sh -O ~/miniconda.sh
```

```
ubuntu@ip-000-00-00-000:~$ bash ~/miniconda.sh -b -p ~/miniconda
```


```
ubuntu@ip-000-00-00-000:~$ echo "PATH=$PATH:$HOME/miniconda/bin" >> ~/.bashrc
```

```
ubuntu@ip-000-00-00-000:~$ source ~/.bashrc
```


```
ubuntu@ip-000-00-00-000:~$ pip install streamlit
```


## Etapa no cliente servidor FTP FILEZILLA

1. Acesse a instância pelo cliente servidor de FTP

2. Procure pelo caminho /home/ubuntu/ (Geralmente já está neste diretório)

3. Nesta área, você pode criar uma pasta testar o funcionamento. Exemplo: meuapp

4. Envie os arquivos que você precisa para fazer o deploy na pasta que você criou.

5. Utilize o arquivo app.py como exemplo se desejar testar.


## Retorne para o terminal, PUTTY ou outro

1. Acesse a pasta que você colocou seu arquivos.
```
ubuntu@ip-000-00-00-000:~$ cd meuapp
```

2. Execute a sua aplicação
```
ubuntu@ip-000-00-00-000:~$ streamlit run app.py
```


## Etapa no Navegador WEB

1. Acesse o endereco (External URL) com o respectivo ip e porta 8501. Exemplo http://000.000.000.000:8501




























