package apolo.rodrigo.dao;

import apolo.rodrigo.model.Log;
import apolo.rodrigo.model.Municipio;
import org.springframework.jdbc.core.JdbcTemplate;

import java.time.LocalDateTime;
import java.util.List;

public class LogDao {
    private final JdbcTemplate jdbcTemplate;

    public LogDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void save(Log log){
        jdbcTemplate.update("""
            INSERT INTO Log (titulo, descricao, dtLog, tipo)
                VALUES (?, ?, ?, ?)
        """, log.getTitulo(), log.getDescricao(), log.getDtLog(), log.getTipo());
    }
}
