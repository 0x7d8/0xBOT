const { EmbedBuilder } = require('@discordjs/builders')

const chalk = require('chalk')
const fs = require("fs")

// PostgreSQL Functions
exports.stat = require('./stats')
exports.apis = require('./misc/apis')
exports.items = require('./economy/items')
exports.votes = require('./misc/votes')
exports.money = require('./economy/money')
exports.quotes = require('./misc/quotes')
exports.stocks = require('./economy/stocks')
exports.settings = require('./misc/settings')
exports.language = require('./misc/language')
exports.businesses = require('./economy/businesses')

exports.random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

// Log Function
exports.log = (type, uid, gid, msg) => {
    if (!type) {
        console.log(`[0xBOT] ${chalk.bold('[i]')} [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [${uid} @ ${gid}] ${msg}`)
    } else {
        console.log(`[0xBOT] ${chalk.bold('[!]')} [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [${uid} @ ${gid}] ${msg}`)
    }
}

// Stat Function
exports.stats = (type, uid, gid) => {
    // Count to Global Commands
	bot.stat.add('t-all', type, 1)
        
	// Count Guild Commands and User
	bot.stat.add('g-' + gid, type, 1)
	bot.stat.add('u-' + uid, type, 1)
}

// Error Function
exports.error = async(interaction, error, type, language, vote) => {
    // Generate Error Code
    const generator = require('generate-password')
    const errorid = generator.generate({
        length: 8,
        numbers: true,
        uppercase: true,
        symbols: false,
    })

    // Check if Log Folder exists
    const dir = 'logs'
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
    }

    // Log Error
    console.log('[0xBOT] [!] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] [' + type.toUpperCase() + '] ERROR : ' + errorid + ' :')
    console.error(error)
    const date_ob = new Date()
    const day = ("0" + date_ob.getDate()).slice(-2)
    const month = ("0" + (date_ob.getMonth() + 1)).slice(-2)
    const year = date_ob.getFullYear()
    fs.appendFileSync('logs/error' + day + '-' + month + '-' + year + '.log', '[0xBOT] [!] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] [' + type.toUpperCase() + '] ERROR : ' + errorid + ' :\n')
    fs.appendFileSync('logs/error' + day + '-' + month + '-' + year + '.log', error.stack + '\n\n')

    // Generate Correct Word
    let word
    if (type === 'cmd') {
        word = 'this Command'
        if (language === 'de') word = 'dieses Befehls'
    }; if (type === 'btn') {
        word = 'this Button'
        if (language === 'de') word = 'dieses Buttons'
    }; if (type === 'mod') {
        word = 'this Modal'
        if (language === 'de') word = 'dieser Modal'
    }

    // Create Error Embed
    let message = new EmbedBuilder().setColor(0x37009B)
        .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
          .setDescription('» <:ERROR:1020414987291861022> An Error has occured while executing ' + word + '.\nThe Error has been logged and will be fixed soon!')
        .setFooter({ text: '» ' + vote + ' » ' + config.version + ' » ERROR: ' + errorid });
    if (language === 'de') {
        message = new EmbedBuilder().setColor(0x37009B)
            .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
              .setDescription('» <:ERROR:1020414987291861022> Ein Fehler ist beim ausführen ' + word + ' aufgetreten.\nDer Fehler wurde geloggt und wird bald behoben!')
            .setFooter({ text: '» ' + vote + ' » ' + config.version + ' » FEHLER: ' + errorid });
    }

    // Send Message
    await interaction.reply({ embeds: [message], ephemeral: true })
}

// Game Caches
exports.bomb = new Map()
exports.game = new Map()
exports.memory = new Map()
exports.rps = new Map()
exports.ttt = new Map()