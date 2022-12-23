<template>
  <div class="hero">
    <progress class="progress is-small is-info" max="100" v-bind:class="progressVisibility">50%</progress>
    <div class="hero-body">
      <div class="columns is-centered">
        <div class="column is-4-widescreen">
          <div class="box">
            <img src="@/assets/images/logoBaque.png">

            <div class="title has-text-grey is-5">Login</div>            
            <form @submit.prevent="login">
              <div class="field">
                <div class="control">
                 <input class="input is-large" v-model="email" type="email" placeholder="Email" autofocus="">
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <input class="input is-large" v-model="password" type="password" placeholder="Senha">
                </div>
              </div>
              <br>
              <p class="has-text-danger" v-bind:class="errorMessageVisibility">{{ errorMessage }}</p>
              <br>
              <button type="submit" class="button is-block is-danger is-large is-fullwidth" v-bind:class="buttonLoading">Login</button>
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
      progressVisibility: 'is-hidden',
      errorMessageVisibility: 'is-hidden',
      buttonLoading: '',
      errorMessage: ''
    };
  },
  mounted() {
    let userID = this.$localStorage.get('userid')

    if (userID) {
      this.$router.push({ name: 'MemberHome'})
    }
  },
  computed: {},
  methods: {
    login() {
      this.isLoading(true)
      this.clearErrors()
      if (this.email == "" || this.password == "") {
        this.setError('Email e Senha devem ser preenchidos')
        this.isLoading(false)
        return
      } else {
        this.executeLoginRequest()
      }
    },
    executeLoginRequest() {
      let localStorage = this.$localStorage
      axios.post('http://localhost:8080/api/user/signin', {
        email: this.email,
        password: this.password        
      })
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          localStorage.set('userid', response.data.id)
          localStorage.set('userEmail', response.data.email)
          this.$router.push({ name: 'MemberHome'})
          this.isLoading(false)
        }        
      })
      .catch(err => {
        if (err.response.status == 401) {
          this.setError('Email ou Senha incorretos')
          this.isLoading(false)
        } else {
          this.setError('Erro ao realizar login')
        }
      });
    },
    isLoading(stateLoading) {
      if (stateLoading) {
        this.progressVisibility = ''
        this.buttonLoading = 'is-loading'
      } else {
        this.progressVisibility = 'is-hidden'
        this.buttonLoading = ''
      }
    },
    clearErrors() {
      this.errorMessageVisibility = 'is-hidden'
    },
    setError(message) {
      this.errorMessage = message
      this.errorMessageVisibility = ''
    }
  }
}
</script>