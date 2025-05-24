
var database = require("../database/config")

function historico(idEstado) {
    var instrucaoSql = `
        SELECT 
            DATE_FORMAT(E.dtEntrada, '%m-%Y') AS mes,
            CASE
                WHEN E.nomeFarmaco LIKE '%BECLOMETASONA%' THEN 'BECLOMETASONA'
                WHEN E.nomeFarmaco LIKE '%SALBUTAMOL%' THEN 'SALBUTAMOL'
                WHEN E.nomeFarmaco LIKE '%PREDNISONA%' THEN 'PREDNISONA'
                WHEN E.nomeFarmaco LIKE '%FORMOTEROL%' THEN 'FORMOTEROL'
                WHEN E.nomeFarmaco LIKE '%FORMOTEROL + BUDESONIDA%' THEN 'FORMOTEROL + BUDESONIDA'
                -- adicione mais conforme necessário
                ELSE 'OUTROS'
            END AS remedio,
            SUM(E.qtdFarmaco) AS total_comprado,
            SUM(ROUND(municipio.qtdPopulacao * 0.2)) AS estimativa_asmaticos
        FROM estoque E
        JOIN municipio ON E.fkMunicipio = municipio.idMunicipio
        JOIN estado ON municipio.fkEstado = estado.idEstado
        WHERE E.dtEntrada IS NOT NULL
        AND estado.idEstado = ${idEstado}
        GROUP BY mes, remedio
        ORDER BY mes;
    `;
    console.log("Executando SQL do histórico:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function municipios(idEstado) {
    var instrucaoSql = `
        SELECT
            SUM(E.qtdFarmaco) AS total_comprado,
            m.nome AS municipio,
            SUM(ROUND(m.qtdPopulacao * 0.2)) AS estimativa_asmaticos
        FROM estoque E
        JOIN municipio m ON E.fkMunicipio = m.idMunicipio
        JOIN estado ON m.fkEstado = estado.idEstado
        WHERE E.dtEntrada IS NOT NULL
        AND estado.idEstado = ${idEstado}
        GROUP BY m.idMunicipio
        HAVING total_comprado <= (estimativa_asmaticos * 0.5) 
        ORDER BY m.idMunicipio;
    `;
    console.log("Executando SQL dos municípios:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function periodos(idEstado) {
    var instrucaoSql =  `
        SELECT
            nomeFarmaco AS remedio,
            SUM(CASE WHEN dtEntrada >= CURDATE() - INTERVAL 10 DAY THEN qtdFarmaco ELSE 0 END) AS periodo_atual,
            SUM(CASE WHEN dtEntrada >= CURDATE() - INTERVAL 30 DAY AND dtEntrada < CURDATE() - INTERVAL 10 DAY THEN qtdFarmaco ELSE 0 END) AS periodo_anterior
        FROM estoque E
        JOIN municipio ON E.fkMunicipio = municipio.idMunicipio
        JOIN estado ON municipio.fkEstado = estado.idEstado
        WHERE dtEntrada >= CURDATE() - INTERVAL 30 DAY
        AND fkEstado = ${idEstado}
        GROUP BY nomeFarmaco
        ORDER BY nomeFarmaco;
    `;

    console.log("SQL periodos:", instrucaoSql);

    return database.executar(instrucaoSql).catch(erro => {
        console.error("Erro na query periodos:", erro);
        throw erro; // para propagar o erro para o controller
    });
}
module.exports = {
    historico,
    municipios,
    periodos
};
