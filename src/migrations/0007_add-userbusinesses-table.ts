/* ---------------------------------------- *\
||            0xBOT MIGRATION FILE          ||
||                     V1                   ||
\* ---------------------------------------- */
const migid = 7; const migna = 'ADD USERBUSINESSES TABLE'

export default {
	data: {
		"name": migna
	},

	async migrate(db: any) {
		// Check if Migration has already occured
		const status = await db.query(`select id from migrations where id = ${migid};`)
		if (status.rowCount !== 1) {
			await db.query(`create table userbusinesses (userid text, txtvalue text, intvalue numeric)`)
			await db.query(`insert into migrations values (${migid}, $1)`, [migna])
			return true
		}; return false
	}
}