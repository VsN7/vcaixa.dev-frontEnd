<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :search="search"
    :key="desserts.id"
    sort-by="nome"
    class="elevation-1"
    id="myTable"
  >
  
    <template  v-slot:top>
      <v-toolbar-title align="center" class="titulo">Cadastro de Movimentações</v-toolbar-title>
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
                    <v-text-field v-model="editedItem.tipo" label="Informe tipo de movimentação"></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.valor" label="Informe o valor"></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-mask="maskData" v-model="editedItem.data" label="Informe a data de movimentação"></v-text-field>
                  </v-col>
                  
                  <v-col cols="12">
                    <v-autocomplete
                        v-model="editedItem.categoria"
                        :items="categorias"
                        item-text="nome"
                        return-object
                        dense
                        filled
                        label="Informe a categoria"
                    />
                  </v-col>
                  <v-col cols="12" sm="6" md="12">
                    <v-textarea v-model="editedItem.descricao" label="Informe a descrição"></v-textarea>
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
    <template v-slot:item.data="{ item }">
           <span>{{new Date(item.data).toLocaleString().substr(0,10).replace('-','/')}}</span>
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
      maskData: "##/##/####",
      dialog: false,
      search: '',
      menu: false,
      headers: [
        {
          text: 'Tipo de Pagamento',
          align: 'left',
          sortable: true,
          value: 'tipo',
        },
        {
          text: 'Valor',
          align: 'left',
          sortable: true,
          value: 'valor',
        },
        {
          text: 'Data',
          align: 'left',
          sortable: true,
          value: 'data',
        },
        {
          text: 'Categoria',
          align: 'left',
          sortable: true,
          value: 'categoria.nome',
        },
        {
          text: 'Descricao',
          align: 'left',
          sortable: true,
          value: 'descricao',
        },
        { 
          text: 'Ações',
          align: 'center', 
          value: 'action', 
          sortable: false 
        },
      ],
      desserts: [
        
      ],
      categorias: [
        
      ],
      editedIndex: -1,
      editedItem: {
        _id: '',
        tipo: '',
        valor: 0,
        descricao: '',
        data: '',
        categoria: null
      },
      defaultItem: {
        _id: '',
        tipo: '',
        valor: 0,
        descricao: '',
        data: '',
        categoria: null
      },
    }),
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nova Movimentação' : 'Editar Movimentação'
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
    },
    methods: {
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
        this.editedItem._id = item._id
      },
      async deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('Deseja realmente excluir essa movimentacao?') && this.desserts.splice(index, 1) 
        && await api.delete(`/movimentacao/${item._id}`)
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      async createMovimentacao(){
          await api.post("movimentacao", {
            tipo: this.editedItem.tipo,
            valor: this.editedItem.valor,
            descricao: this.editedItem.descricao,
            data:  new Date(this.formataStringData(this.editedItem.data)),
            categoria: this.editedItem.categoria
          });
          alert("Cadastro realizado com sucesso!!")
          this.editedItem.data = this.dataFormatoBR(this.editedItem.data)
          this.desserts.push(this.editedItem)
          this.close()
      },
      async save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
          await api.put(`/movimentacao/${this.editedItem._id}`,{
            tipo: this.editedItem.tipo,
            valor: this.editedItem.valor,
            descricao: this.editedItem.descricao,
            categoria: this.editedItem.categoria
          })
          alert("Alteração realizada com sucesso!")
          this.close()
        } else {
          this.createMovimentacao()
        }
      },
       formataStringData(data) {
        var dia  = data.split("/")[0];
        var mes  = data.split("/")[1];
        var ano  = data.split("/")[2];

        return ("0"+mes).slice(-2) + '/' + ("0"+dia).slice(-2) + '/' + ano;
      },
      dataFormatoBR(data) {
        var mes  = data.split("/")[0];
        var dia  = data.split("/")[1];
        var ano  = data.split("/")[2];

        return ("0"+dia).slice(-2) + '/' + ("0"+mes).slice(-2) + '/' + ano;
      },
      navigateTo(where){
        this.$router.push(where)
      },
    },
    async mounted(){
        await api.get('/movimentacao').then(response => {
            this.desserts = response.data
        });
        await api.get('/categoria').then(response => {
            this.categorias = response.data
        });
    }
  }
</script>