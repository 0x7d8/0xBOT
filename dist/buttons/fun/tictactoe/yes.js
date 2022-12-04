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
const discord_js_2 = require("discord.js");
const bot = __importStar(require("@functions/bot.js"));
exports.default = {
    data: {
        name: 'ttt-yes'
    },
    async execute(interaction, client, lang, vote, bet) {
        const cache = interaction.message.embeds;
        const description = cache[0].description.toString().replace(/[^\d@!]/g, '').split('!')[0].substring(1).split("@");
        const [sender, reciever] = description;
        const balance = await bot.money.get(reciever);
        const otherbalance = await bot.money.get(sender);
        if (interaction.user.id !== reciever) {
            let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» <@' + reciever + '> has to decide this!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» <@' + reciever + '> muss das entscheiden!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] TICTACTOE : YES : NOTALLOWED');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        if (bot.game.has('PLAYING-' + reciever)) {
            let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» You are already in a Lobby!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Du bist schon in einer Lobby!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] TICTACTOE : ' + reciever + ' : ALREADYLOBBY');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        if (bot.game.has('PLAYING-' + sender)) {
            let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» <@' + sender + '> is already in a Lobby!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» <@' + sender + '> ist schon in einer Lobby!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] TICTACTOE : ' + sender + ' : ALREADYLOBBY');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        if (balance < bet) {
            const missing = bet - balance;
            let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» You dont have enough Money for that, you are missing **$' + missing + '**!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Du hast dafür nicht genug Geld, dir fehlen **' + missing + '€**!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] TICTACTOE : ' + reciever + ' : ' + bet + '€ : NOTENOUGHMONEY');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        if (otherbalance < bet) {
            const missing = bet - otherbalance;
            let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» <@' + sender + '> doesnt have enough Money, he is Missing **$' + missing + '**!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» <@' + sender + '> hat nicht genug Geld, im fehlen **' + missing + '€**!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] TICTACTOE : ' + reciever + ' : ' + bet + '€ : NOTENOUGHMONEY');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        bot.ttt.delete('TIMEOUT-' + sender + '-' + interaction.message.id);
        let row1 = new discord_js_1.ActionRowBuilder()
            .addComponents(new discord_js_1.ButtonBuilder()
            .setEmoji('1020411843644243998')
            .setCustomId('TTT-1-' + bet)
            .setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
            .setEmoji('1020411843644243998')
            .setCustomId('TTT-2-' + bet)
            .setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
            .setEmoji('1020411843644243998')
            .setCustomId('TTT-3-' + bet)
            .setStyle(discord_js_1.ButtonStyle.Secondary));
        let row2 = new discord_js_1.ActionRowBuilder()
            .addComponents(new discord_js_1.ButtonBuilder()
            .setEmoji('1020411843644243998')
            .setCustomId('TTT-4-' + bet)
            .setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
            .setEmoji('1020411843644243998')
            .setCustomId('TTT-5-' + bet)
            .setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
            .setEmoji('1020411843644243998')
            .setCustomId('TTT-6-' + bet)
            .setStyle(discord_js_1.ButtonStyle.Secondary));
        let row3 = new discord_js_1.ActionRowBuilder()
            .addComponents(new discord_js_1.ButtonBuilder()
            .setEmoji('1020411843644243998')
            .setCustomId('TTT-7-' + bet)
            .setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
            .setEmoji('1020411843644243998')
            .setCustomId('TTT-8-' + bet)
            .setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
            .setEmoji('1020411843644243998')
            .setCustomId('TTT-9-' + bet)
            .setStyle(discord_js_1.ButtonStyle.Secondary));
        bot.game.set('PLAYING-' + sender, 'TICTACTOE');
        bot.game.set('PLAYING-' + reciever, 'TICTACTOE');
        bot.ttt.set('TURN-' + sender, sender);
        bot.ttt.set('FIELDS-' + sender, []);
        bot.ttt.set('FIELDS-' + reciever, []);
        bot.ttt.set('FIELD-1-' + sender, null);
        bot.ttt.set('FIELD-2-' + sender, null);
        bot.ttt.set('FIELD-3-' + sender, null);
        bot.ttt.set('FIELD-4-' + sender, null);
        bot.ttt.set('FIELD-5-' + sender, null);
        bot.ttt.set('FIELD-6-' + sender, null);
        bot.ttt.set('FIELD-7-' + sender, null);
        bot.ttt.set('FIELD-8-' + sender, null);
        bot.ttt.set('FIELD-9-' + sender, null);
        bot.money.rem(interaction.guild.id, sender, bet);
        bot.money.rem(interaction.guild.id, reciever, bet);
        let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
            .setTitle('<:GAMEPAD:1024395990679167066> » TICTACTOE')
            .setDescription('» <@' + sender + '> is playing Tic Tac Toe with <@' + reciever + '>!\nThe Bet is **$' + bet + '**\n\n🔵 » <@' + sender + '>\n🔴 » <@' + reciever + '>')
            .setFooter({ text: '» ' + client.config.version + ' » CURRENT TURN: 🔵' });
        if (lang === 'de') {
            message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:GAMEPAD:1024395990679167066> » TICTACTOE')
                .setDescription('» <@' + sender + '> spielt mit <@' + reciever + '> Tic Tac Toe!\nDie Wette ist **' + bet + '€**\n\n🔵 » <@' + sender + '>\n🔴 » <@' + reciever + '>')
                .setFooter({ text: '» ' + client.config.version + ' » AM ZUG: 🔵' });
        }
        bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] TICTACTOE : ' + sender + ' : ACCEPT');
        return interaction.update({ content: '', embeds: [message], components: [row1, row2, row3] });
    }
};
//# sourceMappingURL=yes.js.map