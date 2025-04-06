package apolo.rodrigo;

import apolo.rodrigo.dao.EstadoDao;
import apolo.rodrigo.dao.LogDao;
import apolo.rodrigo.dao.MunicipioDao;
import apolo.rodrigo.infra.ConexaoBanco;
import apolo.rodrigo.model.Estado;
import apolo.rodrigo.model.Log;
import apolo.rodrigo.model.Municipio;
import org.apache.commons.lang3.exception.ExceptionUtils;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDateTime;
import java.util.List;

public class Main {

    public static void main(String[] args) throws IOException {
        ConexaoBanco bd = new ConexaoBanco();

        LogDao logDao = new LogDao(bd.getJdbcTemplate());
        try {
            logDao.save(new Log("leitorArquivoIBGE", "Lendo o caminho do arquivo", LocalDateTime.now(), "Leitura de arquivo"));
            String nomeArquivo = System.getenv("arquivo");;

            // Carregando o arquivo excel
            logDao.save(new Log("leitorArquivoIBGE", "Iniciando leitura do arquivo", LocalDateTime.now(), "Leitura de arquivo"));
            Path caminho = Path.of(nomeArquivo);
            InputStream municipiosArquivo = Files.newInputStream(caminho);

            logDao.save(new Log("leitorArquivoIBGE", "Iniciando as extração dos dados", LocalDateTime.now(), "Leitura de arquivo"));
            // Extraindo os livros do arquivo
            LeitorExcel leitorExcel = new LeitorExcel();
            logDao.save(new Log("leitorArquivoIBGE", "Extração dos dados finalizada", LocalDateTime.now(), "Leitura de arquivo"));

            List<Municipio> municipiosExtraidos = leitorExcel.extrarMunicipio(nomeArquivo, municipiosArquivo);

            // Fechando o arquivo após a extração
            municipiosArquivo.close();


            MunicipioDao municipioDao = new MunicipioDao(bd.getJdbcTemplate());
            EstadoDao estadoDao = new EstadoDao(bd.getJdbcTemplate());

            logDao.save(new Log("leitorArquivoIBGE", "Iniciando a gravação dos dados no banco de dados do Municipios e Estado", LocalDateTime.now(), "Salva dados"));

            for (Municipio municipio : municipiosExtraidos) {
                Integer idEsdado = estadoDao.save(municipio.getEstado());
                municipio.getEstado().setIdEstado(idEsdado);
                municipioDao.save(municipio);
            }
            logDao.save(new Log("leitorArquivoIBGE", "Gravação dos dados no banco de dados do Municipios e Estado culcuida", LocalDateTime.now(), "Salva dados"));


        } catch (Exception e) {
            logDao.save(new Log("leitorArquivoIBGE", ExceptionUtils.getStackTrace(e), LocalDateTime.now(), "Leitura de arquivo Erro"));
        }
    }
}