<template>
    <div>
        <Navbar :addPayment="isAdmin" :userId="user.id" />

        <div class="mt-4 ml-4 has-text-left">
            <p class="title is-size-5"> {{ user.name }}</p>
            <p class="subtitle mb-2">Situação fiscal: <span class= "has-text-weight-bold" v-bind:class="situationClass"> {{ situationText }} </span> </p>
            <p >
                {{ associatedText }}
                <br>
                {{ activeText }}
                <br>
                Ala: {{ instrumentText }}
            </p>
        </div>
         
         <hr>
        <div class="content">
            <table class="table is-borderless is-striped center mt-4">
                <thead>
                    <tr>
                        <th>Data referência</th>
                        <th>valor</th>
                        <th>observações</th>
                        <th v-bind:class="adminVisibility">Ações</th>
                    </tr>
                </thead>

                <tbody>
                     <tr v-for="payment in paymentList" :key="payment.id">
                        <td class="is-vcentered">{{ paymentDateText(payment.date) }}</td>
                        <td class="is-vcentered">{{ "R$ " + (payment.paymentValue).toFixed(2) }}</td>
                        <td class="is-vcentered width-limit"> {{ payment.observation }} </td>
                        <td class="is-vcentered" v-bind:class="adminVisibility">
                            <button class="button is-small is-outlined is-info m-1" @click="editDidPress(payment)"> Editar </button>
                            <button class="button is-small is-outlined is-danger m-1" @click="deleteDidPress(payment)"> Deletar </button>
                        </td>
                    </tr>
                </tbody>
            </table>            
        </div>      

        <ConfimationModal :show="showDialog"                
                title="Delete a task?"
                :cancelAction="cancelDialog"
                :deleteAction="confirmDelete"
                :paymentModel="this.selectedPayment"
                description="Are you sure you want to delete this task?"
                v-bind:class="displayDialog"/>   
    </div>    
</template>

<script>
import Navbar from '../components/Navbar.vue'
import ConfimationModal from '../components/modal/ConfirmationModal.vue'
import axios from 'axios'

export default {
    components: { 
        Navbar,
        ConfimationModal
    },
    mounted () {
        window.scrollTo(0,0);
    },
    created () {
        this.fetchUser()
    },
    data() {
        return {
            user: {
                name: "Carregando"
            },
            userId: this.$localStorage.get('userid'),
            isAdmin: false,
            showDialog: false,
            selectedPayment: {},
            paymentList: []
        }
    },
    computed: {
        adminVisibility: function() {
            return this.isAdmin ?
            '' 
            : 
            'is-hidden'
        },
        hideDialog: function() {
            return ''
        },
        displayDialog: function() {
            return this.showDialog ?
            'is-active' 
            : 
            ''
        },
        situationClass: function() {
            const situationClassMap = new Map();
            situationClassMap.set("UP_TO_DATE", 'has-text-success');
            situationClassMap.set("EXEMPT", 'has-text-info');
            situationClassMap.set("AGREEMENT", 'has-text-warning');
            situationClassMap.set("DEBIT", 'has-text-danger');

            return situationClassMap.get(this.user.situation)
        },
        situationText: function() {
            const situationTextsMap = new Map();
            situationTextsMap.set("UP_TO_DATE", 'Em dia');
            situationTextsMap.set("EXEMPT", 'Cota');
            situationTextsMap.set("AGREEMENT", 'Acordo');
            situationTextsMap.set("DEBIT", 'Débito');

            const resultText = situationTextsMap.get(this.user.situation)

            return resultText == null ? 'Indefinido' : resultText
        },
        instrumentText: function() {
            const instrumentTextMap = new Map()
            instrumentTextMap.set("AGBE", 'Agbê');
            instrumentTextMap.set("AGOGO", 'Agogo');
            instrumentTextMap.set("GONGUE", 'Gonguê');
            instrumentTextMap.set("CAIXA", 'Caixa');
            instrumentTextMap.set("ALFAIA", 'Alfaia');
            instrumentTextMap.set("CANTO", 'Canto');

            const resultText = instrumentTextMap.get(this.user.instrument)

            return resultText == null ? 'Indefinido' : resultText

        },
        activeText: function() {
            if (this.user.is_active == null) { return 'Carregando' }
            return this.user.is_active ? 'Membro ativo' : 'Membro afastado'
        },
        associatedText: function() {
            if (this.user.is_associated == null) { return 'Carregando' }
            return this.user.is_associated ? 'Sócio' : 'Colaborador'
        }
    },
    methods: {
        fetchUser() {
            axios.get('http://localhost:8080/api/user/' + this.userId)
            .then((response) => {
                if (response.status >= 200 && response.status <= 299) {
                    console.log("SUCESSO")
                    console.log(response)
                    this.user = {
                        id: response.data.id, 
                        name: response.data.name, 
                        situation: response.data.situation, 
                        is_active: response.data.active, 
                        is_associated: response.data.associated, 
                        instrument: response.data.instrument
                    }
                }
            })
            .catch(err => {
                if (err.response) {
                    console.log("Falhou");
                    console.log(err.response.status);
                }
            });
            this.fetchPaymentsByUser()
        },
        fetchPaymentsByUser() {
            axios.get('http://localhost:8080/api/payment/user/' + this.userId)
            .then((response) => {
                if (response.status >= 200 && response.status <= 299) {
                    console.log("SUCESSO")
                    console.log(response)
                    console.log("PAGAMENTOS ANTES")
                    console.log(this.paymentList)
                    this.paymentList = response.data                    
                    console.log("PAGAMENTOS DEPOIS")                    
                    console.log(this.paymentList)

                    console.log("PEGANDO DATA PRA CONVERTER")
                    const payment = this.paymentList[0]
                    var date3 = new Date(payment.date);
                    console.log(date3.getUTCMonth() + 1)
                    console.log(date3.getFullYear())
                    
                }
            })
            .catch(err => {
                if (err.response) {
                    console.log("Falhou");
                    console.log(err.response.status);
                }
            });

            // this.paymentList = [
            //     {id: 0, reference_date: 'Nov 2021', value: 'R$ 15,00', observation: '-' },
            //     {id: 1, reference_date: 'Out 2021', value: 'R$ 15,00', observation: '-' },
            //     {id: 2, reference_date: 'Set 2021', value: 'R$ 15,00', observation: '-' },
            //     {id: 3, reference_date: 'Ago 2021', value: 'R$ 15,00', observation: '-' },
            //     {id: 4, reference_date: 'Jul 2021', value: 'R$ 15,00', observation: '-' },
            //     {id: 5, reference_date: 'Jun 2021', value: 'R$ 15,00', observation: 'aos anteriores e foi compensado' },
            //     {id: 6, reference_date: 'Mai 2021', value: 'R$ 15,00', observation: '-' },
            //     {id: 7, reference_date: 'Abr 2021', value: 'R$ 15,00', observation: '-' },
            //     {id: 8, reference_date: 'Mar 2021', value: 'R$ 15,00', observation: '-' },
            //     {id: 9, reference_date: 'Fev 2021', value: 'R$ 15,00', observation: '-' },
            //     {id: 10, reference_date: 'Jan 2021', value: 'R$ 15,00', observation: '-' },
            // ]
        },
        cancelDialog() {
            this.showDialog = false
            this.selectedPayment = {}
        },
        confirmDelete() {
            console.log("Deletou o ")
            console.log(this.selectedPayment)
        },
        editDidPress(payment) {
            this.$router.push({ name: 'EditPayment', params: { paymentId: payment.id }});
        },
        deleteDidPress(payment) {
            this.selectedPayment = payment
            this.showDialog = true
        },
        paymentDateText(dateString) {
            const paymentDate = new Date(dateString);
            return (paymentDate.getUTCMonth() + 1) + "/" + (paymentDate.getFullYear())
        }
    }
}
</script>

<style>
.table.is-borderless td, .table.is-borderless th {
 border: 0;
}
.center {
    margin-left: auto;
    margin-right: auto;
}
.ml-4 {
    margin: 0rem;
    padding: 1rem;
}
hr {
    margin: 0rem;
}
.width-limit {
    word-wrap: break-word;
    max-width: 100px;
}
</style>