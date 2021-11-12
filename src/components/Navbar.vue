<template>
    <nav class="navbar has-shadow is-white" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item" href="#">
                <h2 id="name"> Finanças </h2>
            </a>

            <a class="navbar-burger"  @click="toggleBurgerMenu">
            <span></span>
            <span></span>
            <span></span>
            </a>
        </div>

        <div class="navbar-menu" id="nav-links">
            <div class="navbar-start">
                <a class="navbar-item">
                    Histórico de pagamentos
                </a> 
            </div>

            <div class="navbar-end">
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
    Data() {
        return {
            
        }
    },
    methods: {
        toggleBurgerMenu() {
            document
            .querySelector('#nav-links')
            .classList
            .toggle('is-active')
        },
        logout() {
            this.$router.push({ name: 'Login'} );
        }
  }
}
</script>

<style>
#name {
  font-weight: bold;
}
</style>