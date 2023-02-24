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
method: webserver.types.post,
path: '/options/guild',
async code(ctr) {
if (!ctr.queries.has('id'))
return ctr.status(422).print({ "success": false, "message": 'NO ID' });
if (!('option' in ctr.body) || !('value' in ctr.body))
return ctr.status(422).print({ "success": false, "message": 'INVALID BODY' });
let response = { "success": false, "message": 'NOT FOUND' };
if (ctr.body.option === 'LANGUAGE') {
if (ctr.body.value !== 'GERMAN' && ctr.body.value !== 'ENGLISH')
return ctr.print({ "success": false, "message": 'INVALID VALUE' });
let set = 'en';
if (ctr.body.value === 'GERMAN') {
set = 'de';
}
ctr['@'].bot.language.set(ctr.queries.get('id'), set);
response = { "success": true, "message": 'OPTION UPDATED' };
}
if (ctr.body.option !== 'LANGUAGE') {
if (ctr.body.value !== true && ctr.body.value !== false)
return ctr.print({ "success": false, "message": 'INVALID VALUE' });
ctr['@'].bot.settings.set(ctr.queries.get('id'), ctr.body.option.toLowerCase(), ctr.body.value);
response = { "success": true, "message": 'OPTION UPDATED' };
}
return ctr.print(response);
}
};
//# sourceMappingURL=post.js.map