"use strict";
module.exports = {
method: 'POST',
path: '/options/email',
async code(ctr) {
if (!('option' in ctr.body))
return ctr.status(422).print({ success: false, message: 'INVALID BODY' });
const dbemail = await ctr['@'].db.query(`select * from useremails where userid = $1 and email = $2;`, [
ctr["@"].user.id,
ctr["@"].user.email
]);
if (ctr.body.option) {
if (dbemail.rowCount === 0) {
await ctr['@'].db.query(`insert into useremails values ($1, $2)`, [
ctr["@"].user.id,
ctr["@"].user.email
]);
}
}
else {
await ctr['@'].db.query(`delete from useremails where userid = $1 and email = $2;`, [
ctr["@"].user.id,
ctr["@"].user.email
]);
}
return ctr.print({ success: true, message: 'OPTION UPDATED' });
}
};
//# sourceMappingURL=post.js.map