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
        name: 'stockupgrade-yes'
    },
    async execute(interaction, client, lang, vote, stock, userid, amount) {
        // Check if User is Authorized
        if (interaction.user.id !== userid) {
            // Create Embed
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» This choice is up to <@' + userid + '>!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Diese Frage ist für <@' + userid + '>!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] STOCKUPGRADE : NOTSENDER');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        // Set Variables
        const balance = await bot.money.get(interaction.user.id);
        // Calculate Cost
        let baseCost;
        if (stock === 'green')
            baseCost = 15000;
        if (stock === 'blue')
            baseCost = 20000;
        if (stock === 'yellow')
            baseCost = 25000;
        if (stock === 'red')
            baseCost = 30000;
        if (stock === 'white')
            baseCost = 35000;
        if (stock === 'black')
            baseCost = 40000;
        const cost = amount * baseCost;
        // Split Button with type
        const type = 'buy';
        if (type === 'buy') {
            // Check if User has enough Money
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
                bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] STOCKUPGRADE : ' + stock.toUpperCase() + ' : NOTENOUGHMONEY : ' + cost + '€');
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
            // Edit Buttons
            {
                interaction.message.components[0].components[0].data.disabled = true;
                interaction.message.components[0].components[1].data.disabled = true;
                interaction.message.components[0].components[1].data.style = 2;
            }
            // Create Embed
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:BOXCHECK:1024401101589590156> » BUY STOCK SLOTS')
                .setDescription('» You successfully bought **' + amount + 'x** ' + emoji + ' Slots for **$' + cost + '**!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang == 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:BOXCHECK:1024401101589590156> » AKTIEN SLOTS KAUFEN')
                    .setDescription('» Du hast erfolgreich **' + amount + 'x** ' + emoji + ' Slots für **' + cost + '€** gekauft!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            // Remove Money
            bot.money.rem(interaction.guild.id, interaction.user.id, cost);
            // Own Slots
            bot.stocks.add(interaction.user.id, stock, 'max', amount);
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] STOCKUPGRADE : ' + amount + 'x : ' + stock.toUpperCase() + ' : CONFIRM');
            return interaction.update({ embeds: [message], components: interaction.message.components });
        }
    }
};
//# sourceMappingURL=yes.js.map