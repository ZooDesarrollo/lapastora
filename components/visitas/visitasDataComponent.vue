<template>
  <v-form ref="form">
    <v-card>
      <v-card-text class="overflow-card" >
        <v-row>
          <v-col class="col-12">
            <v-text-field type="text" label="SOCIO" readonly outlined filled dense :value="setSocioName(atencion.mascota)"
              class="rounded-lg white--text"> </v-text-field>
          </v-col>
          <v-col class="col-12">
            <v-text-field outlined :readonly="readonly" type="date" v-model="atencion.fecha" label="Fecha"></v-text-field>
          </v-col>
          <v-col class="col-12">
            <v-text-field outlined :readonly="readonly" type="time" v-model="atencion.hora" label="Hora"></v-text-field>
          </v-col>
          <v-col class="col-12">
            <v-text-field outlined :readonly="readonly" v-model="atencion.mascota.peso" type="number" label="Peso"></v-text-field>
          </v-col>
          <v-col class="col-12">
            <v-text-field outlined :readonly="readonly" v-model="atencion.temperatura" type="number" label="Temperatura"></v-text-field>
          </v-col>
          <v-col class="col-12">
              <createReferenciasComponent v-model="atencion.referencias"></createReferenciasComponent>
          </v-col>
          <v-col class="col-12">
            <v-text-field outlined :readonly="readonly" v-model="atencion.anamnesis" label="Anamnesis"></v-text-field>
          </v-col>
          <v-col class="col-12">
            <v-text-field outlined :readonly="readonly" v-model="atencion.EOG" label="EOG"></v-text-field>
          </v-col>
          <v-col class="col-12">
            <v-textarea outlined :readonly="readonly" v-model="atencion.tratamiento" label="Tratamiento"></v-textarea>
          </v-col>
          <v-col class="col-12">
            <v-text-field outlined type="date" :readonly="readonly" v-model="atencion.proxima_consulta" label="Fecha de proxima consulta">
            </v-text-field>
          </v-col>
          <v-col class="col-12">
            <v-textarea outlined type="date" :readonly="readonly" v-model="atencion.proxima_consulta" label="Motivo de proxima consulta">
            </v-textarea>
          </v-col>
          <v-col class="col-12">
            <v-checkbox outlined  :readonly="readonly" v-model="atencion.con_costo" label="Consulta con costo">
            </v-checkbox>
          </v-col>
          <v-col class="col-12" v-show="atencion.con_costo">
            <v-text-field outlined  :readonly="readonly" v-model="atencion.costo" type="number" label="Costo ($)">
            </v-text-field>
          </v-col>

          <v-col class="col-12">
            <UploadFilesComponent v-model="atencion.files" :readonly="readonly"></UploadFilesComponent>
          </v-col>

          <v-col class="col-12">
            <visitas-productos-component v-model="atencion.productos"></visitas-productos-component>
          </v-col>
          <v-col class="col-12">
            <visitasProximaComponent v-model="atencion.proximas"></visitasProximaComponent>
          </v-col>

        </v-row>
        <v-divider></v-divider>
        <v-card-actions v-if="!readonly">
          <v-spacer></v-spacer>
          <v-btn color="primary" depressed @click="checkHandler()">Finalizar visita</v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </v-form>
</template>

<script>
  import visitasProductosComponent from './visitasProductosComponent.vue';
  import createReferenciasComponent from './createReferenciasComponent.vue';
  import moment from 'moment';
  export default {
    components: {
      visitasProductosComponent,
      createReferenciasComponent
    },

    props: {
      value: Object,
      handler: Function,
      readonly:{
        default:false,
        type:Boolean
      }
    },
    data() {
      return {
        atencion: this.value,
        rules: {
          required: [value => !!value || 'Este campo es requerido.'],
        }
      }
    },
    created() {},
    mounted() {
      setTimeout(() => {
        this.atencion.hora = moment().format('HH:mm');
        this.atencion.fecha = moment().format('YYYY-MM-DD');
        this.$forceUpdate()
      }, 1000);

    },
    methods: {
      checkHandler() {
        if (!this.$refs.form.validate()) return
        this.$emit('input', this.atencion)
        this.handler();

      },
      onFileChange(e) {
        this.atencion.file = e.target.files[0]
      },
      setSocioName(mascota) {
        if (!mascota.socio) return
        return mascota.socio + ' es socio'
      },

    },
    watch: {
      value: {
        handler(newValue) {
          this.atencion = newValue
        },
        deep:true
    }
  }
  }

</script>

<style>

</style>
