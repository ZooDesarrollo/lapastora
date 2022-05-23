<template>
  <v-app>
    <v-navigation-drawer :value="true" class="elevation-2 rounded-r-xl elevation-0" hide-overlay height="99.9%" app
      permanent>
      <v-app-bar height="120" color="gd-primary-to-right" class="elevation-0" >
        <v-img src="/logo.png" width="120"></v-img>
      </v-app-bar>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-btn text color="primary" height="100" width="100" class="btn-navigation"
              active-class="btn-navigation-active" to="/venta">
              <v-row dense>
                <v-col class="col-12 d-flex justify-center">
                  <v-icon>mdi-cart</v-icon><br>
                </v-col>
                <v-col class="col-12 d-flex justify-center">
                  <span>VENTA</span>
                </v-col>
              </v-row>
            </v-btn>

          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-btn text color="primary" height="100" width="100" class="btn-navigation"
              active-class="btn-navigation-active" to="/atencion">
              <v-row dense>
                <v-col class="col-12 d-flex justify-center">
                  <v-icon>mdi-doctor</v-icon><br>
                </v-col>
                <v-col class="col-12 d-flex justify-center">
                  <span>ATENCION</span>
                </v-col>
              </v-row>
            </v-btn>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-btn text color="primary" height="100" width="100" class="btn-navigation"
              active-class="btn-navigation-active" to="/productos/listado">
              <v-row dense>
                <v-col class="col-12 d-flex justify-center">
                  <v-icon>mdi-cart-plus</v-icon><br>
                </v-col>
                <v-col class="col-12 d-flex justify-center">
                  <span>PRODUCTOS</span>
                </v-col>
              </v-row>
            </v-btn>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-btn text color="primary" height="100" width="100" class="btn-navigation"
              active-class="btn-navigation-active" to="/socios">
              <v-row dense>
                <v-col class="col-12 d-flex justify-center">
                  <v-icon>mdi-account-plus</v-icon><br>
                </v-col>
                <v-col class="col-12 d-flex justify-center">
                  <span>SOCIOS</span>
                </v-col>
              </v-row>
            </v-btn>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-btn text color="primary" height="100" width="100" class="btn-navigation"
              active-class="btn-navigation-active" to="/mensajes">
              <v-row dense>
                <v-col class="col-12 d-flex justify-center">
                  <v-icon>mdi-comment</v-icon><br>
                </v-col>
                <v-col class="col-12 d-flex justify-center">
                  <span>MENSAJES</span>
                </v-col>
              </v-row>
            </v-btn>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-btn text color="primary" height="100" width="100" class="btn-navigation"
              active-class="btn-navigation-active" to="/agenda">
              <v-row dense>
                <v-col class="col-12 d-flex justify-center">
                  <v-icon>mdi-calendar</v-icon><br>
                </v-col>
                <v-col class="col-12 d-flex justify-center">
                  <span>AGENDA</span>
                </v-col>
              </v-row>
            </v-btn>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-btn text color="primary" height="100" width="100" class="btn-navigation"
              active-class="btn-navigation-active" to="/otros">
              <v-row dense>
                <v-col class="col-12 d-flex justify-center">
                  <v-icon>mdi-record</v-icon><br>
                </v-col>
                <v-col class="col-12 d-flex justify-center">
                  <span>OTROS</span>
                </v-col>
              </v-row>
            </v-btn>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-btn text color="primary" height="100" width="100" class="btn-navigation"
              active-class="btn-navigation-active" to="/configuracion">
              <v-row dense>
                <v-col class="col-12 d-flex justify-center">
                  <v-icon>mdi-cog</v-icon><br>
                </v-col>
                <v-col class="col-12 d-flex justify-center">
                  <span>CONFIGURACION</span>
                </v-col>
              </v-row>
            </v-btn>
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>
    <!--
    <v-app-bar app color="secondary" class="elevation-0 background-toolbar" width="120%" style="left:0" height="120">
    </v-app-bar>
      -->
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
  export default {
    middleware:'auth',
    data() {
      return {
        clipped: false,
        drawer: false,
        fixed: false,
      }
    }
  }

</script>

<style lang="scss">
  .background-toolbar {
    background: linear-gradient(90deg, #d53369 0%, #daae51 100%)
  }

  .btn-navigation {
    border: 1px solid #80808024;
    border-radius: 30px!important;
    padding: 0 !important;

    span {
      text-transform: capitalize;
      font-weight: 300;
    }
  }

  .btn-navigation-active {
    span {
      color: white;
    }

    background:linear-gradient(#03989e, #037176);
    border-color:transparent;
  }

  .v-navigation-drawer__border {
    display: none !important;
  }

</style>
