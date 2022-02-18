<template>
  <v-card>
      <slot name="header"></slot>
    <v-card-text>
      <v-row>
        <v-col class="col-12">
          <v-text-field outlined v-model="user.username" type="number" label="CI"></v-text-field>
        </v-col>
        <v-col class="col-12">
            <v-text-field outlined v-model="user.password" type="password" label="Password"></v-text-field>
          </v-col>
        </v-row>
    </v-card-text>
    <v-card>
      <v-card-title>
        Permisos
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col class="col-md-3 col-12">
            <v-checkbox v-model="user.permisos.atencion" label="Crear atencion"></v-checkbox>
          </v-col>
          <v-col class="col-md-3 col-3">
            <v-checkbox v-model="user.permisos.socios" label="Crear socios"></v-checkbox>
          </v-col>
          <v-col class="col-md-3 col-3">
            <v-checkbox v-model="user.permisos.agenda" label="Usar agenda"></v-checkbox>
          </v-col>
          <v-col class="col-md-3 col-3">
            <v-checkbox v-model="user.permisos.venta" label="Agregar venta"></v-checkbox>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
          <v-spacer></v-spacer>
          <slot name="button"></slot>
      </v-card-actions>
    </v-card>
  </v-card>
</template>

<script>
  export default {
    props: {
      value: {
        type: Object,
        default: function () {
          return {
            ci: 0,
            permisos: {
              atencion: false,
              socios: false,
              agenda: false,
              venta: false
            }
          }
        }
      }
    },
    data() {
      return {
        user: this.value
      }
    },
    watch: {
      user: {
        handler: function (val) {
          this.$emit('input', val)
        },
        deep: true
      }
    }
  }

</script>

<style>

</style>
