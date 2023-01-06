"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rjweb_server_1 = __importDefault(require("rjweb-server"));
module.exports = {
type: rjweb_server_1.default.types.get,
path: '/options/email',
async code(ctr) {
if (!ctr.header.has('authtoken'))
return ctr.print({ "success": false, "message": 'NO AUTH TOKEN' });
const userInfos = await ctr.api.users.get(ctr.header.get('authtoken'));
if (userInfos === 'N-FOUND')
return ctr.print({ "success": false, "message": 'USER NOT FOUND' });
const email = await ctr.db.query(`select * from useremails where userid = $1 and email = $2;`, [
userInfos.id,
userInfos.email
]);
if (email.rowCount === 1)
return ctr.print({ "success": true, "email": true });
else
return ctr.print({ "success": true, "email": false });
}
};
//# sourceMappingURL=email.js.map