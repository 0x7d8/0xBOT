import { default as webserver } from "rjweb-server"
import webserverInterface from "@interfaces/Webserver.js"

module.exports = {
    type: webserver.types.get,
    path: '/stats/global',

    async code(ctr: webserverInterface) {
        // Return Result
        return ctr.print({
            "success": true,
            "commands": await ctr.bot.stat.get(`t-all`, 'cmd'),
            "buttons": await ctr.bot.stat.get(`t-all`, 'btn'),
            "modals": await ctr.bot.stat.get(`t-all`, 'mod')
        })
    }
}