var database = require("../database/config")

function exibir() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");
    
    var instrucaoSql = `
        SELECT * FROM log;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscar(tipo, titulo, descricao, data) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():");
    var instrucaoSql = `
        SELECT * FROM log 
        WHERE tipo LIKE '%${tipo}%' OR titulo LIKE '%${titulo}%' OR descricao LIKE '%${descricao}%' OR dtLog LIKE '%${data}%';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    exibir,
    buscar
};