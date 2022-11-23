/* ---------------------------------------- *\
||            0xBOT MIGRATION FILE          ||
||                     V1                   ||
\* ---------------------------------------- */
const migid = 0; const migna = 'ADD MIGRATIONS TABLE'

module.exports = {
    data: {
        "name": migna
    },
    async migrate(db) {
        // Check if Migration has already occured
        let status
        try {
            status = await db.query(`select * from migrations where id = ${migid};`)
        } catch (e) {
            await db.query(`create table migrations (id int, name text)`)
            await db.query(`insert into migrations values (${migid}, $1)`, [migna])
            return true
        }; return false
    }
}