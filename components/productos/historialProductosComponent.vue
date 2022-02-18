<template>
  <div>
    <v-card>
      <v-card-title>
        <v-input>
          <v-text-field placeholder="Buscar producto" class="rounded-r-0" outlined dense hide-details height="40"
            v-model="search.nombre_contains"></v-text-field>
          <v-btn depressed height="40" color="primary" class="rounded-l-0" @click="getProducts()">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-input>
      </v-card-title>
      <v-card-text class="font-weight-light">
        <v-data-table :headers="headers" :items="products" hide-default-footer>
          <template v-slot:item.ver_historial={item} depressed>
            <v-btn color="primary" @click="getHistorial(item)" depressed>Ver historial</v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <v-dialog v-model="openModalProduct" persistent>
      <v-card >
        <v-toolbar color="primary" class="elevation-0">
          <v-toolbar-title class="font-weight-light white--text">
           Historial del producto
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="openModalProduct = false" class="white--text">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-data-table :headers="headersHistorial" hide-default-footer :items="historialProductos">
              <template v-slot:item.precio_unidad = {item}>
                  $ {{item.precio_unidad}}
              </template>
              <template v-slot:item.total = {item}>
                  $ {{item.precio_unidad * item.cantidad}}
              </template>

              <template v-slot:item.fecha_compra = {item}>
                  {{formatDate(item.fecha_compra)}}
              </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        search: {},
        products: [],
        product: {},
        headers: [{
          text: 'Nombre',
          value: 'nombre'
        },{
          text: 'Ver historial',
          value: 'ver_historial',
          align: 'right'
        }],
        headersHistorial: [{
          text: 'Fecha',
          value: 'fecha_compra'
        }, {
          text: 'Precio',
          value: 'precio_unidad'
        }, {
          text: 'Cantidad',
          value: 'cantidad'
        }, {
          text: 'Precio total',
          value: 'total'
        }, {
          text: 'Distribuidor',
          value: 'distribuidor'
        }],
        historialProductos: [],
        openModalProduct: false
      }
    },
    created() {
      this.getProducts()
    },
    methods: {
      getProducts() {
        this.$axios.get('/productos', {
          params: this.search
        }).then(response => {
          response.data.filter((value) => {
            if (this.products.find(product => product.nombre === value.nombre)) {
              console.log("aca")
              return false;
            }
            this.products.push(value)
          });
        });
      },
      getHistorial(product) {
          this.openModalProduct = true
        this.$axios.get('/productos', {
          params: {nombre_contains:product.nombre,_sort:'fecha_compra:desc'}
        }).then(response => {
            this.historialProductos = response.data
        });
      },
      formatDate(date) {
        let finalDate = date.split('-')
        return `${finalDate[2]}/${finalDate[1]}/${finalDate[0]}`
      },

    }
  }

</script>

<style>

</style>
