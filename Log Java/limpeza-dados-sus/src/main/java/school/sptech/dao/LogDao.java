package school.sptech.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.model.Log;

public class LogDao {
    private final JdbcTemplate jdbcTemplate;

    public LogDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void save(Log log){
        jdbcTemplate.update("""
            INSERT INTO log (titulo, descricao, dtLog, tipo)
                VALUES (?, ?, ?, ?)
        """, log.getTitulo(), log.getDescricao(), log.getDtLog(), log.getTipo());
    }

    public void comecarInsert(){
        jdbcTemplate.update("START TRANSACTION");
    }

    public void encerrarInsert(){
        jdbcTemplate.update("COMMIT");
    }
}
