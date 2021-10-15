<template>        
    <div>
        <Navbar />
        <div class="notification is-white">
            <input class="input" v-model="search" type="search" placeholder="Digite o nome...">
            <div class="container">
                <div v-for="(user, index) in filterUsers " :key="index"> 
                     <UserCard :user="user" /> 
                </div>
            </div>
        </div> 
        
    </div>
</template>

<script>

import Navbar from './Navbar.vue'
import UserCard from './cards/UserCard.vue'

export default {
  components: { 
      Navbar,
      UserCard
    },
  data() {
    return {
        search: '',
        users: [
            {id: 0, name: 'Beatriz Vilalta Jimenez', situation: 3, is_active: true, is_associated: false, instrument: "Agbe" },
            {id: 1, name: 'Gabriel Rosa do Nascimento', situation: 4, is_active: true, is_associated: false, instrument: "Caixa" },
            {id: 2, name: 'Carina de Oliveira Monteiro ', situation: 2, is_active: true, is_associated: true, instrument: "Alfaia" },            
            {id: 3, name: 'Bruno Santos Braga Cavalcanti', situation: 1, is_active: false, is_associated: false, instrument: "Gonguê" },
            {id: 4, name: 'Alvaro dos Santos', situation: 1, is_active: true, is_associated: true, instrument: "Caixa" },
            {id: 5, name: 'Juan Carlos Vilalta Jimenez', situation: 22, is_active: true, is_associated: false, instrument: "Caixa" },
            {id: 6, name: 'Keila Missue Shimizu Cabral', situation: 3, is_active: true, is_associated: true, instrument: "Caixa" },
            {id: 7, name: 'Cayo Raphael da Rocha Lima', situation: 1, is_active: true, is_associated: false, instrument: "Gonguê" },
            {id: 8, name: 'Ana Beatriz Caldas de Oliveira Fernandes', situation: 1, is_active: true, is_associated: false, instrument: "Agbe" },
            {id: 9, name: 'Marco Tulio Costa Tenório Cavalcanti', situation: 2, is_active: true, is_associated: true, instrument: "Alfaia" },
            {id: 10, name: 'Daniel Moura Soares', situation: 23, is_active: true, is_associated: true, instrument: "Alfaia" }
        ]
    }
  },
  computed: {
      filterUsers() {
          const searchRestult = this.search.toLowerCase().trim();

          if (!searchRestult) return this.users;

          return this.users.filter(c => c.name.toLowerCase().indexOf(searchRestult) > -1);
      }
  },
  methods: {

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


// <div class="control">
//                     Ano de competência 
//                     <select> <option> 2020 </option> <option> 2021 </option> </select>   
//                     </div>