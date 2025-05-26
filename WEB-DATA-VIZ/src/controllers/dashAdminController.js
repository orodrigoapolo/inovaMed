var dashAdminModel = require("../models/dashAdminModel");


function listarKPITotalUsuarios(req, res) {
    
    dashAdminModel.listarKPITotalUsuarios().then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado); 
      } else {
        res.status(204).json([]); // Sem conteúdo
      }
    }).catch((erro) => {
      console.error("Houve um erro ao buscar os jogos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage); // Erro interno
    });
  }

  function listarKPIQuantidadeCoordenadores(req, res) {
  
    dashAdminModel.listarKPIQuantidadeCoordenadores().then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado); 
      } else {
        res.status(204).json([]); // Sem conteúdo
      }
    }).catch((erro) => {
      console.error("Houve um erro ao buscar os jogos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage); // Erro interno
    });
  }

  function listarKPIEstadoComMaisCoordenadores(req, res) {
   
    dashAdminModel.listarKPIEstadoComMaisCoordenadores().then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado); 
      } else {
        res.status(204).json([]); // Sem conteúdo
      }
    }).catch((erro) => {
      console.error("Houve um erro ao buscar os jogos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage); // Erro interno
    });
  }


  function graficoUsuarioEstado(req, res) {
   
    dashAdminModel.graficoUsuarioEstado().then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado); 
      } else {
        res.status(204).json([]); // Sem conteúdo
      }
    }).catch((erro) => {
      console.error("Houve um erro ao buscar os jogos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage); // Erro interno
    });
  }

  function graficoFaixaEtaria(req, res) {
   
    dashAdminModel.graficoFaixaEtaria().then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado); 
      } else {
        res.status(204).json([]); // Sem conteúdo
      }
    }).catch((erro) => {
      console.error("Houve um erro ao buscar os jogos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage); // Erro interno
    });
  }

  function graficoGenero(req, res) {
   
    dashAdminModel.graficoGenero().then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado); 
      } else {
        res.status(204).json([]); // Sem conteúdo
      }
    }).catch((erro) => {
      console.error("Houve um erro ao buscar os jogos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage); // Erro interno
    });
  }

module.exports = {
    listarKPITotalUsuarios,
    listarKPIQuantidadeCoordenadores,
    listarKPIEstadoComMaisCoordenadores,
    graficoFaixaEtaria,
    graficoUsuarioEstado,
    graficoGenero

}