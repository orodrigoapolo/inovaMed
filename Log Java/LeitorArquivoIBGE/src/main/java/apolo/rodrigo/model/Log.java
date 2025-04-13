package apolo.rodrigo.model;

import java.time.LocalDateTime;

public class Log {
    private Integer idLog;
    private String titulo;
    private String descricao;
    private LocalDateTime dtLog;
    private String tipo;

    public Log() {
    }

    public Log(String titulo, String descricao, LocalDateTime dtLog, String tipo) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.dtLog = dtLog;
        this.tipo = tipo;
    }

    public Integer getIdLog() {
        return idLog;
    }

    public void setIdLog(Integer idLog) {
        this.idLog = idLog;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public LocalDateTime getDtLog() {
        return dtLog;
    }

    public void setDtLog(LocalDateTime dtLog) {
        this.dtLog = dtLog;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
}
