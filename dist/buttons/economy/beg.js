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
        name: 'beg'
    },
    async execute(interaction, client, lang, vote, reciever, amount, reasontype, reason) {
        // Set Variables
        const balance = await bot.money.get(interaction.user.id);
        const args = interaction.message.embeds[0].description.split('**');
        const total = Number(args[1].match(/\d+/g)) + amount;
        // Check for enough Money
        if (balance < amount) {
            const missing = amount - balance;
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
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] BEG : ' + reciever + ' : ' + amount + '€ : NOTENOUGHMONEY');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        // Check if User is Author
        if (interaction.user.id == reciever) {
            // Create Embed
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» You cant give yourself Money?')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Du kannst dir selber kein Geld geben?')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] BEG : ' + reciever + ' : ' + amount + '€ : SAMEPERSON');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        // Log Transaction
        const transaction = await bot.transactions.log({
            success: true,
            sender: {
                id: interaction.user.id,
                amount: amount,
                type: 'negative'
            }, reciever: {
                id: reciever,
                amount: amount,
                type: 'positive'
            }
        });
        // Transfer Money
        bot.money.rem(interaction.guild.id, interaction.user.id, amount);
        bot.money.add(interaction.guild.id, reciever, amount);
        // Create Embeds
        let message;
        if (reasontype !== 'SET') {
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:DONATE:1024397357988720711> » BEGGING')
                .setDescription('» <@' + reciever + '> needs Money!\nTotal Earnings: **$' + total + '**')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:DONATE:1024397357988720711> » BETTELN')
                    .setDescription('» <@' + reciever + '> braucht Geld!\nInsgesamte Einnahmen: **' + total + '€**')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
        }
        else {
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:DONATE:1024397357988720711> » BEGGING')
                .setDescription('» <@' + reciever + '> needs Money!\nTotal Earnings: **$' + total + '**\n*"' + reason + '"*')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:DONATE:1024397357988720711> » BETTELN')
                    .setDescription('» <@' + reciever + '> braucht Geld!\nInsgesamte Einnahmen: **' + total + '€**\n*"' + reason + '"*')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
        }
        ;
        let rmessage = new discord_js_1.EmbedBuilder().setColor(0x37009B)
            .setTitle('<:DONATE:1024397357988720711> » BEGGING')
            .setDescription('» <@' + interaction.user.id + '> gave <@' + reciever + '> **$' + amount + '**!\n\nID: ' + transaction.id)
            .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        if (lang === 'de') {
            rmessage = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:DONATE:1024397357988720711> » BETTELN')
                .setDescription('» <@' + interaction.user.id + '> hat <@' + reciever + '> **' + amount + '€** gegeben!\n\nID: ' + transaction.id)
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        }
        // Send Response Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] BEG : ' + reciever + ' : ' + amount + '€');
        await interaction.reply({ embeds: [rmessage] });
        // Edit Original Message
        return interaction.message.edit({ embeds: [message] }).catch(() => { });
    }
};
//# sourceMappingURL=beg.js.map