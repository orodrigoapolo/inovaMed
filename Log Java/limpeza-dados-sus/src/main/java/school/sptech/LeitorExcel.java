package school.sptech;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import school.sptech.model.Municipio;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class LeitorExcel {
    public List<DadosSUS> extrairDados(String estoqueAbril, InputStream arquivo) {
        try {
            System.out.println("\nIniciando a leitura do arquivo %s\n".formatted(estoqueAbril));

            Workbook workbook;
            if (estoqueAbril.endsWith(".xlsx")) {
                workbook = new XSSFWorkbook(arquivo);
            } else {
                workbook = new HSSFWorkbook(arquivo);
            }

            Sheet sheet = workbook.getSheetAt(0);

            List<DadosSUS> dadosExtraidos = new ArrayList<>();

            for (Row row : sheet) {
                if (row.getRowNum() == 0) {
                    System.out.println("\nLendo cabeçalho");

                    for (Integer i = 0; i < 13; i++) {
                        String coluna = row.getCell(i).getStringCellValue();
                        System.out.println("Coluna " + i + ": " + coluna);
                    }

                    System.out.println("--------------------------------------------------------------------");
                    continue;
                }

                DadosSUS dados = new DadosSUS();
                Municipio municipio = new Municipio();
                municipio.setNome(row.getCell(2).getStringCellValue());
                dados.setEstado(row.getCell(0).getStringCellValue());
                dados.setMunicipio(municipio);
                dados.setDtEntrada(row.getCell(14).getStringCellValue());
                dados.setCatmat(row.getCell(15).getStringCellValue());
                dados.setNomeFarmaco(row.getCell(16).getStringCellValue());
                dados.setQtdFarmaco((int) row.getCell(17).getNumericCellValue());
                dados.setLote(row.getCell(18).getStringCellValue());
                dados.setDtValidade(row.getCell(19).getStringCellValue());
                dadosExtraidos.add(dados);
            }

            workbook.close();

            System.out.println("\nLeitura do arquivo finalizada\n");

            return dadosExtraidos;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private LocalDate converterDate(Date data) {
        return data.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
    }
}
