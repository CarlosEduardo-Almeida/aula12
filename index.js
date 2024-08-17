const express = require ('express');
const api = express();
const URL_BD = "mongodb+srv://liveaction:1234@liveaction.ax7sg.mongodb.net/?retryWrites=true&w=majority&appName=liveaction"
const portApi = 3000;
const mongoose = require('mongoose');

mongoose.connect(URL_BD);

mongoose.connection.on("connected" , () => {
    console.log('API conectada ao BD')
})

mongoose.connection.on("disconnected" , () => {
    console.log('API desconectada')
})

mongoose.connection.on("error" , (erro) => {
    console.log('Erro ao conectar ao banco de dados ', erro)
})

//function() {} é similar a () => {}

api.get('/status', function (req, res) {
    req.send('<h3>API Online!</h3>');
})

api.listen(portApi, function() {
    console.log('API Online!');
})

const produtosController = require('./controller/produto.js');
api.get('/produtos', produtosController.listarProdutos); 
api.post('/produto', produtosController.adicionarProduto);
api.put('/produto', produtosController.editarProduto);
api.delete('/produto', produtosController.removerProduto);