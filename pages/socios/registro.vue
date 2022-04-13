<template>
  <v-container fluid>
    <formSociosComponent :handler="createSocio" v-model="socio">
      Nuevo socio
    </formSociosComponent>
    <modal-success :action="()=>{
      this.createSocioModal = false
      }" v-model="createSocioModal">
      <template v-slot:icon>
        mdi-check
        </template> 
        <template v-slot:title>
          <p class="text-h6 mb-0">
            <strong>Socio agregado correctamente!</strong>
          </p>
        </template>
    </modal-success>
  </v-container>
</template>

<script>
  import FormSociosComponent from '~/components/socios/formSociosComponent.vue'
  import moment from 'moment'
  export default {
    components: {
      FormSociosComponent
    },
    data() {
      return {
        socio: {
          suc:'CASA CENTRAL',
          socio:'SI',
          user:{},
          mascotas: [{}],
          afiliacion:moment().format('YYYY-MM-DD'),
        },
        createSocioModal: false
      }
    },
    methods: {
      createSocio() {
        if(!this.socio.user.email) {
          this.socio.user.email = `${this.socio.user.username}@gmail.com`
        }
        this.$axios.post('/users', this.socio.user).then(response => {
          this.socio.user = response.data
          this.$axios.post('/socios', this.socio).then(response => {
            this.createSocioModal = true
          this.socio = {
            user:{},
            mascotas: [{}]
          }
          })
        }).catch(error => {
          console.log(error);
        });
      },

    }
  }

</script>

