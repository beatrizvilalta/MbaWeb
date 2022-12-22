<template>        
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
 import axios from 'axios'
 import ConfimationModal from './modal/ConfirmationModal.vue'
 
 export default {
    components: {
        ConfimationModal
    },
    created () {
        if (this.userId) {
            this.fetchPayments()
        }
    },
    data() {
        return {
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
        }
    }, 
    methods: { 
        fetchPayments() { 
            axios.get('http://localhost:8080/api/payment/user/' + this.userId)
            .then((response) => {
                this.paymentList = this.order(response.data)
            })
            .catch(err => {
                if (err.response) {
                    console.log("Falhou");
                    console.log(err.response.status);
                }
            });
        },
        order(paymentList) {
            return paymentList.sort(function(a,b){
                return new Date(b.date) - new Date(a.date);
            });
        },
        presenceDateText(dateString) {
            const rehearsalDate = new Date(dateString);
            return rehearsalDate.getDate() + "/" + (rehearsalDate.getUTCMonth() + 1) + "/" + rehearsalDate.getUTCFullYear()
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
            return (paymentDate.getUTCMonth() + 1) + "/" + (paymentDate.getUTCFullYear())
        }
    }
 }
 </script>
 
 <style>
 .container{
     display: grid;
     grid-template-columns: repeat(auto-fill, minmax(250px,1fr));
     grid-gap: 1.5em;
     margin-top: 1.5em;
 }
 </style>