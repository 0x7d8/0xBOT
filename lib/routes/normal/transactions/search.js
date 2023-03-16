"use strict";
module.exports = {
method: 'GET',
path: '/transactions/search',
async code(ctr) {
if (!ctr.headers.get('senderid') ||
!ctr.headers.get('recieverid') ||
!ctr.headers.get('maxresults'))
return ctr.status(422).print({ success: false, message: 'NO HEADERS' });
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
id: transaction.id,
timestamp: Number(transaction.timestamp),
sender: {
id: transaction.senderid,
username: senderInfo.username,
usertag: senderInfo.usertag,
avatar: senderInfo.avatar,
amount: Number(transaction.senderamount),
type: transaction.sendertype
}, reciever: {
id: transaction.recieverid,
username: recieverInfo.username,
usertag: recieverInfo.usertag,
avatar: recieverInfo.avatar,
amount: Number(transaction.recieveramount),
type: transaction.recievertype
}
});
}
return ctr.print({
success: true,
results: transactions
});
}
};
//# sourceMappingURL=search.js.map