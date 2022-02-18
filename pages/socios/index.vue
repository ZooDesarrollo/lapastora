<template>
  <v-container fluid>
    <list-socios-component>
      <template v-slot:buttonTitle>
        <v-btn to="/socios/registro" class="font-weight-light rounded-lg white--text" color="gd-primary-to-right">
          AGREGAR SOCIO
        </v-btn>
      </template>
      <template v-slot:button="{ item }">
        <v-btn 
          class="gd-primary-to-right font-weight-light rounded-lg white--text"
           @click="()=>{
          openModalPaymentServices = true;
          dataPayment.client = item
          }" color="primary">
          VALIDAR PAGO
        </v-btn>
        <v-btn class="gd-primary-to-right font-weight-light rounded-lg white--text" :to="`/socios/editar/${item.id}`" color="primary">
          EDITAR
        </v-btn>
      </template>
    </list-socios-component>
    <v-dialog v-model="openModalPaymentServices">
      <v-card width="600">
        <v-toolbar color="gd-primary-to-right font-weight-light" elevation="0">
          <v-toolbar-title class="white--text">Pagar servicios</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="openModalPaymentServices = false"><v-icon color="white">mdi-close</v-icon></v-btn>
        </v-toolbar>
        <v-card-text class="ma-2">
          <v-text-field outlined dense label="Cantidad de meses" hide-details type="number" v-model="dataPayment.months"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="gd-primary-to-right" class="font-weight-light white--text rounded-lg" @click="openAlertPayment = true">Pagar servicios</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <modalSuccess :action="payServices" color="red" v-model="openAlertPayment">
      <template v-slot:icon>
        mdi-alert
      </template>
      <template v-slot:title>
        Esta seguro que va a acreditar <b class="red--text">{{dataPayment.months}}</b> cuotas?
      </template>
      <template v-slot:buttonCancel>
        <v-btn rounded class="white--text" color="red" @click="openAlertPayment = false">Cancelar</v-btn>
      </template>
    </modalSuccess>
  </v-container>
</template>

<script>
  import ListSociosComponent from '~/components/socios/listSociosComponent.vue';
  import modalSuccess from '~/components/modalSuccess.vue';
  import moment from 'moment';
  export default {
    components: {
      ListSociosComponent,
      modalSuccess
    },
    data() {
      return {
        openModalPaymentServices: false,
        openAlertPayment: false,
        dataPayment:{
          months:1,
          client:{}
        }
      }
    },
    created() {},
    methods: {
      payServices() {
        this.dataPayment.client.payment_date=moment().add(this.dataPayment.months,'months').format('YYYY-MM-DD')
        this.$axios.put(`/socios/${this.dataPayment.client.id}`,this.dataPayment.client).then(response => {
          this.openModalPaymentServices = false;
          this.openAlertPayment = false
          this.getSocios();
        })
      }
    }
  }

</script>

<style>

</style>
