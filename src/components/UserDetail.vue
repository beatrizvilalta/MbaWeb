<template>
    <div>
        <Navbar />

        <div class="mt-4 ml-4 has-text-left">
            <p class="title is-size-5"> Gabriel Rosa do Nascimento   </p>                
            <p class="subtitle mb-2">Situação fiscal: <span class="has-text-success"> Em dia </span> </p>            
            <p >
                Colaborador
                <br>
                Membro ativo
                <br>
                Ala: caixa
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
                            <button class="button is-small is-outlined is-info m-1"> Editar </button>
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
import Navbar from './Navbar.vue'
import ConfimationModal from './modal/ConfirmationModal.vue'

export default {
    props: {
        userId: Number
    },
    components: { 
        Navbar,
        ConfimationModal
    },
    data() {
        return {
            is_admin: true,
            showDialog: false,
            selectedPayment: {},
            paymentList: [
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
        }
    },
    computed: {
        adminVisibility: function() {
            return this.is_admin ? 
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
        }
    },
    methods: {
        cancelDialog() {
            this.showDialog = false
            this.selectedPayment = {}
        },
        confirmDelete() {
            console.log("Deletou o ")
            console.log(this.selectedPayment)
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