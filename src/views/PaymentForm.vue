<template>
<div class="hero">
    <Navbar> </Navbar>
    <div class="hero-body p-5">
        <p class= "is-size-3"> {{ title }} </p>
        <div class="columns is-centered">
            <div class="box mt-5">
                <div class="column">
                    <form action="" method="post">
                        <div class="field is-horizontal columns pb-4">
                            <label class="has-text-weight-semibold flex-center mr-4" for="reference-date">Mês de referência: </label>
                            <date-picker v-model="referenceDate" type="month"></date-picker>
                        </div>

                        <div class="field is-horizontal columns pb-2">
                            <label class="has-text-weight-semibold flex-center mr-4" for="payment-value">Valor: </label>
                            <vue-numeric currency="R$" separator="." v-bind:precision="2" v-model="paymentValue" class="input"></vue-numeric>
                        </div>

                        <div class="field">
                            <textarea v-model="observation" name="observation" id="observation" rows="5" class="textarea is-medium" placeholder="Observações"></textarea>
                        </div>

                        <button type="submit" class="button is-success is-size-5">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import DatePicker from 'vue2-datepicker';
import Navbar from '../components/Navbar.vue'
import VueNumeric from 'vue-numeric'
import 'vue2-datepicker/index.css';

export default {
    components: {
        DatePicker,
        Navbar,
        VueNumeric
    },
    props: {
        paymentId: Number
    },
    mounted () {
        this.setupView()        
    },
    created () {
        
    },
    data() {
        return {
            title: "",
            referenceDate: new Date(),
            paymentValue: 0,
            observation: ""
        };
    },
    methods: {    
        setupView() {
            // this.$session.get("userid")
            if (this.$route.params.paymentId == null) {
                this.title = "Adicionar pagamento"
            } else {
                this.title = "Editar pagamento"
            }
        }    
    }
}
</script>

<style>
.flex-center {
    display: flex;
    align-items: center;
}
</style>