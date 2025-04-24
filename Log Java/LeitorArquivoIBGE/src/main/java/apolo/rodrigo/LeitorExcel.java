package apolo.rodrigo;

import apolo.rodrigo.model.Estado;
import apolo.rodrigo.model.Municipio;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.IOException;
import java.io.InputStream;
import java.text.Normalizer;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

public class LeitorExcel {

    public List<Municipio> extrarMunicipio(String nomeArquivo, InputStream arquivo) {
        try {
//            System.out.println("\nIniciando leitura do arquivo %s\n".formatted(nomeArquivo));

            // Criando um objeto Workbook a partir do arquivo recebido
            Workbook workbook;
            if (nomeArquivo.endsWith(".xlsx")) {
                workbook = new XSSFWorkbook(arquivo);
            } else {
                workbook = new HSSFWorkbook(arquivo);
            }

            Sheet sheet = workbook.getSheetAt(1);

            List<Municipio> municipiosExtraidos = new ArrayList<>();
            Map<String, String> cidades = Map.ofEntries(
                    Map.entry("RO", "Rondônia"),
                    Map.entry("AC", "Acre"),
                    Map.entry("AM", "Amazonas"),
                    Map.entry("RR", "Roraima"),
                    Map.entry("PA", "Pará"),
                    Map.entry("AP", "Amapá"),
                    Map.entry("TO", "Tocantins")
            );

            // Iterando sobre as linhas da planilha
            for (Row row : sheet) {
                if(row.getCell(0).getStringCellValue().equals("UF")){
                    continue;
                }

                String nomeEstado = row.getCell(0).getStringCellValue();
                if (!cidades.containsKey(nomeEstado)) {
                    continue;
                }

                DataFormatter formatter = new DataFormatter();
                String texto = formatter.formatCellValue(row.getCell(4));
                Integer populacao = Integer.parseInt(texto.replace(".", "")
                        .replace(",", "")
                        .trim());

                Municipio municipio = new Municipio();
                Estado estado = new Estado();
                estado.setNome(removerAcentos(cidades.get(nomeEstado)));
                estado.setUF(row.getCell(0).getStringCellValue());
                estado.setCod((int) row.getCell(1).getNumericCellValue());
                municipio.setEstado(estado);
                municipio.setCod((int) row.getCell(2).getNumericCellValue());
                municipio.setNome(removerAcentos(row.getCell(3).getStringCellValue()));
                municipio.setQtdPopulacao(populacao);
                municipiosExtraidos.add(municipio);
            }

            // Fechando o workbook após a leitura
            workbook.close();

//            System.out.println("\nLeitura do arquivo finalizada\n");

            return municipiosExtraidos;
        } catch (IOException e) {
            // Caso ocorra algum erro durante a leitura do arquivo uma exceção será lançada
            throw new RuntimeException(e);
        }
    }

    private static String removerAcentos(String str) {

        String normalizada = Normalizer.normalize(str, Normalizer.Form.NFD);

        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        return pattern.matcher(normalizada).replaceAll("");
    }
}
