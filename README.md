# Contacts Management Frontend
Frontend application for managing contacts. The application was built using Vue.js and with following the patterns:
- MVVM Pattern;
- Repository Pattern.

## Requirements
 - Node.js 12.18.4;
 - Vue.js 3;

## Installing

To install the application, run the following commands in the project root folder:
```
npm install
```

## Running
To run the application, execute the following commands in the project root folder:
```
npm run serve
```

The application will be available at http://127.0.0.1:8080

## Using the Application
An authenticated user is required to access to the contacts list. So, the first screen is a login form. The demo credentials are:
- User: horus
- Password: horus12345678

The user will be redirected to the contacts listing page after authentication.

### Add a contact
To add a contact, the user must click on the "Adicionar" button, fill the "nome" (name) and "telefone" (phone) fields and then click on the "Adicionar" button.

### Update a contact
To update a contact, the user must click on the "Editar" button, located at the "Editar" column of the contacts list according to the contact. An edit form will appear. The user must change the required fields and click on the "Salvar" button. 

### Delete a contact
To delete a contact, the user must click on the "Excluir" button, located at the "Excluir" column of the contacts list according to the contact. When the confirmation is presented the user must click on the "Excluir" button.
