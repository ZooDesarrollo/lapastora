<template>
  <v-container fluid>
    <v-row>
      <v-col class="col-12 col-md-12">
        <v-card class="rounded-xl">
          <visitasGeneralDataComponent v-model="atencion" @mascota="mascota = $event"
            @getAtencionMascota="getAtencionMascota($event)"></visitasGeneralDataComponent>
        </v-card>
      </v-col>
      <v-col class="col-12">
        <visitasMascotaComponent 
        @prevPage="getAtencionMascota($event,'prev')"
        @nextPage="getAtencionMascota($event,'next')"
        :items="consultaItems" 
        @getAtencionMascota="getAtencionMascota($event)" 
        v-model="atencion"></visitasMascotaComponent>
      </v-col>
      <v-col class="col-12">
        <visitasAllListComponent></visitasAllListComponent>
      </v-col>
    </v-row>





  </v-container>
</template>

<script>
  import moment from 'moment'
  import VisitasDataComponent from '~/components/visitas/visitasDataComponent.vue'
  export default {
    components: {
      VisitasDataComponent
    },
    data() {
      return {
        atencion: {
          files: [],
          socio: {
            mascotas: []
          },
          mascota: {},
          productos: [],
          proximas: []
        },
        pageItems:0,
        consultaItems: [],
      }
    },
    created() {},
    methods: {



      //add to agenda 
      getAtencionMascota(mascota, page) {
        if (page =='prev' && this.pageItems - 10 >= 0) {
          this.pageItems -= 10
        } else if (page == 'next') {
          this.pageItems +=10
        }
        this.$axios.get(`/atencion?mascota=${mascota.id}`,{
          params:{
            mascota:mascota.id,
            _start:this.pageItems,
            _limit:this.pageItems+10
          }
        })
          .then(response => {
            this.consultaItems = response.data
          })
      },

    },
    watch: {
    }
  }

</script>

<style>

</style>
