/* ---------------------------------------- *\
||            0xBOT MIGRATION FILE          ||
||                     V1                   ||
\* ---------------------------------------- */
const migid = 10; const migna = 'ADD GUILDSETTINGS TABLE'

module.exports = {
    data: {
        "name": migna
    },
    async migrate(db) {
        // Check if Migration has already occured
        const status = await db.query(`select id from migrations where id = ${migid};`)
        if (status.rowCount !== 1) {
            await db.query(`create table guildsettings (guildid text, setting text, value boolean)`)
            await db.query(`insert into migrations values (${migid}, $1)`, [migna])
            return true
        }; return false
    },
};