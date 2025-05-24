package school.sptech.dao;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.DadosSUS;
import school.sptech.model.Municipio;

import java.sql.Connection;
import java.util.List;

public class EstoqueDao {
    private JdbcTemplate jdbcTemplate = null;

    public EstoqueDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Municipio> pegarMunicipios() {
        return jdbcTemplate.query(
                "SELECT idMunicipio, nome FROM municipio",
                new BeanPropertyRowMapper<>(Municipio.class)
        );
    }

    public void save(DadosSUS estoque) {
        jdbcTemplate.update("""
                            INSERT INTO estoque (nomeFarmaco, qtdFarmaco, dtValidade, dtEntrada, lote, CATMAT, fkMunicipio)
                                VALUES (?, ?, ?, ?, ?, ?, ?)
                        """,
                estoque.getNomeFarmaco(),
                estoque.getQtdFarmaco(),
                estoque.getDtValidade(),
                estoque.getDtEntrada(),
                estoque.getLote(),
                estoque.getCatmat(),
                estoque.getMunicipio().getIdMunicipio()
        );
    }

}
