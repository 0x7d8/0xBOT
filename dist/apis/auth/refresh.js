"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
if (k2 === undefined) k2 = k;
var desc = Object.getOwnPropertyDescriptor(m, k);
if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
  desc = { enumerable: true, get: function() { return m[k]; } };
}
Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
if (k2 === undefined) k2 = k;
o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
if (mod && mod.__esModule) return mod;
var result = {};
if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
__setModuleDefault(result, mod);
return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
return (mod && mod.__esModule) ? mod : { "default": mod };
};
const webserver = __importStar(require("rjweb-server"));
const discord_oauth2_1 = __importDefault(require("discord-oauth2"));
const oAuth = new discord_oauth2_1.default();
module.exports = {
type: webserver.types.get,
path: '/auth/refresh',
async code(ctr) {
if (!ctr.header.has('authtoken'))
return ctr.print({ "success": false, "message": 'NO AUTH TOKEN' });
const userInfos = await ctr['@'].api.users.get(ctr.header.get('authtoken'));
if (userInfos === 'N-FOUND')
return ctr.print({ "success": false, "message": 'USER NOT FOUND' });
const token = await oAuth.tokenRequest({
clientId: ctr['@'].config.client.id,
clientSecret: ctr['@'].config.client.secret,
grantType: 'refresh_token',
scope: ['identify', 'guilds', 'email'],
redirectUri: 'https://0xbot.de/auth/discord',
refreshToken: userInfos.tokens.refresh
});
ctr['@'].api.users.set({
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