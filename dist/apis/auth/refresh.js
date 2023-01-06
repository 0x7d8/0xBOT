"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rjweb_server_1 = __importDefault(require("rjweb-server"));
const discord_oauth2_1 = __importDefault(require("discord-oauth2"));
const oAuth = new discord_oauth2_1.default();
module.exports = {
type: rjweb_server_1.default.types.get,
path: '/auth/refresh',
async code(ctr) {
if (!ctr.header.has('authtoken'))
return ctr.print({ "success": false, "message": 'NO AUTH TOKEN' });
const userInfos = await ctr.api.users.get(ctr.header.get('authtoken'));
if (userInfos === 'N-FOUND')
return ctr.print({ "success": false, "message": 'USER NOT FOUND' });
const token = await oAuth.tokenRequest({
clientId: ctr.config.client.id,
clientSecret: ctr.config.client.secret,
grantType: 'refresh_token',
scope: ['identify', 'guilds', 'email'],
redirectUri: 'https://0xbot.de/auth/discord',
refreshToken: userInfos.tokens.refresh
});
ctr.api.users.set({
auth: ctr.header.get('authtoken'),
user: {
id: userInfos.id,
name: userInfos.name,
tag: userInfos.tag,
email: userInfos.email,
avatar: userInfos.avatar
}, tokens: {
access: token.access_token,
refresh: token.refresh_token
}
});
return ctr.print({
"success": true,
"tokens": {
"access": token.access_token,
"refresh": token.refresh_token
}
});
}
};
//# sourceMappingURL=refresh.js.map