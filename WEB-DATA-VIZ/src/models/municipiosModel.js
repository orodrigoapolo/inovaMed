var database = require("../database/config")

function listar(fkEstado) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");
    
    var instrucaoSql = `
        SELECT
            idMunicipio as idMunicipio,
            nome as nome 
        FROM municipio WHERE fkEstado = ${fkEstado};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function editar(idUsuario, email, senha, nome, cpf, dtNasc, genero) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():");
    var instrucaoSql = `
        UPDATE usuario SET nome = '${nome}', cpf = ${cpf}, email = '${email}', senha = '${senha}', dtNasc = '${dtNasc}', genero = '${genero}' WHERE idUsuario = ${idUsuario};
    `;  
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listar,
    editar
};