/* ---------------------------------------- *\
||            0xBOT MIGRATION FILE          ||
||                     V1                   ||
\* ---------------------------------------- */
const migid = 6; const migna = 'ADD USERITEMS TABLE'

module.exports = {
    data: {
        "name": migna
    },
    async migrate(db) {
        // Check if Migration has already occured
        const status = await db.query(`select id from migrations where id = ${migid};`)
        if (status.rowCount !== 1) {
            await db.query(`create table useritems (userid text, value text, amount numeric)`)
            await db.query(`insert into migrations values (${migid}, $1)`, [migna])
            return true
        }; return false
    },
}