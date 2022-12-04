// Module Register
import moduleAlias from "module-alias"
moduleAlias.addAlias('@interfaces', __dirname+'/interfaces')
moduleAlias.addAlias('@functions', __dirname+'/functions')
moduleAlias.addAlias('@utils', __dirname+'/utils')
moduleAlias.addAlias('@config', __dirname+'/config.json')

import { ShardingManager } from "discord.js"
import { default as pg } from "pg"
import { getAllFilesFilter } from "@utils/getAllFiles.js"
import { setTimeout as wait } from "timers/promises"
import config from "@config"

// Create Client
import { Client, GatewayIntentBits } from "discord.js"
const client = new Client({ intents: [
    GatewayIntentBits.Guilds
] }); client.login(config.client.token)

import * as bot from "@functions/bot.js"

// CLI Commands
const stdin = process.openStdin()
stdin.addListener("data", async(input) => {
    // Get Arguments
    const args = input.toString().trim().split(' ')
    console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] RECIEVED COMMAND [' + input.toString().trim().toUpperCase() + ']')

    // ADDBAL
    if (args[0].toUpperCase() === 'ADDBAL') {
        if (typeof args[1] !== 'undefined' && typeof args[2] !== 'undefined') {
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] ADDED ' + args[2] + '€ TO ' + args[1])
            bot.money.add(false, args[1].toString(), parseInt(args[2]))
        } else {
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] USAGE: ADDBAL [USERID] [AMOUNT]')
        }
    }

    // REMBAL
    if (args[0].toUpperCase() === 'REMBAL') {
        if (typeof args[1] !== 'undefined' && typeof args[2] !== 'undefined') {
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] REMOVED ' + args[2] + '€ FROM ' + args[1])
            bot.money.rem(false, args[1].toString(), parseInt(args[2]))
        } else {
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] USAGE: REMBAL [USERID] [AMOUNT]')
        }
    }

    // SETBAL
    if (args[0].toUpperCase() === 'SETBAL') {
        if (typeof args[1] !== 'undefined' && typeof args[2] !== 'undefined') {
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] SET BALANCE OF ' + args[1] + ' TO ' + args[2] + '€')
            bot.money.set(false, args[1].toString(), parseInt(args[2]))
        } else {
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] USAGE: SETBAL [USERID] [AMOUNT]')
        }
    }

    // EVAL
    if (args[0].toUpperCase() === 'EVAL') {
        if (typeof args[1] !== 'undefined') {
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] RESULT OF EVAL:')
            args.shift()

            try {
                console.log(await eval(args.join(' ')))
            } catch(e) {
                console.log(e)
                console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] EVAL RETURNED AN ERROR')
            }
        } else {
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] USAGE: EVAL [COMMAND]')
        }
    }
})

// Show Logo
console.log(' ')
console.log('  /$$$$$$            /$$$$$$$   /$$$$$$  /$$$$$$$$')
console.log(' /$$$_  $$          | $$__  $$ /$$__  $$|__  $$__/')
console.log('| $$$$\\ $$ /$$   /$$| $$  \\ $$| $$  \\ $$   | $$   ')
console.log('| $$ $$ $$|  $$ /$$/| $$$$$$$ | $$  | $$   | $$   ')
console.log('| $$\\ $$$$ \\  $$$$/ | $$__  $$| $$  | $$   | $$   ')
console.log('| $$ \\ $$$  |$$  $$ | $$  \\ $$| $$  | $$   | $$   ')
console.log('|  $$$$$$/ /$$/\\  $$| $$$$$$$/|  $$$$$$/   | $$   ')
console.log(' \\______/ |__/  \\__/|_______/  \\______/    |__/   ')
console.log(' ')
console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
console.log(' ')

// Database Migrations
const migrator = async(conn: any) => {
    const migrations = getAllFilesFilter('./migrations', '.js')
    for (const file of migrations) {
    	const migration = (await import(file)).default.default

    	const status = await migration.migrate(conn)
        if (status) console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] MIGRATED ${migration.data.name}`)
        else console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] DIDNT MIGRATE ${migration.data.name}`)
    }
}; const db = new pg.Pool({
    host: config.database.oxbot.host,
    database: config.database.oxbot.database,
    user: config.database.oxbot.username,
    password: config.database.oxbot.password,
    ssl: true,
    port: 5432
}); const domigrate = async() => { await migrator(db) }
domigrate()

/// Dashboard
import WebserverInterface from "@interfaces/Webserver.js"
import { default as webserver } from "rjweb-server"

// Website
const website = new webserver.routeList()

website.static('/', './dashboard/dist', {
    preload: true,
    remHTML: true
})

if (config.web.dashboard) {
    webserver.start({
        bind: '0.0.0.0',
        urls: website,
        pages: {
            async notFound(ctr: WebserverInterface) {
                return ctr.printFile('./dashboard/dist/index.html')
            }
        }, port: config.web.ports.dashboard,
        events: {
            async request(ctr: WebserverInterface) {
                if (ctr.reqUrl.href.endsWith('.js')) ctr.setHeader('Content-Type', 'text/javascript')
                if (ctr.reqUrl.href.endsWith('.css')) ctr.setHeader('Content-Type', 'text/css')
            }
        }
    }).then((res: any) => {
        console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [STA] $$$$$ STARTED DASHBOARD ON PORT ${res.port}`)
    })
}

// API
const api = new webserver.routeList()

api.load('./apis')

if (config.web.api) {
    webserver.start({
        bind: '0.0.0.0',
        urls: api,
        pages: {
            async notFound(ctr: WebserverInterface) {
                return ctr.print({
                    "success": false,
                    "message": 'NOT FOUND'
                })
            }, async reqError(ctr: WebserverInterface) {
                ctr.status(500)
                return ctr.print({
                    "success": false,
                    "message": 'SERVER ERROR'
                })
            }
        }, port: config.web.ports.api,
        events: {
            async request(ctr: WebserverInterface) {
                ctr.config = config
                ctr.client = client
                ctr.bot = bot
                ctr.db = db
            }
        }
    }).then((res: any) => {
        console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [STA] $$$$$ STARTED API ON PORT ${res.port}`)
    })
}

// Start Shard
const manager = new ShardingManager('./bot.js', { token: config.client.token, shards: 'auto', totalShards: 1 } as any)
manager.spawn().catch(async() => {
    await wait(8500)
    manager.spawn()
})