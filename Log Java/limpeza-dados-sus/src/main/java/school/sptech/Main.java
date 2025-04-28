package school.sptech;

import org.apache.commons.lang3.exception.ExceptionUtils;
import school.sptech.dao.EstoqueDao;
import school.sptech.dao.LogDao;
import school.sptech.dao.PlanilhaDao;
import school.sptech.infra.ConexaoBanco;
import school.sptech.infra.S3Provider;
import school.sptech.model.Log;
import school.sptech.model.Municipio;
import software.amazon.awssdk.core.sync.ResponseTransformer;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.ListObjectsRequest;
import software.amazon.awssdk.services.s3.model.S3Object;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        ConexaoBanco connection = new ConexaoBanco();
        LogDao logDao = new LogDao(connection.getJdbcTemplate());
        EstoqueDao estoqueDao = new EstoqueDao(connection.getJdbcTemplate());
        PlanilhaDao planilhaDao = new PlanilhaDao(connection.getJdbcTemplate());
        S3Provider s3Client = new S3Provider();
        LeitorExcel leitorExcel = new LeitorExcel();

        try {
            logDao.save(new Log("leitorDadosSUS", "Conectando ao bucket", LocalDateTime.now(), "Bucket S3"));
            ListObjectsRequest listObjects = ListObjectsRequest.builder()
                    .bucket(System.getenv("nomeBucket"))
                    .build();


            logDao.save(new Log("leitorDadosSUS", "Resgatando todos os arquivos do bucket", LocalDateTime.now(), "Bucket S3"));
            List<S3Object> objects = s3Client.getS3Client().listObjects(listObjects).contents();

            for (S3Object object : objects) {
                GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                        .bucket(System.getenv("nomeBucket"))
                        .key(object.key())
                        .build();

                if (object.key().startsWith("excel")) {
                } else {

                    if (planilhaDao.pegarPlanilhas(object.key()) > 0) {
                        logDao.save(new Log("leitorDadosSUS", "Planilha já inserida", LocalDateTime.now(), "Salva dados"));
                    } else {
                        logDao.save(new Log("leitorDadosSUS", "Lendo o arquivo: " + object.key(), LocalDateTime.now(), "Bucket S3"));
                        InputStream objectContent = s3Client.getS3Client().getObject(getObjectRequest, ResponseTransformer.toInputStream());

                        logDao.save(new Log("leitorDadosSUS", "Iniciando a extração dos dados", LocalDateTime.now(), "Leitura de arquivo"));
                        List<DadosSUS> dadosExtraidos = leitorExcel.extrairDados(object.key(), objectContent);

                        objectContent.close();

                        // Este for serve para percorrer a lista dos dados que foram extraidos do arquivo csv
                        logDao.save(new Log("leitorDadosSUS", "Iniciando a gravação dos dados no banco de dados do Estoque", LocalDateTime.now(), "Salva dados"));
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

                        // aqui vc pode inserir na tabela Planilha o nome do arquivo.
                        logDao.save(new Log("leitorDadosSUS", "Salvando dados na planilha", LocalDateTime.now(), "Salva dados"));
                        planilhaDao.save(object.key());
                        logDao.save(new Log("leitorDadosSUS", "Gravação dos dados no banco de dados do Estoque concluída", LocalDateTime.now(), "Salva dados"));
                    }
                }
            }
        } catch (Exception e) {
            System.out.println(e);
            logDao.save(new Log("leitorDadosSUS", ExceptionUtils.getStackTrace(e), LocalDateTime.now(), "Leitura de arquivo Erro"));
        }
    }
}
