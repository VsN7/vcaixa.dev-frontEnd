<template>
<div>
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
      <v-toolbar-title align="center" class="titulo">Resumo de Caixa</v-toolbar-title>
      <v-toolbar flat color="gray">
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Pesquisar"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-col cols="12" sm="6" md="4">
            <v-text-field v-mask="maskData" v-model="editedItem.data" label="Informe a data de movimentação"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="2">
            <v-btn color="primary" dark class="mb-2" @click="retornarListaPorData()"><v-icon>search</v-icon></v-btn>
        </v-col>        
      </v-toolbar>
    </template>
    <template v-slot:item.data="{ item }">
        <span>{{new Date(item.data).toLocaleString().substr(0,10).replace('-','/')}}</span>
    </template>
    <template class="asa" v-slot:no-data>
      <span>Não há nenhum registro para exibição.</span>
    </template>
  </v-data-table>
    <span>Data Pesquisada: <span style="color: rgb(120,200,120); font-weight: bold">{{editedItem.data == '' ? 'Nehuma Data Informada' : editedItem.data}}</span> <br/>
        Valor Total: <span style="color: rgb(120,200,120); font-weight: bold">{{valorTotal}}</span>
    </span>
</div>
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
        }
      ],
      lista: [
        
      ],
      valorTotal: 0,
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
    methods: {
        async retornarListaPorData(){
            await api.get(`/movimentacao/${ new Date(this.formataStringData(this.editedItem.data))}`).then(response => {
                this.valorTotal = 0
                this.lista = response.data
                this.somarValores()
            });
        },
        somarValores() {
            var index = 0;
            while(index < this.lista.length ) {
                this.valorTotal+= this.lista[index].valor;
                index++
            }
        },
        
       formataStringData(data) {
        var dia  = data.split("/")[0];
        var mes  = data.split("/")[1];
        var ano  = data.split("/")[2];

        return ("0"+mes).slice(-2) + '/' + ("0"+dia).slice(-2) + '/' + ano;
      },
      navigateTo(where){
        this.$router.push(where)
      },
    }
  }
</script>