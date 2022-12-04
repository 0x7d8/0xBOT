"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const migid = 16;
const migna = 'ADD USERPOLLS TABLE';
exports.default = {
    data: {
        "name": migna
    },
    async migrate(db) {
        const status = await db.query(`select id from migrations where id = ${migid};`);
        if (status.rowCount !== 1) {
            await db.query(`create table userpolls (messageid varchar(255), userid varchar(255), vote boolean)`);
            await db.query(`alter table userpolls add constraint pk primary key (messageId, userId)`);
            await db.query(`insert into migrations values (${migid}, $1)`, [migna]);
            return true;
        }
        ;
        return false;
    }
};
//# sourceMappingURL=0016_add-userpolls-table.js.map