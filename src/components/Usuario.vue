<template>
  <v-data-table
    :headers="headers"
    :items="lista"
    :search="search"
    :key="lista.id"
    sort-by="usuário"
    class="elevation-1"
    id="myTable"
    
  >
    <template lang="pt-br" v-slot:top>
      <v-toolbar-title align="center" class="titulo">Cadastro de Usuários</v-toolbar-title>
      <v-toolbar flat color="gray">
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Pesquisar"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="600px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on"><v-icon>add</v-icon></v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="12">
                    <v-text-field v-model="editedItem.nome" label="Informe o nome"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="12">
                    <v-text-field v-model="editedItem.email" label="E-mail"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.password"
                      :append-icon="show1 ? 'visibility' : 'visibility_off'"
                      :type="show1 ? 'text' : 'password'"
                      name="input-10-1"
                      label="Informe a Senha"
                      @click:append="show1 = !show1"
                      ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                    v-model="editedItem.passwordN"
                      :append-icon="show2 ? 'visibility' : 'visibility_off'"
                      :type="show2 ? 'text' : 'password'"
                      name="input-10-1"
                      label="Informe a Senha"
                      @click:append="show2 = !show2"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="close">Cancelar</v-btn>
              <v-btn text @click="save">Salvar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        edit
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
        class="mr-2"
      >
        delete
      </v-icon>
    </template>
    <template class="asa" v-slot:no-data>
      <span>Não há nenhum registro para exibição.</span>
    </template>
  </v-data-table>
</template>

<style scoped>

  .titulo{
    padding-top: 2%;
    font-size: 30px;
  }
  .margemIcon{
    margin-right: 5%
  }

</style>

<script>
  import { validationMixin } from 'vuelidate'
  import { required} from 'vuelidate/lib/validators'
  import api from '../services/api'
  export default {
    
    mixins: [validationMixin],
    validations: {
      password: { required},
      passwordN: {required},
    },
    data: () => ({
      dialog: false,
      search: '',
      headers: [
        {
          text: 'Nome',
          align: 'left',
          sortable: true,
          value: 'nome',
        },
        { text: 'E-mail', value: 'email' },
        { text: 'Ações',align: 'center', value: 'action', sortable: false },
      ],
      lista: [
        
      ],
      editedIndex: -1,
      editedItem: {
        _id: '',
        nome: '',
        email: '',
        senha: '',
      },
      defaultItem: {
        nome: '',
        email: '',
        show1: false,
        password: '',
        show2: false,
        passwordN: '',
      },
      show1: false,
      password: '',
      show2: false,
      passwordN: '',
      rules: {
        required: value => !!value || 'Informe a sua senha',
        min: v => v.length >= 8 || 'Informe no minimo 8 caractéres',
      },
    }),
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Novo Usuário' : 'Editar Usuário'
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
    },
    created () {
      this.initialize()
    },
    methods: {
      editItem (item) {
        this.editedIndex = this.lista.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
        this.editedItem._id = item._id
      },
      async deleteItem (item) {
        const index = this.lista.indexOf(item)
        confirm('Deseja realmente remover o cadastro desse usuário?') && this.lista.splice(index, 1) 
        && await api.delete(`/usuario/${item._id}`) && alert('Usuário deletado com sucesso!')
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      async createUser(){
        if(this.editedItem.password != this.editedItem.passwordN){
          alert('As senhas não são iguais!');
        }else{
          await api.post("usuario", {
            nome: this.editedItem.nome,
            email: this.editedItem.email,
            senha: this.editedItem.password
          });
          
          await api.get('/usuario').then(response => {
            this.lista.push(response.data[response.data.length-1])
          });
          alert("Cadastro realizado com sucesso!!")
          
          this.close()
          this.limpar()
        }
      },
      limpar(){
        this.nome = '',
        this.email = '',
        this.show1 = false,
        this.show2 = false,
        this.password = '',
        this.passwordN = ''
      },
      async save () {
        if (this.editedIndex > -1) {
          Object.assign(this.lista[this.editedIndex], this.editedItem)
          await api.put(`/usuario/${this.editedItem._id}`,{
            nome: this.editedItem.nome,
            email: this.editedItem.email,
            senha: this.editedItem.password
          })
          alert("Alteração realizada com sucesso!")
          this.close()
        } else {
          this.createUser()
        }
      },
      navigateTo(where){
        this.$router.push(where)
      },
    },
    async mounted(){
        await api.get('/usuario').then(response => {
        this.lista = response.data
      });
    }
  }
</script>