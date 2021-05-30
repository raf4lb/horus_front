<template>
  <div class="home">
    <div v-if="viewModel.isLoading">
      <p>Carregando...</p>
    </div>
    <div v-else>
      <div v-if="viewModel.user" class="welcome">
        <h1>Bem-vindo, {{ viewModel.user.name }}!</h1>
        <!-- <h1 v-else>Bem-vindo!</h1> -->
        <input v-model="viewModel.inputName" type="text" placeholder="Nome" />
        <input
          v-model="viewModel.inputTelephone"
          type="text"
          placeholder="Telefone"
        />
        <input
          v-if="!viewModel.editing"
          type="submit"
          value="Adicionar"
          @click="addContact()"
        />
        <span v-else>
          <input type="submit" value="Salvar" @click="editContact()" />
          <input type="submit" value="Cancelar" @click="cancelEditContact()" />
        </span>
        <table id="contacts-list">
          <tbody>
            <tr v-for="contact in viewModel.contacts" :key="contact.id">
              <td>{{ contact.name }}</td>
              <td>{{ contact.telephone }}</td>
              <td>
                <input
                  type="button"
                  value="editar"
                  @click="editingContact(contact.id)"
                />
              </td>
              <td>
                <input
                  type="button"
                  value="excluir"
                  @click="deleteContact(contact.id)"
                />
              </td>
            </tr>
          </tbody>
        </table>

        <p v-if="viewModel.errorCreatingContact">
          Não foi possível criar o contato
        </p>
        <p v-if="viewModel.errorDeletingContact">
          Não foi possível excluir o contato
        </p>
        <p v-if="viewModel.errorEditingContact">
          Não foi possível editar o contato
        </p>
        <div v-if="!viewModel.isFormValid">
          <p>Formulário inválido</p>
          <ul>
            <li v-for="error in viewModel.formErrors" :key="error">
              {{ error }}
            </li>
          </ul>
        </div>
      </div>
      <a href="#" @click="logout()">Sair</a>
    </div>
  </div>
</template>

<script>
import HomeViewModel from "@/viewmodels/HomeViewModel";

export default {
  name: "HomeView",
  data() {
    return {
      viewModel: new HomeViewModel(),
    };
  },
  created() {
    this.getUserAuthenticated().then((response) => {
      if (response == null) {
        this.$router.push({ name: "login" });
      } else {
        this.getContacts();
      }
    });
  },
  methods: {
    async getUserAuthenticated() {
      return await this.viewModel.getUserAuthenticated();
    },
    async getContacts() {
      await this.viewModel.getContacts();
    },
    async addContact() {
      await this.viewModel.addContact();
    },
    editingContact(contactId) {
      this.viewModel.editingContact(contactId);
    },
    async editContact() {
      await this.viewModel.editContact();
    },
    cancelEditContact() {
      this.viewModel.cancelEditContact();
    },
    async deleteContact(contactId) {
      await this.viewModel.deleteContact(contactId);
    },
    async logout() {
      await this.viewModel.logout();
      this.$router.push({ name: "login" });
    },
  },
};
</script>
