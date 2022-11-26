// Connect to Database
const config = require('../../config.json')
const pgP = require('pg').Pool
const db = new pgP({
    host: config.database.oxbot.host,
    database: config.database.oxbot.database,
    user: config.database.oxbot.username,
    password: config.database.oxbot.password,
    ssl: true,
    port: 5432
})

const utils = require('rjutils-collection')

// Get Function
exports.get = (transactionId) => new Promise(async ful => {
    const data = await db.query(`select * from usertransactions where id = $1;`, [transactionId])
    if (data.rowCount !== 1) { return ful('N-FOUND') }
    return ful({
        id: data.rows[0].id,
        success: data.rows[0].success,
        timestamp: data.rows[0].timestamp,
        sender: {
            id: data.rows[0].senderid,
            amount: data.rows[0].senderamount,
            type: data.rows[0].sendertype
        }, reciever: {
            id: data.rows[0].recieverid,
            amount: data.rows[0].recieveramount,
            type: data.rows[0].recievertype
        }
    })
})

// Log Function
exports.log = (json) => new Promise(async ful => {
    const transactionId = utils.randomStr({
        length: 20,
        numbers: true,
        uppercase: true,
        symbols: false,
    })

    if (json.sender.id === undefined) json.sender = {
        id: 'empty',
        amount: '0',
        type: 'empty'
    }; if (json.reciever.id === undefined) json.reciever = {
        id: 'empty',
        amount: '0',
        type: 'empty'
    }

    await db.query(`insert into usertransactions values ($1, $2, $3, $4, $5, $6, $7, $8, $9)`, [
        transactionId,
        json.sender.id,
        json.sender.amount,
        json.sender.type,
        json.reciever.id,
        json.reciever.amount,
        json.reciever.type,
        json.success,
        (Math.floor(+new Date() / 1000))
    ]); return ful({
        success: true,
        id: transactionId
    })
})