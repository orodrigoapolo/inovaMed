package apolo.rodrigo;

import java.time.LocalDateTime;

public class Main {
    public static void main(String[] args) {

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime dataArquivo = LocalDateTime.of(2024,3,15, 10, 0);

        System.out.println("Iniciando o programa: " + now);
        System.out.println("Abrindo o arquivo 'baseDeDados.excel'...");
        System.out.println("Arquivo excel do dia: " + dataArquivo);

        System.out.println("Lendo o conteúdo do arquivo...");
        System.out.println("leitura concluída!");
        System.out.println();

        // Simulação da limpeza do conteúdo
        System.out.println("Limpando o conteúdo do arquivo...");
        System.out.println("Conteúdo limpo!");
        System.out.println();


        // Simulação do salvamento no banco de dados
        System.out.println("Conectando ao banco de dados...");
        System.out.println("Salvando o conteúdo limpo no banco de dados...");
        System.out.println("Dados salvos com sucesso!");
        System.out.println();


        // Simulação do fechamento do arquivo
        System.out.println("Fechando conexão da base de dados...");
        System.out.println("Fechando o arquivo 'baseDeDados.excel'...");
        now = LocalDateTime.now();
        System.out.println("Programa finalizado em " + now);
    }
}