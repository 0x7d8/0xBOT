/* ---------------------------------------- *\
||            0xBOT MIGRATION FILE          ||
||                     V1                   ||
\* ---------------------------------------- */
const migid = 0; const migna = 'ADD MIGRATIONS TABLE'

export default {
	data: {
		"name": migna
	},

	async migrate(db: any) {
		// Check if Migration has already occured
		try {
			await db.query(`select * from migrations where id = ${migid};`)
		} catch (e) {
			await db.query(`create table migrations (id int, name text)`)
			await db.query(`insert into migrations values (${migid}, $1)`, [migna])
			return true
		}; return false
	}
}