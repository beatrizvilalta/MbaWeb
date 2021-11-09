<template>
  <div class="hero">
    <div class="hero-body">      
      <div class="box">
        <img src="@/assets/images/logoBaque.png">

        <div class="title has-text-grey is-5">Login</div>

        <form>
          <div class="field">
            <div class="control">
              <input class="input is-large" type="email" placeholder="Email" autofocus="">
            </div>
          </div>

          <div class="field">
            <div class="control">
              <input class="input is-large" type="password" placeholder="Senha">
            </div>
          </div>

          <br>

          <button class="button is-block is-danger is-large is-fullwidth" @click="login()">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      rememberMe: false
    };
  },
  methods: {
    login() {
      this.$router.push({ path: '/userDetail'} );
    }
  }
}
</script>