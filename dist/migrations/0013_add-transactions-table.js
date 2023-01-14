"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const migid = 13;
const migna = 'ADD TRANSACTIONS TABLE';
exports.default = {
data: {
"name": migna
},
async migrate(db) {
const status = await db.query(`select id from migrations where id = ${migid};`);
if (status.rowCount !== 1) {
await db.query(`create table usertransactions (id text, senderid text, senderamount numeric, sendertype text, recieverid text, recieveramount numeric, recievertype text, success boolean, timestamp numeric)`);
await db.query(`insert into migrations values (${migid}, $1)`, [migna]);
return true;
}
;
return false;
}
};
