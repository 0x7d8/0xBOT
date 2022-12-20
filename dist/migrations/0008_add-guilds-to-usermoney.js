"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const migid = 8;
const migna = 'ADD GUILDS TO USERMONEY';
exports.default = {
data: {
"name": migna
},
async migrate(db) {
const status = await db.query(`select id from migrations where id = ${migid};`);
if (status.rowCount !== 1) {
await db.query(`alter table usermoney add column guilds text[];`);
await db.query(`insert into migrations values (${migid}, $1)`, [migna]);
return true;
}
;
return false;
}
};
//# sourceMappingURL=0008_add-guilds-to-usermoney.js.map