<template>
  <v-form ref="form">
    <v-card>
      <v-card-text>
        <v-row>
          <v-col class="col-12">
            <v-text-field outlined type="date" v-model="atencion.fecha" :rules="rules.required" label="Fecha"></v-text-field>
          </v-col>
          <v-col class="col-12">
            <v-text-field outlined type="time" v-model="atencion.hora" :rules="rules.required" label="Hora"></v-text-field>
          </v-col>

          <v-col class="col-12">
            <v-text-field outlined v-model="atencion.anamnesis" :rules="rules.required" label="Anamnesis"></v-text-field>
          </v-col>
          <v-col class="col-12">
            <v-text-field outlined v-model="atencion.EOG" :rules="rules.required" label="EOG"></v-text-field>
          </v-col>
          <v-col class="col-12">
            <v-textarea outlined v-model="atencion.diagnostico" :rules="rules.required" label="Diagnostico"></v-textarea>
          </v-col>
          <v-col class="col-12">
            <v-text-field outlined v-model="atencion.mascota.peso" :rules="rules.required" type="number" label="Peso"></v-text-field>
          </v-col>
          <v-col class="col-12">
            <v-text-field outlined v-model="atencion.temperatura" :rules="rules.required" type="number" label="Temperatura"></v-text-field>
          </v-col>
          <v-col class="col-12">
            <v-textarea outlined v-model="atencion.tratamiento" :rules="rules.required" label="Tratamiento"></v-textarea>
          </v-col>
          <v-col class="col-12">
            <visitas-productos-component v-model="atencion.productos"></visitas-productos-component>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" depressed @click="checkHandler()">Finalizar visita</v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </v-form>
</template>

<script>
  import visitasProductosComponent from './visitasProductosComponent.vue';
  import moment from 'moment';
  export default {
    components: {
      visitasProductosComponent
    },

    props: {
      value: Object,
      handler: Function
    },
    data() {
      return {
        atencion: this.value,
        rules:{
          required: [value => !!value || 'Este campo es requerido.'],
        }
      }
    },
    created() {},
    mounted() {
      this.atencion.hora = moment().format('HH:mm');
      this.atencion.fecha = moment().format('YYYY-MM-DD');
    },
    methods: {
      checkHandler() {
        if (!this.$refs.form.validate()) return
        this.$emit('input', this.atencion)
        this.atencion = {
          mascota: {}
        }
        this.handler();
      }
    },
    watch: {
    }
  }

</script>

<style>

</style>
