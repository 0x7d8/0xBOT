const { ShardingManager } = require('discord.js')
const { getAllFilesFilter } = require('./utils/getAllFiles.js')
const pgP = require('pg').Pool

const config = require('./config.json')
const MongoStore = require('connect-mongo')
const chalk = require('chalk')

// Connect to MongoDB
const mongoose = require('mongoose')
mongoose.connect(config.mongo, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(console.log('[0xBOT] [!] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] CONNECTED TO MONGODB'))
console.log(' ')

// Database Functions
const bot = require("./functions/bot")
const lang = require("./functions/langs")
const gopt = require("./functions/gopts")

// CLI Commands
const stdin = process.openStdin();
stdin.addListener("data", function(d) {
    // Get Arguments
    const args = d.toString().trim().split(" ")
    console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] RECIEVED COMMAND [' + d.toString().trim().toUpperCase() + ']')

    // ADDBAL
    if (args[0].toUpperCase() == 'ADDBAL') {
        if (typeof args[1] !== 'undefined' && typeof args[2] !== 'undefined') {
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] ADDED ' + args[2] + '€ TO ' + args[1])
            bot.money.add(interaction, args[1].toString(), parseInt(args[2]))
        } else {
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] USAGE: ADDBAL [USERID] [AMOUNT]')
        }
    }

    // REMBAL
    if (args[0].toUpperCase() == 'REMBAL') {
        if (typeof args[1] !== 'undefined' && typeof args[2] !== 'undefined') {
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] REMOVED ' + args[2] + '€ FROM ' + args[1])
            bot.money.rem(interaction, args[1].toString(), parseInt(args[2]))
        } else {
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] USAGE: REMBAL [USERID] [AMOUNT]')
        }
    }

    // SETBAL
    if (args[0].toUpperCase() == 'SETBAL') {
        if (typeof args[1] !== 'undefined' && typeof args[2] !== 'undefined') {
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] SET BALANCE OF ' + args[1] + ' TO ' + args[2] + '€')
            bot.money.set(interaction, args[1].toString(), parseInt(args[2]))
        } else {
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] USAGE: SETBAL [USERID] [AMOUNT]')
        }
    }
  });

// Show Logo
console.log(' ')
console.log(chalk.bold('  /$$$$$$            /$$$$$$$   /$$$$$$  /$$$$$$$$'))
console.log(chalk.bold(' /$$$_  $$          | $$__  $$ /$$__  $$|__  $$__/'))
console.log(chalk.bold('| $$$$\\ $$ /$$   /$$| $$  \\ $$| $$  \\ $$   | $$   '))
console.log(chalk.bold('| $$ $$ $$|  $$ /$$/| $$$$$$$ | $$  | $$   | $$   '))
console.log(chalk.bold('| $$\\ $$$$ \\  $$$$/ | $$__  $$| $$  | $$   | $$   '))
console.log(chalk.bold('| $$ \\ $$$  |$$  $$ | $$  \\ $$| $$  | $$   | $$   '))
console.log(chalk.bold('|  $$$$$$/ /$$/\\  $$| $$$$$$$/|  $$$$$$/   | $$   '))
console.log(chalk.bold(' \\______/ |__/  \\__/|_______/  \\______/    |__/   '))
console.log(' ')
console.log(chalk.bold('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$'))
console.log(' ')

// Database Migrations
let migrated = false
const migrator = async(conn) => {
    const migrations = getAllFilesFilter('./migrations', '.js');
    for (const file of migrations) {
    	const migration = require(file)
    	const status = await migration.migrate(conn)
        if (status) {
    	    console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [INF] MIGRATED ${migration.data.name}`)
            migrated = true
        }
    }
}; const db = new pgP({
    host: config.database.oxbot.host,
    database: config.database.oxbot.database,
    user: config.database.oxbot.username,
    password: config.database.oxbot.password,
    ssl: true,
    port: 5432
}); const domigrate = async() => { await migrator(db) }
domigrate(); if (migrated) { console.log(' ') }

// Switcher (Keeping for the Docs)
/* const domonmig = async() => {
const schema = require('./schema/votes')
const rawvalues = await schema.find({})
rawvalues.forEach(function (e) {
    db.query(`insert into uservotes values ($1, $2)`, [e.userId, e.votes])
});
}; domonmig() */

/// Dashboard
const DarkDashboard = require('dbd-dark-dashboard')

// Create Client
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.login(config.client.token);

// Initialize Dashboard
if (config.web.dashboard) {(async ()=>{
    let DBD = require('discord-dashboard');
    await DBD.useLicense(config.web.keys.dashkey);
    DBD.Dashboard = DBD.UpdatedClass();

    const Dashboard = new DBD.Dashboard({
        port: config.web.ports.dashboard,
        client: {
            id: config.client.id,
            secret: config.client.secret
        },
        redirectUri: 'https://dsh.0xbot.de/discord/callback',
        sessionSaveSession: MongoStore.create({mongoUrl: config.mongo}),
        domain: 'dsh.0xbot.de',
        bot: client,
        minimizedConsoleLogs: true,
        theme: DarkDashboard({
            information: {
                createdBy: "0x4096",
                websiteTitle: "0xBOT DASHBOARD",
                websiteName: "0xBOT DASHBOARD",
                websiteUrl: "https://dsh.0xbot.de/",
                dashboardUrl: "https://dsh.0xbot.de/",
                supporteMail: "support@0xBOT.de",
                supportServer: "https://discord.gg/yYq4UgRRzz",
                imageFavicon: "https://img.rjansen.de/profile/pfp.png",
                iconURL: "https://img.rjansen.de/profile/pfp.png",
                loggedIn: "Logged in.",
                mainColor: "#2CA8FF",
                subColor: "#ebdbdb",
                preloader: " "
            },

            custom_html: {
                head: `
                    <style>
                        li:nth-child(3) {
                            display: none !important;
                        }; select.col-md-12 > * {
                            text-align: center;
                        }; select.col-md-12 {
                            width: 25% !important;
                        }
                    </style>`
            },

            index: {
                card: {
                    category: "<center>0xBOT DASHBOARD</center>",
                    title: `<center>Welcome to the 0xBOT Dashboard, here you can manage the Bots Settings</center>`,
                    footer: "<center>(c) 2022</center>",
                },

                information: {
                    category: "<center>UPDATE INFO</center>",
                    title: "<center>INFORMATION</center>",
                    description: `<center>This Update added the following Features: <br/><br/>Use Postgres instead of Mongo<br/>Massive Code Cleanup<br/>Use Numeric instead of Int<br/>Add Baltop Command<br/>Add Levels</center>`,
                    footer: "<center>VERSION 2.5.0</center>",
                },

                feeds: {
                    category: "<center>UPDATE INFO</center>",
                    title: "<center>INFORMATION</center>",
                    description: `<center>This Update added the following Features: <br/><br/>Fixes for Minigames<br/>Add Total Earnings Amount to /beg</center>`,
                    footer: "<center>VERSION 2.1.4</center>",
                },
            },

            commands: [
                {
                    
                    list: [{
                        commandName: 'dashboard',
                        commandUsage: `/dashboard`,
                        commandDescription: `go to this dashboard`,
                        commandAlias: 'none'
                    },
                    ],
                },
            ],
        }),

        settings: [
            {
                categoryId: 'general',
                categoryName: "GENERAL",
                categoryDescription: "Setup your bot with default settings!",
                categoryOptionsList: [
                    {
                        optionId: 'lang',
                        optionName: "",
                        optionDescription: "<center>Change the Bot Language",
                        optionType: DBD.formTypes.select({"German": 'de', "English": 'en'}),
                        getActualSet: async ({guild}) => {
                            const clang = await lang.get(guild.id)
                            if (parseInt(clang) == '1') { return 'de' }
                            if (parseInt(clang) == '2') { return 'en' }
                        },
                        setNew: async ({guild,newData}) => {
                            const clang = await lang.get(guild.id)
	                        if (parseInt(clang) == 0) { lang.add(guild.id, 1) }
	                        if (newData == "de") {
		                        if (parseInt(clang) == 2) {
			                        await lang.rem(guild.id, 1)
		                        }
	                        } else {
		                        if (parseInt(clang) == 1) {
			                        await lang.add(guild.id, 1)
		                        }
	                        }
                            return
                        }
                    },
                ]
            },
            {
                categoryId: 'economy',
                categoryName: "ECONOMY",
                categoryDescription: "Setup your bot with default settings!",
                categoryOptionsList: [
                    {
                        optionId: 'stocks',
                        optionName: "",
                        optionDescription: "<center>Stock System",
                        optionType: DBD.formTypes.switch(),
                        getActualSet: async ({guild}) => {
                            const clang = await gopt.get(guild.id + '-STOCKS')
                            if (parseInt(clang) == 0) {
                                return true
                            } else {
                                return false
                            }
                        },
                        setNew: async ({guild,newData}) => {
                            const clang = await gopt.get(guild.id + '-STOCKS')
	                        if (newData == true) {
                                if (parseInt(clang) == 1) {
                                    gopt.rem(guild.id + '-STOCKS', 1)
                                }
                            } else {
                                if (parseInt(clang) == 0) {
                                    gopt.add(guild.id + '-STOCKS', 1)
                                }
                            }
                            return
                        }
                    },
                    {
                        optionId: 'businesses',
                        optionName: "",
                        optionDescription: "<center>Business System",
                        optionType: DBD.formTypes.switch(),
                        getActualSet: async ({guild}) => {
                            const clang = await gopt.get(guild.id + '-BUSINESS')
                            if (parseInt(clang) == 0) {
                                return true
                            } else {
                                return false
                            }
                        },
                        setNew: async ({guild,newData}) => {
                            const clang = await gopt.get(guild.id + '-BUSINESS')
	                        if (newData == true) {
                                if (parseInt(clang) == 1) {
                                    gopt.rem(guild.id + '-BUSINESS', 1)
                                }
                            } else {
                                if (parseInt(clang) == 0) {
                                    gopt.add(guild.id + '-BUSINESS', 1)
                                }
                            }
                            return
                        }
                    },
                    {
                        optionId: 'cars',
                        optionName: "",
                        optionDescription: "<center>Car System",
                        optionType: DBD.formTypes.switch(),
                        getActualSet: async ({guild}) => {
                            const clang = await gopt.get(guild.id + '-CAR')
                            if (parseInt(clang) == 0) {
                                return true
                            } else {
                                return false
                            }
                        },
                        setNew: async ({guild,newData}) => {
                            const clang = await gopt.get(guild.id + '-CAR')
	                        if (newData == true) {
                                if (parseInt(clang) == 1) {
                                    gopt.rem(guild.id + '-CAR', 1)
                                }
                            } else {
                                if (parseInt(clang) == 0) {
                                    gopt.add(guild.id + '-CAR', 1)
                                }
                            }
                            return
                        }
                    },
                    {
                        optionId: 'bombs',
                        optionName: "",
                        optionDescription: "<center>Bombs",
                        optionType: DBD.formTypes.switch(),
                        getActualSet: async ({guild}) => {
                            const clang = await gopt.get(guild.id + '-BOMBS')
                            if (parseInt(clang) == 0) {
                                return true
                            } else {
                                return false
                            }
                        },
                        setNew: async ({guild,newData}) => {
                            const clang = await gopt.get(guild.id + '-BOMBS')
	                        if (newData == true) {
                                if (parseInt(clang) == 1) {
                                    gopt.rem(guild.id + '-BOMBS', 1)
                                }
                            } else {
                                if (parseInt(clang) == 0) {
                                    gopt.add(guild.id + '-BOMBS', 1)
                                }
                            }
                            return
                        }
                    },
                    {
                        optionId: 'roulette',
                        optionName: "",
                        optionDescription: "Roulette & Guess Commands",
                        optionType: DBD.formTypes.switch(),
                        getActualSet: async ({guild}) => {
                            const clang = await gopt.get(guild.id + '-ROULETTE')
                            if (parseInt(clang) == 0) {
                                return true
                            } else {
                                return false
                            }
                        },
                        setNew: async ({guild,newData}) => {
                            const clang = await gopt.get(guild.id + '-ROULETTE')
	                        if (newData == true) {
                                if (parseInt(clang) == 1) {
                                    gopt.rem(guild.id + '-ROULETTE', 1)
                                }
                            } else {
                                if (parseInt(clang) == 0) {
                                    gopt.add(guild.id + '-ROULETTE', 1)
                                }
                            }
                            return
                        }
                    },
                    {
                        optionId: 'work',
                        optionName: "",
                        optionDescription: "Work Command",
                        optionType: DBD.formTypes.switch(),
                        getActualSet: async ({guild}) => {
                            const clang = await gopt.get(guild.id + '-WORK')
                            if (parseInt(clang) == 0) {
                                return true
                            } else {
                                return false
                            }
                        },
                        setNew: async ({guild,newData}) => {
                            const clang = await gopt.get(guild.id + '-WORK')
	                        if (newData == true) {
                                if (parseInt(clang) == 1) {
                                    gopt.rem(guild.id + '-WORK', 1)
                                }
                            } else {
                                if (parseInt(clang) == 0) {
                                    gopt.add(guild.id + '-WORK', 1)
                                }
                            }
                            return
                        }
                    },
                    {
                        optionId: 'rob',
                        optionName: "",
                        optionDescription: "Rob Command",
                        optionType: DBD.formTypes.switch(),
                        getActualSet: async ({guild}) => {
                            const clang = await gopt.get(guild.id + '-ROB')
                            if (parseInt(clang) == 0) {
                                return true
                            } else {
                                return false
                            }
                        },
                        setNew: async ({guild,newData}) => {
                            const clang = await gopt.get(guild.id + '-ROB')
	                        if (newData == true) {
                                if (parseInt(clang) == 1) {
                                    gopt.rem(guild.id + '-ROB', 1)
                                }
                            } else {
                                if (parseInt(clang) == 0) {
                                    gopt.add(guild.id + '-ROB', 1)
                                }
                            }
                            return
                        }
                    },
                ]
            },
            {
                categoryId: 'fun',
                categoryName: "FUN",
                categoryDescription: "Setup your bot with default settings!",
                categoryOptionsList: [
                    {
                        optionId: 'quotes',
                        optionName: "",
                        optionDescription: "<center>Quote Commands",
                        optionType: DBD.formTypes.switch(),
                        getActualSet: async ({guild}) => {
                            const clang = await gopt.get(guild.id + '-QUOTES')
                            if (parseInt(clang) == 0) {
                                return true
                            } else {
                                return false
                            }
                        },
                        setNew: async ({guild,newData}) => {
                            const clang = await gopt.get(guild.id + '-QUOTES')
	                        if (newData == true) {
                                if (parseInt(clang) == 1) {
                                    gopt.rem(guild.id + '-QUOTES', 1)
                                }
                            } else {
                                if (parseInt(clang) == 0) {
                                    gopt.add(guild.id + '-QUOTES', 1)
                                }
                            }
                            return
                        }
                    },
                    {
                        optionId: 'minigames',
                        optionName: "",
                        optionDescription: "Minigame Commands",
                        optionType: DBD.formTypes.switch(),
                        getActualSet: async ({guild}) => {
                            const clang = await gopt.get(guild.id + '-MINIGAMES')
                            if (parseInt(clang) == 0) {
                                return true
                            } else {
                                return false
                            }
                        },
                        setNew: async ({guild,newData}) => {
                            const clang = await gopt.get(guild.id + '-MINIGAMES')
	                        if (newData == true) {
                                if (parseInt(clang) == 1) {
                                    gopt.rem(guild.id + '-MINIGAMES', 1)
                                }
                            } else {
                                if (parseInt(clang) == 0) {
                                    gopt.add(guild.id + '-MINIGAMES', 1)
                                }
                            }
                            return
                        }
                    },
                    {
                        optionId: 'meme',
                        optionName: "",
                        optionDescription: "Meme Command",
                        optionType: DBD.formTypes.switch(),
                        getActualSet: async ({guild}) => {
                            const clang = await gopt.get(guild.id + '-MEME')
                            if (parseInt(clang) == 0) {
                                return true
                            } else {
                                return false
                            }
                        },
                        setNew: async ({guild,newData}) => {
                            const clang = await gopt.get(guild.id + '-MEME')
	                        if (newData == true) {
                                if (parseInt(clang) == 1) {
                                    gopt.rem(guild.id + '-MEME', 1)
                                }
                            } else {
                                if (parseInt(clang) == false) {
                                    gopt.add(guild.id + '-MEME', 1)
                                }
                            }
                            return
                        }
                    },
                ]
            },
        ],
    })
    Dashboard.init()
})()}

const manager = new ShardingManager('./bot.js', { token: config.client.token, shards: 'auto' })
manager.on('shardCreate', shard => console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [STA] $$$$$ LAUNCHED SHARD #' + shard.id))
manager.spawn()