package apolo.rodrigo.dao;

import org.springframework.jdbc.core.JdbcTemplate;

import java.time.LocalDateTime;

public class LogDao {
    private final JdbcTemplate jdbcTemplate;

    public LogDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

}
