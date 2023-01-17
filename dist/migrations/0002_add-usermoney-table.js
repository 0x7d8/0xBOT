"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const migid = 2;
const migna = 'ADD USERMONEY TABLE';
exports.default = {
data: {
"name": migna
},
async migrate(db) {
const status = await db.query(`select id from migrations where id = ${migid};`);
if (status.rowCount !== 1) {
await db.query(`create table usermoney (userid text, money numeric)`);
await db.query(`insert into migrations values (${migid}, $1)`, [migna]);
return true;
}
;
return false;
}
};
//# sourceMappingURL=0002_add-usermoney-table.js.map