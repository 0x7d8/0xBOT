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
method: webserver.types.post,
path: '/auth/logout',
async code(ctr) {
const userInfos = await ctr['@'].api.users.get(ctr.headers.get('authtoken'));
ctr['@'].api.users.rem(userInfos.id);
await oAuth.revokeToken(userInfos.tokens.access, Buffer.from(`${ctr['@'].config.client.id}:${ctr['@'].config.client.secret}`).toString("base64"));
return ctr.print({
"success": true
});
}
};
//# sourceMappingURL=logout.js.map