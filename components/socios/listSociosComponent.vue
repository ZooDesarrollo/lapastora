<template>
  <v-card class="rounded-xl">
    <v-toolbar color="gd-primary-to-right" class="elevation-0 white--text font-weight-thin">
      <v-toolbar-title>
        Socios
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <slot name="buttonTitle"></slot>
    </v-toolbar>
    <v-card-title>
      <!--
        <v-input hide-details>
            <v-text-field
                hide-details
                v-model="search"
                label="Buscar"
                clearable
                dense
                outlined
                class="rounded-r-0"
            ></v-text-field>
            <v-btn class="rounded-l-0" depressed height="40" color="primary">
                <v-icon>mdi-magnify</v-icon>
            </v-btn>
        </v-input>
        -->
    </v-card-title>
    <v-card-text>
      <v-data-table :items="sociosList" :headers="headers" hide-default-footer>
        <template v-slot:item.payment_date="{ item }">
          {{formatDate(item.payment_date)}}
        </template>
        <template v-slot:item.actions="{ item }">
          <slot name="button" :item="item"></slot>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
  import moment from 'moment'
  export default {
    data() {
      return {
        headers: [{
            text: 'Nombre',
            value: 'name'
          },
          {
            text: 'DNI',
            value: 'user.username'
          },
          {
            text:'Ultima cuota paga',
            value:'payment_date'
          },
          {
            text: 'Acciones',
            value: 'actions',
            align:'right'
          }
        ],
        sociosList: [],
        search: ""
      }
    },
    created() {
      this.getSocios();
    },
    methods: {
      getSocios() {
        this.$axios.get('/socios')
          .then(response => {
            this.sociosList = response.data
          })
          .catch(error => {
            console.log(error)
          })
      },
      formatDate(date) {
        return moment(date).format('DD/MM/YYYY')
      },
    },
  }

</script>

<style>

</style>
