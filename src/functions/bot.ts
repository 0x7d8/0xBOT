import { CommandInteraction, EmbedBuilder } from "discord.js"
import Client from "@interfaces/Client.js"

import * as stat from "./stats.js"
import * as utils from "rjutils-collection"
import * as fs from "fs"

/// Functions
// Noname
export * as stat from "./stats.js"

// Misc
export * as apis from "./misc/apis.js"
export * as votes from "./misc/votes.js"
export * as quotes from "./misc/quotes.js"
export * as polls from "./misc/polls.js"
export * as userdb from "./misc/userdb.js"
export * as settings from "./misc/settings.js"
export * as language from "./misc/language.js"

// Economy
export * as items from "./economy/items.js"
export * as money from "./economy/money.js"
export * as stocks from "./economy/stocks.js"
export * as businesses from "./economy/businesses.js"
export * as transactions from "./economy/transactions.js"

// Math
export const inRange = (x: number, min: number, max: number) => {
    return ((x-min)*(x-max) <= 0)
}

export const perAdd = (value: number, percent: number) => {
	const percentage = ((percent/100) * value)
	return (value + percentage)
}

export const perCalc = (newVal: number, oldVal: number) => {
    let res = ((newVal - oldVal)/oldVal) * 100
    res = Math.round(res * 10) / 10
    return (res<0?"":"+") + res
}

// Other
export const random = utils.randomNum

export const log = (type: boolean, uid: string, gid: string, msg: string) => {
    if (!type) {
        console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [${uid} @ ${gid}] ${msg}`)
    } else {
        console.log(`[0xBOT] [!] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [${uid} @ ${gid}] ${msg}`)
    }
}

export const getOption = (interaction: CommandInteraction, option: string) => {
    if (!interaction.options.get(option)) return null
    else return interaction.options.get(option).value
}

export const stats = (type: string, uid: string, gid: string) => {
    // Count to Global Commands
	stat.add('t-all', type, 1)
        
	// Count Guild Commands and User
	stat.add('g-' + gid, type, 1)
	stat.add('u-' + uid, type, 1)
}

export const error = async(interaction: CommandInteraction, client: Client, error: any, type: string, language: string, vote: string) => {
    if (!interaction.guild) return

    // Generate Error Code
    const errorid = utils.randomStr({
        length: 8,
        numbers: true,
        uppercase: true,
        lowercase: true,
        symbols: false,
        exclude: ''
    })

    // Check if Log Folder exists
    if (!fs.existsSync('logs')) fs.mkdirSync('logs')

    // Log Error
    console.log('[0xBOT] [!] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] [' + type.toUpperCase() + '] ERROR : ' + errorid + ' :')
    console.error(error)
    const day = ('0' + new Date().getDate()).slice(-2)
    const month = ('0' + (new Date().getMonth() + 1)).slice(-2)
    const year = new Date().getFullYear()
    fs.appendFileSync('logs/error' + day + '-' + month + '-' + year + '.log', '[0xBOT] [!] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] [' + type.toUpperCase() + '] ERROR : ' + errorid + ' :\n')
    fs.appendFileSync('logs/error' + day + '-' + month + '-' + year + '.log', error.stack + '\n\n')

    // Generate Correct Word
    let word = ''
    switch (type) {
        case 'cmd':
            word = 'this Command'
            if (language === 'de') word = 'dieses Befehls'
            break

        case 'btn':
            word = 'this Button'
            if (language === 'de') word = 'dieses Buttons'
            break

        case 'mod':
            word = 'this Modal'
            if (language === 'de') word = 'dieser Modal'
            break

        default:
            word = 'this Event'
            if (language === 'de') word = 'dieses Events'
            break
    }

    // Create Error Embed
    let message = new EmbedBuilder().setColor(0x37009B)
        .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        .setDescription('» <:ERROR:1020414987291861022> An Error has occured while executing ' + word + '.\nThe Error has been logged and will be fixed soon!')
        .setFooter({ text: '» ' + vote + ' » ' + client.config.version + ' » ERROR: ' + errorid });
    if (language === 'de') {
        message = new EmbedBuilder().setColor(0x37009B)
            .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
            .setDescription('» <:ERROR:1020414987291861022> Ein Fehler ist beim ausführen ' + word + ' aufgetreten.\nDer Fehler wurde geloggt und wird bald behoben!')
            .setFooter({ text: '» ' + vote + ' » ' + client.config.version + ' » FEHLER: ' + errorid });
    }

    // Send Message
    await interaction.reply({ embeds: [message], ephemeral: true })
}

// Game Caches
export const bomb = new Map()
export const game = new Map()
export const memory = new Map()
export const rps = new Map()
export const ttt = new Map()