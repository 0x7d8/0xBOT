"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const migid = 12;
const migna = 'ADD LANGUAGES TABLE';
exports.default = {
    data: {
        "name": migna
    },
    async migrate(db) {
        const status = await db.query(`select id from migrations where id = ${migid};`);
        if (status.rowCount !== 1) {
            await db.query(`create table languages (name text, value text)`);
            await db.query(`insert into migrations values (${migid}, $1)`, [migna]);
            return true;
        }
        ;
        return false;
    }
};
//# sourceMappingURL=0012_add-languages-table.js.map