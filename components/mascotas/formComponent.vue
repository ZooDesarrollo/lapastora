<template>
  <v-card class="rounded-xl">
    <v-toolbar color="gd-primary-to-right" elevation="0">
      <v-toolbar-title class="white--text font-weight-light">
        Mascotas
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-row>
        <v-col class="col-12 col-md-12">
          <v-text-field label="NOMBRE" class="rounded-lg" outlined dense v-model="mascota.nombre">
          </v-text-field>
        </v-col>
        <v-col class="col-12 col-md-12">
          <v-text-field label="RAZA" class="rounded-lg" outlined dense v-model="mascota.raza">
          </v-text-field>
        </v-col>
        <v-col class="col-12 col-md-12">
          <v-text-field label="COLOR" class="rounded-lg" outlined dense v-model="mascota.color">
          </v-text-field>
        </v-col>
        <v-col class="col-12 col-md-12">
          <v-text-field type="date" label="Fecha de nacimiento" class="rounded-lg" outlined dense
            v-model="mascota.fecha_nac">
          </v-text-field>
        </v-col>

        <v-col class="col-12 col-md-12">
          <v-select label="SEXO" :items="[{
                      text:'Macho',
                      value: 'Macho'
                    },{
                      text:'Hembra',
                      value: 'H'
                    },{
                      text:'CASTRADO',
                      value: 'C'
                    }]" class="rounded-lg" outlined dense v-model="mascota.sexo">
          </v-select>
        </v-col>
        <v-col class="col-12 col-md-12">
          <v-select label="SOCIO" :items="[{
                      text:'Si',
                      value: 'Si'
                    },{
                      text:'No',
                      value: 'No'
                    }]" class="rounded-lg" outlined dense v-model="mascota.socio">
          </v-select>
        </v-col>
        <v-col class="col-12">
          <sociosCreateEspeciesComponent v-model="mascota.especie"></sociosCreateEspeciesComponent>
        </v-col>
        <v-col class="col-12 col-md-12">
          <v-textarea label="Observaciones" class="rounded-lg" outlined dense
            v-model="mascota.observaciones">
          </v-textarea>
        </v-col>


        <v-col class="col-12">
          <v-divider></v-divider>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="gd-primary-to-right" class="mb-5 white--text font-weight-light" @click="checkHandler()">
        Guardar
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
  import moment from 'moment'
  export default {
    props: {
      value: Object,
      handler: Function
    },
    data() {
      return {
        mascota: this.value,
        rules: {
          required: [value => !!value || 'Este campo es requerido'],
        },
        cuotasList: [],
      }
    },
    created() {
    },
    methods: {
      checkHandler() {
        if (!this.$refs.form.validate()) return
        this.handler();
        this.$emit('input', this.socio)
      },

    },
    watch: {},
  }

</script>

<style lang="scss">
</style>
