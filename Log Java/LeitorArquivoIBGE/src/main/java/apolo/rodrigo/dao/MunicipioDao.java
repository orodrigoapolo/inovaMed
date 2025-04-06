package apolo.rodrigo.dao;

import apolo.rodrigo.model.Estado;
import apolo.rodrigo.model.Municipio;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public class MunicipioDao {
    private final JdbcTemplate jdbcTemplate;

    public MunicipioDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Municipio> findAll(){

        return jdbcTemplate.query("""
                SELECT * FROM Municipio;
                """, new BeanPropertyRowMapper<>(Municipio.class));
    }

    public List<Municipio> findByNomeLike(String nome){

        return jdbcTemplate.query("""
                SELECT * FROM Municipio WHERE LOWER(nome) LIKE ?;
                """, new BeanPropertyRowMapper<>(Municipio.class), "%"+nome.toLowerCase()+"%");
    }


    public Integer save(Municipio municipio){
        List<Municipio> Municipios = findByNomeLike(municipio.getNome());
        if(Municipios.isEmpty()){
            jdbcTemplate.update("""
                INSERT INTO Municipio (nome, cod, qtdPopulacao, fkEstado)
                    VALUES (?, ?, ?, ?)
            """, municipio.getNome(), municipio.getCod(), municipio.getQtdPopulacao(), municipio.getEstado().getIdEstado());
            return jdbcTemplate.queryForObject("""
                    SELECT idMunicipio FROM Municipio WHERE LOWER(nome) = ?
                """, Integer.class, municipio.getNome().toLowerCase());
        }

        return Municipios.getFirst().getIdMunicipio();
    }
}
