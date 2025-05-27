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

    function tendencia (idMunicipio){

        var instrucaoSql = `
        SELECT 
        SUM(CASE 
            WHEN DATE_FORMAT(e.dtEntrada, '%Y-%m') = DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 5 MONTH), '%Y-%m') 
            THEN e.qtdFarmaco 
            ELSE 0 
        END) AS mes_anterior,

        SUM(CASE 
            WHEN DATE_FORMAT(e.dtEntrada, '%Y-%m') = DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 4 MONTH), '%Y-%m') 
            THEN e.qtdFarmaco 
            ELSE 0 
        END) AS mes_atual,

        ROUND(SUM(CASE 
            WHEN DATE_FORMAT(e.dtEntrada, '%Y-%m') = DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 4 MONTH), '%Y-%m') 
            THEN e.qtdFarmaco 
            ELSE 0 
        END) * 1.15) AS previsao_proximo_mes

    FROM estoque e
    WHERE e.fkMunicipio = ${idMunicipio}
    ;
    `;
        console.log("Executando SQL do histórico:\n" + instrucaoSql);
        return database.executar(instrucaoSql);
    }

function historico(idMunicipio) {
    var instrucaoSql = `
        SELECT 
            DATE_FORMAT(E.dtEntrada, '%Y-%m') AS mes,
            E.nomeFarmaco AS remedio,
            SUM(E.qtdFarmaco) AS total_comprado,
            ROUND(M.qtdPopulacao * 0.2) AS estimativa_asmaticos
        FROM estoque E
        JOIN municipio M ON E.fkMunicipio = M.idMunicipio
        WHERE E.dtEntrada IS NOT NULL
            AND E.fkMunicipio = ${idMunicipio}
            AND dtValidade >= CURDATE()
      AND qtdFarmaco > 0
        GROUP BY mes, remedio
        ORDER BY mes
        
        ;
    `;
    console.log("Executando SQL do histórico:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function vencimentos(idMunicipio) {
    var instrucaoSql = `
        SELECT DISTINCT
            e.lote AS nome,
            e.nomeFarmaco AS remedio,
            DATE_FORMAT(e.dtValidade, '%Y-%m-%d') AS vencimento,
            e.qtdFarmaco AS quantidade,
            e.dtValidade
        FROM estoque e
        JOIN (
            SELECT nomeFarmaco, MIN(dtValidade) AS menorVencimento
            FROM estoque
            WHERE fkMunicipio = ${idMunicipio}
              AND dtValidade >= CURDATE()
              AND qtdFarmaco > 10
            GROUP BY nomeFarmaco
        ) sub
            ON e.nomeFarmaco = sub.nomeFarmaco
            AND e.dtValidade = sub.menorVencimento
        WHERE e.fkMunicipio = ${idMunicipio}
          AND e.qtdFarmaco > 10
        ORDER BY e.dtValidade ASC, e.nomeFarmaco ASC
        LIMIT 3;
    `;
    console.log("Executando SQL:", instrucaoSql);
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
    END) AS periodo_anterior,

    -- Soma total entre os dois meses
    SUM(CASE 
        WHEN (YEAR(e.dtEntrada) = 2024 AND MONTH(e.dtEntrada) = 12)
          OR (YEAR(e.dtEntrada) = 2025 AND MONTH(e.dtEntrada) = 1)
        THEN e.qtdFarmaco
        ELSE 0
    END) AS total_periodos

FROM estoque e
WHERE e.fkMunicipio = ${idMunicipio}
  AND (
      (YEAR(e.dtEntrada) = 2024 AND MONTH(e.dtEntrada) = 12)
      OR
      (YEAR(e.dtEntrada) = 2025 AND MONTH(e.dtEntrada) = 1)
  )
GROUP BY nomeFarmaco
ORDER BY total_periodos DESC
LIMIT 2;

    `;

    console.log("SQL periodos:", instrucaoSql);

    return database.executar(instrucaoSql).catch(erro => {
        console.error("Erro na query periodos:", erro);
        throw erro;
    });
}

function kpiAtendimento(idMunicipio) {
    const instrucaoSql = `
        SELECT 
            m.nome AS municipio,
            ROUND(m.qtdPopulacao * 0.2) AS estimativa_asmaticos,
            SUM(e.qtdFarmaco) AS medicamentos_validos,
            ROUND(SUM(e.qtdFarmaco) / (m.qtdPopulacao ), 2) AS percentual_atendimento
        FROM estoque e
        JOIN municipio m ON e.fkMunicipio = m.idMunicipio
        WHERE e.dtValidade >= CURDATE()
        AND fkMunicipio = ${idMunicipio}
        GROUP BY m.idMunicipio, m.nome, m.qtdPopulacao;
    `;
    console.log("Executando SQL KPI:", instrucaoSql);
    return database.executar(instrucaoSql);
}
function qtdPopulacaoAsma(idMunicipio) {
    const instrucaoSql = `
        SELECT 
            m.nome AS municipio,
            m.qtdPopulacao,
            ROUND(m.qtdPopulacao * 0.2) AS estimativa_asmaticos
        FROM municipio m
        WHERE m.idMunicipio = ${idMunicipio};
    `;
    console.log("Executando SQL buscarMunicipioPorId:", instrucaoSql);
    return database.executar(instrucaoSql);
}

function topMesesEstoque() {
    const instrucaoSql = `
        SELECT 
            MONTHNAME(dtEntrada) AS mes,
            SUM(qtdFarmaco) AS total_medicamentos
        FROM estoque
        WHERE dtEntrada IS NOT NULL
          AND dtValidade >= CURDATE()
        GROUP BY MONTH(dtEntrada), MONTHNAME(dtEntrada)
        ORDER BY total_medicamentos DESC
        LIMIT 3;
    `;
    console.log("Executando SQL topMesesEstoque:", instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    listar,
    editar,
    historico,
    vencimentos,
    periodos,
    tendencia,
    kpiAtendimento,
    topMesesEstoque,
    qtdPopulacaoAsma
};