# Tutorial de instalação Rápida do Cpanel / WHM no AWS Amazon EC2 by Wellington Dantas

Este tutorial pode ajudar você no seu negócio de hospedagem, o objetivo aqui é criar o serviço de hospedagem de sites 


### O que eu preciso?
- Uma conta na AWS

- Conhecimentos em Cloud Computer, esse tutorial está bem explicado, porém é preciso de um pouco de conhecimento em EC2

- Tempo e paciência

### O que eu vou ganhar?

- Conhecimento!

- Um sistema de hospedagem com Cpanel e WHM.


## Etapa no Gerenciador do AWS

1. Faça o login no AWS

2. Ir na seção de serviço EC2  

3. Clique em criar uma nova instância "Launch Instance"

4. Procure por "CentOS 7 (x86_64) - with Updates HVM" em AWS Marketplace e selecione a imagem correspondente

5. Na instalação da instância não esqueça de colocar os grupos HTTP e HTTPS e seleciona nos dois, o grupo "Anywhere"

6. Crie a sua chave de segurança .pem e faça o download

7. Finalize a criação da instância

## Etapa no terminal, PUTTY ou outro

1. Conecte-se com a instância, (PUTTY ou outro), com sua chave. 

2. Na conexão vai ser solicitado um login, digite conforme abaixo: (centos)
```
login as: centos
```

3. Faça updates iniciais 
```
[centos@ip-000-00-00-00 ~]$ sudo yum update -y
```

4. Digite os comandos a seguir para instalar o WHM, Cpanel
```
[centos@ip-000-00-00-00 ~]$ sudo yum install perl
```
```
[centos@ip-000-00-00-00 ~]$ sudo yum install WGET
```

5. Defina um nome de hostname ex: namesite.com.br 
```
[centos@ip-000-00-00-00 ~]$ hostname test.namesite.com.br
```

6. Defina a senha de host
```
[centos@ip-000-00-00-00 ~]$ command sudo passwd root
```
```
New password: ********
```
```
Retype new password: ********
```

7. Digite o comando abaixo e após, digite a sua (senha) criada
```
[centos@ip-000-00-00-00 ~]$ su -
```

8. Digite o comando abaixo, e espere instalar
```
[root@ip-000-00-00-00 ~]$ cd /home && curl -o latest -L https://securedownloads.cpanel.net/latest && sh latest
```

## Etapa no Gerenciador do AWS: Volte para o serviço EC2

1. Em Security Groups, edite os inbound rules na instância criada

2. Adiciona uma nova regra: "All traffic" com porta "My IP"

3. Acessar na sua página web com o endereço e porta 2087 como no exemplo abaixo

https://4.44.444.444:2087
ou
https://nomesite.com.br:2087

4. Você vai ser redirecionado para a página do WHM

## Etapa configurando o Cpanel e WHM 

1. Aceitar os termos

2. Coloque o e-mail de administração e "IR"

3. Pronto! tudo feito, só usar agora!

###Fácil né?
