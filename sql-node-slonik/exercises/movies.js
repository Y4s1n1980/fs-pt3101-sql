const db = require('../configs/db')
const { sql } = require('slonik')


module.exports = {
  async q9() {
    // README - 9. Devuelve el título de todas las películas cuyo contenido no sea null
    return await db.query(sql`
      SELECT title FROM movies
      WHERE content_rating IS NOT NULL
    `);
  },

  async q10() {
    // README - 10. Devuelve el título y el `mpaa_rating` de todas las películas cuya valoración `mpaa` no sea null
    return await db.query(sql`
      SELECT title, mpaa_rating FROM movies
      WHERE mpaa_rating IS NOT NULL
    `);
  },

  async q11() {
    /* README - 11. Devuelve el título, `production_budget` y distribuidora de todas aquellas películas
     cuyos costes (`production_budget`) hayan sido inferiores a `500000$` */
    return await db.query(sql`
      SELECT title, production_budget, distributor FROM movies
      WHERE production_budget < 500000
    `);
  },

  async q12() {
    // README - 12. Devuelve el título, `major_genre` y `production_budget` de las 10 películas más costosas
    return await db.query(sql`
      SELECT title, major_genre, production_budget FROM movies
      ORDER BY production_budget DESC
      LIMIT 10
    `);
  },

  async q13() {
    // README - 13. Devuelve el título y el orígen (`source`) de todas las películas cuyo `source` sea `Remake`
    return await db.query(sql`
      SELECT title, source FROM movies
      WHERE source = 'Remake'
    `);
  },

  async q14() {
    /* README -14. Devuelve el título, la distribuidora y el rating imdb de todas 
    las películas cuyo `imdb_rating` no sea null */
    return await db.query(sql`
      SELECT title, distributor, imdb_rating FROM movies
      WHERE imdb_rating IS NOT NULL
    `);
  },

  async q15() {
    // README - 15. Devuelve el título y `rotten_tomatoes_rating` de las 100 películas menor valoradas según este campo.
    return await db.query(sql`
      SELECT title, rotten_tomatoes_rating FROM movies
      WHERE rotten_tomatoes_rating IS NOT NULL
      ORDER BY rotten_tomatoes_rating ASC
      LIMIT 100
    `);
  },

  async q16() {
    /* README - 16. Devuelve el título, `major_genre`, imdb_rating e imdb_votes de las 20 películas mejor valoradas 
    y a la vez con más votos de todas */
    return await db.query(sql`
      SELECT title, major_genre, imdb_rating, imdb_votes FROM movies
      WHERE imdb_rating IS NOT NULL AND imdb_votes IS NOT NULL
      ORDER BY imdb_rating DESC, imdb_votes DESC
      LIMIT 20
    `);
  },

  async q17() {
    /* README - 17. Devuelve la suma del campo `production_budget` cuyo `mpaa_rating` sea `Not Rated` y
     el campo título no sea null */
    return await db.query(sql`
      SELECT SUM(production_budget) FROM movies
      WHERE mpaa_rating = 'Not Rated' AND title IS NOT NULL
    `);
  },

  async q18() {
    // README - 18. Devuelve el título y la fecha de todas aquellas películas que serán lanzadas en el futuro
    return await db.query(sql`
      SELECT title, release_date FROM movies
      WHERE release_date > NOW()
    `);
  },

  async q19() {
    // README - 19. Devuelve el título, `us_gross` y fecha de todas aquellas películas lanzadas entre 1950 y 1980
    return await db.query(sql`
      SELECT title, us_gross, release_date FROM movies
      WHERE release_date BETWEEN '1950-01-01' AND '1980-12-31'
    `);
  },

  async q20() {
    /* README - 20. Devuelve el título, `us_gross` y `worldwide_gross` 
    de todas aquellas películas donde `us_gross` o `worldwide_gross` sea 0 */
    return await db.query(sql`
      SELECT title, us_gross, worldwide_gross FROM movies
      WHERE us_gross = 0 OR worldwide_gross = 0
    `);
  },

  async q21() {
    /* README - 21. Devuelve el título y el `us_gross` de las 50 películas con la recaudación 
    en Estados Unidos (`us_gross`) más pobre*/
    return await db.query(sql`
      SELECT title, us_gross FROM movies
      WHERE us_gross IS NOT NULL
      ORDER BY us_gross ASC
      LIMIT 50
    `);
  },

  async q22() {
    // README - 22. Devuelve el título y `source` de aquellas películas cuyo título empiece por `F`
    return await db.query(sql`
      SELECT title, source FROM movies
      WHERE title LIKE 'F%'
    `);
  },


  async q23() {
    /* README - 23. Devuelve distribuidor, `production_budget`, `creative_type`, 
    `major_genre` de aquellas películas cuyo `production_budget` es superior a `10000000` 
    y el distribuidor es `Sony Pictures`*/

    return await db.query(sql`
        SELECT distributor, production_budget, creative_type, major_genre
        FROM movies
        WHERE distributor = 'Sony Pictures' AND production_budget > 10000000
    `);
  },


 
