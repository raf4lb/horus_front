# Aplicação Frontend do Desafio Horus
Frontend para consumir uma api de lista de contatos. A aplicação foi implementada usando Vue.js e possui os seguintes recursos:
- Arquitetura MVVM;
- Repository Pattern.

## Requerimentos
 - Node.js 12.18.4;
 - Vue.js 3;

## Instalação

Para instalar a aplicação, basta executar o seguinte comando na pasta do projeto:
```
npm install
```

## Rodando
Para rodar a aplicação, basta executar o seguinte comando na pasta do projeto:
```
npm run serve
```

A aplicação estará acessível no endereço http://127.0.0.1:8080

## Utilizando a Aplicação
Para ter acesso à lista de contatos, é necessário que o usuário esteja autenticado. Sendo assim, a primeira tela contém um formulário de autenticação. As credenciais do acesso de demonstração são:
- Usuário: horus
- Senha: horus12345678

Depois de autenticado, o usuário é redirecionado para a página de listagem de contatos.

### Adicionar um novo contato
Para adicionar um novo contato, o usuário deve clicar no botão "Adicionar", preencher os campos nome e telefone e por fim clicar no botão "Adicionar".

### Editar um contato
Para editar um contato, o usuário deve clicar no botão editar, localizado na coluna "Editar" da lista de contatos, referente ao contato. Um formulário de edição surgirá. O usuário deve alterar os campos necessários e clicar no botão "Salvar".

### Excluir um contato
Para excluir um contato, o usuário deve clicar no botão excluir, localizado na coluna "Excluir" da lista de contatos, referente ao contato. Uma confirmação de exclusão surgirá. O usuário deve clicar no botão "Excluir".
