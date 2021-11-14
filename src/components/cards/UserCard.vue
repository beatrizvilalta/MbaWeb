<template>
    <div class="card" v-bind:class="cardBackground" @click="selectUser">
        <header class="card-header">
            <p class="card-header-title">
                {{ user.name }}
            </p>

            <div class="card-header-icon">
                <SituationTag :situation="user.situation" />
            </div>
        </header>

        <div class="card-content">
            <div class="content">
                <p class="has-text-left has-text-weight-semibold">{{ user.is_associated ? 'Sócio' : 'Colaborador' }}</p>
                <p class="has-text-left">Situação: {{ this.user.is_active ? 'Ativo' : 'Afastado' }}</p>
                <p class="has-text-left"> Ala: {{ user.instrument }} </p>

                <div class="card-footer">
                    <p class="has-text-left has-text-weight-light is-size-7 mt-2">Ultimo pagamento - 1 Jan 2017</p>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import SituationTag from '../SituationTag.vue'

export default {
  components: { SituationTag },
    props: {
        user: Object
    },
    data() {
        return {

        }
    },
    computed: {
        cardBackground: function() {
            return this.user.is_active ?
            'has-background-white'
            :
            'has-background-grey-lighter'
        }
    },
    methods: {
        selectUser() {
            this.$router.push({ name: 'UserDetail', params: { id: this.user.id }} );
        }
    }
}
</script>

<style>
.card-header-icon {
    cursor: auto;
}
</style>