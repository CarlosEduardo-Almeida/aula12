const Produtos = require("../model/produto");

exports.listarProdutos = async (req, res) => {
  try {
    const produtos = await Produtos.find({});
    res.send(produtos);
  } catch (erro) {
    console.log(erro);
    res.send({ msg: "[ERRO]: ERRO o listar", descricao: erro });
  }
};

exports.adicionarProduto = async (req, res) => {
  //req.body OU req.params OU req.query
  const novoProduto = req.headers;
  
  if(!novoProduto.nome || !novoProduto.preco){
    res.send({ msg: '[ERRO]Informar nome e preço!'});

  }else {
    try{
      await Produtos.create(novoProduto);
      res.send({ msg: '[SUCESSO]: Produto adicionado!'})
    } catch(erro) {
      console.log(erro);
      res.send({msg: '[ERRO] Erro ao cadastrar'});
    }
  }
}

exports.editarProduto = async (req, res) => {
  const produto = req.headers;
  if(!produto.nome){
    return res.send({ msg: '[ERRO]: Informar nome!'})
  }
  try {
    const produtoEditado= await Produtos.findOneAndUpdate(
      { nome: produto.nome}, {preco: produto,  preco}, { preco: produto.preco})

    if(produtoEditado == null)
      res.send({ msg: '[AVISO Produto não existe no BD!'})
    else
      res.send({ msg: '[SUCESSO]: Produto editado! '})
  } catch(erro) { 
    console.log(erro);
    res.send({ msg: '[ERRO]: Erro ao editar' })
  }
}

exports.removerProduto = async (req, res) => {
  const produto = req.headers;
  if(!produto.nome){
    return res.send({ msg: '[ERRO]: Informar nome!'})
  }
  try {
    const produtoRemovido= await Produtos.findByIdAndDelete(
      { nome: produto.nome}, {preco: produto})

    if(produtoRemovido == null)
      res.send({ msg: '[AVISO Produto não existe no BD!'})
    else
      res.send({ msg: '[SUCESSO]: Produto removido! '})
  } catch(erro) { 
    console.log(erro);
    res.send({ msg: '[ERRO]: Erro ao remover' })
  }
}