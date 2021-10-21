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
            const situationClassMap = new Map();
            situationClassMap.set(1, 'is-primary');
            situationClassMap.set(2, 'is-info');
            situationClassMap.set(3, 'is-warning');
            situationClassMap.set(4, 'is-danger');

            return situationClassMap.get(this.situation)
        },
        situationText: function() {
            const situationTextsMap = new Map();
            situationTextsMap.set(1, 'Em dia');
            situationTextsMap.set(2, 'Isento');
            situationTextsMap.set(3, 'Acordo');
            situationTextsMap.set(4, 'Débito');

            const resultText = situationTextsMap.get(this.situation)

            return resultText == null ? 'Indefinido' : resultText
        }
    }
}
</script>