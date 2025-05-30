package apolo.rodrigo.dao;

import apolo.rodrigo.model.Estado;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public class EstadoDao extends Dao{
    private final JdbcTemplate jdbcTemplate;

    public EstadoDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Estado> findAll() {
        return jdbcTemplate.query("""
                SELECT * FROM estado;
                """, new BeanPropertyRowMapper<>(Estado.class));
    }

    @Override
    public List findByNomeLike(String nome) {
        return jdbcTemplate.query("""
                SELECT * FROM estado WHERE LOWER(nome) LIKE ?;
                """, new BeanPropertyRowMapper<>(Estado.class), "%"+nome.toLowerCase()+"%");
    }

    public Integer save(Estado estado) {
        List<Estado> estados = findByNomeLike(estado.getNome());
        if(estados.isEmpty()){
            jdbcTemplate.update("""
                INSERT IGNORE INTO estado (nome, UF, cod)
                    VALUES (?, ?, ?);
                """, estado.getNome(), estado.getUF(), estado.getCod());

            return jdbcTemplate.queryForObject("""
                    SELECT idEstado FROM estado WHERE LOWER(nome) = ?
                """, Integer.class, estado.getNome().toLowerCase());
        }

        return estados.getFirst().getIdEstado();
    }
}
