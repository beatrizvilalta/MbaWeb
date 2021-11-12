<template>
  <div class="modal" >
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Excluir pagamento</p>
      <button class="delete" aria-label="close" @click="cancelAction"></button>
    </header>
    <section class="modal-card-body">
      <p>Tem certeza que deseja deletar o pagamento? </p>
      <br>
      <p> <b> Data de referêncha: </b> {{ paymentModel.reference_date }} </p>
      <p> <b> Valor: </b> {{ paymentModel.value }} </p>
      <p>  <b> Observações </b> <br> {{ paymentModel.observation }} </p>
    </section>
    <footer class="modal-card-foot">
      <button class="button is-danger" @click="deleteAction">Deletar</button>
      <button class="button" @click="cancelAction">Cancelar</button>
    </footer>
  </div>
</div>
</template>

<script>
export default {
    props: {
      show: Boolean,
      deleteAction: Function,
      cancelAction: Function,
      paymentModel: Object
    },
    computed: {
        showDialog: function() {
            return this.show ? 'is-active' : null
        }
    }
}
</script>
