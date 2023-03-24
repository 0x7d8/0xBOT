"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
return (mod && mod.__esModule) ? mod : { "default": mod };
};
const discord_oauth2_1 = __importDefault(require("discord-oauth2"));
const oAuth = new discord_oauth2_1.default();
module.exports = {
method: 'POST',
path: '/auth/logout',
async code(ctr) {
ctr['@'].api.users.rem(ctr["@"].user.id);
await oAuth.revokeToken(ctr["@"].user.tokens.access, Buffer.from(`${ctr['@'].config.client.id}:${ctr['@'].config.client.secret}`).toString("base64"));
return ctr.print({
success: true
});
}
};
//# sourceMappingURL=logout.js.map