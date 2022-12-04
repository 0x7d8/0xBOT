"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rjweb_server_1 = __importDefault(require("rjweb-server"));
module.exports = {
    type: rjweb_server_1.default.types.get,
    path: '/stats/global',
    async code(ctr) {
        return ctr.print({
            "success": true,
            "commands": await ctr.bot.stat.get(`t-all`, 'cmd'),
            "buttons": await ctr.bot.stat.get(`t-all`, 'btn'),
            "modals": await ctr.bot.stat.get(`t-all`, 'mod')
        });
    }
};
//# sourceMappingURL=global.js.map