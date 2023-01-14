"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const migid = 18;
const migna = 'ADD USERLOGINS TABLE';
exports.default = {
data: {
"name": migna
},
async migrate(db) {
const status = await db.query(`select id from migrations where id = ${migid};`);
if (status.rowCount !== 1) {
await db.query(`create table userlogins (id varchar(255), name varchar(255), tag varchar(255), email varchar(255), avatar varchar(255), authToken char(64), accessToken varchar(255), refreshToken varchar(255))`);
await db.query(`insert into migrations values (${migid}, $1)`, [migna]);
return true;
}
;
return false;
}
};
