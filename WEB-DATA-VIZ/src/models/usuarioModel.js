var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(email, nome, cpf, genero, cargo, senha, dtNasc, fkEstado, fkMunicipio) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO usuario (idUsuario, email, nome, cpf, genero, cargo, senha, dtNasc, dtCriacao, fkEstado, fkMunicipio) VALUES (default, '${email}', '${nome}', '${cpf}', '${genero}', '${cargo}', '${senha}', '${dtNasc}', NOW(), ${fkEstado}, ${fkMunicipio});
        `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listar() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");
    
    var instrucaoSql = `
        SELECT 
            usuario.*, 
            municipio.nome AS nomeMunicipio, 
            GROUP_CONCAT(contato.email SEPARATOR ', ') AS contatos
        FROM 
            usuario 
        LEFT JOIN 
            municipio ON idMunicipio = fkMunicipio
        LEFT JOIN 
            contato ON idUsuario = fkUsuario
        WHERE 
            dtInativo IS NULL
        GROUP BY 
            usuario.idUsuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletarUsuario(idUsuario) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idUsuario);
    var instrucaoSql = `
        UPDATE usuario SET dtInativo = NOW() WHERE idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

    function buscar(nome, email, cpf, cargo, genero) {
        console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():");
        var instrucaoSql = `
            SELECT usuario.*, municipio.nome as nomeMunicipio 
            FROM usuario LEFT JOIN municipio ON idMunicipio = fkMunicipio 
            WHERE dtInativo IS NULL 
            AND (
            usuario.nome LIKE '%${nome}%' 
            OR email LIKE '%${email}%' 
            OR cpf LIKE '%${cpf}%' 
            OR cargo LIKE '%${cargo}%' 
            OR genero LIKE '%${genero}%');
        `;
        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
    }

function editar(idUsuario, email, senha, nome, cpf, cargo, estado, dtNasc, genero) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():");
    var instrucaoSql = `
        UPDATE usuario SET nome = '${nome}', cpf = ${cpf}, email = '${email}', senha = '${senha}', cargo = '${cargo}', dtNasc = '${dtNasc}', genero = '${genero}', fkEstado = ${estado} WHERE idUsuario = ${idUsuario};
    `;  
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function novoUsuario(email, nome, cpf, genero, cargo, senha, dtNasc, fkEstado, fkMunicipio) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO usuario (idUsuario, email, nome, cpf, genero, cargo, senha, dtNasc, dtCriacao, fkEstado, fkMunicipio) VALUES (default, '${email}', '${nome}', '${cpf}', '${genero}', '${cargo}', '${senha}', '${dtNasc}', NOW(), ${fkEstado}, ${fkMunicipio});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);7
    
    return database.executar(instrucaoSql);
}


function buscarNomeEstadoPorId(idEstado) {
    console.log("Buscando nome do estado com ID:", idEstado);

    var instrucaoSql = `
        SELECT nome FROM estado WHERE idEstado = ${idEstado};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
module.exports = {
    autenticar,
    cadastrar,
    listar,
    deletarUsuario,
    buscar,
    editar,
    novoUsuario,
    buscarNomeEstadoPorId
};