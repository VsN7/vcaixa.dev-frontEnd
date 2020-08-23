<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
        <v-list-item @click="navigateTo('usuarios')">
          <v-icon v-on="on">mdi-account</v-icon>
          <v-list-item-action>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Usuário</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="navigateTo('categorias')">
          <v-icon v-on="on">mdi-note</v-icon>
          <v-list-item-action>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Categoria</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="navigateTo('movimentacoes')">
          <v-icon v-on="on">money</v-icon>
          <v-list-item-action>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Movimentação</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="navigateTo('resumoCaixa')">
          <v-icon v-on="on">mdi-cash</v-icon>
          <v-list-item-action>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Resumo de Caixa</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <p class="ajustaParagrafo" >Meu Caixa</p>
      <div class="d-flex align-end flex-column ts">
       <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <template v-slot:activator="{ on }">
                <div class="">
                    
                </div>
                <a class="nav-link" v-on="on"><i class="far fa-question-circle"></i></a>
            </template>
            <v-card>
                <template>
                    <v-toolbar dark color="primary">
                        <v-btn icon dark @click="dialog = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-toolbar-title>Duvidas</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-btn dark text href="https://www.youtube.com/watch?v=QO451v9H40c" target="_blank">
                                <v-icon>mdi-play</v-icon>
                                Tutorial
                            </v-btn>
                        </v-toolbar-items>
                    </v-toolbar>
                    <v-timeline>
                        <v-timeline-item
                        v-for="n in duvidas"
                        :key="n"
                        large
                        >
                            <template v-slot:icon>
                                <v-avatar>
                                    <img src="https://uploaddeimagens.com.br/images/002/184/354/original/ts3.png?1562787901">
                                </v-avatar>
                            </template>
                            <template v-slot:opposite>
                                <span>{{n.titulo}}</span>
                            </template>
                            <v-card class="elevation-2">
                    
                                <v-card-title class="headline">{{n.subtitulo}}</v-card-title>
                                <v-btn color="#aeddff" dark text :href="n.link" target="_blank">
                                    <v-icon>mdi-play</v-icon>
                                    {{n.descricao}}
                                </v-btn>
                            </v-card>
                        </v-timeline-item>
                    </v-timeline>
                </template>
            </v-card>
        </v-dialog>
      </div>
    </v-app-bar>

    <v-content>
      <v-container
        fluid
        fill-height
      >
        <v-layout
          align-center
          justify-center
        >
          <v-flex class="flex-row">
            <router-view/>
            
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <v-footer app>
      
      <span class="rodape"><v-switch class="ajustaSwitch" v-model="switch1" inset>{{tema()}}</v-switch>&copy; Vitor Santos 2020</span>
    </v-footer>
  </v-app>
</template>

<style scoped>

  .flex-row{
    height: 100%;
    padding: 2% 6%;
  }

  .rodape{
    width:100%;
    text-align:center;
  }
  .fonte{
    font-size: 20px;
  }
  .ts{
   width: 100%;
  }
  .ajustaParagrafo{
    font-size: 1.25rem;
    line-height: 1.5;
    white-space: nowrap;
    margin: 0;
    padding:20px
  }
  .ajustaSwitch{
    width: 0;
    margin:0;
    height: 0;
  }

</style>>
  
<script>

import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbvue/build/css/mdb.css';

export default {
  data(){
    return{
      drawer: true,
      switch1: false,
        items: [
          {
            action: 'mdi-account',
            title: 'Cliente',
            items: [
              { 
                title: 'Cadastro de Cliente' ,
                name: 'cliente',
                
              },
              {
                name: 'listarCliente',
                title: 'Listar Clientes' 
              },
              
            ],
          },
        ],
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
        duvidas: [
        {
          titulo: "Vitor Santos",
          subtitulo: "Gerenciamento de Usuários",
          descricao: "Módulo 01: Gernciamento de Usuários",
          link: "https://youtu.be/QO451v9H40c?t=80"
        },
        {
          titulo: "Vitor Santos",
          subtitulo: "Gerenciamento de Categorias",
          descricao: "Módulo 02: Gernciamento de Categorias",
          link: "https://youtu.be/QO451v9H40c?t=172"
        },
        {
          titulo: "Vitor Santos",
          subtitulo: "Gerenciamento de Movimentação",
          descricao: "Módulo 03: Gernciamento de Movimentações",
          link: "https://youtu.be/QO451v9H40c?t=349"
        },
        {
          titulo: "Vitor Santos",
          subtitulo: "Relatório de Resumo de Caixa",
          descricao: "Módulo 04: Relatório de Resumo de Caixa",
          link: "https://youtu.be/QO451v9H40c?t=544"
        },
        {
          titulo: "Vitor Santos",
          subtitulo: "Manipulação do site (Compilado Geral)",
          descricao: "Manipulação do site (Compilado Geral)",
          link: "https://www.youtube.com/watch?v=QO451v9H40c"
        }
        ],
           
    }
  },
  methods: {
    navigateTo(where){
      this.$router.push({name: where})
    },
    tema(){
      if(this.switch1 == true)
        this.$vuetify.theme.dark = false
      else
        this.$vuetify.theme.dark = true
    }
  },
  created () {
      this.$vuetify.theme.dark = true
      alert('Bem vindo ao meu caixa')
    }
};
</script>
