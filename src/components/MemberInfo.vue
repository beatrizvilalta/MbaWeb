<template>
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
</template>

<script>
import axios from 'axios'

export default {
    created () {
        if (this.userId) {
            this.fetchData()
        }
    },
    mounted () {        
        window.scrollTo(0,0);
    },
    data() {
        return {
            user: {
                name: "Carregando"                
            },
            userId: this.$localStorage.get('userid')
        }
    },
    computed: {
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
        fetchData() {
            axios.get('http://localhost:8080/api/user/' + this.userId)
            .then((response) => {
                this.setupUser(response)
            })
            .catch(err => {
                if (err.response) {
                    console.log("Falhou");
                    console.log(err.response.status);
                }
            });     
        },
        setupUser(response) {
            this.user = {        
                id: response.data.id,         
                name: response.data.name,         
                situation: response.data.situation,         
                is_active: response.data.active,                         
                is_associated: response.data.associated,                         
                instrument: response.data.instrument                    
            }
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