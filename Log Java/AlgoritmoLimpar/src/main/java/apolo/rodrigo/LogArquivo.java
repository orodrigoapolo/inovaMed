package apolo.rodrigo;

import java.time.LocalDateTime;

public class LogArquivo {

    void leituraArquivo(){
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime dataArquivo = LocalDateTime.of(2024,3,15, 10, 0);

        System.out.println("Iniciando o programa: " + now);
        System.out.println("Abrindo o arquivo 'baseDeDados.excel'...");
        System.out.println("Arquivo excel do dia: " + dataArquivo);
    }

    void lendoDado(){
        System.out.println("Lendo o conteúdo do arquivo...");
        System.out.println("leitura concluída!");
        System.out.println();
    }

    void limpadoDados(){
        System.out.println("Limpando o conteúdo do arquivo...");
        System.out.println("Conteúdo limpo!");
        System.out.println();
    }

    void salvadoDados(){
        System.out.println("Conectando ao banco de dados...");
        System.out.println("Salvando o conteúdo limpo no banco de dados...");
        System.out.println("Dados salvos com sucesso!");
        System.out.println();
    }

    void fechadoArquivoBanco(){
        System.out.println("Fechando conexão da base de dados...");
        System.out.println("Fechando o arquivo 'baseDeDados.excel'...");
        LocalDateTime now = LocalDateTime.now();
        System.out.println("Programa finalizado em " + now);
    }
}
