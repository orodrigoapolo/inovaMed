package apolo.rodrigo;

import apolo.rodrigo.dao.EstadoDao;
import apolo.rodrigo.dao.MunicipioDao;
import apolo.rodrigo.infra.ConexaoBanco;
import apolo.rodrigo.model.Estado;
import apolo.rodrigo.model.Municipio;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

public class Main {

    public static void main(String[] args) throws IOException {
        String nomeArquivo = System.getenv("arquivo");;

        // Carregando o arquivo excel
        Path caminho = Path.of(nomeArquivo);
        InputStream municipiosArquivo = Files.newInputStream(caminho);

        // Extraindo os livros do arquivo
        LeitorExcel leitorExcel = new LeitorExcel();

        List<Municipio> municipiosExtraidos = leitorExcel.extrarMunicipio(nomeArquivo, municipiosArquivo);

        // Fechando o arquivo após a extração
        municipiosArquivo.close();

        ConexaoBanco bd = new ConexaoBanco();
        MunicipioDao municipioDao = new MunicipioDao(bd.getJdbcTemplate());
        EstadoDao estadoDao = new EstadoDao(bd.getJdbcTemplate());

        for (Municipio municipio : municipiosExtraidos) {
            Integer idEsdado = estadoDao.save(municipio.getEstado());
            municipio.getEstado().setIdEstado(idEsdado);
            municipioDao.save(municipio);
        }

        System.out.println(estadoDao.findAll());
        System.out.println(municipioDao.findAll());

    }
}