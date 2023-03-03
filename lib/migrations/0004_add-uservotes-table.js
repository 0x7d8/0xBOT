"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const migid = 4;
const migna = 'ADD USERVOTES TABLE';
exports.default = {
data: {
"name": migna
},
async migrate(db) {
const status = await db.query(`select id from migrations where id = ${migid};`);
if (status.rowCount !== 1) {
await db.query(`create table uservotes (userid text, votes numeric)`);
await db.query(`insert into migrations values (${migid}, $1)`, [migna]);
return true;
}
;
return false;
}
};
//# sourceMappingURL=0004_add-uservotes-table.js.map