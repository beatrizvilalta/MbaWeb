<template>        
    <div>
        <Navbar />
        <div class="notification is-white">
            <div class="level">
                <div class="column">
                    <input class="input" v-model="search" type="search" placeholder="Digite o nome...">
                </div>

                <div class="is-one-quarter is-centered">
                    <div class="is-vcentered">
                        <Dropdown
                            :options="memberSituations"
                            v-on:selected="setNewSelectedOption"
                            :maxItem="10"
                            placeholder="Filtrar por situação">
                        </Dropdown>
                    </div>
                </div>
            </div>

            <div class="container">
                <div v-for="(user, index) in filterUsers " :key="index">
                     <UserCard :user="user" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import Navbar from '../components/Navbar.vue'
import UserCard from '../components/cards/UserCard.vue'
import Dropdown from 'vue-simple-search-dropdown'

export default {
  components: {
      Navbar,
      UserCard,
      Dropdown
    },
  created () {
      console.log("Created")
      this.fetchUsers()
  },
  watch: {
    '$route': 'fetchUsers'
  },
  data() {
    return {
        search: '',
        users: [],
        selectedSituations: [1, 2, 3, 4],
        memberSituations: [
            { id: 0, name: 'Todas'},
            { id: 1, name: 'Em dia'},
            { id: 2, name: 'Isento'},
            { id: 3, name: 'Acordo'},
            { id: 4, name: 'Débito'}
        ]
    }
  },
  computed: {
      filterUsers() {
          const searchResult = this.search.toLowerCase().trim();

          if (!searchResult) {
              return this.users.filter(c => this.selectedSituations.includes(c.situation));
          }

          return this.users.filter(c => c.name.toLowerCase().indexOf(searchResult) > -1 && this.selectedSituations.includes(c.situation));
      }
  },
  methods: {
    fetchUsers() {
        this.users = [
            {id: 0, name: 'Beatriz Vilalta Jimenez', situation: 1, is_active: true, is_associated: false, instrument: "Agbe" },
            {id: 1, name: 'Gabriel Rosa do Nascimento', situation: 4, is_active: true, is_associated: false, instrument: "Caixa" },
            {id: 2, name: 'Carina de Oliveira Monteiro ', situation: 2, is_active: true, is_associated: true, instrument: "Alfaia" },
            {id: 3, name: 'Francisco Roots', situation: 1, is_active: false, is_associated: false, instrument: "Gonguê" },
            {id: 4, name: 'Alvaro dos Santos', situation: 1, is_active: true, is_associated: true, instrument: "Caixa" },
            {id: 5, name: 'Pedro Henrique Emidio Tavares Serafim', situation: 4, is_active: true, is_associated: false, instrument: "Caixa" },
            {id: 6, name: 'Keila Missue Shimizu Cabral', situation: 3, is_active: true, is_associated: true, instrument: "Caixa" },
            {id: 7, name: 'Cayo Raphael da Rocha Lima', situation: 1, is_active: true, is_associated: false, instrument: "Gonguê" },
            {id: 8, name: 'Ana Beatriz Caldas de Oliveira Fernandes', situation: 1, is_active: true, is_associated: false, instrument: "Agbe" },
            {id: 9, name: 'Marco Tulio Costa Tenório Cavalcanti', situation: 2, is_active: true, is_associated: true, instrument: "Alfaia" },
            {id: 10, name: 'Daniel Moura Soares', situation: 2, is_active: true, is_associated: true, instrument: "Alfaia" },
            {id: 11, name: 'Harry Styles dos Santos', situation: 3, is_active: true, is_associated: true, instrument: "Alfaia" }
        ]
      },
    setNewSelectedOption(selectedSituation) {
        if (selectedSituation.id >= 1 && selectedSituation.id <= 4) {
            this.selectedSituations = [selectedSituation.id]
        } else {
            this.selectedSituations = [1, 2, 3, 4]
        }
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