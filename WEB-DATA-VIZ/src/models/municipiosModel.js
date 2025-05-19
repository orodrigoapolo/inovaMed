var database = require("../database/config")

function listar(fkEstado) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");
    
    var instrucaoSql = `
        SELECT * FROM municipio WHERE fkEstado = ${fkEstado};
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

function historico(idMunicipio) {
    var instrucaoSql = `
        SELECT 
            DATE_FORMAT(E.dtEntrada, '%Y-%m') AS mes,
            E.nomeFarmaco AS remedio,
            SUM(E.qtdFarmaco) AS total_comprado,
            ROUND(M.qtdPopulacao * 0.2) AS estimativa_asmaticos
        FROM Estoque E
        JOIN Municipio M ON E.fkMunicipio = M.idMunicipio
        WHERE E.dtEntrada IS NOT NULL
            AND E.fkMunicipio = ${idMunicipio}
        GROUP BY mes, remedio
        ORDER BY mes;
    `;
    console.log("Executando SQL do histórico:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function vencimentos(idMunicipio) {
    var instrucaoSql = `
        SELECT
            lote AS nome,
            nomeFarmaco AS remedio,
            DATE_FORMAT(dtValidade, '%Y-%m-%d') AS vencimento,
            qtdFarmaco AS quantidade
        FROM Estoque
        WHERE fkMunicipio = ${idMunicipio}
          AND dtValidade >= CURDATE()
        ORDER BY dtValidade
        LIMIT 4;
    `;
    return database.executar(instrucaoSql);
}
function periodos(idMunicipio) {
    const instrucaoSql = `
     
        SELECT 
            nomeFarmaco AS remedio,
            
            SUM(CASE 
                WHEN YEAR(e.dtEntrada) = 2024 AND MONTH(e.dtEntrada) = 12 THEN e.qtdFarmaco
                ELSE 0
            END) AS periodo_atual,

            SUM(CASE 
                WHEN YEAR(e.dtEntrada) = 2025 AND MONTH(e.dtEntrada) = 1 THEN e.qtdFarmaco
                ELSE 0
            END) AS periodo_anterior

        FROM estoque e
        WHERE e.fkMunicipio = ${idMunicipio}
          AND (
              (YEAR(e.dtEntrada) = 2024 AND MONTH(e.dtEntrada) = 12)
              OR
              (YEAR(e.dtEntrada) = 2025 AND MONTH(e.dtEntrada) = 1)
          )
        GROUP BY nomeFarmaco
        ORDER BY nomeFarmaco;
    `;

    console.log("SQL periodos:", instrucaoSql);

    return database.executar(instrucaoSql).catch(erro => {
        console.error("Erro na query periodos:", erro);
        throw erro;
    });
}

module.exports = {
    listar,
    editar,
    historico,
    vencimentos,
    periodos
};