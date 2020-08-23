# Meu Caixa

.![vcaixa](https://uploaddeimagens.com.br/images/002/844/751/original/meu_caixa.PNG?1598212172)

## Descrição do projeto

Esse projeto é um sistema focado em gerenciar as movimentações de caixa.

## Tecnologias utilizadas

- JavaScript
- Node.js
- Vue.js
- HTML
- CSS

## Download do projeto

- Para iniciarmos a instalação é necessário fazer o download do projeto, clicando no botão "Code" e em seguida em "Download ZIP" ou copiando a URL (essa opção de download é interessante caso tenha o Git instalado na maquina).

Link para a instalação do Git: https://git-scm.com/book/pt-br/v2/Come%C3%A7ando-Instalando-o-Git

.![git clone](https://uploaddeimagens.com.br/images/002/844/753/original/githuub.png?1598212428)

## Instalação do projeto

- Primeiramente é importante verificar se o Node está instalado corretamente na maquina, caso não esteja, segue abaixo o link para a sua instalação:
Link para a instalação do Node: https://nodejs.org/pt-br/download/package-manager/

- Abra o terminal apertanto as teclas "Windows + R" e digite "CMD" ou procure por "CMD" no campo de pesquisa. (caso esteja utilizando o Linux, aperte as teclas "Ctrl + Alt + T", ou digite "terminal no campo de pesquisa" ).

.![como abrir o terminal](https://uploaddeimagens.com.br/images/002/844/468/full/prompt.PNG?1598196010)

- Para aqueles que opitaram por instalar via URL disponibilizada no GitHub e estão com o Git devidamente configurado, basta digitar no terminal o comando "git clone " e logo a frente informar a URL, após isso entre no diretório do projeto. Quem opitou por abaixar o arquivo zipado deve descompactalo e abrir o terminal no seu diretório.

.![primeiro passo terminal](https://uploaddeimagens.com.br/images/002/844/758/original/git_vue.png?1598212771)

- Digite o comando "npm install", isso irá criar instalar uma diretório chamado "node_modules", aonde estará guardada todas as dependencias do projeto (esse processo pode demorar um pouco).

.![node_modules](https://uploaddeimagens.com.br/images/002/844/774/original/npm_install.png?1598213512)

- Digite o comando "npm run serve" para iniciar a aplicação de modo que se possa fazer alterações ou "npm start" para apenas iniciar o compilado da aplicação e pronto, o sistema está em perfeito funcionamento.

.![conected](https://uploaddeimagens.com.br/images/002/844/780/original/start.png?1598214071)

### Observação: Caso esteja utilizando a API vcaixa.dev e a mesma estiver iniciada em sua maquina é necessário abrir a o arquivo /src/services/api.js e alterar a url para 'http://localhost:3000/api'(fique atento a qual porta está sendo utilizada na API)
