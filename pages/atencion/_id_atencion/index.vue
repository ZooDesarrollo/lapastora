<template>
  <visitas-data-component v-model="atencion" :handler="updateAtencion"></visitas-data-component>
</template>

<script>
  export default {
    data() {
      return {
        atencion: {
          files: [],
          socio: {
            mascotas: []
          },
          mascota: {},
          productos: [],
          proximas: []
        },
      }
    },
    mounted() {
      this.getAtencion()
    },
    methods: {
      getAtencion() {
        this.$axios.get('/atencion/' + this.$route.params.id_atencion)
          .then((data) => {
            this.atencion = data.data
          })
      },
      updateAtencion() {

        this.$axios.put('/atencion/' + this.atencion.id, this.atencion).then(async response => {
          
          let uploadFiles = this.atencion.files.filter((file)=>file instanceof File)
          
          this.uploadFile(response.data.id, uploadFiles)
          this.formatAtencion()
        }).catch(error => {
          console.log(error);
        });
      },
      formatAtencion() {
        this.atencion.EOG = ""
        this.atencion.anamnesis = ""
        this.atencion.pronostico = ""
        this.atencion.tratamiento = ""
        this.atencion.hora = ""
        this.atencion.fecha = ""
        this.atencion.id = null
        this.atencion.files = []
      },
      uploadFile(idAtencion, files) {
        if(files.length == 0) return 
        
        
        let data = new FormData()
        data.append('ref', 'atencion')
        data.append('refId', idAtencion)
        data.append('field', 'files')
        for (let file in files) {
          if (files[file] instanceof File) {
            data.append('files', files[file], files[file].name)
          }
        }
        this.$axios.post('/upload', data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(response => {
          console.log(response);
        }).catch(error => {
          console.log(error);
        });
      },

    }
  }

</script>

<style>

</style>
