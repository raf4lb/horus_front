<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <form
        @submit.prevent="login()"
        class="col-lg-4 col-offset-4"
        style="margin-top: 15%"
      >
        <h2>Meus Contatos</h2>
        <br />
        <div class="mb-3">
          <input
            v-model="viewModel.username"
            type="text"
            class="form-control"
            id="inputUsername"
            aria-describedby="usernameHelp"
            placeholder="Nome de usuário"
          />
        </div>
        <div class="mb-3">
          <input
            v-model="viewModel.password"
            type="password"
            class="form-control"
            id="inputPassword"
            placeholder="Senha"
          />
        </div>
        <input type="submit" class="btn btn-primary" value="Entrar" />
        <br />
        <br />
        <div v-if="viewModel.isInvalid">
          <div class="alert alert-danger" role="alert">
            <i class="fa fa-exclamation-triangle"></i>
            Usuário ou senha incorretos.
          </div>
          <div class="alert alert-info" role="alert">
            <i class="fa fa-info-circle"></i> Acesso de demonstração<br />
            <b>nome de usuário</b>: horus<br />
            <b>senha</b>: horus12345678
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import LoginViewModel from "@/viewmodels/LoginViewModel";

export default {
  name: "Login",
  data() {
    return {
      viewModel: new LoginViewModel(),
    };
  },
  methods: {
    async login() {
      let token = await this.viewModel.login();
      if (token != null) {
        // console.log("token " + token);
        // this.$store.dispatch("userToken", token);
        this.$router.push({ name: "home" });
      }
    },
  },
};
</script>
