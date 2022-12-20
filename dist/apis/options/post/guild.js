"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rjweb_server_1 = __importDefault(require("rjweb-server"));
module.exports = {
type: rjweb_server_1.default.types.post,
path: '/options/guild',
async code(ctr) {
if (!ctr.query.has('id'))
return ctr.print({ "success": false, "message": 'NO ID' });
if (!('option' in ctr.reqBody) || !('value' in ctr.reqBody))
return ctr.print({ "success": false, "message": 'NO HEADERS' });
if (!await ctr.api.checkSession(ctr.header.get('accesstoken'), ctr.header.get('tokentype'), ctr.header.get('userid'), ctr.query.get('id')))
return ctr.print({ "success": false, "message": 'PERMISSION DENIED' });
let response = { "success": false, "message": 'NOT FOUND' };
if (ctr.reqBody.option === 'LANGUAGE') {
if (ctr.reqBody.value !== 'GERMAN' && ctr.reqBody.value !== 'ENGLISH')
return ctr.print({ "success": false, "message": 'INVALID VALUE' });
let set = 'en';
if (ctr.reqBody.value === 'GERMAN') {
set = 'de';
}
ctr.bot.language.set(ctr.query.get('id'), set);
response = { "success": true, "message": 'OPTION UPDATED' };
}
if (ctr.reqBody.option !== 'LANGUAGE') {
if (ctr.reqBody.value !== true && ctr.reqBody.value !== false)
return ctr.print({ "success": false, "message": 'INVALID VALUE' });
ctr.bot.settings.set(ctr.query.get('id'), ctr.reqBody.option.toLowerCase(), ctr.reqBody.value);
response = { "success": true, "message": 'OPTION UPDATED' };
}
return ctr.print(response);
}
};
//# sourceMappingURL=guild.js.map