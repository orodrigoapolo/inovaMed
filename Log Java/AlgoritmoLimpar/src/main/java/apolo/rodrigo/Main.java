package apolo.rodrigo;

import java.time.LocalDateTime;

public class Main {
    public static void main(String[] args) {
        LogArquivo log = new LogArquivo();

        log.leituraArquivo();
        log.lendoDado();
        log.limpadoDados();
        log.salvadoDados();
        log.fechadoArquivoBanco();
    }
}