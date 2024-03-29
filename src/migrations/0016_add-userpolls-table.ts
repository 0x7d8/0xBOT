/* ---------------------------------------- *\
||            0xBOT MIGRATION FILE          ||
||                     V1                   ||
\* ---------------------------------------- */
const migid = 16; const migna = 'ADD USERPOLLS TABLE'

export default {
	data: {
		"name": migna
	},

	async migrate(db: any) {
		// Check if Migration has already occured
		const status = await db.query(`select id from migrations where id = ${migid};`)
		if (status.rowCount !== 1) {
			await db.query(`create table userpolls (messageid varchar(255), userid varchar(255), vote boolean)`)
			await db.query(`alter table userpolls add constraint pk primary key (messageId, userid)`)
			await db.query(`insert into migrations values (${migid}, $1)`, [migna])
			return true
		}; return false
	}
}