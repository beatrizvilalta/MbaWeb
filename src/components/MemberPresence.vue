<template>        
   <div class="content">
        <table class="table is-borderless is-striped center mt-4">
            <thead>
                <tr>
                    <th>Data do ensaio</th>
                    <th>Tipo de presença</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="presence in presenceList" :key="presence.id">
                    <td class="is-vcentered">{{ presenceDateText(presence.rehearsalDate) }}</td>
                    <td class="is-vcentered">
                        <img :src="presenceTypeIcon(presence.type)" width="30" height="30"/>
                    </td>    
                </tr>
            </tbody>
        </table>            
    </div>   
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            userId: this.$localStorage.get('userid'),
            presenceList: []
        }
    },
    created () {
        if (this.userId) {
            this.fetchPresence()
        }        
    },
    methods: {
        fetchPresence() {
            axios.get('http://localhost:8080/api/presence/user/' + this.userId)
            .then((response) => {
                this.presenceList = this.order(response.data)
            })
            .catch(err => {
                if (err.response) {
                    console.log(err.response.status);
                }
            });
        },
        order(presenceList) {
            return presenceList.sort(function(a,b){
                return new Date(b.rehearsalDate) - new Date(a.rehearsalDate);
            });
        },
        presenceTypeIcon(type) {
            const presenceTypeMap = new Map()
            presenceTypeMap.set("OBSERVATION", 'https://cdn-icons-png.flaticon.com/512/1041/1041891.png');
            presenceTypeMap.set("PRESENT", 'https://cdn-icons-png.flaticon.com/512/190/190411.png');
            presenceTypeMap.set("ABSENT", 'https://cdn-icons-png.flaticon.com/512/190/190406.png');

            const resultIcon = presenceTypeMap.get(type)

            return resultIcon == null ? 'https://cdn-icons-png.flaticon.com/512/953/953738.png' : resultIcon
        },
        presenceDateText(dateString) {
            const rehearsalDate = new Date(dateString);
            return rehearsalDate.getDate() + "/" + (rehearsalDate.getUTCMonth() + 1) + "/" + rehearsalDate.getUTCFullYear()
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

<!-- <img src=""></img> -->