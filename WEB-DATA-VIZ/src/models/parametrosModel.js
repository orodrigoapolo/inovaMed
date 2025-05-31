var database = require("../database/config")

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function configurarPrimeiroParametro(max, min, idUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO marcador (max, min, fkUsuario) VALUES (${max}, ${min}, ${idUsuario});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    
    return database.executar(instrucaoSql);
}

function configurarParametro(max, min, idUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
            UPDATE marcador SET max = ${max}, min = ${min} WHERE fkUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    
    return database.executar(instrucaoSql);
}

function exibirParametro(idUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        SELECT * FROM marcador WHERE fkUsuario = ${idUsuario} ORDER BY idMarcador DESC LIMIT 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    
    return database.executar(instrucaoSql);
}

function buscarAlertas(idUsuario) {
    var instrucaoSql = `
        SELECT 
            e.nomeFarmaco,
            SUM(e.qtdFarmaco) AS total_qtd,
            MIN(m.min) AS min,
            MAX(m.max) AS max
        FROM 
            usuario u
        JOIN marcador m ON m.fkUsuario = u.idUsuario
        JOIN estoque e ON e.fkMunicipio = u.fkMunicipio
        WHERE
            u.idUsuario = ${idUsuario}
            AND (e.dtValidade IS NULL OR e.dtValidade >= CURRENT_DATE)
        GROUP BY 
            e.nomeFarmaco
        HAVING 
            total_qtd < min OR total_qtd > max;
    
    `;
    console.log("Executando a instrução SQL para alertas: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    configurarParametro,
    configurarPrimeiroParametro,
    exibirParametro,
 buscarAlertas
};