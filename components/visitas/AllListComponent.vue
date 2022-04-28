<template>
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
        <v-text-field hide-details v-model="search.fecha" type="date" class="rounded-r-0"
          height="40" dense outlined label="Fecha"></v-text-field>
        <v-select hide-details v-model="search.referencias" :items="['Vacunas','Consulta']" class="rounded-l-0 rounded-r-0"
          height="40" dense outlined label="Buscar por referencia"></v-select>
        <v-btn @click="getAtenciones()" color="gd-primary-to-right" height="40" depressed
          class="white--text font-weight-light rounded-l-0">
          Buscar&nbsp;<v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-input>
    </v-card-title>
    <v-card-text>
      <v-data-table :headers="headers" hide-default-footer :items="items">
        <template v-slot:item.fecha="{ item }">
          {{formatDate(item.fecha)}}
        </template>
        <template v-slot:item.hora="{ item }">
          {{formatHour(item.hora)}}
        </template>
      </v-data-table>

    </v-card-text>
  </v-card>

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
          value: "referencias"
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
        search: {}
      }
    },
    mounted() {
      this.getAtenciones()
      this.search.fecha = moment().format('YYYY-MM-DD')
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
      formatDate(date) {
        let finalDate = date.split('-')
        return `${finalDate[2]}/${finalDate[1]}/${finalDate[0]}`
      },
      formatHour(hour) {
        let finalHour = hour.split(':')
        return `${finalHour[0]}:${finalHour[1]}`
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

      }
    }
  }

</script>

<style>

</style>
