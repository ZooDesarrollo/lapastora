<template>
  <v-container fluid>
    <v-card>
      <v-card-text>
        <v-form ref="form">
        <v-row>
          <v-col class="col-12 col-md-5">
            <v-row>
              <v-col class="col-12 col-md-6">
                <v-text-field label="CODIGO" type="number" v-model="product.codigo"
                  class="rounded-lg" outlined></v-text-field>
                <v-card color="blue darken--5" class="rounded-lg elevation-0" height="400">
                  <v-card-text>
                    <input id="fileUpload" type="file" @input="onFileChange($event)" ref="file" hidden>
                    <v-btn @click="selectPicture()" block class="mb-5" depressed>CARGAR FOTO</v-btn>
                    <v-img :src="previewImg()" v-if="product.foto" width="100%" contain height="200"></v-img>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col class="col-12 col-md-6">
                <v-text-field label="NOMBRE" v-model="product.nombre"
                  class="rounded-lg" outlined></v-text-field>
                <v-text-field label="COSTO/UNIDAD" type="number"
                  v-model="product.precio_unidad" class="rounded-lg" outlined></v-text-field>
                <v-text-field label="CANTIDAD" type="number"
                  v-model="product.cantidad" class="rounded-lg" outlined></v-text-field>
                <v-text-field label="PRECIO FINAL" type="number"
                  v-model="product.precio_final" class="rounded-lg" outlined></v-text-field>
                <v-text-field label="DISTRIBUIDOR" v-model="product.distribuidor"
                  class="rounded-lg" outlined></v-text-field>
                <v-text-field label="FECHA DE COMPRA" type="date" v-model="product.fecha_compra"
                  class="rounded-lg" outlined></v-text-field>
                <v-text-field label="VENCIMIENTO" type="date" v-model="product.vencimiento"
                  class="rounded-lg" outlined></v-text-field>

              </v-col>
            </v-row>
          </v-col>
          <v-col class="col-12 col-md-7">
            <v-textarea label="COMENTARIOS" v-model="product.comentarios" hide-details outlined
              class="rounded-lg pt-0"></v-textarea>
          </v-col>
        </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken--5" class="rounded-lg white--text font-weight-light" depressed large
          @click="createProduct()">
          GUARDAR
        </v-btn>
      </v-card-actions>
    </v-card>
    <modal-success :action="()=>{
      this.dialog = false
      }" v-model="dialog">
      <template v-slot:icon>
        mdi-check
        </template> 
        <template v-slot:title>
          <p class="text-h6 mb-0">
            <strong>Producto agregado correctamente!</strong>
          </p>
        </template>
    </modal-success>
  </v-container>
</template>

<script>
  import modalSuccess from '~/components/modalSuccess.vue'
  export default {
    components:{
      modalSuccess
    },
    data() {
      return {
        product: {},
        dialog: false
      }
    },
    mounted() {
      this.initReader()
    },
    methods: {
      selectPicture() {
        this.$refs.file.click();
      },
      onFileChange(e) {
        this.product.foto = e.target.files[0]
      },
      createImage(file) {
        const reader = new FileReader();
        reader.onload = e => {
          this.product.foto = e.target.result;
        };
        reader.readAsDataURL(file);
      },
      async createProduct() {
        if(!this.$refs.form.validate()) return
        let data = new FormData();
        data.append('files.foto', this.product.foto);
        data.append('data', JSON.stringify(this.product));
        this.$axios.post('/productos', data)
          .then(()=>{
            this.dialog = true
            this.product = {}
          })
      },
      initReader() {
        new Promise((resolve, reject) => {
          setTimeout(() => {
            Quagga.init({
              inputStream: {
                name: "Live",
                type: "LiveStream",
                target: document.querySelector('#scanner-container')
              },
              decoder: {
                readers: ["code_128_reader"]
              }
            }, function (err) {
              if (err) {
                console.log(err);
                return
              }
              Quagga.start();
              resolve(true)
            });
          }, 2000);

        }).then(() => {
          Quagga.onDetected((data) => {
          console.log(data)
          });
        })
      },
      previewImg() {
        return URL.createObjectURL(this.product.foto)
      },
    }
  }

</script>

<style lang="scss">

</style>
