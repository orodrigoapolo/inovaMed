package school.sptech.dao;

import org.springframework.jdbc.core.JdbcTemplate;

public class PlanilhaDao {

    private JdbcTemplate jdbcTemplate = null;

    public PlanilhaDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Integer pegarPlanilhas(String nomePlanilha) {
        return jdbcTemplate.queryForObject(
                "SELECT count(nome) FROM Planilha where nome = ?",
                Integer.class, nomePlanilha
        );
    }

    public void save(String nomePlanilha){
        jdbcTemplate.update("""
            INSERT INTO Planilha (nome)
                VALUES (?)
        """, nomePlanilha);
    }
}
