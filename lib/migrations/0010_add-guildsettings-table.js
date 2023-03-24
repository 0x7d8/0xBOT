"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const migid = 10;
const migna = 'ADD GUILDSETTINGS TABLE';
exports.default = {
data: {
"name": migna
},
async migrate(db) {
const status = await db.query(`select id from migrations where id = ${migid};`);
if (status.rowCount !== 1) {
await db.query(`create table guildsettings (guildid text, setting text, value boolean)`);
await db.query(`insert into migrations values (${migid}, $1)`, [migna]);
return true;
}
;
return false;
}
};
//# sourceMappingURL=0010_add-guildsettings-table.js.map