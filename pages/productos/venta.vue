<template>
  <v-container fluid>
    <v-card>
      <v-card-text>
        <v-row>
          <v-col class="col-12 col-md-5">
            <v-card color="blue darken-4 rounded-lg" class="elevation-0" height="400">
              <v-card-text>
                <v-row>
                  <v-col class="col-12 col-md-6">
                    <v-text-field placeholder="MANUAL (codigo)" background-color="success darken--4"
                      class="input-socio rounded-lg" outlined></v-text-field>
                  </v-col>
                  <v-col class="col-12 col-md-6">
                    <v-text-field placeholder="PRODUCTO" readonly background-color="success" class="input-socio rounded-lg"
                      outlined>
                    </v-text-field>
                    <v-text-field placeholder="CANTIDAD" readonly background-color="success" class="input-socio rounded-lg"
                      outlined>
                    </v-text-field>
                    <v-text-field placeholder="PRECIO" readonly background-color="success" class="input-socio rounded-lg"
                      outlined>
                    </v-text-field>
                    <v-text-field placeholder="DESCUENTO" readonly background-color="success" class="input-socio rounded-lg"
                      outlined>
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col class="col-md-2 col-12"></v-col>
          <v-col class="col-12 col-md-5">
            <v-card color="blue darken-4 rounded-lg" class="elevation-0 pa-3" height="400">
              <v-card-text class="rounded-lg success" style="height:90%">
                FACTURA FINAL
              </v-card-text>
              <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn width="50%" color="red" class="font-weight-thin" depressed @click="createVentaModal = true">PAGAR</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

      </v-card-text>
    </v-card>


      <modal-success :action="()=>{
      this.createVentaModal = false
      }" v-model="createVentaModal">
      <template v-slot:icon>
        mdi-check
      </template>
      <template v-slot:title>
        <p class="text-h6 mb-0">
          <strong>Venta registrada correctamente!</strong>
        </p>
      </template>
    </modal-success>

  </v-container>
</template>

<script>
  export default {
    data() {
      return {
      createVentaModal: false
      } 
    }
  }

</script>

<style lang="scss">
  .input-socio {
    border: none !important;

    input {
      ::placeholder {
        color: #fff !important;
      }

      color:white !important
    }
  }

</style>
