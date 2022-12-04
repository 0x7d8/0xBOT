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
        else
            rawvalues = await ctr.db.query(`select * from usertransactions order by timestamp desc;`);
        let output = [];
        let count = 0;
        for (const element of rawvalues.rows) {
            count++;
            if (count > parseInt(ctr.header.get('maxresults')))
                break;
            const senderInfo = await ctr.bot.userdb.get(element.senderid);
            const recieverInfo = await ctr.bot.userdb.get(element.recieverid);
            output.push({
                "success": true,
                "id": element.id,
                "timestamp": element.timestamp,
                "sender": {
                    "id": element.senderid,
                    "username": senderInfo.username,
                    "usertag": senderInfo.usertag,
                    "avatar": senderInfo.avatar,
                    "amount": element.senderamount,
                    "type": element.sendertype
                }, "reciever": {
                    "id": element.recieverid,
                    "username": recieverInfo.username,
                    "usertag": recieverInfo.usertag,
                    "avatar": recieverInfo.avatar,
                    "amount": element.recieveramount,
                    "type": element.recievertype
                }
            });
        }
        return ctr.print(output);
    }
};
//# sourceMappingURL=search.js.map