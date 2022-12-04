"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const migid = 6;
const migna = 'ADD USERITEMS TABLE';
exports.default = {
    data: {
        "name": migna
    },
    async migrate(db) {
        const status = await db.query(`select id from migrations where id = ${migid};`);
        if (status.rowCount !== 1) {
            await db.query(`create table useritems (userid text, value text, amount numeric)`);
            await db.query(`insert into migrations values (${migid}, $1)`, [migna]);
            return true;
        }
        ;
        return false;
    }
};
//# sourceMappingURL=0006_add-useritems-table.js.map