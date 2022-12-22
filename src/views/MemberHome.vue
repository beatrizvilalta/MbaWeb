<template>
    <div>
        <Navbar :addPayment="isAdmin" />

        <MemberInfo />
         
         <hr>
         <div class="tabs is-large is-fullwidth">
            <ul>
                <li v-bind:class="financeTabClass"><a @click="financeTabDidPress">Financeiro</a></li>
                <li v-bind:class="frequencyTabClass"><a @click="frequencyTabDidPress">Frequência</a></li>
            </ul>
        </div>

        <MemberPresence v-bind:class="memberPresenceVisibility"/>
        <MemberFinance v-bind:class="memberFinanceVisibility" />
    </div>    
</template>

<script>
import Navbar from '../components/Navbar.vue'
import MemberInfo from '../components/MemberInfo.vue'
import MemberPresence from '../components/MemberPresence.vue'
import MemberFinance from '../components/MemberFinance.vue'

export default {
    components: { 
        Navbar,
        MemberInfo,
        MemberPresence,
        MemberFinance
    },
    created () {
        if (!this.$localStorage.get('userid')) { 
            this.$router.push({ name: 'Login'} ); 
        }
    },
    mounted () {        
        window.scrollTo(0,0);
    },    
    data() {
        return {
            isAdmin: false,
            financeTabClass: 'is-active',
            frequencyTabClass: '',
        }
    },
    computed: {
        memberPresenceVisibility: function() {
            return this.frequencyTabClass != ''?
            '' 
            :
            'is-hidden'
        },
        memberFinanceVisibility: function() {
            return this.financeTabClass != ''?
            '' 
            : 
            'is-hidden'
        }
    },
    methods: {
        financeTabDidPress() {
            this.financeTabClass = 'is-active'
            this.frequencyTabClass = ''
        },
        frequencyTabDidPress() {
            this.financeTabClass = ''
            this.frequencyTabClass = 'is-active'
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