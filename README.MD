## :construction_worker: Como usar: (Em desenvolvimento)

Para clonar e executar essa aplicação você vai precisar dos seguintes softwares instalados em seu computador: 
- [Git][git]
- [Node][nodejs]

### :electric_plug: Instalar dependências e rodar a aplicação:

```bash
# Clone este repositório:
$ git clone https://github.com/Matheus-souza-araujo/marketEasy

# Entre no repositório:
$ cd marketEasy

# Instale as dependências:
$ npm install

# Inicie o servidor
$ npm start

# A aplicação estará rodando na porta 5000 (http://localhost:5000/)
```
## :rocket: Tecnologias: Como executar o funcionamento da aplicação:

    - na rota geraToken, você deve enviar as informações de usuário e senha para logar na api, essa rota gerará um token válido
    - para obter os produtos desejados, devesse acessar a rota consulta, onde essa trará as informações solicitadas.
    - caso  você não possua um token ou ele seja inválido deverá gerar um novo token

[nodejs]: https://nodejs.org/en/
[git]: https://git-scm.com