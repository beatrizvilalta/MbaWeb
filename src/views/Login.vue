<template>
  <div class="hero">
    <div class="hero-body">
      <div class="columns is-centered">
        <div class="column is-4-widescreen">
          <div class="box">
            <img src="@/assets/images/logoBaque.png">

            <div class="title has-text-grey is-5">Login</div>
            <form @submit.prevent="login">
              <div class="field">
                <div class="control">
                 <input class="input is-large" v-model="email" type="text" placeholder="Email" autofocus="">
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <input class="input is-large" v-model="password" type="password" placeholder="Senha">
                </div>
              </div>
              <br>

              <button type="submit" class="button is-block is-danger is-large is-fullwidth">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios'

export default {  
  data() {
    return {
      email: "",
      password: "",
      rememberMe: false
    };
  },
  mounted() {
    let userID = this.$localStorage.get('userid')
    
    if (userID) {
      this.$router.push({ name: 'UserDetail'})
    }
  },
  methods: {
    login() {
      let localStorage = this.$localStorage
      console.log("request");
      console.log(this.email);
      axios.post('http://localhost:8080/api/user/signin', {
        email: this.email,
        password: this.password
      })
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          localStorage.set('userid', response.data.id)
          this.$router.push({ name: 'UserDetail'})
        }
      })
      .catch(err => {
        if (err.response) {
          console.log("Falhou");
          console.log(err.response.status);
        }
      });
    },
    async goToDetail() {
      console.log("Im on detail")
    }
  }
}
</script>