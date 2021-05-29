<template>
  <div class="login-page">
    <h1>Login</h1>
    <input type="text" v-model="username" placeholder="Nome de usuário" />
    <br />
    <input type="password" v-model="password" placeholder="Senha" />
    <input type="submit" @click="login()" value="Entrar" />
    <p v-if="isInvalid">Usuário ou senha incorretos</p>
  </div>
</template>

<script>
import LoginViewModel from "@/viewmodels/LoginViewModel";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      isInvalid: false,
    };
  },
  mounted() {
    this.viewModel = new LoginViewModel(this);
  },
  methods: {
    async login() {
      let token = await this.viewModel.login();
      if (token != null) {
        console.log("Token " + token);
        // this.$store.dispatch("userToken", token);
        this.$router.push("/");
      }
    },
  },
};
</script>
