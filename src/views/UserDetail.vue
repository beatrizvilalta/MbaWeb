<template>
    <div>
        <Navbar :addPayment="isAdmin" :userAction="isAdmin" :userId="user.id" />

        <div class="mt-4 ml-4 has-text-left">
            <p class="title is-size-5"> {{ user.name }}</p>
            <p class="subtitle mb-2">Situação fiscal: <span class= "has-text-weight-bold" v-bind:class="situationClass"> {{ situationText }} </span> </p>
            <p >
                {{ associatedText }}
                <br>
                {{ activeText }}
                <br>
                Ala: {{ user.instrument }}
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
                        <td class="is-vcentered">{{ payment.reference_date }}</td>
                        <td class="is-vcentered">{{ payment.value }}</td>
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
            user: {},
            isAdmin: true,
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
            situationClassMap.set(1, 'has-text-success');
            situationClassMap.set(2, 'has-text-info');
            situationClassMap.set(3, 'has-text-warning');
            situationClassMap.set(4, 'has-text-danger');

            return situationClassMap.get(this.user.situation)
        },
        situationText: function() {
            const situationTextsMap = new Map();
            situationTextsMap.set(1, 'Em dia');
            situationTextsMap.set(2, 'Isento');
            situationTextsMap.set(3, 'Acordo');
            situationTextsMap.set(4, 'Débito');

            const resultText = situationTextsMap.get(this.user.situation)

            return resultText == null ? 'Indefinido' : resultText
        },
        activeText: function() {
            return this.user.is_active ? 'Membro ativo' : 'Membro afastado'
        },
        associatedText: function() {
            return this.user.is_associated ? 'Sócio' : 'Colaborador'
        }
    },
    methods: {
        fetchUser() {
            if (this.$route.params.id == 3) {
                this.user = {id: 3, name: 'Bruno Santos Braga Cavalcanti', situation: 1, is_active: false, is_associated: false, instrument: "Gonguê" }
            } else if (this.$route.params.id == 1) {
                this.user = {id: 1, name: 'Gabriel Rosa do Nascimento', situation: 4, is_active: true, is_associated: false, instrument: "Caixa" }
            } else if (this.$route.params.id == 9) {
                this.user = {id: 9, name: 'Marco Tulio Costa Tenório Cavalcanti', situation: 2, is_active: true, is_associated: true, instrument: "Alfaia" }
            } else {
                this.user = {id: 0, name: 'Beatriz Vilalta Jimenez', situation: 3, is_active: true, is_associated: false, instrument: "Agbe" }
            }

            this.fetchPaymentsByUser()
        },
        fetchPaymentsByUser() {
            this.paymentList = [
                {id: 0, reference_date: 'Nov 2021', value: 'R$ 15,00', observation: '-' },
                {id: 1, reference_date: 'Out 2021', value: 'R$ 15,00', observation: '-' },
                {id: 2, reference_date: 'Set 2021', value: 'R$ 15,00', observation: '-' },
                {id: 3, reference_date: 'Ago 2021', value: 'R$ 15,00', observation: '-' },
                {id: 4, reference_date: 'Jul 2021', value: 'R$ 15,00', observation: '-' },
                {id: 5, reference_date: 'Jun 2021', value: 'R$ 15,00', observation: 'Pagou R$ 60,00 correspondente aos anteriores e foi compensado' },
                {id: 6, reference_date: 'Mai 2021', value: 'R$ 15,00', observation: '-' },
                {id: 7, reference_date: 'Abr 2021', value: 'R$ 15,00', observation: '-' },
                {id: 8, reference_date: 'Mar 2021', value: 'R$ 15,00', observation: '-' },
                {id: 9, reference_date: 'Fev 2021', value: 'R$ 15,00', observation: '-' },
                {id: 10, reference_date: 'Jan 2021', value: 'R$ 15,00', observation: '-' },
            ]
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