<template>        
    <div>
        <Navbar />
        <div class="notification is-white">
            <input class="input" v-model="search" type="search" placeholder="Digite o nome...">
            <div class="container">
                <div v-for="(user, index) in filterUsers " :key="index"> 
                     <UserCard :username="user" /> 
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
            "Beatriz Vilalta",
            "Gabriel Rosa",
            "Carina Monteiro",
            "Kiko Caminha",
            "Aovinho",
            "Juan Carlos",
            "Keila Missue",
            "Cayo Raphael",
            "Ana Beatriz Caldas de Oliveira Fernandes"
        ]
    }
  },
  computed: {
      filterUsers() {
          const searchRestult = this.search.toLowerCase().trim();

          if (!searchRestult) return this.users;

          return this.users.filter(c => c.toLowerCase().indexOf(searchRestult) > -1);
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