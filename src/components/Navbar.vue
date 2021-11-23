<template>
    <nav class="navbar has-shadow is-white" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item" @click="goToHome">
                <h2 id="name"> Home </h2>
            </a>

            <a class="navbar-burger" @click="toggleBurgerMenu">
            <span></span>
            <span></span>
            <span></span>
            </a>
        </div>

        <div class="navbar-menu" id="nav-links">            
            <div class="navbar-end">
                <div class="navbar-item" v-bind:class="userActionClass">
                    <a class="button is-info is-outlined" @click="userFormAction">
                        {{userActionTitle}}
                    </a>
                </div>

                <div class="navbar-item" v-bind:class="adminAddPaymentClass">
                    <a class="button is-info is-outlined" @click="addPaymentAction">
                        Adicionar pagamento
                    </a>
                </div>

                <div class="navbar-item">
                    <a class="button is-danger is-outlined" @click="logout">
                        Logout
                    </a>
                </div>
            </div>
        </div>
    </nav> 
</template>

<script>

export default {
    props: {
        userAction: Boolean,
        addPayment: Boolean,
        userId: Number
    },
    Data() {
        return {
            
        }
    },
    created () {
    },
    methods: {
        toggleBurgerMenu() {
            document
            .querySelector('#nav-links')
            .classList
            .toggle('is-active')
        },
        addPaymentAction() {
            if (this.userId != null) {
                this.$router.push({ name: 'AddPayment'});
            }
        },
        userFormAction() {
            if (this.userId == null) {
                this.$router.push({ name: 'AddUser'});
            } else {                
                this.$router.push({ name: 'EditUser', params: { userId: this.userId }} );
            }
        },
        goToHome() {
            if (this.$router.currentRoute.name != 'UserList') {
                this.$router.push({ name: 'UserList'});
            }            
        },
        logout() {
            this.$session.destroy()
            this.$router.push({ name: 'Login'} );
      }
    },
    computed: {
        adminAddPaymentClass: function() {
            return this.addPayment?
            ''
            :
            'is-hidden'
        },
        userActionClass: function() {
            return this.userAction?
            ''
            :
            'is-hidden'
        },
        userActionTitle: function() {
            return this.userId == null?
            'Adicionar usuário'
            :
            'Editar usuário'
        }
    }
}
</script>

<style>
#name {
  font-weight: bold;
}
</style>