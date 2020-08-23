<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title >Meu Caixa</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="E-mail"
                    name="login"
                    v-model="login"
                    prepend-icon="person"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Senha"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    v-model="senha"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="verificarLogin()">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
  
</template>


<script>
import Vue from 'vue'
import App from './components/App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import VueLanguage from 'vue-multilanguage'
import api from './services/api'
  export default {
    data: () => ({
      login: '',
      senha: ''
    }),
    methods: {
        async verificarLogin () {
          try{
            await api.get('/usuario/'+this.login).then( response => {
                if(response.data.email == this.login &&response.data.senha == this.senha) {
                    Vue.config.productionTip = false

                    new Vue({
                        VueLanguage,
                        vuetify,
                        router,
                        render: h => h(App)
                    }).$mount('#inspire')
                } else {
                    alert("E-mail ou senha incorreto(s)")
                }
            });
          } catch(e) {
            alert("E-mail ou senha incorreto(s)")
          }
        },
        navigateTo(where){
            this.$router.push({name: where})
        }
    }
  }
</script>