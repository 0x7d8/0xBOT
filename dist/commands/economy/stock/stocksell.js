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
        .setName('stocksell')
        .setDMPermission(false)
        .setDescription('SELL STOCKS')
        .setDescriptionLocalizations({
        de: 'VERKAUFE AKTIEN'
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
        .addIntegerOption((option) => option.setName('amount')
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
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] STOCKSELL : DISABLED');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        // Set Variables
        const stock = bot.getOption(interaction, 'stock');
        const amount = bot.getOption(interaction, 'amount');
        // Check if Amount is Negative
        if (amount < 0) {
            // Create Embed
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» You cant sell a negative amount of Stocks!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Du kannst keine negativen Anzahlen verkaufen!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] STOCKSELL : NEGATIVESTOCKS : ' + amount + '€');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        // Calculate Cost
        const cash = amount * client.stocks[stock];
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
        // Check for enough Stocks
        if (await bot.stocks.get(interaction.user.id, stock, 'used') < amount) {
            const missing = amount - (await bot.stocks.get(interaction.user.id, stock, 'used'));
            // Create Embed
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» You dont have enough Stocks for that, you are missing **' + missing + '** ' + emoji + ' !')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (interaction.guildLocale) {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Du hast dafür nicht genug Aktien, dir fehlen **' + missing + '** ' + emoji + ' !')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] STOCKSELL : ' + stock.toUpperCase() + ' : ' + amount + ' : ' + cash + '€ : NOTENOUGHSTOCKS');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        // Log Transaction
        const transaction = await bot.transactions.log({
            success: true,
            sender: {
                id: `${amount} ${stock.toUpperCase()} STOCK`,
                amount: cash,
                type: 'negative'
            }, reciever: {
                id: interaction.user.id,
                amount: cash,
                type: 'positive'
            }
        });
        // Add Money
        bot.money.add(interaction.guild.id, interaction.user.id, cash);
        // Remove Stock Amount
        bot.stocks.rem(interaction.user.id, stock, 'used', amount);
        // Create Embed
        let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
            .setTitle('<:CHART:1024398298204876941> » SELL STOCKS')
            .setDescription('» You successfully sold **' + amount + '** ' + emoji + ' for **$' + cash + '**! (**$' + client.stocks[stock] + '** per Stock)\n\nID: ' + transaction.id)
            .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        if (lang === 'de') {
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:CHART:1024398298204876941> » AKTIEN VERKAUFEN')
                .setDescription('» Du hast erfolgreich **' + amount + '** ' + emoji + ' für **' + cash + '€** verkauft! (**' + client.stocks[stock] + '€** pro Aktie)\n\nID: ' + transaction.id)
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        }
        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] STOCKSELL : ' + stock.toUpperCase() + ' : ' + amount + ' : ' + cash + '€');
        return interaction.reply({ embeds: [message], ephemeral: true });
    }
};
//# sourceMappingURL=stocksell.js.map