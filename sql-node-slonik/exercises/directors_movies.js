const db = require('../configs/db')
const { sql } = require('slonik')

module.exports = {
    
    async q24() {
        /*Devuelve `query_name`, `production_budget` y `distributor`.
     Ningún valor ha de ser NULL (Entre la información pedida en este ejercicio solo algunas distribuidoras 
    tienen valor NULL)*/
        return await db.query(sql`
        SELECT m.query_name, m.production_budget, m.distributor
        FROM movies m
        JOIN directors d ON m.director_id = d.id
        WHERE m.distributor IS NOT NULL
          AND m.production_budget IS NOT NULL
      `);
        
    },

    async q25() {
         /*25. Devuelve `query_name` y el total de películas que cada director ha dirigido*/
        return await db.query(sql`
    SELECT d.query_name, COUNT(*) AS total_movies
    FROM directors d
    JOIN movies m ON m.director_id = d.id
    GROUP BY d.query_name
  `);
    },

    async q26() {
        /* Devuelve `query_name`, título e `imdb_votes` de las 50 películas menos votadas según `imdb_votes` */
        return await db.query(sql`
        SELECT d.query_name, m.title, m.imdb_votes
        FROM directors d
        JOIN movies m ON m.director_id = d.id
        ORDER BY m.imdb_votes
        LIMIT 50
      `);
    },

    async q27() {
         /* Devuelve `query_name` y distribuidora donde el director sea `Christopher Nolan` */
        return await db.query(sql`
        SELECT d.query_name, m.distributor
        FROM directors d
        JOIN movies m ON m.director_id = d.id
        WHERE d.query_name = 'Christopher Nolan'
      `);
    },

    async q28() {
         /* Devuelve el nombre y la recaudación en Estados Unidos del director que más ha recaudado en Estados Unidos */
        return await db.query(sql`
        SELECT d.name, SUM(m.usa_gross) AS total_usa_gross
        FROM directors d
        JOIN movies m ON m.director_id = d.id
        GROUP BY d.name
        ORDER BY total_usa_gross DESC
        LIMIT 1
      `);
    },

    async q29() {
        /* Devuelve el nombre y fecha del director que más películas haya lanzado desde el año 2000 hasta la actualidad */
        return await db.query(sql`
        SELECT d.name, MAX(m.release_date) AS latest_release_date
        FROM directors d
        JOIN movies m ON m.director_id = d.id
        WHERE m.release_date > '2000-01-01'
        GROUP BY d.name
        ORDER BY COUNT(*) DESC
        LIMIT 1
      `);
    },

    async q30() {
        /* Devuelve el nombre, `major_genre` y `rotten_tomatoes_rating` de todos los directores 
        que hayan hecho películas de drama y cuya puntuación en `rotten_tomatoes_rating` sea mayor de 70 */
        return await db.query(sql`
      SELECT directors.query_name, movies.major_genre, movies.rotten_tomatoes_rating
      FROM directors
      JOIN movies ON directors.id = movies.director_id
      WHERE movies.major_genre = 'Drama' AND movies.rotten_tomatoes_rating > 70
    `);
    },

    async q31() {
        /* Devuelve el nombre de los directores australianos que hayan dirigido alguna película antes de 1995 */
        return await db.query(sql`
        SELECT query_name FROM directors
        WHERE country_of_origin = 'Australia' AND EXISTS (
          SELECT 1 FROM movies
          WHERE director_id = directors.id AND release_date < '1995-01-01'
        )
      `);
    },

    async q32() {
        /* Devuelve el nombre de los directores, título, fecha y `mpaa_rating` de las películas cuyo `mpaa_rating` sea `PG-13` */
        return await db.query(sql`
      SELECT directors.query_name, movies.title, movies.release_date, movies.mpaa_rating
      FROM directors
      JOIN movies ON directors.id = movies.director_id
      WHERE movies.mpaa_rating = 'PG-13'
    `);
    },

    async q33() {
        /* Devuelve el quinto mejor director canadiense que haya obtenido la mejor media de `imdb_rating` */
        return await db.query(sql`
        SELECT query_name, AVG(imdb_rating) as avg_imdb_rating
        FROM directors
        JOIN movies ON directors.id = movies.director_id
        WHERE country_of_origin = 'Canada'
        GROUP BY query_name
        ORDER BY avg_imdb_rating DESC
        OFFSET 4
        LIMIT 1
      `);
    },

    async q34() {
        /* Devuelve la media de las 20 mejores películas de ficción contemporánea entre 1990 y el 2000 según  */
        return await db.query(sql`
        SELECT directors.query_name, AVG((rotten_tomatoes_rating + imdb_rating)/2) as avg_rating
        FROM directors
        JOIN movies ON directors.id = movies.director_id
        WHERE movies.release_date BETWEEN '1990-01-01' AND '2000-12-31' AND movies.major_genre = 'Fiction'
        GROUP BY directors.query_name
        ORDER BY avg_rating DESC
        LIMIT 20
      `);
    },

    async q35() {
        /* Devuelve los nombre de los directores y las fechas 
        solo en años de las películas basadas en juegos que hayan recaudado menos de `500000$` */
        return await db.query(sql`
        SELECT directors.query_name, DATE_TRUNC('year', movies.release_date) as year
        FROM directors
        JOIN movies ON directors.id = movies.director_id
        WHERE movies.video_game_adaptation = true AND movies.us_gross < 500000
      `);
    },
}

