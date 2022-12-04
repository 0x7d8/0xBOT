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
const discord_js_1 = require("discord.js");
const bot = __importStar(require("@functions/bot.js"));
exports.default = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('stocks')
        .setDMPermission(false)
        .setDescription('SEE STOCKS')
        .setDescriptionLocalizations({
        de: 'SEHE AKTIEN'
    })
        .addUserOption((option) => option.setName('user')
        .setNameLocalizations({
        de: 'nutzer'
    })
        .setDescription('THE USER')
        .setDescriptionLocalizations({
        de: 'DER NUTZER'
    })
        .setRequired(false)),
    async execute(interaction, client, lang, vote) {
        if (!await bot.settings.get(interaction.guild.id, 'stocks')) {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» Stocks are disabled on this Server!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Aktien sind auf diesem Server deaktiviert!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] STOCKS : DISABLED');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        const user = interaction.options.getUser("user");
        let userobj;
        if (!user)
            userobj = interaction.user;
        else
            userobj = user;
        const green = await bot.stocks.get(userobj.id, 'green', 'used');
        const greenMax = await bot.stocks.get(userobj.id, 'green', 'max');
        const blue = await bot.stocks.get(userobj.id, 'blue', 'used');
        const blueMax = await bot.stocks.get(userobj.id, 'blue', 'max');
        const yellow = await bot.stocks.get(userobj.id, 'yellow', 'used');
        const yellowMax = await bot.stocks.get(userobj.id, 'yellow', 'max');
        const red = await bot.stocks.get(userobj.id, 'red', 'used');
        const redMax = await bot.stocks.get(userobj.id, 'red', 'max');
        const white = await bot.stocks.get(userobj.id, 'white', 'used');
        const whiteMax = await bot.stocks.get(userobj.id, 'white', 'max');
        const black = await bot.stocks.get(userobj.id, 'black', 'used');
        const blackMax = await bot.stocks.get(userobj.id, 'black', 'max');
        let message;
        if (!user) {
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:CHART:1024398298204876941> » YOUR STOCKS')
                .setDescription('» 🟢 GREEN STOCKS\n`' + green + '/' + greenMax + '`\n\n» 🔵 BLUE STOCKS\n`' + blue + '/' + blueMax + '`\n\n» 🟡 YELLOW STOCKS\n`' + yellow + '/' + yellowMax + '`\n\n» 🔴 RED STOCKS\n`' + red + '/' + redMax + '`\n\n» ⚪ WHITE STOCKS\n`' + white + '/' + whiteMax + '`\n\n» ⚫ BLACK STOCKS\n`' + black + '/' + blackMax + '`')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:CHART:1024398298204876941> » DEINE AKTIEN')
                    .setDescription('» 🟢 GRÜNE AKTIEN\n`' + green + '/' + greenMax + '`\n\n» 🔵 BLAUE AKTIEN\n`' + blue + '/' + blueMax + '`\n\n» 🟡 GELBE AKTIEN\n`' + yellow + '/' + yellowMax + '`\n\n» 🔴 ROTE AKTIEN\n`' + red + '/' + redMax + '`\n\n» ⚪ WEISSE AKTIEN\n`' + white + '/' + whiteMax + '`\n\n» ⚫ SCHWARZE AKTIEN\n`' + black + '/' + blackMax + '`')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
        }
        else {
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:CHART:1024398298204876941> » THE STOCKS OF ' + user.username.toUpperCase())
                .setDescription('» 🟢 GREEN STOCKS\n`' + green + '/' + greenMax + '`\n\n» 🔵 BLUE STOCKS\n`' + blue + '/' + blueMax + '`\n\n» 🟡 YELLOW STOCKS\n`' + yellow + '/' + yellowMax + '`\n\n» 🔴 RED STOCKS\n`' + red + '/' + redMax + '`\n\n» ⚪ WHITE STOCKS\n`' + white + '/' + whiteMax + '`\n\n» ⚫ BLACK STOCKS\n`' + black + '/' + blackMax + '`')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:CHART:1024398298204876941> » DIE AKTIEN VON ' + user.username.toUpperCase())
                    .setDescription('» 🟢 GRÜNE AKTIEN\n`' + green + '/' + greenMax + '`\n\n» 🔵 BLAUE AKTIEN\n`' + blue + '/' + blueMax + '`\n\n» 🟡 GELBE AKTIEN\n`' + yellow + '/' + yellowMax + '`\n\n» 🔴 ROTE AKTIEN\n`' + red + '/' + redMax + '`\n\n» ⚪ WEISSE AKTIEN\n`' + white + '/' + whiteMax + '`\n\n» ⚫ SCHWARZE AKTIEN\n`' + black + '/' + blackMax + '`')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
        }
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] STOCKS : ' + green + ' : ' + blue + ' : ' + yellow + ' : ' + red + ' : ' + white + ' : ' + black);
        return interaction.reply({ embeds: [message] });
    }
};
//# sourceMappingURL=stocks.js.map