"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rjweb_server_1 = __importDefault(require("rjweb-server"));
module.exports = {
    type: rjweb_server_1.default.types.get,
    path: '/check/guild',
    async code(ctr) {
        // Check for Queries
        if (!ctr.query.has('id'))
            return ctr.print({ "success": false, "message": 'NO ID' });
        // Check Permissions
        if (!await ctr.api.checkSession(ctr.header.get('accesstoken'), ctr.header.get('tokentype'), ctr.header.get('userid'), ctr.query.get('id')))
            return ctr.print({ "success": false, "message": 'PERMISSION DENIED' });
        // Get Stats
        let status = true;
        await ctr.client.guilds.fetch(ctr.query.get('id')).catch(() => { status = false; });
        // Return Result
        return ctr.print({
            "success": status
        });
    }
};
//# sourceMappingURL=guild.js.map