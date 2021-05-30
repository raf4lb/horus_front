<template>
  <div class="home">
    <div v-if="viewModel.isLoading">
      <p>Carregando...</p>
    </div>
    <div v-else>
      <div v-if="viewModel.user" class="welcome">
        <h1>Bem-vindo, {{ viewModel.user.name }}!</h1>
        <form @submit.prevent="submit()">
          <input v-model="viewModel.inputName" type="text" placeholder="Nome" />
          <input
            v-model="viewModel.inputTelephone"
            type="text"
            placeholder="Telefone"
          />
          <input v-if="!viewModel.isEditing" type="submit" value="Adicionar" />
          <span v-else>
            <input type="submit" value="Salvar" />
            <input
              type="button"
              value="Cancelar"
              @click="cancelEditContact()"
            />
          </span>
        </form>
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
        <input
          v-if="viewModel.previousUrl"
          type="button"
          value="Anterior"
          @click="getPreviousContacts()"
        />
        <input v-else type="button" value="Anterior" disabled />
        <input
          v-if="viewModel.nextUrl"
          type="button"
          value="Próximo"
          @click="getNextContacts()"
        />
        <input v-else type="button" value="Próximo" disabled />

        <div v-if="viewModel.hasError">
          <ul>
            <li v-for="error in viewModel.errors" :key="error">
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
    submit() {
      if (this.viewModel.isEditing) this.editContact();
      else this.addContact();
    },
    async getPreviousContacts() {
      await this.viewModel.getPreviousContacts();
    },
    async getNextContacts() {
      await this.viewModel.getNextContacts();
    },
  },
};
</script>
