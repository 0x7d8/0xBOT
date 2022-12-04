"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rjweb_server_1 = __importDefault(require("rjweb-server"));
module.exports = {
    type: rjweb_server_1.default.types.get,
    path: '/stats/guild',
    async code(ctr) {
        if (!ctr.query.has('id'))
            return ctr.print({ "success": false, "message": 'NO ID' });
        if (!await ctr.api.checkSession(ctr.header.get('accesstoken'), ctr.header.get('tokentype'), ctr.header.get('userid'), ctr.query.get('id')))
            return ctr.print({ "success": false, "message": 'PERMISSION DENIED' });
        return ctr.print({
            "success": true,
            "commands": await ctr.bot.stat.get(`g-${ctr.query.get('id')}`, 'cmd'),
            "buttons": await ctr.bot.stat.get(`g-${ctr.query.get('id')}`, 'btn'),
            "modals": await ctr.bot.stat.get(`g-${ctr.query.get('id')}`, 'mod')
        });
    }
};
//# sourceMappingURL=guild.js.map