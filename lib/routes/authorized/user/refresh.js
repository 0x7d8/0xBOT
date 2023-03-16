"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
return (mod && mod.__esModule) ? mod : { "default": mod };
};
const discord_oauth2_1 = __importDefault(require("discord-oauth2"));
const oAuth = new discord_oauth2_1.default();
module.exports = {
method: 'GET',
path: '/auth/refresh',
async code(ctr) {
const token = await oAuth.tokenRequest({
clientId: ctr['@'].config.client.id,
clientSecret: ctr['@'].config.client.secret,
grantType: 'refresh_token',
scope: ['identify', 'guilds', 'email'],
redirectUri: 'https://0xbot.de/auth/discord',
refreshToken: ctr["@"].user.tokens.refresh
});
ctr['@'].api.users.set({
auth: ctr.headers.get('authtoken'),
user: {
id: ctr["@"].user.id,
name: ctr["@"].user.name,
tag: ctr["@"].user.tag,
email: ctr["@"].user.email,
avatar: ctr["@"].user.avatar
}, tokens: {
access: token.access_token,
refresh: token.refresh_token
}
});
return ctr.print({
success: true,
tokens: {
access: token.access_token,
refresh: token.refresh_token
}
});
}
};
//# sourceMappingURL=refresh.js.map