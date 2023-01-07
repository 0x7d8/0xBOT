/* ---------------------------------------- *\
||            0xBOT MIGRATION FILE          ||
||                     V1                   ||
\* ---------------------------------------- */
const migid = 19; const migna = 'SET USERTRANSACTIONS TIMESTAMP BIGINT'

export default {
	data: {
		"name": migna
	},

	async migrate(db: any) {
		// Check if Migration has already occured
		const status = await db.query(`select id from migrations where id = ${migid};`)
		if (status.rowCount !== 1) {
			await db.query(`alter table usertransactions alter column timestamp type bigint;`)
			await db.query(`insert into migrations values (${migid}, $1)`, [migna])
			return true
		}; return false
	}
}