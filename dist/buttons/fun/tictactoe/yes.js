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
        // Get Users
        const cache = interaction.message.embeds;
        const description = cache[0].description.toString().replace(/[^\d@!]/g, '').split('!')[0].substring(1).split("@");
        const [sender, reciever] = description;
        // Set Variables
        const balance = await bot.money.get(reciever.toString().replace(/\D/g, ''));
        const otherbalance = await bot.money.get(sender.toString().replace(/\D/g, ''));
        // Check if User is Authorized
        if (interaction.user.id !== reciever.toString().replace(/\D/g, '')) {
            // Create Embed
            let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» <@' + reciever.toString().replace(/\D/g, '') + '> has to decide this!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» <@' + reciever.toString().replace(/\D/g, '') + '> muss das entscheiden!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] TICTACTOE : YES : NOTALLOWED');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        // Check if Person is already in a Lobby
        if (bot.game.has('PLAYING-' + reciever)) {
            // Create Embed
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
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] TICTACTOE : ' + reciever.toString().replace(/\D/g, '') + ' : ALREADYLOBBY');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        // Check if Other Person is already in a Lobby
        if (bot.game.has('PLAYING-' + sender)) {
            // Create Embed
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
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] TICTACTOE : ' + sender.toString().replace(/\D/g, '') + ' : ALREADYLOBBY');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        // Check for enough Money
        if (balance < bet) {
            const missing = bet - balance;
            // Create Embed
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
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] TICTACTOE : ' + reciever.toString().replace(/\D/g, '') + ' : ' + bet + '€ : NOTENOUGHMONEY');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        if (otherbalance < bet) {
            const missing = bet - otherbalance;
            // Create Embed
            let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» <@' + sender.toString().replace(/\D/g, '') + '> doesnt have enough Money, he is Missing **$' + missing + '**!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» <@' + sender.toString().replace(/\D/g, '') + '> hat nicht genug Geld, im fehlen **' + missing + '€**!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] TICTACTOE : ' + reciever.toString().replace(/\D/g, '') + ' : ' + bet + '€ : NOTENOUGHMONEY');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        // Answer Timeout Function
        bot.ttt.delete('TIMEOUT-' + sender + '-' + interaction.message.id);
        // Create Buttons
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
        // Set Variables
        eval('global.ttts' + sender.toString().replace(/\D/g, '') + ' = true');
        eval('global.ttts' + reciever.toString().replace(/\D/g, '') + ' = true');
        eval('delete tttlc' + sender.replace(/\D/g, ''));
        eval('global.tttdatap' + sender.toString().replace(/\D/g, '') + ' = 0');
        eval('global.tttdatap' + reciever.toString().replace(/\D/g, '') + ' = 0');
        eval('global.tttdatatu' + sender.toString().replace(/\D/g, '') + ' = ' + sender.toString().replace(/\D/g, ''));
        eval('global.tttdatatuf' + sender.toString().replace(/\D/g, '') + ' = 0');
        eval('global.tttdata1a' + sender.toString().replace(/\D/g, '') + ' = []');
        eval('global.tttdata2a' + sender.toString().replace(/\D/g, '') + ' = []');
        eval('global.tttdatapc' + sender.toString().replace(/\D/g, '') + ' = []');
        eval('global.tttdatapc' + reciever.toString().replace(/\D/g, '') + ' = []');
        eval('global.tttdatapcn' + sender.toString().replace(/\D/g, '') + ' = []');
        eval('global.tttdatapcn' + reciever.toString().replace(/\D/g, '') + ' = []');
        eval('global.tttdatapca' + sender.toString().replace(/\D/g, '') + ' = 0');
        eval('global.tttdatapca' + reciever.toString().replace(/\D/g, '') + ' = 0');
        eval('global.tttdataf1' + sender.toString().replace(/\D/g, '') + ' = "1020411843644243998"');
        eval('global.tttdataf2' + sender.toString().replace(/\D/g, '') + ' = "1020411843644243998"');
        eval('global.tttdataf3' + sender.toString().replace(/\D/g, '') + ' = "1020411843644243998"');
        eval('global.tttdataf4' + sender.toString().replace(/\D/g, '') + ' = "1020411843644243998"');
        eval('global.tttdataf5' + sender.toString().replace(/\D/g, '') + ' = "1020411843644243998"');
        eval('global.tttdataf6' + sender.toString().replace(/\D/g, '') + ' = "1020411843644243998"');
        eval('global.tttdataf7' + sender.toString().replace(/\D/g, '') + ' = "1020411843644243998"');
        eval('global.tttdataf8' + sender.toString().replace(/\D/g, '') + ' = "1020411843644243998"');
        eval('global.tttdataf9' + sender.toString().replace(/\D/g, '') + ' = "1020411843644243998"');
        eval('global.tttdatabc1' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Secondary');
        eval('global.tttdatabc2' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Secondary');
        eval('global.tttdatabc3' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Secondary');
        eval('global.tttdatabc4' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Secondary');
        eval('global.tttdatabc5' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Secondary');
        eval('global.tttdatabc6' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Secondary');
        eval('global.tttdatabc7' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Secondary');
        eval('global.tttdatabc8' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Secondary');
        eval('global.tttdatabc9' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Secondary');
        eval('global.tttdatad1' + sender.toString().replace(/\D/g, '') + ' = false');
        eval('global.tttdatad2' + sender.toString().replace(/\D/g, '') + ' = false');
        eval('global.tttdatad3' + sender.toString().replace(/\D/g, '') + ' = false');
        eval('global.tttdatad4' + sender.toString().replace(/\D/g, '') + ' = false');
        eval('global.tttdatad5' + sender.toString().replace(/\D/g, '') + ' = false');
        eval('global.tttdatad6' + sender.toString().replace(/\D/g, '') + ' = false');
        eval('global.tttdatad7' + sender.toString().replace(/\D/g, '') + ' = false');
        eval('global.tttdatad8' + sender.toString().replace(/\D/g, '') + ' = false');
        eval('global.tttdatad9' + sender.toString().replace(/\D/g, '') + ' = false');
        // Transfer Money
        bot.money.rem(interaction.guild.id, sender.toString().replace(/\D/g, ''), bet);
        bot.money.rem(interaction.guild.id, reciever.toString().replace(/\D/g, ''), bet);
        // Create Embed
        let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
            .setTitle('<:GAMEPAD:1024395990679167066> » TICTACTOE')
            .setDescription('» <@' + sender.toString().replace(/\D/g, '') + '> is playing Tic Tac Toe with <@' + reciever.toString().replace(/\D/g, '') + '>!\nThe Bet is **$' + bet + '**\n\n🔵 » <@' + sender.toString().replace(/\D/g, '') + '>\n🔴 » <@' + reciever.toString().replace(/\D/g, '') + '>')
            .setFooter({ text: '» ' + client.config.version + ' » CURRENT TURN: 🔵' });
        if (lang === 'de') {
            message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:GAMEPAD:1024395990679167066> » TICTACTOE')
                .setDescription('» <@' + sender.toString().replace(/\D/g, '') + '> spielt mit <@' + reciever.toString().replace(/\D/g, '') + '> Tic Tac Toe!\nDie Wette ist **' + bet + '€**\n\n🔵 » <@' + sender.toString().replace(/\D/g, '') + '>\n🔴 » <@' + reciever.toString().replace(/\D/g, '') + '>')
                .setFooter({ text: '» ' + client.config.version + ' » AM ZUG: 🔵' });
        }
        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] TICTACTOE : ' + sender.toString().replace(/\D/g, '') + ' : ACCEPT');
        return interaction.update({ content: '', embeds: [message], components: [row1, row2, row3] });
    }
};
//# sourceMappingURL=yes.js.map