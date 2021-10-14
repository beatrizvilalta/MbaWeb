<template>        
    <div>
        <Navbar />
        <div class="notification is-white">
            <input class="input" v-model="search" type="search" placeholder="Digite o nome...">
            <p class="subtitle is-6">Resultado da busca: {{ search }}</p>

            <div class="container is-primary">
<div class="card">
  <div class="card-content">
    <div class="content">
      Lorem ipsum leo risus, porta ac consectetur ac, vestibulum at eros. Donec id elit non mi porta gravida at eget metus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras mattis consectetur purus sit amet fermentum.
    </div>
  </div>
</div>

<div class="card">
  <div class="card-content">
    <div class="content">
      Lorem ipsum leo risus, porta ac consectetur ac, vestibulum at eros. Donec id elit non mi porta gravida at eget metus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras mattis consectetur purus sit amet fermentum.
    </div>
  </div>
</div>

<div class="card">
  <div class="card-content">
    <div class="content">
      Lorem ipsum leo risus, porta ac consectetur ac, vestibulum at eros. Donec id elit non mi porta gravida at eget metus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras mattis consectetur purus sit amet fermentum.
    </div>
  </div>
</div>

<div class="card">
  <div class="card-content">
    <div class="content">
      Lorem ipsum leo risus, porta ac consectetur ac, vestibulum at eros. Donec id elit non mi porta gravida at eget metus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras mattis consectetur purus sit amet fermentum.
    </div>
  </div>
</div>

<div class="card">
  <div class="card-content">
    <div class="content">
      Lorem ipsum leo risus, porta ac consectetur ac, vestibulum at eros. Donec id elit non mi porta gravida at eget metus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras mattis consectetur purus sit amet fermentum.
    </div>
  </div>
</div>

            </div>
        </div> 
        
    </div>
</template>

<script>
import Navbar from './Navbar.vue'

export default {
  components: { 
      Navbar
    },
  data() {
    return {
        search: ''       
    }
  },
  watch: {
    search: function (value) {        
        if (value.trim() == '') {
            console.log("List all")
        } else {
            console.log("show " + value.trim());
        }
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
}
</style>


// <div class="control">
//                     Ano de competência 
//                     <select> <option> 2020 </option> <option> 2021 </option> </select>   
//                     </div>