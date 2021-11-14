<template>
    <h1>This is {{title}}</h1>
</template>

<script>
export default {
    props: {
        paymentId: Number
    },
    created () {
        this.setupView()
    },
    data() {
        return {
            title: ""
        };
    },
    methods: {    
        setupView() {
            if (this.paymentId == null) {
                this.title = "Add payment for user " + this.$route.params.userId
            } else {
                this.title = "Edit payment for user " + this.$route.params.userId
            }
        }    
    }
}
</script>