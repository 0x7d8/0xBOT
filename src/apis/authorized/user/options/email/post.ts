import { ctrFile } from "@interfaces/Webserver.js"

interface Body {
	option?: boolean
}

export = {
	method: 'POST',
	path: '/options/email',

	async code(ctr) {
		// Check for Queries
		if (!('option' in ctr.body)) return ctr.status(422).print({ "success": false, "message": 'INVALID BODY' })

		// Set Email
		const dbemail = await ctr['@'].db.query(`select * from useremails where userid = $1 and email = $2;`, [
			ctr["@"].user.id,
			ctr["@"].user.email
		])

		if (ctr.body.option) {
			if (dbemail.rowCount === 0) {
				await ctr['@'].db.query(`insert into useremails values ($1, $2)`, [
					ctr["@"].user.id,
					ctr["@"].user.email
				])
			}
		} else {
			await ctr['@'].db.query(`delete from useremails where userid = $1 and email = $2;`, [
				ctr["@"].user.id,
				ctr["@"].user.email
			])
		}

		// Return Result
		return ctr.print({ "success": true, "message": 'OPTION UPDATED' })
	}
} as ctrFile<Body>