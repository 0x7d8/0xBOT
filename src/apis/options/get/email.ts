import { default as webserver } from "rjweb-server"
import webserverInterface from "@interfaces/Webserver.js"

module.exports = {
	type: webserver.types.get,
	path: '/options/email',

	async code(ctr: webserverInterface) {
		// Check for Queries
		if (!ctr.query.has('email')) return ctr.print({ "success": false, "message": 'NO EMAIL' })

		// Check Permissions
		if (!await ctr.api.checkEmail(
			ctr.header.get('accesstoken'),
			ctr.header.get('tokentype'),
			ctr.header.get('userid'),
			ctr.query.get('email')
		)) return ctr.print({ "success": false, "message": 'PERMISSION DENIED' })

		// Get Email
		const email = await ctr.db.query(`select * from useremails where userid = $1 and email = $2;`, [
			ctr.header.get('userid'),
			ctr.query.get('email')
		])
		
		if (email.rowCount === 1) return ctr.print({ "success": true, "email": true })
		else return ctr.print({ "success": true, "email": false })
	}
}