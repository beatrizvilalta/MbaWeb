<template>
<div class="hero">
    <Navbar/>
    <div class="hero-body p-5">
        <p class="is-size-3">{{ title }}</p>
        
        <div class="is-two-thirds is-centered">
            <div class="box mt-5">
                <div class="column">
                    <form action="" method="post">
                        <div class="field">
                            <label class="label is-pulled-left">Nome</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="Insira o nome" />
                            </div>
                        </div>

                        <div class="field">
                            <label class="label is-pulled-left">Email</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="Insira o email" />
                            </div>
                        </div>

                        <div class="field">
                            <label class="label is-pulled-left">Senha</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="Senha" />
                            </div>
                        </div>
                        <div class="field">
                            <label class="label is-pulled-left">Confirmar senha</label>
                            <div class="control">
                                <input class="input" type="text" placeholder="Confirmação de senha" />
                            </div>
                        </div>
                        <div class="field is-horizontal columns p-5">
                            <label class="has-text-weight-bold flex-center mr-4">Ala</label>
                                <div class="control">
                                    <div class="select">
                                        <select>
                                            <option>Select dropdown</option>
                                            <option>With options</option>
                                        </select>
                                    </div>
                                </div>
                        </div>

              

              <div class="field">
                <div class="control">
                  <label class="checkbox">
                    <input type="checkbox" />
                    I agree to the <a href="#">terms and conditions</a>
                  </label>
                </div>
              </div>

              <div class="field is-grouped">
                <div class="control">
                  <button class="button is-link">Submit</button>
                </div>
                <div class="control">
                  <button class="button is-link is-light">Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import Navbar from "../components/Navbar.vue";

export default {
  components: {
    Navbar,
  },
  props: {},
  mounted() {
    this.setupView();
  },
  created() {},
  data() {
    return {
      title: "",
      user: {
        name: "",
        email: "",
        password: "",
        instrument: 99,
        userType: 99,
        isActive: false,
        isAssociated: false,
        situation: 99,
      },
    };
  },
  methods: {
    setupView() {
      // this.$session.get("userid")
      if (this.$route.params.userId == null) {
        this.title = "Adicionar usuário";
      } else {
        this.title = "Editar usuário";
      }
    },
  },
};
</script>

<style>
.flex-left {
    display: flex;
    align-items: left;
}
</style>