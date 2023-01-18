import * as webserver from "rjweb-server"
import { ctrFile } from "@interfaces/Webserver.js"

interface Body {}

export = {
	method: webserver.types.get,
	path: '/options/email',

	async code(ctr) {
		// Check for Headers
		if (!ctr.headers.has('authtoken')) return ctr.print({ "success": false, "message": 'NO AUTH TOKEN' })

		// Get Infos
		const userInfos = await ctr['@'].api.users.get(ctr.headers.get('authtoken'))
		if (userInfos === 'N-FOUND') return ctr.print({ "success": false, "message": 'USER NOT FOUND' })

		// Get Email
		const email = await ctr['@'].db.query(`select * from useremails where userid = $1 and email = $2;`, [
			userInfos.id,
			userInfos.email
		])
		
		if (email.rowCount === 1) return ctr.print({ "success": true, "email": true })
		else return ctr.print({ "success": true, "email": false })
	}
} as ctrFile<Body>