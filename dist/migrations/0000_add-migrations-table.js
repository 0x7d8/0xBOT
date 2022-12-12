"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const migid = 0;
const migna = 'ADD MIGRATIONS TABLE';
exports.default = {
    data: {
        "name": migna
    },
    async migrate(db) {
        try {
            await db.query(`select * from migrations where id = ${migid};`);
        }
        catch (e) {
            await db.query(`create table migrations (id int, name text)`);
            await db.query(`insert into migrations values (${migid}, $1)`, [migna]);
            return true;
        }
        ;
        return false;
    }
};
//# sourceMappingURL=0000_add-migrations-table.js.map