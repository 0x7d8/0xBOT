"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const migid = 19;
const migna = 'SET USERTRANSACTIONS TIMESTAMP BIGINT';
exports.default = {
data: {
"name": migna
},
async migrate(db) {
const status = await db.query(`select id from migrations where id = ${migid};`);
if (status.rowCount !== 1) {
await db.query(`alter table usertransactions alter column timestamp type bigint;`);
await db.query(`insert into migrations values (${migid}, $1)`, [migna]);
return true;
}
;
return false;
}
};
//# sourceMappingURL=0019_set-usertransactions-timestamp-bigint.js.map