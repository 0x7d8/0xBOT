import * as webserver from "rjweb-server"
import { ctrFile } from "@interfaces/Webserver.js"

interface Body {
	option?: boolean
}

export = {
	method: webserver.types.post,
	path: '/options/email',

	async code(ctr) {
		// Check for Queries
		if (!('option' in ctr.body)) return ctr.status(422).print({ "success": false, "message": 'INVALID BODY' })
		
		// Get Infos
		const userInfos = await ctr['@'].api.users.get(ctr.headers.get('authtoken'))

		// Set Email
		const dbemail = await ctr['@'].db.query(`select * from useremails where userid = $1 and email = $2;`, [
			userInfos.id,
			userInfos.email
		])

		if (ctr.body.option) {
			if (dbemail.rowCount === 0) {
				await ctr['@'].db.query(`insert into useremails values ($1, $2)`, [
					userInfos.id,
					userInfos.email
				])
			}
		} else {
			await ctr['@'].db.query(`delete from useremails where userid = $1 and email = $2;`, [
				userInfos.id,
				userInfos.email
			])
		}

		// Return Result
		return ctr.print({ "success": true, "message": 'OPTION UPDATED' })
	}
} as ctrFile<Body>