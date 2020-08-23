import Vue from 'vue'
import Router from 'vue-router'
import Usuario from './views/Usuario'
import Categoria from './views/Categoria.vue'
import Movimentacao from './views/Movimentacao.vue'
import ResumoCaixa from './views/ResumoCaixa.vue'

Vue.use(Router)

export default new Router({
    routes:[
        {
            path:'/usuarios',
            name:'usuarios',
            component: Usuario
        },
        {
            path:'/categorias',
            name:'categorias',
            component: Categoria
        },
        {
            path:'/movimentacoes',
            name:'movimentacoes',
            component: Movimentacao
        },
        {
            path:'/resumoCaixa',
            name:'resumoCaixa',
            component: ResumoCaixa
        }
    ]
})