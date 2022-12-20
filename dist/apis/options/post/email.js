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
if (!ctr.query.has('email'))
return ctr.print({ "success": false, "message": 'NO EMAIL' });
if (!('option' in ctr.reqBody))
return ctr.print({ "success": false, "message": 'NO HEADERS' });
if (!await ctr.api.checkEmail(ctr.header.get('accesstoken'), ctr.header.get('tokentype'), ctr.header.get('userid'), ctr.query.get('email')))
return ctr.print({ "success": false, "message": 'PERMISSION DENIED' });
const dbemail = await ctr.db.query(`select * from useremails where userid = $1 and email = $2;`, [
ctr.header.get('userid'),
ctr.query.get('email')
]);
if (ctr.reqBody.option) {
if (dbemail.rowCount === 0) {
await ctr.db.query(`insert into useremails values ($1, $2)`, [
ctr.header.get('userid'),
ctr.query.get('email')
]);
}
}
else {
await ctr.db.query(`delete from useremails where userid = $1 and email = $2;`, [
ctr.header.get('userid'),
ctr.query.get('email')
]);
}
return ctr.print({ "success": true, "message": 'OPTION UPDATED' });
}
};
//# sourceMappingURL=email.js.map