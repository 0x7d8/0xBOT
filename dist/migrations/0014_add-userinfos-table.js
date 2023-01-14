"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const migid = 14;
const migna = 'ADD USERINFOS TABLE';
exports.default = {
data: {
"name": migna
},
async migrate(db) {
const status = await db.query(`select id from migrations where id = ${migid};`);
if (status.rowCount !== 1) {
await db.query(`create table userinfos (userid text, username text, discriminator text, avatar text)`);
await db.query(`insert into migrations values (${migid}, $1)`, [migna]);
return true;
}
;
return false;
}
};
