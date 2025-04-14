package school.sptech;

import school.sptech.model.Municipio;

public class DadosSUS {
    private Integer idEstoque;
    private String nomeFarmaco;
    private Integer qtdFarmaco;
    private String dtValidade;
    private String dtEntrada;
    private String lote;
    private String catmat;
    private String estado;
    private Municipio municipio;

    public DadosSUS() {
    }

    public DadosSUS(Integer idEstoque, String nomeFarmaco, Integer qtdFarmaco, String dtValidade, String dtEntrada, String lote, String catmat, String estado, Municipio municipio) {
        this.idEstoque = idEstoque;
        this.nomeFarmaco = nomeFarmaco;
        this.qtdFarmaco = qtdFarmaco;
        this.dtValidade = dtValidade;
        this.dtEntrada = dtEntrada;
        this.lote = lote;
        this.catmat = catmat;
        this.estado = estado;
        this.municipio = municipio;
    }

    public Integer getIdEstoque() {
        return idEstoque;
    }

    public void setIdEstoque(Integer idEstoque) {
        this.idEstoque = idEstoque;
    }

    public String getNomeFarmaco() {
        return nomeFarmaco;
    }

    public void setNomeFarmaco(String nomeFarmaco) {
        this.nomeFarmaco = nomeFarmaco;
    }

    public Integer getQtdFarmaco() {
        return qtdFarmaco;
    }

    public void setQtdFarmaco(Integer qtdFarmaco) {
        this.qtdFarmaco = qtdFarmaco;
    }

    public String getDtValidade() {
        return dtValidade;
    }

    public void setDtValidade(String dtValidade) {
        this.dtValidade = dtValidade;
    }

    public String getDtEntrada() {
        return dtEntrada;
    }

    public void setDtEntrada(String dtEntrada) {
        this.dtEntrada = dtEntrada;
    }

    public String getLote() {
        return lote;
    }

    public void setLote(String lote) {
        this.lote = lote;
    }

    public String getCatmat() {
        return catmat;
    }

    public void setCatmat(String catmat) {
        this.catmat = catmat;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Municipio getMunicipio() {
        return municipio;
    }

    public void setMunicipio(Municipio municipio) {
        this.municipio = municipio;
    }

    @Override
    public String toString() {
        return "DadosSUS{" +
                ", nomeFarmaco='" + nomeFarmaco + '\'' +
                ", qtdFarmaco=" + qtdFarmaco +
                ", dtValidade=" + dtValidade +
                ", dtEntrada=" + dtEntrada +
                ", lote=" + lote +
                ", catmat='" + catmat + '\'' +
                ", estado='" + estado + '\'' +
                ", municipio='" + municipio + '\'' +
                '}';
    }

}
