package apolo.rodrigo.model;

public class Estado {
    private Integer idEstado;
    private String nome;
    private String UF;
    private Integer cod;

    public Integer getIdEstado() {
        return idEstado;
    }

    public void setIdEstado(Integer idEstado) {
        this.idEstado = idEstado;
    }

    public Integer getCod() {
        return cod;
    }

    public void setCod(Integer cod) {
        this.cod = cod;
    }

    public String getUF() {
        return UF;
    }

    public void setUF(String UF) {
        this.UF = UF;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    @Override
    public String toString() {
        return String.format(
                "{ \"idEstado\": %d, \"nome\": \"%s\", \"UF\": \"%s\", \"cod\": %d }",
                idEstado != null ? idEstado : 0,
                nome != null ? nome : "",
                UF != null ? UF : "",
                cod != null ? cod : 0
        );
    }

}
