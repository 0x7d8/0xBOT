/* ---------------------------------------- *\
||            0xBOT MIGRATION FILE          ||
||                     V1                   ||
\* ---------------------------------------- */
const migid = 3; const migna = 'ADD USERQUOTES TABLE'

module.exports = {
    data: {
        "name": migna
    },
    async migrate(db) {
        // Check if Migration has already occured
        const status = await db.query(`select id from migrations where id = ${migid};`)
        if (status.rowCount !== 1) {
            await db.query(`create table userquotes (userid text, quotes numeric)`)
            await db.query(`insert into migrations values (${migid}, $1)`, [migna])
            return true
        }; return false
    }
}