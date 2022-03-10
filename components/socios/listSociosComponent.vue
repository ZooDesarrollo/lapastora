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
      <slot name="extraFields"></slot>
    </v-card-title>
    <v-card-text>
      <v-data-table :items="value" :headers="headers" hide-default-footer>
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
    props:{
      value:{
        type:Array,
        default: () => []
      }
    },
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
    methods: {
      formatDate(date) {
        return moment(date).format('DD/MM/YYYY')
      },
    },
  }

</script>

<style>

</style>
