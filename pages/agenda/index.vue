<template>
  <v-container fluid>
    <v-row>
      <v-col class="col-12">
        <v-card class="rounded-xl">
          <toolbarComponent>
            <template v-slot:title>
              Agenda
            </template>
            <template v-slot:buttons>
              <v-btn color="gd-primary-to-right" class="rounded-lg white--text font-weight-light"
                @click="modalAgenda = true">
                AGREGAR EVENTO&nbsp;&nbsp;<v-icon>mdi-calendar</v-icon>
              </v-btn>
            </template>
          </toolbarComponent>
          <v-card-title>
            <v-row>
              <v-col class="col-md-5">
                <v-select dense class="font-weight-light" v-model="search.type" solo label="Tipo"
                  :items="[{text:'Todos',value:null},{text:'Consulta',value:'consulta'},{text:'Evento',value:'evento'}]">
                </v-select>
              </v-col>
              <v-col class="col-md-3">
                <v-text-field type="date" hide-details solo dense v-model="search.fecha" label="Buscar por fecha"
                  class="font-weight-light">
                </v-text-field>
              </v-col>

              <v-col class="col-md-3">
                <v-btn block color="gd-primary-to-right" @click="getAgendas()"
                  class="white--text rounded-lg font-weight-light">
                  Buscar&nbsp;<v-icon>mdi-magnify</v-icon>
                </v-btn>
              </v-col>
              <v-col class="col-md-1">
                <v-btn block color="red" @click="search.fecha = null;getAgendas()"
                  class="white--text rounded-lg font-weight-light">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-col>

            </v-row>
          </v-card-title>
          <v-card-text>
            <v-card outlined>
              <v-card-text>
                <v-row>
                  <v-col class="d-flex justify-center">
                    <v-icon color="#4caf50">mdi-circle</v-icon>
                    &nbsp;&nbsp;
                    <span class="font-weight-black black--text">Evento</span>
                  </v-col>
                  <v-col class="d-flex justify-center">
                    <v-icon color="blue darken-1">mdi-circle</v-icon>
                    &nbsp;&nbsp;
                    <span class="font-weight-black black--text">Higiene</span>
                  </v-col>
                  <v-col class="d-flex justify-center">
                    <v-icon color="indigo darken-1">mdi-circle</v-icon>
                    &nbsp;&nbsp;
                    <span class="font-weight-black black--text">Consulta</span>
                  </v-col>
                  <v-col class="d-flex justify-center">
                    <v-icon color="orange darken-1">mdi-circle</v-icon>
                    &nbsp;&nbsp;
                    <span class="font-weight-black black--text">Otro</span>
                  </v-col>
                  <v-col class="d-flex justify-center">
                    <v-icon color="red darken-1">mdi-circle</v-icon>
                    &nbsp;&nbsp;
                    <span class="font-weight-black black--text">Indisponible</span>
                  </v-col>

                </v-row>
              </v-card-text>
            </v-card>
            <agendaCalendarComponent @prev="getAgendas($event)" @next="getAgendas($event)" v-model="agendas">
            </agendaCalendarComponent>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="modalAgenda">
      <v-card min-width="800px">
        <v-toolbar color="primary" class="elevation-0 white--text font-weight-thin">
          <v-toolbar-title>AGREGAR EVENTO</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="modalAgenda = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="pa-3">
          <v-form ref="form">
            <v-text-field solo class="rounded-lg" dense v-if="agenda.type!='indisponible'" :rules="rules.required"
              v-model="agenda.titulo" label="Nombre del evento"></v-text-field>
            <v-text-field solo class="rounded-lg" dense :rules="rules.required" type="date" v-model="agenda.fecha"
              label="Fecha"></v-text-field>
            <v-text-field solo class="rounded-lg" dense v-if="agenda.type!='indisponible'" :rules="rules.required"
              type="time" v-model="agenda.hora" label="Hora"></v-text-field>
            <v-textarea solo class="rounded-lg" dense v-if="agenda.type!='indisponible'" v-model="agenda.detalles"
              label="Detalle"></v-textarea>
            <v-select solo class="rounded-lg" dense
              :items="[{text:'Consulta',value:'consulta'},{text:'Evento',value:'evento'},{text:'Fecha indisponible',value:'indisponible'}]"
              v-model="agenda.type" label="Tipo de evento"></v-select>
            <div v-if="agenda.type == 'consulta'">
              <v-card outlined>
                <v-card-title class="font-weight-light">Detalles de la consulta</v-card-title>
                <v-card-text>
                  <v-select solo hide-details :items="['Higiene','Consulta','Medicacion','Otro']"
                    :rules="rules.required" v-model="agenda.consulta.tipo_consulta" label="Tipo de consulta" dense
                    class="rounded-lg">
                  </v-select>
                </v-card-text>
              </v-card>
            </div>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="gd-primary-to-right" class="white--text font-weight-light" @click="addAgenda()">AGREGAR A LA
            AGENDA</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="modalReschedule">
      <v-card min-width="800px">
        <v-toolbar color="primary" class="elevation-0 white--text font-weight-thin">
          <v-toolbar-title>AGREGAR SOCIO</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="modalAgenda = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="pa-3">
          <v-form ref="form">
            <v-text-field type="date" outlined v-model="agenda.date" label="Fecha"></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" depressed @click="addAgenda()">AGREGAR A LA AGENDA</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="modalReschedule">
      <v-card min-width="800px">
        <v-toolbar color="primary" class="elevation-0 white--text font-weight-thin">
          <v-toolbar-title>RE AGENDAR</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="modalAgenda = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="pa-3">
          <v-form ref="form">
            <v-text-field type="date" outlined v-model="agenda.date" label="Fecha"></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" depressed @click="reSchedule()">RE AGENDAR</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <modal-success :action="()=>{
      this.createAgendaModal = false
      }" v-model="createAgendaModal">
      <template v-slot:icon>
        mdi-check
      </template>
      <template v-slot:title>
        <p class="text-h6 mb-0">
          <strong>Agenda agregada correctamente!</strong>
        </p>
      </template>
    </modal-success>
    <v-dialog v-model="modalCalendar">
      <v-card width="500">
        <v-toolbar color="primary" class="elevation-0">
          <v-toolbar-title class="white--text font-weight-light">Buscar en la agenda</v-toolbar-title>
        </v-toolbar>
        <v-card-text class="pa-3">
          <v-text-field outlined type="date" v-model="search.date_gte"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn depressed color="primary" @click="getAgendas()">BUSCAR AGENDA</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import modalSuccess from '~/components/modalSuccess.vue'
  import toolbarComponent from '~/components/general/toolbarComponent.vue'
  import moment from 'moment'
  export default {
    components: {
      modalSuccess,
      toolbarComponent
    },
    data() {
      return {
        createAgendaModal: false,
        search: {
          consulta: {},
          type: null
        },
        modalAgenda: false,
        agendas: [],
        agenda: {
          consulta: {}
        },
        dataSuccess: 'Agenda agregada correctamente!',
        modalReschedule: false,
        modalCalendar: false,
        colorsCalendar: {
          'consulta': '#ffc107',
          'evento': '#4caf50'
        },
        rules: {
          required: [value => !!value || 'Este campo es requerido.'],
          min: value => value.length >= 3 || 'Este campo debe tener al menos 3 caracteres.',
          max: value => value.length <= 250 || 'Este campo debe tener como maximo 250 caracteres.'
        }
      }
    },
    created() {
      this.getAgendas()
    },
    methods: {
      cleanSearch() {
        this.getAgendas()
      },
      getAgendas(date) {
        if (date) {
          this.search.fecha_gte = moment(date).startOf('month').format('YYYY-MM-DD')
          this.search.fecha_lte = date
        } else {
          this.search.fecha_gte = moment().startOf('month').format('YYYY-MM-DD')
          this.search.fecha_lte = moment().endOf('month').format('YYYY-MM-DD')
        }
        //remove one day with moment
        if(this.search.fecha)
          this.search.fecha = moment(this.search.fecha).subtract(1, "days").format("YYYY-MM-DD")


        this.$axios.get('/agendas', {
          params: this.search
        }).then(data => {


          var colorsCalendar = (agenda) => {
            if (agenda.type == 'evento') {
              return '#4caf50'
            } else if (agenda.type == 'consulta') {
              switch (agenda.consulta.tipo_consulta) {
                case 'Higiene':
                  return 'blue darken-1';
                  break;
                case 'Consulta':
                  return 'indigo darken-1';
                  break;
                case 'Medicacion':
                  return 'indigo darken-1';
                  break;
                case 'Otro':
                  return 'orange darken-1';
              }
            } else {
              return 'red'
            }
          }


          this.agendas = data.data.map(agenda => {
            let date = (agenda.hora) ? agenda.fecha + " " + agenda.hora.split('.')[0] : agenda.fecha
            return {
              name: agenda.titulo ?? "Fecha no disponible",
              start: date,
              end: date,
              color: colorsCalendar(agenda),
              data: agenda,
              allDay: agenda.type == 'indisponible'
            }
          })
        })
      },
      addAgenda() {
        if (!this.$refs.form.validate()) return
        if (this.agenda.hora)
          this.agenda.hora = this.agenda.hora + ':00.00'
        this.$axios.post('/agendas', this.agenda).then(data => {
          this.getAgendas()
          this.modalAgenda = false
          this.createAgendaModal = true
        })

      },
      checkStatus(status) {
        switch (status) {
          case 'finished':
            return 'Finalizado'
          case 'postponed':
            return 'Post-puesto'
          case 'ausent':
            return 'Ausente'
          default:
            return 'Pendiente'
        }
      },
      updateStatus(agenda, status) {
        agenda.status = status
        this.$axios.put('/agendas/' + agenda.id, agenda).then(data => {
          this.getAgendas()
          this.modalAgenda = false
          this.createAgendaModal = true
        })
      },
      deleteAgenda(agenda) {
        this.$axios.delete('/agendas/' + agenda.id).then(data => {
          this.getAgendas()
        })

      },
      formatDate(date) {
        let newdate = date.split('-')
        return newdate[2] + '/' + newdate[1] + '/' + newdate[0]
      },
      reSchedule() {
        this.agenda.status = 'postponed'
        this.$axios.put('/agendas/' + this.agenda.id, this.agenda).then(data => {
          this.getAgendas()
          this.modalReschedule = false
        })

      }
    },
  }

</script>

<style>

</style>
