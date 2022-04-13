<template>
  <div>
    <v-card outlined>
      <v-card-title>
        <v-btn outlined color="primary" @click="modalProductos = true">
          AGREGAR PRODUCTO&nbsp;<v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-data-table :headers="headers" :items="value" hide-default-footer>
          <template v-slot:item.producto.nombre="{ item }">
            <v-text-field dense outlined hide-details v-model="item.producto.nombre"></v-text-field>
          </template>
          <template v-slot:item.descripcion="{ item }">
            <v-text-field dense outlined hide-details v-model="item.descripcion"></v-text-field>
          </template>
          <template v-slot:item.observacion="{ item }">
            <v-text-field dense outlined hide-details v-model="item.observacion"></v-text-field>
          </template>
          <template v-slot:item.precio="{ item }">
            <v-text-field dense outlined type="number" hide-details v-model="item.precio"></v-text-field>
          </template>
          <template v-slot:item.cant="{ item }">
            <v-text-field dense outlined type="number" hide-details v-model="item.cant"></v-text-field>
          </template>
          <template v-slot:item.total="{ item }">
            $ {{(item.cant && item.precio) ? item.cant*item.precio : 0}}
          </template>
          <template v-slot:item.delete="{ item }">
            <v-btn small color="red" @click="deleteProduct(item)">
              <v-icon color="white">mdi-delete</v-icon>
            </v-btn>
          </template>


        </v-data-table>
      </v-card-text>
    </v-card>
    <v-dialog v-model="modalProductos" width="60%">
      <v-card>
        <v-card-title class="font-weight-light">
          Productos
          <v-spacer></v-spacer>
          <v-btn icon @click="modalProductos = false">
              <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-data-table :headers="headersProductos" :items="listProductos" hide-default-footer>
            <template v-slot:item.add="{ item }">
              <v-btn outlined @click="addProduct(item)">Agregar</v-btn>
            </template>

          </v-data-table>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    props: {
      value: Array
    },
    data() {
      return {
        productos: this.value,
        headers: [{
          value: 'producto.nombre',
          text: 'Producto'
        }, {
          value: 'descripcion',
          text: 'Descripcion'
        }, {
          value: 'observacion',
          text: 'Observacion'
        }, {
          value: 'precio',
          text: 'Precio'
        }, {
          value: 'cant',
          text: 'Cantidad'
        }, , {
          value: 'total',
          text: 'Total'
        },{
          value: 'delete',
          text: 'Eliminar'
        }],
        headersProductos:[{
          value: 'nombre',
          text: 'Nombre'
        }, {
          value: 'comentarios',
          text: 'Descripcion'
        }, {
          value: 'add',
          text: 'Agregar',
          align:'right'
        }],
        listProductos: [],
        modalProductos: false
      }
    },
    created(){
        this.getProductos()
    },
    methods:{
        getProductos(){
          this.$axios.get('/productos').then(response => {
            this.listProductos = response.data;
          });
        },
        addProduct(product){
            console.log(product)
            this.$set(this.productos,this.productos.length, {producto:product});
            this.modalProductos = false;
        },
        deleteProduct(item) {
          this.productos = this.productos.filter(producto => producto.id != item.id)
        }
    },
    watch: {
      productos(val) {
        if(val!=undefined)
            this.$emit('input', val)
      }
    },
  }

</script>
