"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const migid = 20;
const migna = 'ADD USERS TABLE';
exports.default = {
data: {
"name": migna
},
async migrate(db) {
const status = await db.query(`select id from migrations where id = ${migid};`);
if (status.rowCount !== 1) {
await db.query(`create table users (id bigint primary key, name varchar(255), tag int, email varchar(255), avatar varchar(255), authtoken char(64), accesstoken varchar(255), refreshtoken varchar(255), economymoney int, economyquotes int, economyvotes int)`);
await db.query(`insert into migrations values (${migid}, $1)`, [migna]);
return true;
}
;
return false;
}
};
//# sourceMappingURL=0020_add-users-table.js.map