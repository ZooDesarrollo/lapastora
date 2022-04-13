<template>
  <v-dialog v-model="value" fullscreen>
    <v-toolbar elevation="0" color="gd-primary-to-right">
      <v-toolbar-title class="white--text font-weight-light">COMPRA DE MERCADERIA</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon color="white" @click="$emit('input', false)">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card flat>
      <v-card-text>

        <v-row class="mb-3">
          <v-col class="col-md-6 col-12">
            <v-card class="rounded-xl">
              <v-toolbar elevation="0" color="primary">
                <v-toolbar-title class="font-weight-light white--text">
                  Seleccione el distribuidor
                </v-toolbar-title>
              </v-toolbar>
              <v-divider></v-divider>
              <v-card-text>
                <productosCreateDistribuidoresComponent v-model="distribuidor">
                </productosCreateDistribuidoresComponent>
              </v-card-text>
            </v-card>

          </v-col>
          <v-col class="col-md-6 col-12">
            <ProductosListComponent color="primary" title="Seleccione los productos">
              <template v-slot:button="{ item }">
                <v-btn @click="setItem(item)" v-if="!selectedItem(item)" color="gd-primary-to-right"
                  class="rounded-lg white--text font-weight-light">SELECCIONAR</v-btn>
                <v-btn @click="removeItem(item)" v-else color="red" class="rounded-lg white--text font-weight-light">
                  ELIMINAR&nbsp;
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
            </ProductosListComponent>

          </v-col>
          <v-col class="col-12 col-md-12">
            <v-card class="rounded-xl">
              <v-toolbar elevation="0" color="primary">
                <v-toolbar-title class="font-weight-light white--text">
                  Compras de mercaderia
                </v-toolbar-title>
              </v-toolbar>
              <v-divider></v-divider>
              <v-card-text>
                <v-data-table :headers="headers" :items="compras" hide-default-footer>
                  <template v-slot:item.precio_unidad="{ item }">
                    <v-text-field type="number" outlined dense hide-details v-model="item.precio_unidad"></v-text-field>
                  </template>
                  <template v-slot:item.cantidad="{ item }">
                    <v-text-field type="number" outlined dense hide-details v-model="item.cantidad"></v-text-field>
                  </template>

                </v-data-table>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>



      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success darken-1" :disabled="compras.length == 0" class="rounded-lg white--text font-weight-light"
          @click="saveCompras()">AGREGAR COMPRAS</v-btn>
      </v-card-actions>
    </v-card>
    <modal-success :action="()=>{
      this.$emit('input', false);
      this.successCompras = false
      }" v-model="successCompras">
      <template v-slot:icon>
        mdi-check
      </template>
      <template v-slot:title>
        <p class="text-h6 mb-0">
          <strong>Compras agregadas correctamente!</strong>
        </p>
      </template>
    </modal-success>
  </v-dialog>

</template>

<script>
  export default {
    props: {
      value: Boolean,
    },
    data() {
      return {
        stepper: 1,
        compras: [],
        distribuidor: null,
        headers: [{
            text: 'Codigo',
            value: 'codigo'
          },
          {
            text: 'Nombre',
            value: 'nombre'
          },
          {
            text: 'Precio',
            value: 'precio_unidad'
          },
          {
            text: 'Cantidad',
            value: 'cantidad'
          }
        ],
        successCompras:false
      }
    },
    methods: {
      setItem(item) {
        this.compras.push({
          producto: item.id,
          codigo: item.codigo,
          nombre: item.nombre,
          cantidad: 1,
          distribuidor: this.distribuidor,
        })
      },
      selectedItem(item) {
        return this.compras.find(producto => producto == item.id) ? true : false
      },
      removeItem(item) {
        this.compra = this.compras.filter(producto => producto != item.id)
      },
      async saveCompras() {
        await this.compras.filter(async (compra) => {
          await this.$axios.post('/compras-mercaderias', compra)
        })
        this.successCompras = true
      }
    }
  }

</script>

<style>

</style>
