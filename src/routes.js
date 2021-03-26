const express = require('express')
const routes = express.Router()
const cors = require('cors');
const axios = require('axios');

routes.use(express.json());
routes.use(cors());

const tokeen = [{
  token: 0,
  tokenExpiration: 0
}];
const dados = []


function date (timestamp){
  const date = new Date(timestamp)

  //yyyy
  const year = date.getUTCFullYear()
  //mm
  const month = `0${date.getUTCMonth() + 1}`.slice(-2)
  //dd
  const day = `0${date.getUTCDate()}`.slice(-2)

  const hours = date.getHours()

  const minutes = date.getMinutes()

  const seconds = date.getSeconds()
  

  return {
  
      iso: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  } 
}
routes.post('/geraToken', async(req, res) => {
  const { usuario, senha } = req.body
  const auth = { usuario, senha }
  const  { data }  = await axios.post('http://servicosflex.rpinfo.com.br:9000/v1.1/auth', auth)
  
  let { token, tokenExpiration } = data.response

  
  const tokens = {
    token,
    tokenExpiration,
  };

   const tokeenIndex = tokeen.indexOf(tokeen);

    tokeen.splice(tokeenIndex, 1)

    tokeen.push(tokens)

    return res.json(tokens)
}) 

routes.get('/consulta', async (req, res) => {
  const now = Date.now()
  const nowFormat = date(now)


  if(tokeen[0].tokenExpiration === 0 || nowFormat < tokeen[0].tokenExpiration){
    return res.json({error: "Você não possui um token ou seu token expirou! Gere um novo"})
  }

  const meuToken =  tokeen[0].token
  const { data } = await axios.get('http://servicosflex.rpinfo.com.br:9000/v2.0/produtounidade/listaprodutos/0/unidade/83402711000110?token=', {
    headers: {
      'token': `${meuToken}`
    }
  });

  const produtos = (data.response.produtos)
  
  for(let i = 0; produtos.length > i; i++){
    let { Codigo, Descricao, Preco, CodigoBarras } = produtos[i]
  
  dados.push({
    codigo_interno: Codigo, 
    descricao: Descricao, 
    valor_unitario: Preco, 
    codigo_de_barras: CodigoBarras
  })
}
  //const dados = data.response.produtos[0].Codigo

  return res.json(dados)
})
module.exports = routes

