"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rjweb_server_1 = __importDefault(require("rjweb-server"));
module.exports = {
type: rjweb_server_1.default.types.get,
path: '/stats/user',
async code(ctr) {
if (!ctr.query.has('id'))
return ctr.print({ "success": false, "message": 'NO ID' });
return ctr.print({
"success": true,
"commands": await ctr.bot.stat.get(`u-${ctr.query.get('id')}`, 'cmd'),
"buttons": await ctr.bot.stat.get(`u-${ctr.query.get('id')}`, 'btn'),
"modals": await ctr.bot.stat.get(`u-${ctr.query.get('id')}`, 'mod')
});
}
};
//# sourceMappingURL=user.js.map