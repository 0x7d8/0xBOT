"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
if (k2 === undefined) k2 = k;
var desc = Object.getOwnPropertyDescriptor(m, k);
if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
  desc = { enumerable: true, get: function() { return m[k]; } };
}
Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
if (k2 === undefined) k2 = k;
o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
if (mod && mod.__esModule) return mod;
var result = {};
if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
__setModuleDefault(result, mod);
return result;
};
const webserver = __importStar(require("rjweb-server"));
module.exports = {
method: webserver.types.get,
path: '/transactions/search',
async code(ctr) {
if (!ctr.headers.get('senderid') ||
!ctr.headers.get('recieverid') ||
!ctr.headers.get('maxresults'))
return ctr.status(422).print({ "success": false, "message": 'NO HEADERS' });
let rawvalues;
if (ctr.headers.get('senderid') !== 'empty' && ctr.headers.get('recieverid') !== 'empty') {
rawvalues = await ctr['@'].db.query(`select * from usertransactions where senderid = $1 and recieverid = $2 order by timestamp desc;`, [
ctr.headers.get('senderid'),
ctr.headers.get('recieverid')
]);
}
else if (ctr.headers.get('senderid') !== 'empty' && ctr.headers.get('recieverid') === 'empty') {
rawvalues = await ctr['@'].db.query(`select * from usertransactions where senderid = $1 order by timestamp desc;`, [
ctr.headers.get('senderid')
]);
}
else if (ctr.headers.get('senderid') === 'empty' && ctr.headers.get('recieverid') !== 'empty') {
rawvalues = await ctr['@'].db.query(`select * from usertransactions where recieverid = $1 order by timestamp desc;`, [
ctr.headers.get('recieverid')
]);
}
else {
rawvalues = await ctr['@'].db.query(`select * from usertransactions order by timestamp desc;`);
}
const transactions = [];
let count = 0;
for (const transaction of rawvalues.rows) {
if (++count > Number(ctr.headers.get('maxresults')))
break;
const senderInfo = await ctr['@'].bot.userdb.get(transaction.senderid);
const recieverInfo = await ctr['@'].bot.userdb.get(transaction.recieverid);
transactions.push({
"id": transaction.id,
"timestamp": Number(transaction.timestamp),
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
}
return ctr.print({
"success": true,
"results": transactions
});
}
};
//# sourceMappingURL=search.js.map