<template>
  <div>
    <v-card class="rounded-xl">
      <v-toolbar color="gd-primary-to-right" elevation="0">
        <v-toolbar-title class="white--text font-weight-light">Consultas</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn outlined class="white--text font-weight-light" @click="exportData()">
          Descargar&nbsp;<v-icon>mdi-download</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-title>
        <v-input>
          <v-text-field hide-details v-model="search.fecha" type="date" class="rounded-r-0" height="40" dense outlined
            label="Fecha"></v-text-field>
          <v-select hide-details v-model="search.referencias" :items="['Vacunas','Consulta']"
            class="rounded-l-0 rounded-r-0" height="40" dense outlined label="Buscar por referencia"></v-select>
          <v-btn @click="getAtenciones()" color="gd-primary-to-right" height="40" depressed
            class="white--text font-weight-light rounded-l-0">
            Buscar&nbsp;<v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-input>
      </v-card-title>
      <v-card-text>
        <v-data-table :headers="headers" hide-default-footer :items="items">
          <template v-slot:item.fecha="{ item }">
            <v-btn outlined small @click="showModalAtencion(item)">
              <v-icon>mdi-magnify</v-icon> &nbsp;{{formatDate(item.fecha)}}
            </v-btn>
          </template>
          <template v-slot:item.hora="{ item }">
            {{formatHour(item.hora)}}
          </template>
        </v-data-table>

      </v-card-text>
      <v-toolbar color="gd-primary-to-right" elevation="0">
        <v-toolbar-title class="white--text font-weight-light">Proximas consultas</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn outlined class="white--text font-weight-light" @click="exportDataProximas()">
          Descargar&nbsp;<v-icon>mdi-download</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-title>
        <v-row>
          <v-col class="col-12">
            <visitasCreateReferenciasComponent v-model="searchProximas.referencias"></visitasCreateReferenciasComponent>
          </v-col>
          <v-col class="col-12">
            <v-input hide-details>
              <v-text-field hide-details v-model="searchProximas.fecha_gte" type="date" class="rounded-r-0" height="40"
                dense outlined label="Fecha desde"></v-text-field>
              <v-text-field hide-details v-model="searchProximas.fecha_lte" type="date" class="rounded-l-0" height="40"
                dense outlined label="Fecha hasta"></v-text-field>
            </v-input>
          </v-col>
          <v-col class="col-12">
            <v-btn @click="getProximasAtenciones()" color="gd-primary-to-right" height="40" depressed
              class="white--text font-weight-light" block>
              Buscar&nbsp;<v-icon>mdi-magnify</v-icon>
            </v-btn>
          </v-col>
        </v-row>

      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-data-table :headers="headersProximas" hide-default-footer :items="itemsProximas">
          <template v-slot:item.fecha="{ item }">
            {{formatDate(item.fecha)}}
          </template>
          <template v-slot:item.socio.name="{ item }">
            {{item.socio.name}} {{item.socio.last_name}}
          </template>

          <template v-slot:item.hora="{ item }">
            {{formatHour(item.hora)}}
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <v-dialog v-model="openAtencionModal" width="80%" height="auto" persistent>
      <v-toolbar color="primary" class="elevation-0 white--text font-weight-thin">
        <v-toolbar-title>VER VISITA</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="openAtencionModal = false">
          <v-icon color="white">mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <visitas-data-component class="overflow-card" readonly v-model="atencion"></visitas-data-component>
    </v-dialog>

  </div>
</template>

<script>
  import {
    json2excel,
  } from 'js2excel';
  import moment from 'moment'
  export default {
    data() {
      return {
        headers: [{
          text: "Fecha",
          value: "fecha"
        }, {
          text: "Hora",
          value: "hora"
        }, {
          text: "EOG",
          value: "EOG"
        }, {
          text: "Nombre de la mascota",
          value: "mascota.nombre"
        }, {
          text: "Referencias",
          value: "referencias.nombre"
        }, {
          text: "Anamnesis",
          value: "anamnesis"
        }, {
          text: "Pronostico",
          value: "pronostico"
        }, {
          text: "Tratamiento",
          value: "tratamiento"
        }],
        items: [],
        search: {},
        atencion: {},
        headersProximas: [{
          text: "Fecha",
          value: "fecha"
        }, {
          text: "Hora",
          value: "hora"
        }, {
          text: "Nombre del cliente",
          value: "socio.name"
        }, {
          text: "Nombre de la mascota",
          value: "mascota.nombre"
        }, {
          text: "Motivo",
          value: "referencias.nombre"
        }],
        itemsProximas: [],
        searchProximas: {},
        openAtencionModal: false
      }
    },
    mounted() {
      this.getAtenciones()
      this.getProximasAtenciones()
      this.search.fecha = moment().format('YYYY-MM-DD')
      this.searchProximas.fecha_gte = moment().format('YYYY-MM-DD')
      this.searchProximas.fecha_lte = moment().add(7, 'days').format('YYYY-MM-DD')
    },
    methods: {
      getAtenciones() {
        this.$axios.get('/atencion', {
            params: this.search
          })
          .then(response => {
            this.items = response.data
          })
          .catch(error => {
            console.log(error)
          })

      },
      getProximasAtenciones() {
        this.$axios.get('/atencion', {
            params: this.searchProximas
          })
          .then(response => {
            this.itemsProximas = response.data
          })
          .catch(error => {
            console.log(error)
          })
      },
      formatDate(date) {
        let finalDate = date.split('-')
        return `${finalDate[2]}/${finalDate[1]}/${finalDate[0]}`
      },
      formatHour(hour) {
        let finalHour = hour.split(':')
        return `${finalHour[0]}:${finalHour[1]}`
      },
      showModalAtencion(value) {
        this.atencion = value
        this.openAtencionModal = true
      },
      exportData() {
        let data = this.items.map((item) => {
          return {
            Fecha: this.formatDate(item.fecha),
            Hora: this.formatHour(item.hora),
            EOG: item.EOG,
            Mascota: item.mascota.nombre,
            Referencias: item.referencias,
            Anamnesis: item.anamnesis,
            Pronostico: item.pronostico,
            Tratamiento: item.tratamiento
          }
        })
        try {
          json2excel({
            data,
            name: 'Consultas',
            formateDate: 'yyyy/mm/dd'
          });
        } catch (e) {
          console.error('export error');
        }

      },
      exportDataProximas() {
        let data = this.itemsProximas.map((item) => {
          return {
            Fecha: this.formatDate(item.fecha),
            Hora: this.formatHour(item.hora),
            Cliente: `${item.socio.name} ${item.socio.last_name}`,
            Mascota: item.mascota.nombre,
            Motivo: item.referencias?.nombre,
          }
        })
        try {
          json2excel({
            data,
            name: 'Consultas',
            formateDate: 'yyyy/mm/dd'
          });
        } catch (e) {
          console.error('export error');
        }

      }
    }
  }

</script>

<style>

</style>
