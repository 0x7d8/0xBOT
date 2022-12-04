"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rjweb_server_1 = __importDefault(require("rjweb-server"));
module.exports = {
    type: rjweb_server_1.default.types.get,
    path: '/transactions/search',
    async code(ctr) {
        // Check for Queries
        if (!ctr.header.get('senderid') || !ctr.header.get('recieverid') || !ctr.header.get('maxresults'))
            return ctr.print({ "success": false, "message": 'NO HEADERS' });
        let rawvalues;
        if (ctr.header.get('senderid') !== 'empty' && ctr.header.get('recieverid') !== 'empty') {
            rawvalues = await ctr.db.query(`select * from usertransactions where senderid = $1 and recieverid = $2 order by timestamp desc;`, [
                ctr.header.get('senderid'),
                ctr.header.get('recieverid')
            ]);
        }
        else if (ctr.header.get('senderid') !== 'empty' && ctr.header.get('recieverid') === 'empty') {
            rawvalues = await ctr.db.query(`select * from usertransactions where senderid = $1 order by timestamp desc;`, [
                ctr.header.get('senderid')
            ]);
        }
        else if (ctr.header.get('senderid') === 'empty' && ctr.header.get('recieverid') !== 'empty') {
            rawvalues = await ctr.db.query(`select * from usertransactions where recieverid = $1 order by timestamp desc;`, [
                ctr.header.get('recieverid')
            ]);
        }
        else {
            rawvalues = await ctr.db.query(`select * from usertransactions order by timestamp desc;`);
        }
        // Generate JSON Object
        const transactions = [];
        let count = 0;
        await Promise.all(rawvalues.rows.map(async (transaction) => {
            if (++count > Number(ctr.header.get('maxresults')))
                return;
            const senderInfo = await ctr.bot.userdb.get(transaction.senderid);
            const recieverInfo = await ctr.bot.userdb.get(transaction.recieverid);
            transactions.push({
                "id": transaction.id,
                "timestamp": transaction.timestamp,
                "sender": {
                    "id": transaction.senderid,
                    "username": senderInfo.username,
                    "usertag": senderInfo.usertag,
                    "avatar": senderInfo.avatar,
                    "amount": Number(transaction.senderamount),
                    "type": transaction.sendertype
                }, "reciever": {
                    "id": transaction.recieverid,
                    "username": recieverInfo.username,
                    "usertag": recieverInfo.usertag,
                    "avatar": recieverInfo.avatar,
                    "amount": Number(transaction.recieveramount),
                    "type": transaction.recievertype
                }
            });
        }));
        // Return Result
        return ctr.print({
            "success": true,
            "results": transactions
        });
    }
};
//# sourceMappingURL=search.js.map