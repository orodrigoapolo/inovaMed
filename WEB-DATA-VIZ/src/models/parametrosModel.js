var database = require("../database/config")

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function configurarPrimeiroParametroMedicamento(max, min, param, idUsuario) {
    console.log("ACESSEI O parametro MODEL \n \n\t\t function configurarPrimeiroParametroMedicamento():");
    
    var instrucaoSql = `
        INSERT INTO marcador (tipoParametro, max, min, fkUsuario) VALUES ('${param}', ${max}, ${min}, ${idUsuario});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    
    return database.executar(instrucaoSql);
}

function configurarPrimeiroParametroGrafico(porc, param, idUsuario) {
    console.log("ACESSEI O parametro MODEL \n \n\t\t function configurarPrimeiroParametroGrafico():");
    
    var instrucaoSql = `
        INSERT INTO marcador (tipoParametro, min, fkUsuario) VALUES ('${param}', ${porc}, ${idUsuario});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    
    return database.executar(instrucaoSql);
}

function configurarParametroMedicamento(max, min, param, idUsuario) {
    console.log("ACESSEI O parametro MODEL \n \n\t\t function configurarParametro():");
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
            UPDATE marcador SET max = ${max}, min = ${min} WHERE fkUsuario = ${idUsuario} AND tipoParametro = "${param}";
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    
    return database.executar(instrucaoSql);
}

function configurarParametroGrafico(porc, param, idUsuario) {
    console.log("ACESSEI O parametro MODEL \n \n\t\t function configurarParametro():");
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
            UPDATE marcador SET min = ${porc} WHERE fkUsuario = ${idUsuario} AND tipoParametro = "${param}";
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    
    return database.executar(instrucaoSql);
}

function exibirParametroMedicamento(idUsuario) {
    console.log("ACESSEI O parametro MODEL \n \n\t\t function exibirParametroMedicamento():");
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        SELECT * FROM marcador WHERE fkUsuario = ${idUsuario} AND tipoParametro = "medicamento" ORDER BY idMarcador DESC LIMIT 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    
    return database.executar(instrucaoSql);
}

function exibirParametroGrafico(idUsuario) {
    console.log("ACESSEI O parametro MODEL \n \n\t\t function exibirParametroGrafico():");
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        SELECT * FROM marcador WHERE fkUsuario = ${idUsuario} AND tipoParametro = "grafico" ORDER BY idMarcador DESC LIMIT 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    
    return database.executar(instrucaoSql);
}

function deletarParametroMedicamento(param, idUsuario) {
    console.log("ACESSEI O parametro MODEL function deletarParametroMedicamento():");
    
    var instrucaoSql = `
        DELETE FROM marcador WHERE fkUsuario = ${idUsuario} AND tipoParametro = "${param}";
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    
    return database.executar(instrucaoSql);
}

function deletarParametroGrafico(param, idUsuario) {
    console.log("ACESSEI O parametro MODEL function deletarParametroMedicamento():");
    
    var instrucaoSql = `
        DELETE FROM marcador WHERE fkUsuario = ${idUsuario} AND tipoParametro = "${param}";
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    
    return database.executar(instrucaoSql);
}

function configurarNovoParametroMedicamento(max, min, param, idUsuario) {
    console.log("ACESSEI O parametro MODEL \n \n\t\t function configurarNovoParametroMedicamento():");
    
    var instrucaoSql = `
        INSERT INTO marcador (tipoParametro, max, min, fkUsuario) VALUES ('${param}', ${max}, ${min}, ${idUsuario});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    
    return database.executar(instrucaoSql);
}

function configurarNovoParametroGrafico(porc, param, idUsuario) {
    console.log("ACESSEI O parametro MODEL \n \n\t\t function configurarNovoParametroGrafico():");
    
    var instrucaoSql = `
        INSERT INTO marcador (tipoParametro, min, fkUsuario) VALUES ('${param}', ${porc}, ${idUsuario});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    
    return database.executar(instrucaoSql);
}

module.exports = {
    configurarParametroMedicamento,
    configurarParametroGrafico,
    configurarPrimeiroParametroMedicamento,
    configurarPrimeiroParametroGrafico,
    exibirParametroMedicamento,
    exibirParametroGrafico,
    deletarParametroMedicamento,
    deletarParametroGrafico,
    configurarNovoParametroGrafico,
    configurarNovoParametroMedicamento
};