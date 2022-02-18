<template>
  <v-container fluid>
    <formSociosComponent v-if="showForm" :handler="editSocio" v-model="socio"></formSociosComponent>
    <modal-success :action="()=>{
      this.createSocioModal = false
      }" v-model="createSocioModal">
      <template v-slot:icon>
        mdi-check
      </template>
      <template v-slot:title>
        <p class="text-h6 mb-0">
          <strong>Socio editado correctamente!</strong>
        </p>
      </template>
    </modal-success>
  </v-container>
</template>

<script>
  import FormSociosComponent from '~/components/socios/formSociosComponent.vue'
  export default {
    components: {
      FormSociosComponent
    },
    data() {
      return {
        socio: {
          user: {},
          mascotas: [{}],
        },
        createSocioModal: false,
        showForm: true
      }
    },
    created() {
        this.getSocio();
    },
    methods: {
      getSocio() {
          this.$axios.get(`/socios/${this.$route.params.id_socio}`)
            .then(response => {
                this.socio = response.data
                this.showForm = false
                setTimeout(()=>{
                    this.showForm = true
                },500)
            })
      },
      editSocio() {
          this.$axios.put(`/socios/${this.socio.id}`, this.socio).then(response => {
            this.createSocioModal = true
          })
      },

    }
  }

</script>
