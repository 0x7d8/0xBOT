"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const migid = 11;
const migna = 'ADD USERSTOCKS TABLE';
exports.default = {
    data: {
        "name": migna
    },
    async migrate(db) {
        const status = await db.query(`select id from migrations where id = ${migid};`);
        if (status.rowCount !== 1) {
            await db.query(`create table userstocks (userid text, stock text, type text, value numeric)`);
            await db.query(`insert into migrations values (${migid}, $1)`, [migna]);
            return true;
        }
        ;
        return false;
    }
};
//# sourceMappingURL=0011_add-userstocks-table.js.map