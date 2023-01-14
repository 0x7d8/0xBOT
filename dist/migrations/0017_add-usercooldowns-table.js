"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const migid = 17;
const migna = 'ADD USERCOOLDOWNS TABLE';
exports.default = {
data: {
"name": migna
},
async migrate(db) {
const status = await db.query(`select id from migrations where id = ${migid};`);
if (status.rowCount !== 1) {
await db.query(`create table usercooldowns (name varchar(255), userid varchar(255), expires bigint)`);
await db.query(`insert into migrations values (${migid}, $1)`, [migna]);
return true;
}
;
return false;
}
};
