"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const migid = 15;
const migna = 'ADD USEREMAILS TABLE';
exports.default = {
data: {
"name": migna
},
async migrate(db) {
const status = await db.query(`select id from migrations where id = ${migid};`);
if (status.rowCount !== 1) {
await db.query(`create table useremails (userid text, email text)`);
await db.query(`insert into migrations values (${migid}, $1)`, [migna]);
return true;
}
;
return false;
}
};
