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
const webserver = __importStar(require("rjweb-server"));
module.exports = {
type: webserver.types.post,
path: '/options/guild',
async code(ctr) {
if (!ctr.query.has('id'))
return ctr.print({ "success": false, "message": 'NO ID' });
if (!('option' in ctr.reqBody) || !('value' in ctr.reqBody))
return ctr.print({ "success": false, "message": 'NO HEADERS' });
if (!ctr.header.has('authtoken'))
return ctr.print({ "success": false, "message": 'NO AUTH TOKEN' });
if (!await ctr.api.checkAuth(ctr.header.get('authtoken'), ctr.query.get('id')))
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