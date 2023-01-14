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
path: '/options/email',
async code(ctr) {
if (!('option' in ctr.reqBody))
return ctr.print({ "success": false, "message": 'NO HEADERS' });
if (!ctr.header.has('authtoken'))
return ctr.print({ "success": false, "message": 'NO AUTH TOKEN' });
const userInfos = await ctr.api.users.get(ctr.header.get('authtoken'));
if (userInfos === 'N-FOUND')
return ctr.print({ "success": false, "message": 'USER NOT FOUND' });
const dbemail = await ctr.db.query(`select * from useremails where userid = $1 and email = $2;`, [
userInfos.id,
userInfos.email
]);
if (ctr.reqBody.option) {
if (dbemail.rowCount === 0) {
await ctr.db.query(`insert into useremails values ($1, $2)`, [
userInfos.id,
userInfos.email
]);
}
}
else {
await ctr.db.query(`delete from useremails where userid = $1 and email = $2;`, [
userInfos.id,
userInfos.email
]);
}
return ctr.print({ "success": true, "message": 'OPTION UPDATED' });
}
};
