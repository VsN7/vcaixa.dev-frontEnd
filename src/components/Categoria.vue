<template>
  <v-data-table
    :headers="headers"
    :items="lista"
    :search="search"
    :key="lista.id"
    sort-by="nome"
    class="elevation-1"
    id="myTable"
  >
    <template  v-slot:top>
      <v-toolbar-title align="center" class="titulo">Cadastro de Categorias</v-toolbar-title>
      <v-toolbar flat color="gray">
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Pesquisar"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="650px">
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
                    <v-text-field v-model="editedItem.nome" label="Informe o nome da categoria"></v-text-field>
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
  #myTable{
    font-size: 30px;
    font-size:150%
  }

</style>

<script>
  import { mask } from 'vue-the-mask'
  import { validationMixin } from 'vuelidate'
  import api from '../services/api'
  export default {
    default: 'pt',
    mixins: [validationMixin],
    directives: {
      mask
    },
    data: () => ({
      dialog: false,
      search: '',
      headers: [
        {
          text: 'Nome da Categoria',
          align: 'left',
          sortable: true,
          value: 'nome',
        },
        { 
          text: 'Ações',
          align: 'center', 
          value: 'action', 
          sortable: false 
        },
      ],
      lista: [
        
      ],
      editedIndex: -1,
      editedItem: {
        _id: '',
        nome: ''
      },
      defaultItem: {
        _id: '',
        nome: ''
      },
    }),
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nova Categoria' : 'Editar Categoria'
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
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
        confirm('Deseja realmente excluir essa categoria?') && this.lista.splice(index, 1) 
        && await api.delete(`/categoria/${item._id}`) && alert('Categoria deletada com sucesso!')
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      async createCategoria(){
          await api.post("categoria", {
            nome: this.editedItem.nome
          });
          await api.get('/categoria').then(response => {
            this.lista.push(response.data[response.data.length-1])
          });
          alert("Cadastro realizado com sucesso!!")
          this.close()
      },
      async save () {
        if (this.editedIndex > -1) {
          Object.assign(this.lista[this.editedIndex], this.editedItem)
          await api.put(`/categoria/${this.editedItem._id}`,{
            nome: this.editedItem.nome
          })
          alert("Alteração realizada com sucesso!")
          this.close()
        } else {
          this.createCategoria()
        }
      },
      navigateTo(where){
        this.$router.push(where)
      },
    },
    async mounted(){
        await api.get('/categoria').then(response => {
        this.lista = response.data
      });
    }
  }
</script>