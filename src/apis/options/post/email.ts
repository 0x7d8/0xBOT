import { default as webserver } from "rjweb-server"
import webserverInterface from "@interfaces/Webserver.js"

module.exports = {
    type: webserver.types.post,
    path: '/options/email',

    async code(ctr: webserverInterface) {
        // Check for Queries
        if (!ctr.query.has('email')) return ctr.print({ "success": false, "message": 'NO EMAIL' })
        if (!('option' in (ctr.reqBody as any))) return ctr.print({ "success": false, "message": 'NO HEADERS' })
        
        // Check Permissions
        if (!await ctr.api.checkEmail(
            ctr.header.get('accesstoken'),
            ctr.header.get('tokentype'),
            ctr.header.get('userid'),
            ctr.query.get('email')
        )) return ctr.print({ "success": false, "message": 'PERMISSION DENIED' })

        // Set Email
        const dbemail = await ctr.db.query(`select * from useremails where userid = $1 and email = $2;`, [
            ctr.header.get('userid'),
            ctr.query.get('email')
        ])

        if ((ctr.reqBody as any).option) {
            if (dbemail.rowCount === 0) {
                await ctr.db.query(`insert into useremails values ($1, $2)`, [
                    ctr.header.get('userid'),
                    ctr.query.get('email')
                ])
            }
        } else {
            await ctr.db.query(`delete from useremails where userid = $1 and email = $2;`, [
                ctr.header.get('userid'),
                ctr.query.get('email')
            ])
        }

        // Return Result
        return ctr.print({ "success": true, "message": 'OPTION UPDATED' })
    }
}