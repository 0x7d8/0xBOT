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
    data: {
        name: 'stocknext'
    },
    async execute(interaction, client, lang, vote, stock) {
        let emoji;
        if (stock === 'green')
            emoji = '🟢';
        if (stock === 'blue')
            emoji = '🔵';
        if (stock === 'yellow')
            emoji = '🟡';
        if (stock === 'red')
            emoji = '🔴';
        if (stock === 'white')
            emoji = '⚪';
        if (stock === 'black')
            emoji = '⚫';
        let stockEmojis = {
            green: '',
            blue: '',
            yellow: '',
            red: '',
            white: '',
            black: ''
        };
        let stockList = [
            'green',
            'blue',
            'yellow',
            'red',
            'white',
            'black'
        ];
        for (const stock of stockList) {
            if (client.stocks[stock] > client.stocks['old' + stock]) {
                stockEmojis[stock] = '<:UP:1009502422990860350>';
            }
            else if (client.stocks[stock] < client.stocks['old' + stock]) {
                stockEmojis[stock] = '<:DOWN:1009502386320056330>';
            }
            else {
                stockEmojis[stock] = '🧐';
            }
        }
        let message;
        if (stock !== 'all') {
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:CHART:1024398298204876941> » ' + emoji + ' STOCK INFO')
                .setDescription(`» NEXT PRICES
					<t:${client.stocks.refresh}:R>

					» PRICE
					**${stockEmojis[stock]} \`$${client.stocks[stock]}\` (${bot.perCalc(client.stocks[stock], client.stocks['old' + stock])}%)
				`)
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:CHART:1024398298204876941> » ' + emoji + ' AKTIEN INFO')
                    .setDescription(`» NÄCHSTEN PREISE
						<t:${client.stocks.refresh}:R>

						» PREIS
						**${stockEmojis[stock]} \`${client.stocks[stock]}€\` (${bot.perCalc(client.stocks[stock], client.stocks['old' + stock])}%)
					`)
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
        }
        else {
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:CHART:1024398298204876941> » FULL STOCK INFO')
                .setDescription(`» NEXT PRICES
					<t:${client.stocks.refresh}:R>

					» 🟢 GREEN STOCK
					**${stockEmojis.green} \`$${client.stocks.green}\` (${bot.perCalc(client.stocks.green, client.stocks.oldgreen)}%)**

					» 🔵 BLUE STOCK
					**${stockEmojis.blue} \`$${client.stocks.blue}\` (${bot.perCalc(client.stocks.blue, client.stocks.oldblue)}%)**

					» 🟡 YELLOW STOCK
					**${stockEmojis.yellow} \`$${client.stocks.yellow}\` (${bot.perCalc(client.stocks.yellow, client.stocks.oldyellow)}%)**

					» 🔴 RED STOCK
					**${stockEmojis.red} \`$${client.stocks.red}\` (${bot.perCalc(client.stocks.red, client.stocks.oldred)}%)**

					» ⚪ WHITE STOCK
					**${stockEmojis.white} \`$${client.stocks.white}\` (${bot.perCalc(client.stocks.white, client.stocks.oldwhite)}%)**

					» ⚫ BLACK STOCK
					**${stockEmojis.black} \`$${client.stocks.black}\` (${bot.perCalc(client.stocks.black, client.stocks.oldblack)}%)**
				`)
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:CHART:1024398298204876941> » VOLLE AKTIEN INFOS')
                    .setDescription(`» NÄCHSTEN PREISE
						<t:${client.stocks.refresh}:R>

						» 🟢 GRÜNE AKTIE
						**${stockEmojis.green} \`${client.stocks.green}€\` (${bot.perCalc(client.stocks.green, client.stocks.oldgreen)}%)**

						» 🔵 BLAUE AKTIE
						**${stockEmojis.blue} \`${client.stocks.blue}€\` (${bot.perCalc(client.stocks.blue, client.stocks.oldblue)}%)**

						» 🟡 GELBE AKTIE
						**${stockEmojis.yellow} \`${client.stocks.yellow}€\` (${bot.perCalc(client.stocks.yellow, client.stocks.oldyellow)}%)**

						» 🔴 ROTE AKTIE
						**${stockEmojis.red} \`${client.stocks.red}€\` (${bot.perCalc(client.stocks.red, client.stocks.oldred)}%)**

						» ⚪ WEIßE AKTIE
						**${stockEmojis.white} \`${client.stocks.white}€\` (${bot.perCalc(client.stocks.white, client.stocks.oldwhite)}%)**

						» ⚫ SCHWARZE AKTIE
						**${stockEmojis.black} \`${client.stocks.black}€\` (${bot.perCalc(client.stocks.black, client.stocks.oldblack)}%)**
					`)
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
        }
        if (stock !== 'all')
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] STOCKINFO : ' + stock.toUpperCase() + ' : ' + client.stocks[stock] + '€');
        else
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] STOCKINFO : ALL : ' + client.stocks.green + '€ : ' + client.stocks.blue + '€ : ' + client.stocks.yellow + '€ : ' + client.stocks.red + '€ : ' + client.stocks.white + '€ : ' + client.stocks.black + '€');
        return interaction.update({ embeds: [message] });
    }
};
//# sourceMappingURL=stock.js.map