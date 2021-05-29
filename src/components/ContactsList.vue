<template>
  <div class="contacts-list">
    <input v-model="newContact" type="text" placeholder="Nome" />
    <input v-model="newTelephone" type="text" placeholder="Telefone" />
    <input type="submit" value="Adicionar" @click="addContact(1, 1)" />
    <ul id="contacts-list">
      <li v-for="contact in contacts" :key="contact.id">
        {{ contact.name }} - {{ contact.telephone }}
        <input
          type="button"
          value="editar"
          @click="updateContact(contact.id)"
        />
        <input
          type="button"
          value="excluir"
          @click="deleteContact(contact.id)"
        />
      </li>
    </ul>
    <p v-if="errorDeletingContact">Não foi possível excluir o contato</p>
  </div>
</template>

<script>
export default {
  name: "ContactsList",
  data() {
    return {
      newContact: null,
      newTelephone: null,
      user: null,
      contacts: [],
      errorDeletingContact: false,
      loading: true,
    };
  },
  mounted() {
    this.viewModel = new HomeViewModel(this);
    this.getUserAuthenticated().then((response) => {
      if (response == null) {
        this.$router.push({ name: "login" });
      }
      this.user = response;
      this.getContacts(this.user.id);
      this.loading = false;
    });
  },
  methods: {
    async getUserAuthenticated() {
      return await this.viewModel.getUserAuthenticated();
    },
    async getContacts(userId) {
      this.contacts = await this.viewModel.getContacts(userId);
    },
    async addContact() {
      this.contacts.push({
        id: 4,
        name: this.newContact,
        telephone: this.newTelephone,
      });
    },
    async editContact(contactId) {},
    async deleteContact(contactId) {
      let index = this.contacts.findIndex((element) => element.id == contactId);
      let deleted = await this.viewModel.deleteContact(contactId);
      if (deleted) {
        this.contacts.splice(index, 1);
        this.errorDeletingContact = false;
      } else {
        this.errorDeletingContact = true;
      }
    },
  },
};
</script>
