<template>
    <span class="tag" v-bind:class="situationClass"> {{ situationText }} </span>
</template>

<script>
export default {
    props: {
        situation: Number
    },        
    computed: {
        situationClass: function() {
            if (this.situation == 1) return 'is-primary'
            if (this.situation == 2) return 'is-info'
            if (this.situation == 3) return 'is-warning'
            if (this.situation == 4) return 'is-danger'
            
            return ''
        },
        situationText: function() {
            if (this.situation == 1) return 'Em dia'
            if (this.situation == 2) return 'Isento'
            if (this.situation == 3) return 'Acordo'
            if (this.situation == 4) return 'Débito'
            
            return 'Indefinido'
        }
    }
}
</script>