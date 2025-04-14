package school.sptech;

import org.apache.commons.lang3.exception.ExceptionUtils;
import school.sptech.dao.EstoqueDao;
import school.sptech.dao.LogDao;
import school.sptech.infra.ConexaoBanco;
import school.sptech.model.Log;
import school.sptech.model.Municipio;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDateTime;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        ConexaoBanco connection = new ConexaoBanco();
        LogDao logDao = new LogDao(connection.getJdbcTemplate());

        try {
            logDao.save(new Log("leitorDadosSUS", "Lendo o caminho do arquivo", LocalDateTime.now(), "Leitura de arquivo"));
            String estoqueAbril = System.getenv("estoqueAbril");

            // Carregando o arquivo excel
            logDao.save(new Log("leitorDadosSUS", "Iniciando leitura do arquivo", LocalDateTime.now(), "Leitura de arquivo"));
            Path caminho = Path.of(estoqueAbril);
            InputStream arquivo = Files.newInputStream(caminho);

            logDao.save(new Log("leitorDadosSUS", "Iniciando as extração dos dados", LocalDateTime.now(), "Leitura de arquivo"));
            // Extraindo os livros do arquivo
            LeitorExcel leitorExcel = new LeitorExcel();
            logDao.save(new Log("leitorDadosSUS", "Extração dos dados finalizada", LocalDateTime.now(), "Leitura de arquivo"));

            List<DadosSUS> dadosExtraidos = leitorExcel.extrairDados(estoqueAbril, arquivo);

            // Fechando o arquivo após a extração
            arquivo.close();

            EstoqueDao estoqueDao = new EstoqueDao(connection.getJdbcTemplate());

            logDao.save(new Log("leitorDadosSUS", "Iniciando a gravação dos dados no banco de dados do Estoque", LocalDateTime.now(), "Salva dados"));

            // Este for serve para percorrer a lista dos dados que foram extraidos do arquivo csv
            for (DadosSUS estoque : dadosExtraidos) {
                List<Municipio> municipios = estoqueDao.pegarMunicipios();

                // Este for serve para percorrer a lista de municipios que retornaram do banco de dados
                for (Integer i = 0; i < municipios.size(); i++) {
                    if (estoque.getMunicipio().getNome().equalsIgnoreCase(municipios.get(i).getNome())) {
                        estoque.getMunicipio().setIdMunicipio(municipios.get(i).getIdMunicipio());
                        estoqueDao.save(estoque);
                    }
                }
            }

            logDao.save(new Log("leitorDadosSUS", "Gravação dos dados no banco de dados do Estoque concluída", LocalDateTime.now(), "Salva dados"));

        } catch (Exception e) {
            logDao.save(new Log("leitorDadosSUS", ExceptionUtils.getStackTrace(e), LocalDateTime.now(), "Leitura de arquivo Erro"));
        }
    }
}
