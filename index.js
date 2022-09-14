const { ShardingManager } = require('discord.js')
const { token, mongo, clientId, clientSc, dbdl } = require('./config.json')

const chalk = require('chalk')

const mongoose = require('mongoose')
mongoose.connect(mongo, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(console.log('[0xBOT] [!] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] CONNECTED TO MONGODB'))
console.log(' ')
console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [STA] $$$$$ LOADING COMMANDS AND EVENTS')

// MongoDB Functions
const cmds = require("./functions/cmds")
const btns = require("./functions/btns")
const bals = require("./functions/economy")
const quts = require("./functions/quotes")
const apis = require("./functions/apis")
const lang = require("./functions/langs")


const sgrn = require("./functions/stocks/green")
const sblu = require("./functions/stocks/blue")
const syll = require("./functions/stocks/yellow")
const sred = require("./functions/stocks/red")

const sgrnx = require("./functions/stocks/greenmax")
const sblux = require("./functions/stocks/bluemax")
const syllx = require("./functions/stocks/yellowmax")
const sredx = require("./functions/stocks/redmax")


const Lb1o = require("./functions/business/1/owner")
const Lb1e = require("./functions/business/1/earning")
const Lb1u = require("./functions/business/1/upgrade")
const Lb1t = require("./functions/business/1/timedunix")

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
            bals.add(args[1].toString(), parseInt(args[2]))
        } else {
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] USAGE: ADDBAL [USERID] [AMOUNT]')
        }
    }

    // REMBAL
    if (args[0].toUpperCase() == 'REMBAL') {
        if (typeof args[1] !== 'undefined' && typeof args[2] !== 'undefined') {
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] REMOVED ' + args[2] + '€ FROM ' + args[1])
            bals.add(args[1].toString(), parseInt(args[2]))
        } else {
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] USAGE: REMBAL [USERID] [AMOUNT]')
        }
    }

    // SETBAL
    if (args[0].toUpperCase() == 'SETBAL') {
        if (typeof args[1] !== 'undefined' && typeof args[2] !== 'undefined') {
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] SET BALANCE OF ' + args[1] + ' TO ' + args[2] + '€')
            const setbal = async () => {
                const wait = require('node:timers/promises').setTimeout
                const money = await bals.get(args[1].toString())

                await bals.rem(args[1].toString(), parseInt(money))

                await wait(100)

                await bals.add(args[1].toString(), parseInt(args[2]))
            }
            setbal()
        } else {
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] USAGE: SETBAL [USERID] [AMOUNT]')
        }
    }


    // VIEWVAR
    if (args[0].toUpperCase() == 'VIEWVAR') {
        if (typeof args[1] !== 'undefined') {
            try {
                console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] CONTENT OF ' + args[1].toupperCase() + ': ' + eval(args[1]))
            } catch (e) {
                console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] THIS VARIABLE DOESNT EXIST')
            }
        } else {
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [INF] USAGE: VIEWVAR [VARIABLE]')
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

/* Dashboard
const DarkDashboard = require('dbd-dark-dashboard')
const DBD = require("discord-dashboard")

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.login(token);

(async ()=>{
    let DBD = require('discord-dashboard');
    await DBD.useLicense(dbdl);
    DBD.Dashboard = DBD.UpdatedClass();

    const Dashboard = new DBD.Dashboard({
        port: 25169,
        client: {
            id: clientId,
            secret: clientSc
        },
        redirectUri: 'https://panel.0xBOT.de',
        domain: 'https://panel.0xBOT.de',
        bot: client,
        theme: DarkDashboard(DBD.default_configs.dbdDarkDashboard),
        settings: [
            {
                categoryId: 'setup',
                categoryName: "Setup",
                categoryDescription: "Setup your bot with default settings!",
                categoryOptionsList: [
                    {
                        optionId: 'lang',
                        optionName: "Language",
                        optionDescription: "Change bot's language easily",
                        optionType: DBD.formTypes.select({"Polish": 'pl', "English": 'en', "French": 'fr'}),
                        getActualSet: async ({guild}) => {
                            return langsSettings[guild.id] || null;
                        },
                        setNew: async ({guild,newData}) => {
                            langsSettings[guild.id] = newData;
                            return;
                        }
                    },
                ]
            },
        ]
    });
    Dashboard.init();
})(); */

const manager = new ShardingManager('./bot.js', { token: token, shards: 'auto' });
manager.on('shardCreate', shard => console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [STA] $$$$$ LAUNCHED SHARD #' + shard.id));
manager.spawn();