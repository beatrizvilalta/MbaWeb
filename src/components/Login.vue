<template>
  <div class="hero">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-8 is-offset-2">          
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
            <button class="button is-block is-danger is-large is-fullwidth">Login</button>

          </form>
          </div>

          
        </div>
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
  }  
}
</script>