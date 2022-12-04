"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* ---------------------------------------- *\
||            0xBOT MIGRATION FILE          ||
||                     V1                   ||
\* ---------------------------------------- */
const migid = 3;
const migna = 'ADD USERQUOTES TABLE';
exports.default = {
    data: {
        "name": migna
    },
    async migrate(db) {
        // Check if Migration has already occured
        const status = await db.query(`select id from migrations where id = ${migid};`);
        if (status.rowCount !== 1) {
            await db.query(`create table userquotes (userid text, quotes numeric)`);
            await db.query(`insert into migrations values (${migid}, $1)`, [migna]);
            return true;
        }
        ;
        return false;
    }
};
//# sourceMappingURL=0003_add-userquotes-table.js.map