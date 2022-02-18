<template>
  <v-form ref="form">
    <v-row>
      <v-col class="col-12 col-md-6">
        <v-text-field label="NOMBRE SOCIO" class="rounded-lg" outlined :rules="rules.required" v-model="socio.name">
        </v-text-field>
        <v-text-field label="APELLIDO" class="rounded-lg" outlined :rules="rules.required" v-model="socio.last_name">
        </v-text-field>
        <v-text-field label="DOCUMENTO" class="rounded-lg" outlined :rules="rules.required"
          v-model="socio.user.username">
        </v-text-field>
        <v-text-field label="DIRECCION" class="rounded-lg" outlined :rules="rules.required" v-model="socio.address">
        </v-text-field>
        <v-text-field label="LOCALIDAD" class="rounded-lg" outlined :rules="rules.required" v-model="socio.localidad">
        </v-text-field>
        <v-text-field label="RAZON SOCIAL (Opcional)" type="number" v-model="socio.rut" class="rounded-lg" outlined>
        </v-text-field>
        <v-select label="TIPO" :items="['Cliente final']" v-model="socio.tipo" class="rounded-lg" outlined
          :rules="rules.required">
        </v-select>

      </v-col>
      <v-col class="col-12 col-md-6">
        <v-text-field label="DIRECCION COBRANZA  (Opcional)" v-model="socio.direccion_cobranza" class="rounded-lg"
          outlined>
        </v-text-field>
        <v-text-field label="FECHA AFILIACION (Opcional)" type="date" v-model="socio.afiliacion" class="rounded-lg"
          outlined>
        </v-text-field>
        <v-select label="SOCIO" :items="['Si','No']" v-model="socio.socio" class="rounded-lg" outlined
          :rules="rules.required">
        </v-select>
        <v-select label="SUCURSAL" :items="['CASA CENTRAL']" v-model="socio.suc" class="rounded-lg" outlined
          :rules="rules.required">
        </v-select>
        <v-text-field label="TELEFONO" type="number" class="rounded-lg" outlined :rules="rules.required"
          v-model="socio.phone">
        </v-text-field>
        <v-text-field label="CORREO  (Opcional)" type="email" class="rounded-lg" outlined v-model="socio.email">
        </v-text-field>
        <v-text-field label="PASSWORD" class="rounded-lg" outlined 
          v-model="socio.user.password">
        </v-text-field>

      </v-col>
      <v-col class="col-12 col-md-12">
        <v-card outlined :rules="rules.required">
          <v-card-title class="font-weight-light">
            Mascotas
          </v-card-title>
          <v-card-text>
            <v-row v-for="(mascota,index) in socio.mascotas" :key="index">
              <v-col class="col-12 col-md-12">
                <v-text-field label="NOMBRE" class="rounded-lg" outlined :rules="rules.required"
                  v-model="socio.mascotas[index].nombre">
                </v-text-field>
              </v-col>
              <v-col class="col-12 col-md-12">
                <v-text-field label="RAZA" class="rounded-lg" outlined :rules="rules.required"
                  v-model="socio.mascotas[index].raza">
                </v-text-field>
              </v-col>
              <v-col class="col-12 col-md-12">
                <v-text-field label="COLOR" class="rounded-lg" outlined :rules="rules.required"
                  v-model="socio.mascotas[index].color">
                </v-text-field>
              </v-col>
              <v-col class="col-12 col-md-12">
                <v-text-field type="date" label="Fecha de nacimiento" class="rounded-lg" outlined
                  :rules="rules.required" v-model="socio.mascotas[index].fecha_nac">
                </v-text-field>
              </v-col>

              <v-col class="col-12 col-md-12">
                <v-select label="SEXO" :items="[{
                      text:'Macho',
                      value: 'F'
                    },{
                      text:'Hembra',
                      value: 'M'
                    },{
                      text:'Otro',
                      value: 'NN'
                    }]" class="rounded-lg" outlined :rules="rules.required" v-model="socio.mascotas[index].sexo">
                </v-select>
              </v-col>
              <v-col class="col-12 col-md-12">
                <v-select label="SOCIO" :items="[{
                      text:'Si',
                      value: 'Si'
                    },{
                      text:'No',
                      value: 'No'
                    }]" class="rounded-lg" outlined :rules="rules.required" v-model="socio.mascotas[index].socio">
                </v-select>
              </v-col>
              <v-col class="col-12">
                <v-divider></v-divider>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-title>
            <v-btn color="primary" v-if="socio.mascotas.length>1" depressed @click="deleteMascota()" class="mr-1">
              Eliminar
              <v-icon>mdi-minus</v-icon>
            </v-btn>
            <v-btn color="primary" depressed @click="addMascota()">
              Agregar
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success darken-5" class="mb-5 white--text font-weight-light" depressed @click="checkHandler()">
            Guardar
          </v-btn>
        </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
  export default {
    props: {
      value: Object,
      handler: Function
    },
    data() {
      return {
        socio: this.value,
        rules: {
          required: [value => !!value || 'Este campo es requerido'],
        }
      }
    },
    methods: {
      addMascota() {
        this.$set(this.socio.mascotas, this.socio.mascotas.length, {});
      },
      deleteMascota() {
        this.$delete(this.socio.mascotas, this.socio.mascotas.length - 1);
      },
      checkHandler() {
        if(!this.$refs.form.validate()) return
        this.handler();
        this.$emit('input', this.socio)
      }
    },
    watch: {
    },
  }

</script>

<style lang="scss">
</style>
