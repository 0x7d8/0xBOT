"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const migid = 1;
const migna = 'ADD STATS TABLE';
exports.default = {
data: {
"name": migna
},
async migrate(db) {
const status = await db.query(`select id from migrations where id = ${migid};`);
if (status.rowCount !== 1) {
await db.query(`create table stats (name text, type text, value numeric)`);
await db.query(`insert into migrations values (${migid}, $1)`, [migna]);
return true;
}
;
return false;
}
};
//# sourceMappingURL=0001_add-stats-table.js.map