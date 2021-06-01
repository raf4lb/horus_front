<template>
  <div class="home">
    <nav class="navbar navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand">Meus Contatos</a>
        <div class="d-flex">
          <div v-if="viewModel.user" class="navbar-text mr-3">
            <i class="fa fa-user" aria-hidden="true"></i>
            {{ viewModel.user.name }}
          </div>
          <div class="navbar-text">
            <i class="fa fa-sign-out-alt" aria-hidden="true"></i>
            <a href="#" @click="logout()">Sair</a>
          </div>
        </div>
      </div>
    </nav>

    <div class="container">
      <div class="row">
        <div class="col-md-8 offset-md-2 col-sm-12">
          <div class="row mt-5">
            <div class="col-8">
              <h3>Lista de Contatos</h3>
            </div>
            <div class="col-4 text-right">
              <button
                type="button"
                class="btn btn-primary"
                data-toggle="modal"
                data-target="#modalContact"
              >
                <i class="fa fa-plus" aria-hidden="true"></i> Adicionar
              </button>
            </div>
          </div>
          <div class="mt-3">
            <div v-if="viewModel.isLoading">
              <p>Carregando...</p>
            </div>
            <div v-else>
              <div v-if="this.viewModel.contacts.length">
                <table class="table" id="contacts-list">
                  <thead>
                    <th>Nome</th>
                    <th>Telefone</th>
                    <th>Editar</th>
                    <th>Excluir</th>
                  </thead>
                  <tbody>
                    <tr v-for="contact in viewModel.contacts" :key="contact.id">
                      <td>{{ contact.name }}</td>
                      <td>
                        <span class="telephone">{{ contact.telephone }}</span>
                      </td>
                      <td>
                        <a
                          class="text-primary"
                          href="#"
                          @click="editingContact(contact.id)"
                          data-toggle="modal"
                          data-target="#modalContact"
                        >
                          <i class="fa fa-pen" aria-hidden="true"></i>
                        </a>
                      </td>
                      <td>
                        <a
                          href="#"
                          class="text-danger"
                          @click="deletingContact(contact.id)"
                          data-toggle="modal"
                          data-target="#modalDeleteContact"
                        >
                          <i class="fa fa-trash" aria-hidden="true"></i>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-else>
                <br />
                <br />
                <p class="alert alert-warning text-center">
                  Você não possui contatos. Adicione um contato clicando no
                  botão <b>Adicionar</b>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="this.viewModel.contacts.length" class="row">
        <div class="col text-right">
          <input
            v-if="viewModel.previousUrl"
            type="button"
            value="Anterior"
            @click="getPreviousContacts()"
            class="btn btn-primary"
          />
          <input
            v-else
            type="button"
            value="Anterior"
            disabled
            class="btn btn-primary"
          />
        </div>
        <div class="col">
          <input
            v-if="viewModel.nextUrl"
            type="button"
            value="Próximo"
            @click="getNextContacts()"
            class="btn btn-primary"
          />
          <input
            v-else
            type="button"
            value="Próximo"
            disabled
            class="btn btn-primary"
          />
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="modalContact"
      tabindex="-1"
      aria-labelledby="modalContactLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5
              v-if="!viewModel.isEditing"
              class="modal-title"
              id="modalContactLabel"
            >
              Adicionar Contato
            </h5>
            <h5 v-else class="modal-title" id="modalContactLabel">
              Editar Contato
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form @submit.prevent="submit()">
            <div class="modal-body">
              <div class="form-group">
                <input
                  v-model="viewModel.inputName"
                  type="text"
                  placeholder="Nome"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <input
                  v-model="viewModel.inputTelephone"
                  type="text"
                  placeholder="Telefone"
                  class="form-control"
                  maxlength="11"
                />
              </div>
              <div v-if="viewModel.hasError">
                <div
                  v-for="error in viewModel.errors"
                  :key="error"
                  class="alert alert-danger"
                  role="alert"
                >
                  <i class="fa fa-exclamation-triangle"></i> {{ error }}
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                @click="cancelEditContact()"
              >
                Cancelar
              </button>
              <button
                v-if="!viewModel.isEditing"
                type="submit"
                class="btn btn-primary"
              >
                Adicionar
              </button>
              <button v-else type="submit" class="btn btn-primary">
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Modal Delete-->
    <div
      class="modal fade"
      id="modalDeleteContact"
      tabindex="-1"
      aria-labelledby="modalDeleteContactLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalDeleteContactLabel">
              Excluir Contato
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Tem certeza que deseja excluir o contato?</p>
            <div v-if="viewModel.hasError">
              <div
                v-for="error in viewModel.errors"
                :key="error"
                class="alert alert-danger"
                role="alert"
              >
                <i class="fa fa-exclamation-triangle"></i> {{ error }}
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="cancelDeleteContact()"
            >
              Cancelar
            </button>
            <button class="btn btn-danger" @click="deleteContact()">
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeViewModel from "@/viewmodels/HomeViewModel";
import $ from "jquery";

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
      if (!this.viewModel.hasError) {
        this.closeModal();
        $.notify("Contato adicionado", {
          className: "info",
          position: "bottom center",
        });
      }
    },
    editingContact(contactId) {
      this.viewModel.editingContact(contactId);
    },
    async editContact() {
      await this.viewModel.editContact();
      if (!this.viewModel.hasError) {
        this.closeModal();
        $.notify("Contato editado", {
          className: "info",
          position: "bottom center",
        });
      }
    },
    cancelEditContact() {
      this.closeModal();
      this.viewModel.cancelEditContact();
    },
    deletingContact(contactId) {
      this.viewModel.deletingContact(contactId);
    },
    async deleteContact() {
      await this.viewModel.deleteContact();
      if (!this.viewModel.hasError) {
        $("#modalDeleteContact").modal("hide");
        $.notify("Contato excluído", {
          className: "info",
          position: "bottom center",
        });
      }
    },
    cancelDeleteContact() {
      this.viewModel.clearSelectedContact();
      $("#modalDeleteContact").modal("hide");
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
    closeModal() {
      $("#modalContact").modal("hide");
    },
  },
};
</script>
