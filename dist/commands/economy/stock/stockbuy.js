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
        .setName('stockbuy')
        .setDMPermission(false)
        .setDescription('BUY STOCKS')
        .setDescriptionLocalizations({
        de: 'KAUFE AKTIEN'
    })
        .addStringOption((option) => option.setName('stock')
        .setNameLocalizations({
        de: 'aktie'
    })
        .setDescription('THE STOCK')
        .setDescriptionLocalizations({
        de: 'DIE AKTIE'
    })
        .setRequired(true)
        .addChoices(
    // Setup Choices
    { name: '🟢 GRÜNE AKTIE', value: 'green' }, { name: '🔵 BLAUE AKTIE', value: 'blue' }, { name: '🟡 GELBE AKTIE', value: 'yellow' }, { name: '🔴 ROTE AKTIE', value: 'red' }, { name: '⚪ WEISSE AKTIE', value: 'white' }, { name: '⚫ SCHWARZE AKTIE', value: 'black' }))
        .addIntegerOption(option => option.setName('amount')
        .setNameLocalizations({
        de: 'anzahl'
    })
        .setDescription('THE AMOUNT')
        .setDescriptionLocalizations({
        de: 'DIE ANZAHL'
    })
        .setRequired(true)),
    async execute(interaction, client, lang, vote) {
        // Check if Stocks are Enabled in Server
        if (!await bot.settings.get(interaction.guild.id, 'stocks')) {
            // Create Embed
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
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] STOCKBUY : DISABLED');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        // Set Variables
        const stock = bot.getOption(interaction, 'stock');
        const amount = bot.getOption(interaction, 'amount');
        const balance = await bot.money.get(interaction.user.id);
        // Check if Amount is Negative
        if (amount < 0) {
            // Create Embed
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» You cant buy a negative amount of Stocks!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Du kannst keine negativen Anzahlen kaufen!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] STOCKBUY : NEGATIVESTOCKS : ' + amount + '€');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        // Check if Max Stocks are reached
        const used = await bot.stocks.get(interaction.user.id, stock, 'used');
        const max = await bot.stocks.get(interaction.user.id, stock, 'max');
        if (max < (used + amount)) {
            // Create Embed)
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» You cant buy more than **' + max + '** of this Stock!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Du kannst nicht mehr als **' + max + '** von dieser Aktie kaufen!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] STOCKBUY : MAX : ' + stock.toUpperCase() + ' : ' + amount);
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        // Calculate Cost
        const cost = amount * client.stocks[stock];
        // Check for enough Money
        if (balance < cost) {
            const missing = cost - balance;
            // Create Embed
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» You dont have enough Money for that, you are missing **$' + missing + '**!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Du hast dafür nicht genug Geld, dir fehlen **' + missing + '€**!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] STOCKBUY : ' + stock.toUpperCase() + ' : ' + amount + ' : ' + cost + '€ : NOTENOUGHMONEY');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        // Set Emoji
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
        // Log Transaction
        const transaction = await bot.transactions.log({
            success: true,
            sender: {
                id: interaction.user.id,
                amount: cost,
                type: 'negative'
            }, reciever: {
                id: `${amount}x ${stock.toUpperCase()} STOCK`,
                amount: cost,
                type: 'positive'
            }
        });
        // Add Stock Amount
        bot.stocks.add(interaction.user.id, stock, 'used', amount);
        // Remove Money
        bot.money.rem(interaction.guild.id, interaction.user.id, cost);
        // Create Embed
        let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
            .setTitle('<:CHART:1024398298204876941> » BUY STOCKS')
            .setDescription('» You successfully bought **' + amount + '** ' + emoji + ' for **$' + cost + '**! (**$' + client.stocks[stock] + '** per Stock)\n\nID: ' + transaction.id)
            .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        if (lang === 'de') {
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:CHART:1024398298204876941> » AKTIEN KAUFEN')
                .setDescription('» Du hast erfolgreich **' + amount + '** ' + emoji + ' für **' + cost + '€** gekauft! (**' + client.stocks[stock] + '€** pro Aktie)\n\nID: ' + transaction.id)
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        }
        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] STOCKBUY : ' + stock.toUpperCase() + ' : ' + amount + ' : ' + cost + '€');
        return interaction.reply({ embeds: [message], ephemeral: true });
    }
};
//# sourceMappingURL=stockbuy.js.map