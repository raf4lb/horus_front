<template>
  <div class="login-page">
    <h1>Login</h1>
    <form @submit.prevent="login()">
      <input
        type="text"
        v-model="viewModel.username"
        placeholder="Nome de usuário"
      />
      <br />
      <input type="password" v-model="viewModel.password" placeholder="Senha" />
      <input type="submit" value="Entrar" />
    </form>
    <p v-if="viewModel.isInvalid">Usuário ou senha incorretos</p>
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
