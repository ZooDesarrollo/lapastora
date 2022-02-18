<template>
  <v-container fluid>
    <ProductosListComponent color="primary">
      <template v-slot:headerButtons>
        <v-btn color="gd-primary-to-right" class="rounded-lg white--text font-weight-light" to="/productos">
          Compra de mercaderia
        </v-btn>
        &nbsp;&nbsp;
        <v-btn color="gd-primary-to-right" class="rounded-lg white--text font-weight-light"
          @click="openModalHistorial = true">
          Ver historial de productos
        </v-btn>
      </template>
        <template v-slot:button="{ item }">
        <v-btn :to="`/productos/editar/${item.id}`" color="gd-primary-to-right"
          class="rounded-lg white--text font-weight-light">Editar</v-btn>
      </template>

    </ProductosListComponent>
    <v-dialog v-model="openModalHistorial" persistent width="600">
      <v-toolbar color="primary" class="elevation-0">
        <v-toolbar-title class="font-weight-light white--text">
          Historial de productos
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="openModalHistorial = false">
          <v-icon class="font-weight-light white--text">mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <historial-productos-component></historial-productos-component>
    </v-dialog>
  </v-container>
</template>

<script>
  import HistorialProductosComponent from '~/components/productos/historialProductosComponent.vue';
  export default {
    components: {
      HistorialProductosComponent
    },
    data() {
      return {
        openModalHistorial: false,
        headers: [{
          text: 'Codigo',
          value: 'codigo'
        }, {
          text: 'Nombre',
          value: 'nombre'
        }, {
          text: 'Precio',
          value: 'precio_unidad'
        }, {
          text: 'Distribuidor',
          value: 'distribuidor'
        }, {
          text: 'Editar',
          value: 'editar',
          align: 'right'
        }],
        products: []
      }
    },
    created() {
      this.getProducts();
    },
    methods: {
      getProducts() {
        this.$axios.get('/productos').then(response => {
          this.products = response.data;
        });
      }
    }
  }

</script>

<style>

</style>
