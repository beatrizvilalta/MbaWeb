<template>
    <nav class="navbar has-shadow is-white" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item" @click="goToUserFinance">
                <h2 id="name"> Finanças </h2>
            </a>

            <a class="navbar-item" @click="goToUserPresenceList">
                <h2 id="name"> Presenças </h2>
            </a>

            <a class="navbar-burger" @click="toggleBurgerMenu">
            <span></span>
            <span></span>
            <span></span>
            </a>
        </div>

        <div class="navbar-menu" id="nav-links">
            <div class="navbar-end">
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
        addPayment: Boolean
    },
    Data() {
        return {
            userId: this.$localStorage.get('userid')
        }
    },
    created () {},
    methods: {
        toggleBurgerMenu() {
            document
            .querySelector('#nav-links')
            .classList
            .toggle('is-active')
        },
        goToUserFinance() {
            if (this.userId != null) {
                this.$router.push({ name: 'userDetail'});
            } else {
                this.logout()
            }
        },
        goToUserPresenceList() {
            if (this.userId != null) {
                this.$router.push({ name: 'presenceList'});
            } else {
                this.logout()
            }
        },
        addPaymentAction() {
            if (this.userId != null) {
                this.$router.push({ name: 'AddPayment'});
            } else {
                this.logout()
            }
        },
        logout() {
            this.$localStorage.remove('userid')
            this.$router.push({ name: 'Login'} );
      }
    },
    computed: {
        adminAddPaymentClass: function() {
            return this.addPayment?
            ''
            :
            'is-hidden'
        }
    }
}
</script>

<style>
#name {
  font-weight: bold;
}
</style>