var database = require("../database/config")

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function listarKPITotalUsuarios(){

    var instrucaoSql = `SELECT COUNT(idUsuario) AS total_usuarios FROM usuario;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarKPIQuantidadeCoordenadores(){

    var instrucaoSql = `SELECT COUNT(idUsuario) AS qtd_coordenadores FROM usuario WHERE dtInativo IS NOT NULL;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarKPIEstadoComMaisCoordenadores(){

    var instrucaoSql = `SELECT e.nome AS nome_estado FROM usuario JOIN estado AS e WHERE fkEstado = idEstado GROUP BY fkEstado LIMIT 1;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function graficoUsuarioEstado(){

    var instrucaoSql = `SELECT 
    estado.nome as estados,
    SUM(CASE WHEN usuario.cargo = 'Coordenador Municipal' THEN 1 ELSE 0 END) AS totalMunicipal,
    SUM(CASE WHEN usuario.cargo = 'Coordenador Estadual' THEN 1 ELSE 0 END) AS totalEstadual,
    SUM(
        CASE 
            WHEN usuario.cargo = 'Coordenador Municipal' THEN 1 
            WHEN usuario.cargo = 'Coordenador Estadual' THEN 1 
            ELSE 0 
        END
    ) AS totalCoordenadores
FROM usuario
JOIN estado ON usuario.fkEstado = estado.idEstado
GROUP BY estados;
`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function graficoFaixaEtaria(){

    var instrucaoSql = `SELECT 
    CASE 
        WHEN TIMESTAMPDIFF(YEAR, dtNasc, CURDATE()) BETWEEN 18 AND 25 THEN '18-25'
        WHEN TIMESTAMPDIFF(YEAR, dtNasc, CURDATE()) BETWEEN 26 AND 35 THEN '26-35'
        WHEN TIMESTAMPDIFF(YEAR, dtNasc, CURDATE()) BETWEEN 36 AND 49 THEN '36-49'
        ELSE '50+' 
    END AS faixa_etaria,
    SUM(CASE WHEN cargo = 'Coordenador Municipal' THEN 1 ELSE 0 END) AS totalMunicipais,
    SUM(CASE WHEN cargo = 'Coordenador Estadual' THEN 1 ELSE 0 END) AS totalEstaduais,
    COUNT(*) AS totalCoordenadores
FROM usuario
WHERE cargo IN ('Coordenador Municipal', 'Coordenador Estadual')
GROUP BY faixa_etaria
ORDER BY faixa_etaria;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function graficoGenero(){

    var instrucaoSql = `SELECT 
    genero,
    COUNT(*) AS total
FROM usuario
GROUP BY genero
ORDER BY total DESC;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    listarKPITotalUsuarios,
    listarKPIQuantidadeCoordenadores,
    listarKPIEstadoComMaisCoordenadores,
    graficoUsuarioEstado,
    graficoFaixaEtaria,
    graficoGenero
};