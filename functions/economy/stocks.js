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

// Get Function
exports.get = (userId, stock, type) => new Promise(async ful => {
    const data = await db.query(`select * from userstocks where userid = $1 and stock = $2 and type = $3;`, [
        userId,
        stock,
        type
    ])
    if (data.rowCount !== 1 && type === 'used') { return ful(0) }
    if (data.rowCount !== 1 && type === 'max') { return ful(10) }
    return ful(parseInt(data.rows[0].value))
})

// Set Function
exports.set = (userId, stock, type, value) => new Promise(async ful => {
    const data = await db.query(`select * from userstocks where userid = $1 and stock = $2 and type = $3;`, [
        userId,
        stock,
        type
    ])
    if (data.rowCount !== 1) {
        await db.query(`insert into userstocks values ($1, $2, $3, $4)`, [
            userId,
            stock,
            type,
            value
        ]); return ful('Y-CREATE')
    } else {
        await db.query(`update userstocks set value = $1 where userid = $2 and stock = $3 and type = $4;`, [
            value,
            userId,
            stock,
            type
        ]); return ful('Y-WRITE')
    }
})

// Add Function
exports.add = (userId, stock, type, value) => new Promise(async ful => {
    const data = await db.query(`select * from userstocks where userid = $1 and stock = $2 and type = $3;`, [
        userId,
        stock,
        type
    ])
    if (data.rowCount !== 1) {
        await db.query(`insert into userstocks values ($1, $2, $3, $4)`, [
            userId,
            stock,
            type,
            value
        ])
        if (type === 'max') {
            await db.query(`update userstocks set value = value + 10 where userid = $1 and stock = $2 and type = $3`, [
                userId,
                stock,
                type
            ])
        }; return ful('Y-CREATE')
    } else {
        await db.query(`update userstocks set value = value + $1 where userid = $2 and stock = $3 and type = $4;`, [
            value,
            userId,
            stock,
            type
        ]); return ful('Y-WRITE')
    }
})

// Rem Function
exports.set = (userId, stock, type, value) => new Promise(async ful => {
    const data = await db.query(`select * from userstocks where userid = $1 and stock = $2 and type = $3;`, [
        userId,
        stock,
        type
    ])
    if (data.rowCount !== 1) {
        await db.query(`insert into userstocks values ($1, $2, $3, $4)`, [
            userId,
            stock,
            type,
            value
        ]); return ful('Y-CREATE')
    } else {
        await db.query(`update userstocks set value = value - $1 where userid = $2 and stock = $3 and type = $4;`, [
            value,
            userId,
            stock,
            type
        ])
        if (type === 'max') {
            await db.query(`update userstocks set value = value + 10 where userid = $1 and stock = $2 and type = $3`, [
                userId,
                stock,
                type
            ])
        }; return ful('Y-WRITE')
    }
})