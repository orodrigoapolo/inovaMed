var database = require("../database/config")

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function configurar(max, min, idUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO marcador (idMarcador, max, min, fkUsuario) VALUES (default, '${max}', '${min}', ${idUsuario});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    
    return database.executar(instrucaoSql);
}

function exibir(idUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        SELECT * FROM marcador WHERE fkUsuario = ${idUsuario} ORDER BY idMarcador DESC LIMIT 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    
    return database.executar(instrucaoSql);
}

module.exports = {
    configurar,
    exibir
};