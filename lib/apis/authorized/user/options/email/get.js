"use strict";
module.exports = {
method: 'GET',
path: '/options/email',
async code(ctr) {
const email = await ctr['@'].db.query(`select * from useremails where userid = $1 and email = $2;`, [
ctr["@"].user.id,
ctr["@"].user.email
]);
if (email.rowCount === 1)
return ctr.print({ "success": true, "email": true });
else
return ctr.print({ "success": true, "email": false });
}
};
//# sourceMappingURL=get.js.map