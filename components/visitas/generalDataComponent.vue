<template>
  <div>
    <v-card class="rounded-xl">
      <v-toolbar color="gd-primary-to-right" elevation="0" class="white--text">
        <v-toolbar-title class="font-weight-light">Nueva atencion</v-toolbar-title>
      </v-toolbar>
      <v-card-text class="pa-4 rounded-lg">
        <v-row>
          <v-col class="col-md-4 col-12">
            <v-row>
              <v-col class="col-md-12 col-12">
                <v-text-field label="NOMBRE" readonly outlined dense filled v-model="value.socio.name"
                  class="rounded-lg white--text"> </v-text-field>
                <v-text-field label="NRO CLIENTE" readonly outlined filled dense v-model="value.socio.id"
                  class="rounded-lg white--text"> </v-text-field>
                <v-text-field label="APELLIDO" readonly outlined dense filled v-model="value.socio.last_name"
                  class="rounded-lg white--text"> </v-text-field>
                <v-text-field label="DIRECCION" readonly outlined dense filled v-model="value.socio.address"
                  class="rounded-lg white--text"> </v-text-field>
                <v-text-field label="TELEFONO" readonly hide-details filled v-model="value.socio.phone" outlined dense
                  class="rounded-lg white--text"> </v-text-field>
              </v-col>
              <v-col class="col-12 d-flex justify-space-between">
                <v-row>
                  <v-col class="col-6">
                    <v-btn block class="white--text" color="gd-primary-to-right font-weight-light rounded-lg" @click="()=>{
                      listSociosModal = true
                      }">BUSCAR</v-btn>
                  </v-col>
                  <v-col class="col-6">
                    <v-btn block class="white--text" color="gd-primary-to-right font-weight-light rounded-lg" @click="()=>{
                      createSocioModal = true;
                      }">
                      <v-icon>mdi-plus</v-icon> cliente
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="col-md-4 col-12">
            <v-card outlined class="rounded-xl">
              <v-data-table show-select single-select v-model="selectedMascota" :items="value.socio.mascotas"
                hide-default-footer :headers="headersMascotas">
              </v-data-table>
              <v-card-text>
                <v-textarea hide-details class="mt-3" label="Observaciones" outlined
                  v-model="value.mascota.observaciones" readonly></v-textarea>
              </v-card-text>
              <v-card-text>
                <v-text-field class="mt-3" label="Ultima cuota paga" outlined v-model="value.socio.payment_date"
                  readonly></v-text-field>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col class="col-md-4 col-12">
            <v-text-field label="RAZA" readonly v-model="value.mascota.raza" outlined dense
              class="rounded-lg white--text"> </v-text-field>
            <v-text-field label="COLOR" readonly outlined v-model="value.mascota.color" dense
              class="rounded-lg white--text"> </v-text-field>
            <v-select :items="[{
                      text:'Macho',
                      value: 'F'
                    },{
                      text:'Hembra',
                      value: 'M'
                    },{
                      text:'Otro',
                      value: 'NN'
                    }]" label="SEXO" outlined dense v-model="value.mascota.sexo" readonly
              class="rounded-lg white--text">
            </v-select>
            <v-text-field label="EDAD" readonly outlined dense v-model="value.mascota.edad"
              class="rounded-lg white--text"> </v-text-field>
            <v-text-field type="date" label="DECESO" readonly outlined dense v-model="value.mascota.deceso"
              class="rounded-lg white--text"> </v-text-field>
            <v-text-field type="text" label="SOCIO" readonly outlined dense :value="setSocioName(value.mascota)"
              class="rounded-lg white--text"> </v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-dialog v-model="createSocioModal" width="80%" height="auto">
      <v-card>
        <v-toolbar class="elevation-0" color="primary">
          <v-toolbar-title class="white--text font-weight-thin">Nuevo cliente</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click.native="createSocioModal = false">
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="pa-4 overflow-card">
          <sociosFormComponent :handler="createSocio" v-model="socio"></sociosFormComponent>
        </v-card-text>
        <v-divider></v-divider>
      </v-card>
    </v-dialog>
    <v-dialog v-model="listSociosModal">
      <SociosListSociosComponent v-model="sociosList" @prevPage="getSocios('prev')"
        @nextPage="getSocios('next')">
        <template v-slot:button="{ item }">
          <v-btn outlined @click="($e)=>{
            $emit('input', {...value,socio:item});
            listSociosModal = false;
        }" color="primary">
            AGREGAR
          </v-btn>
        </template>
        <template v-slot:extraFields>
          <SociosFindSociosComponent v-model="searchSocios.id"></SociosFindSociosComponent>
        </template>
      </SociosListSociosComponent>
    </v-dialog>

  </div>
</template>

<script>
  import moment from 'moment';
  export default {
    props: {
      value: {
        default: {
          files: [],
          socio: {
            mascotas: []
          },
          mascota: {},
          productos: [],
          proximas: []
        }
      }
    },
    data() {
      return {
        createSocioModal: false,
        listSociosModal: false,
        searchSocios: {},
        sociosList: [],
        socio: {
          suc: 'CASA CENTRAL',
          socio: 'SI',
          tipo: 'Cliente final',
          user: {},
          mascotas: [{}],
          afiliacion: moment().format('YYYY-MM-DD'),
        },
        headersMascotas: [{
          text: 'ID Paciente',
          value: 'id',
        }, {
          text: "Paciente",
          value: "nombre"
        }],
        selectedMascota: [],
        pageItems:0,

      }
    },
    created() {
      this.getSocios()
    },
    methods: {
      getSocios(page = null) {
          if (page =='prev' && this.pageItems - 10 >= 0) {
            this.pageItems -= 10
          } else if (page == 'next') {
            this.pageItems +=10
          }
        if(this.searchSocios.id){
          this.pageItems = 0
        }

        this.$axios.get('/socios', {
            params: {...this.searchSocios,_start:this.pageItems,_limit:this.pageItems+10}
          })
          .then(response => {
            this.sociosList = response.data
          })
          .catch(error => {
            console.log(error)
          })
      },
      async createSocio() {
        if (!this.socio.user.username) {
          this.socio.user.username = Math.floor(Math.random() * 90000) + 10000;
        }
        if (!this.socio.user.email) {
          this.socio.user.email = `${this.socio.user.username}@gmail.com`
        }
        if (!this.socio.user.password) {
          this.socio.user.password = this.socio.user.username
        }
        const user = (await this.$axios.post('users/', this.socio.user)).data.id
        this.socio.user = user
        await this.$axios.post('/socios', this.socio).then(response => {
          this.$emit('input', {
            ...this.value,
            socio: response.data
          })
          this.socio = {
            user: {},
            mascotas: [{}]
          }

          this.$forceUpdate()
          this.createSocioModal = false;
        }).catch(error => {
          console.log(error);
        });
      },
      setSocioName(mascota) {
        if (!mascota.socio) return
        return mascota.socio + ' es socio'
      },

    },
    watch: {
      selectedMascota(val) {
        if (val.length == 0) {
          this.$emit('input', {
            ...this.value,
            mascota: {}
          })
          this.consultaItems = []
        } else {
          let edad = moment().diff(this.value.mascota.fecha_nac, 'years')
          this.$emit('input', {
            ...this.value,
            mascota: val[0],
            edad: edad
          })
          this.$emit('mascota', val)
          this.$emit('getAtencionMascota', val[0])
        }
      },

    },
    searchSocios: {
      handler() {
        this.getSocios()
      },
      deep: true

    }

  }

</script>
