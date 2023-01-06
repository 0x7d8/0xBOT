"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rjweb_server_1 = __importDefault(require("rjweb-server"));
const discord_oauth2_1 = __importDefault(require("discord-oauth2"));
const oAuth = new discord_oauth2_1.default();
module.exports = {
type: rjweb_server_1.default.types.post,
path: '/auth/logout',
async code(ctr) {
if (!ctr.header.has('authtoken'))
return ctr.print({ "success": false, "message": 'NO AUTH TOKEN' });
const userInfos = await ctr.api.users.get(ctr.header.get('authtoken'));
if (userInfos === 'N-FOUND')
return ctr.print({ "success": false, "message": 'USER NOT FOUND' });
ctr.api.users.rem(userInfos.id);
await oAuth.revokeToken(userInfos.tokens.access, Buffer.from(`${ctr.config.client.id}:${ctr.config.client.secret}`).toString("base64"));
return ctr.print({
"success": true
});
}
};
//# sourceMappingURL=logout.js.map