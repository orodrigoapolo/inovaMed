package apolo.rodrigo.model;

public class Municipio {
    private Integer idMunicipio;
    private Estado estado;
    private Integer cod;
    private String nome;
    private Integer qtdPopulacao;

    public Integer getIdMunicipio() {
        return idMunicipio;
    }

    public void setIdMunicipio(Integer idMunicipio) {
        this.idMunicipio = idMunicipio;
    }

    public Estado getEstado() {
        return estado;
    }

    public void setEstado(Estado estado) {
        this.estado = estado;
    }

    public Integer getCod() {
        return cod;
    }

    public void setCod(Integer cod) {
        this.cod = cod;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Integer getQtdPopulacao() {
        return qtdPopulacao;
    }

    public void setQtdPopulacao(Integer qtdPopulacao) {
        this.qtdPopulacao = qtdPopulacao;
    }

    @Override
    public String toString() {
        return String.format(
                "{ \"idMunicipio\": %d, \"nome\": \"%s\", \"cod\": %d, \"qtdPopulacao\": %d, \"estado\": %s }",
                idMunicipio != null ? idMunicipio : 0,
                nome != null ? nome : "",
                cod != null ? cod : 0,
                qtdPopulacao != null ? qtdPopulacao : 0,
                estado != null ? estado.toString() : "null"
        );
    }


}
