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
		if (!('option' in ctr.body)) return ctr.print({ "success": false, "message": 'NO HEADERS' })
		
		// Check for Headers
		if (!ctr.headers.has('authtoken')) return ctr.print({ "success": false, "message": 'NO AUTH TOKEN' })

		// Get Infos
		const userInfos = await ctr['@'].api.users.get(ctr.headers.get('authtoken'))
		if (userInfos === 'N-FOUND') return ctr.print({ "success": false, "message": 'USER NOT FOUND' })

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