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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ttt = exports.rps = exports.memory = exports.game = exports.bomb = exports.error = exports.stats = exports.isNumber = exports.getOption = exports.log = exports.random = exports.perCalc = exports.perAdd = exports.inRange = exports.transactions = exports.businesses = exports.stocks = exports.money = exports.items = exports.language = exports.settings = exports.userdb = exports.polls = exports.quotes = exports.votes = exports.apis = exports.stat = void 0;
const discord_js_1 = require("discord.js");
const stat = __importStar(require("./stats.js"));
const utils = __importStar(require("rjutils-collection"));
const fs = __importStar(require("fs"));
/// Functions
// Noname
exports.stat = __importStar(require("./stats.js"));
// Misc
exports.apis = __importStar(require("./misc/apis.js"));
exports.votes = __importStar(require("./misc/votes.js"));
exports.quotes = __importStar(require("./misc/quotes.js"));
exports.polls = __importStar(require("./misc/polls.js"));
exports.userdb = __importStar(require("./misc/userdb.js"));
exports.settings = __importStar(require("./misc/settings.js"));
exports.language = __importStar(require("./misc/language.js"));
// Economy
exports.items = __importStar(require("./economy/items.js"));
exports.money = __importStar(require("./economy/money.js"));
exports.stocks = __importStar(require("./economy/stocks.js"));
exports.businesses = __importStar(require("./economy/businesses.js"));
exports.transactions = __importStar(require("./economy/transactions.js"));
// Math
const inRange = (x, min, max) => {
    return ((x - min) * (x - max) <= 0);
};
exports.inRange = inRange;
const perAdd = (value, percent) => {
    const percentage = ((percent / 100) * value);
    return (value + percentage);
};
exports.perAdd = perAdd;
const perCalc = (newVal, oldVal) => {
    let res = ((newVal - oldVal) / oldVal) * 100;
    res = Math.round(res * 10) / 10;
    return (res < 0 ? "" : "+") + res;
};
exports.perCalc = perCalc;
// Other
exports.random = utils.randomNum;
const log = (type, uid, gid, msg) => {
    if (!type) {
        console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [${uid} @ ${gid}] ${msg}`);
    }
    else {
        console.log(`[0xBOT] [!] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [${uid} @ ${gid}] ${msg}`);
    }
};
exports.log = log;
const getOption = (interaction, option) => {
    if (!interaction.options.get(option))
        return null;
    else
        return interaction.options.get(option).value;
};
exports.getOption = getOption;
const isNumber = (string) => {
    return [...string].every((c) => '0123456789'.includes(c));
};
exports.isNumber = isNumber;
const stats = (type, uid, gid) => {
    // Count to Global Commands
    stat.add('t-all', type, 1);
    // Count Guild Commands and User
    stat.add('g-' + gid, type, 1);
    stat.add('u-' + uid, type, 1);
};
exports.stats = stats;
const error = async (interaction, client, error, type, language, vote) => {
    if (!interaction.guild)
        return;
    // Generate Error Code
    const errorid = utils.randomStr({
        length: 8,
        numbers: true,
        uppercase: true,
        lowercase: true,
        symbols: false,
        exclude: ''
    });
    // Check if Log Folder exists
    if (!fs.existsSync('logs'))
        fs.mkdirSync('logs');
    // Log Error
    console.log('[0xBOT] [!] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] [' + type.toUpperCase() + '] ERROR : ' + errorid + ' :');
    console.error(error);
    const day = ('0' + new Date().getDate()).slice(-2);
    const month = ('0' + (new Date().getMonth() + 1)).slice(-2);
    const year = new Date().getFullYear();
    fs.appendFileSync('logs/error' + day + '-' + month + '-' + year + '.log', '[0xBOT] [!] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] [' + type.toUpperCase() + '] ERROR : ' + errorid + ' :\n');
    fs.appendFileSync('logs/error' + day + '-' + month + '-' + year + '.log', error.stack + '\n\n');
    // Generate Correct Word
    let word = '';
    switch (type) {
        case 'cmd':
            word = 'this Command';
            if (language === 'de')
                word = 'dieses Befehls';
            break;
        case 'btn':
            word = 'this Button';
            if (language === 'de')
                word = 'dieses Buttons';
            break;
        case 'mod':
            word = 'this Modal';
            if (language === 'de')
                word = 'dieser Modal';
            break;
        default:
            word = 'this Event';
            if (language === 'de')
                word = 'dieses Events';
            break;
    }
    // Create Error Embed
    let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
        .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        .setDescription('» <:ERROR:1020414987291861022> An Error has occured while executing ' + word + '.\nThe Error has been logged and will be fixed soon!')
        .setFooter({ text: '» ' + vote + ' » ' + client.config.version + ' » ERROR: ' + errorid });
    if (language === 'de') {
        message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
            .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
            .setDescription('» <:ERROR:1020414987291861022> Ein Fehler ist beim ausführen ' + word + ' aufgetreten.\nDer Fehler wurde geloggt und wird bald behoben!')
            .setFooter({ text: '» ' + vote + ' » ' + client.config.version + ' » FEHLER: ' + errorid });
    }
    // Send Message
    await interaction.reply({ embeds: [message], ephemeral: true });
};
exports.error = error;
// Game Caches
exports.bomb = new Map();
exports.game = new Map();
exports.memory = new Map();
exports.rps = new Map();
exports.ttt = new Map();
//# sourceMappingURL=bot.js.map