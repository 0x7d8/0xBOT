"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const migid = 7;
const migna = 'ADD USERBUSINESSES TABLE';
exports.default = {
data: {
"name": migna
},
async migrate(db) {
const status = await db.query(`select id from migrations where id = ${migid};`);
if (status.rowCount !== 1) {
await db.query(`create table userbusinesses (userid text, txtvalue text, intvalue numeric)`);
await db.query(`insert into migrations values (${migid}, $1)`, [migna]);
return true;
}
;
return false;
}
};
//# sourceMappingURL=0007_add-userbusinesses-table.js.map