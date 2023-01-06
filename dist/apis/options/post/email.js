"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rjweb_server_1 = __importDefault(require("rjweb-server"));
module.exports = {
type: rjweb_server_1.default.types.post,
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
//# sourceMappingURL=email.js.map