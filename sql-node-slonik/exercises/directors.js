const db = require('../configs/db')
const { sql } = require('slonik')

module.exports = {
    // Your directors queries
    async q1() {
        // README - 1. Devuelve el `name` de todos los directores cuyo campo `name` no esté vacío
        return await db.query(sql`
            SELECT name FROM directors
            WHERE name != ''
        `);
        
    },

    async q2() {
        // README - 2. Devuelve `query_name` y sus correspondientes `nicknames`
        return await db.query(sql`
        SELECT query_name, nickname FROM directors
        WHERE nickname IS NOT NULL
    `);
    },

    async q3() {
        // README - 3. Devuelve `pic` y `nickname` de todos aquellos directores que tengan `nickname`
        return await db.query(sql`
        SELECT pic, nickname FROM directors
        WHERE nickname IS NOT NULL
    `);
    },

    async q4() {
        // README - 4. Devuelve `query_name` y nacionalidad de todos aquellos directores que sean de origen canadiense.
        return await db.query(sql`
        SELECT query_name, nationality FROM directors
        WHERE nationality = 'canadian'
    `);
    },

    async q5() {
        // README - 5. Devuelve `query_name` y nacionalidad de todos aquellos directores que sean de origen británico-estadounidense
        //(vigila cómo están guardados esos datos. Tienen que ser las dos cosas juntas)
        return await db.query(sql`
        SELECT query_name, nationality FROM directors
        WHERE nationality = 'british-american'
    `);
    },

    async q6() {
        // README - 6. Devuelve `query_name`, nacionalidad y roles de aquellos directores que sean ajedrecistas
        return await db.query(sql`
        SELECT query_name, nationality, roles FROM directors
        WHERE roles LIKE '%chess%'
    `);
    },

    async q7() {
        // README - 7. Devuelve `query_name`, `name` y nacionalidad de aquellos directores que tengan, al menos, dos nacionalidades
        return await db.query(sql`
        SELECT query_name, name, nationality FROM directors
        WHERE nationality LIKE '%,%'
    `);
    },

    async q8() {
        // README - 8. Devuelve `query_name` y roles de aquellos directores que tengan más de 3 roles
        return await db.query(sql`
        SELECT query_name, roles FROM directors
        WHERE roles LIKE '%,%,%,%%'
    `);
    },
}







