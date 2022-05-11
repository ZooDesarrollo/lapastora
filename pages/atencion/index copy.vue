<template>
  <v-container fluid>
    <v-row>
      <v-col class="col-12 col-md-12">
        <v-card min-width="100%" class="elevation-0 mr-2 pa-2" :key="index" outlined>
          <v-card-title class="pa-0">
            <v-text-field label="DOCUMENTO" :value="atencion.socio.username" readonly outlined dense
              class="rounded-lg white--text">
            </v-text-field>
          </v-card-title>
          <v-card-text class="pa-4 rounded-lg">
            <v-btn color="green" block class="mb-5" depressed @click="openModalListSocios = true">YA ES SOCIO</v-btn>
            <v-btn color="red darken-1" block class="mb-5 white--text font-weight-light"
              @click="createSocioModal = true" depressed>NUEVO USUARIO</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="col-12 col-md-3">
        <v-card min-width="100%" class="elevation-0 mr-2 pa-2" :key="index" outlined>
          <v-card-title class="pa-0">
            <v-text-field label="CONSULTA"  readonly outlined dense class="rounded-lg white--text">
            </v-text-field>
          </v-card-title>
          <v-card-text class="pa-4 rounded-lg">
            <v-input>
              <v-text-field label="Patologia" class="rounded-r-0" v-model="patologia" hide-details
                outlined dense></v-text-field>
              <v-btn class="rounded-l-0 elevation-0" color="primary" height="38" @click="addPatologia()" :disabled="patologia == null">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-input>
            <v-input v-for="(patologia,index) in atencion.patologias" :key="index">
              <v-text-field outlined dense hide-details readonly 
                :value="patologia.nombre" class="white--text font-weight-light rounded-r-0" height="38" depressed></v-text-field>
              <v-btn class="rounded-l-0 elevation-0" color="primary" height="38" @click="deletePatologia(index)" depressed>
                <v-icon>mdi-minus</v-icon>
              </v-btn>
            </v-input>
          </v-card-text>
        </v-card>

      </v-col>
      <v-col class="col-12 col-md-3">
        <v-card min-width="100%" class="elevation-0 mr-2 pa-2" :key="index" outlined>
          <v-card-title class="pa-0">
            <v-text-field label="APUNTES" readonly outlined dense class="rounded-lg">
            </v-text-field>
          </v-card-title>
          <v-textarea outlined dense class="rounded-lg" v-model="atencion.apuntes">
          </v-textarea>
        </v-card>

      </v-col>
      <v-col class="col-12 col-md-3">
        <div>
          <v-btn color="blue darken--5" block class="mb-5 white--text font-weight-light" depressed
            @click="createAtencion()">HACER RESERVA</v-btn>
          <v-btn color="red darken-1" block class="mb-5 white--text font-weight-light" depressed>
            ELIMINAR CONSULTA
          </v-btn>
        </div>
        <div>
          <v-btn color="success darken-5" block class="mb-5 white--text font-weight-light" depressed>EN ESPERA</v-btn>
          <v-btn color="blue darken-4" block class="mb-5 white--text font-weight-light" depressed>ATENCION</v-btn>
          <v-btn color="red" block class="mb-5 white--text font-weight-light" depressed>PAGAR</v-btn>
        </div>

      </v-col>
    </v-row>
    <v-dialog v-model="createSocioModal" width="80%" height="auto">
      <v-card class="p-relative">
        <v-toolbar absolute class="elevation-0" color="primary">
          <v-toolbar-title class="white--text font-weight-thin">Nuevo cliente</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click.native="createSocioModal = false">
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="pa-4">
          <formSociosComponent v-model="socio"></formSociosComponent>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success darken-5" class="mb-5 white--text font-weight-light" depressed @click="createSocio()">
            AGREGAR SOCIO</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="openModalListSocios">
      <listSociosComponent @input="($e)=>{
            this.atencion.socio = $e;
            openModalListSocios = false;
        }">
      </listSociosComponent>
    </v-dialog>
  </v-container>
</template>

<script>
  import FormSociosComponent from '~/components/socios/formSociosComponent.vue'
  import listSociosComponent from '~/components/socios/listSociosComponent.vue'
  export default {
    components: {
      FormSociosComponent,
      listSociosComponent
    },
    data() {
      return {
        atencion: {
        socio: {
          mascota: [{}]
        },
          patologias: []
        },
        openModalListSocios: false,
        createSocioModal: false,
        patologiasList: [
          'Patologia 1',
          'Patologia 2',
          'Patologia 3',
        ],
        patologia: null
      }
    },
    methods: {
      createSocio() {
        this.$axios.post('/users', this.socio).then(response => {
          this.createSocioModal = false;
        }).catch(error => {
          console.log(error);
        });
      },
      createAtencion() {
        this.$axios.post('/atencion', this.atencion).then(response => {}).catch(error => {
          console.log(error);
        });
      },
      deletePatologia(index) {
        this.$delete(this.atencion.patologias, index);
      },
      addPatologia() {
        this.atencion.patologias.push({
          nombre: this.patologia
        });
      }
    },
  }

</script>

<style>

</style>
