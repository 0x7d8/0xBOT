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
const promises_1 = require("timers/promises");
const bot = __importStar(require("@functions/bot.js"));
exports.default = {
    data: {
        name: 'memory-yes'
    },
    async execute(interaction, client, lang, vote, bet) {
        // Get Users
        const cache = interaction.message.embeds;
        const description = cache[0].description.toString().replace(/[^\d@!]/g, '').split('!')[0].substring(1).split("@");
        const [sender, reciever] = description;
        // Set Variables
        const balance = await bot.money.get(reciever);
        const otherbalance = await bot.money.get(sender);
        // Check if User is Authorized
        if (interaction.user.id !== reciever) {
            // Create Embed
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
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] MEMORY : YES : NOTALLOWED');
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
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] MEMORY : ' + reciever + ' : ALREADYLOBBY');
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
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] MEMORY : ' + sender + ' : ALREADYLOBBY');
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
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] MEMORY : ' + reciever + ' : ' + bet + '€ : NOTENOUGHMONEY');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        if (otherbalance < bet) {
            const missing = bet - otherbalance;
            // Create Embed
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
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] MEMORY : ' + reciever + ' : ' + bet + '€ : NOTENOUGHMONEY');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        // Defer Reply
        await interaction.deferUpdate();
        // Answer Timeout Function
        bot.memory.delete('TIMEOUT-' + sender + '-' + interaction.message.id);
        // Create Buttons
        let row1 = new discord_js_1.ActionRowBuilder()
            .addComponents(new discord_js_1.ButtonBuilder()
            .setEmoji('1020411843644243998')
            .setCustomId('MEMORY-1-' + bet)
            .setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
            .setEmoji('1020411843644243998')
            .setCustomId('MEMORY-2-' + bet)
            .setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
            .setEmoji('1020411843644243998')
            .setCustomId('MEMORY-3-' + bet)
            .setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
            .setEmoji('1020411843644243998')
            .setCustomId('MEMORY-4-' + bet)
            .setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
            .setEmoji('1020411843644243998')
            .setCustomId('MEMORY-5-' + bet)
            .setStyle(discord_js_1.ButtonStyle.Secondary));
        let row2 = new discord_js_1.ActionRowBuilder()
            .addComponents(new discord_js_1.ButtonBuilder()
            .setEmoji('1020411843644243998')
            .setCustomId('MEMORY-6-' + bet)
            .setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
            .setEmoji('1020411843644243998')
            .setCustomId('MEMORY-7-' + bet)
            .setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
            .setEmoji('1020411843644243998')
            .setCustomId('MEMORY-8-' + bet)
            .setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
            .setEmoji('1020411843644243998')
            .setCustomId('MEMORY-9-' + bet)
            .setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
            .setEmoji('1020411843644243998')
            .setCustomId('MEMORY-10-' + bet)
            .setStyle(discord_js_1.ButtonStyle.Secondary));
        let row3 = new discord_js_1.ActionRowBuilder()
            .addComponents(new discord_js_1.ButtonBuilder()
            .setEmoji('1020411843644243998')
            .setCustomId('MEMORY-11-' + bet)
            .setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
            .setEmoji('1020411843644243998')
            .setCustomId('MEMORY-12-' + bet)
            .setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
            .setEmoji('1020411843644243998')
            .setCustomId('MEMORY-13-' + bet)
            .setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
            .setEmoji('1020411843644243998')
            .setCustomId('MEMORY-14-' + bet)
            .setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
            .setEmoji('1020411843644243998')
            .setCustomId('MEMORY-15-' + bet)
            .setStyle(discord_js_1.ButtonStyle.Secondary));
        let row4 = new discord_js_1.ActionRowBuilder()
            .addComponents(new discord_js_1.ButtonBuilder()
            .setEmoji('1020411843644243998')
            .setCustomId('MEMORY-16-' + bet)
            .setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
            .setEmoji('1020411843644243998')
            .setCustomId('MEMORY-17-' + bet)
            .setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
            .setEmoji('1020411843644243998')
            .setCustomId('MEMORY-18-' + bet)
            .setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
            .setEmoji('1020411843644243998')
            .setCustomId('MEMORY-19-' + bet)
            .setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
            .setEmoji('1020411843644243998')
            .setCustomId('MEMORY-20-' + bet)
            .setStyle(discord_js_1.ButtonStyle.Secondary));
        // Set Variables
        bot.game.set('PLAYING-' + sender, 'MEMORY');
        bot.game.set('PLAYING-' + reciever, 'MEMORY');
        bot.memory.set('A_PLAYERSELECT-' + sender, 0);
        bot.memory.set('A_PLAYERSELECT-' + reciever, 0);
        bot.memory.set('POINTS-' + sender, 0);
        bot.memory.set('POINTS-' + reciever, 0);
        bot.memory.set('E_PLAYERSELECT-' + sender, []);
        bot.memory.set('E_PLAYERSELECT-' + reciever, []);
        bot.memory.set('B_PLAYERSELECT-' + reciever, []);
        bot.memory.set('B_PLAYERSELECT-' + sender, []);
        bot.memory.set('C_PLAYERSELECT-' + reciever, []);
        bot.memory.set('C_PLAYERSELECT-' + sender, []);
        // Generate Emoji Grid
        const emojis = [];
        const emojis2 = [];
        const emojilistraw = [
            "1017444934904729611",
            "1017445104685961236",
            "1017444736610619453",
            "1017445667347636294",
            "1017445007910772766",
            "1017445430310752336",
            "1017445761291669604",
            "1017444837257134100",
            "1017444467353063474",
            "1017445246516334653",
            "1017445352078590093",
            "1017847213067604009",
            "1018083730688057394",
            "1018079045461741569",
            "1018079408185163796",
            "1018927449368703098",
            "1014209756103184455",
            "1014209757214679121",
            "1018928177353072700",
            "1018930597856559144",
            "1019235162569068615",
            "1014209765431324733",
            "1019238968346284084",
            "1019239168573968385",
            "1019247388587728936",
            "1019247603843596368",
            "1019247987970560010",
            "1019248618709983283",
            "1019248854694109276",
            "1019249349890429101",
            "1019250108681949315",
            "1019250327440068671",
            "1019251675644559500",
            "1019253539471642694",
            "1019254370124173352",
            "1019254562214903869",
            "1023932900749627483",
            "1023933347078094891",
            "790990037982248971", // :PEPEOK:
        ];
        const copied = [...emojilistraw];
        const emojilist = [];
        for (let i = 0; i < 10; i++) {
            const randomIndex = Math.floor(Math.random() * copied.length);
            emojilist.push(copied[randomIndex]);
            copied.splice(randomIndex, 1);
        }
        let emojistate = false, emojinumber = 1, skipother = false;
        const rdo = async () => {
            while (emojistate == false) {
                const emojirandom = bot.random(1, 10);
                const emoji = await emojilist[emojirandom - 1];
                skipother = false;
                if (typeof emoji !== 'undefined' && typeof emojinumber !== 'undefined') {
                    if (!emojis.includes(emoji)) {
                        emojis[emojinumber - 1] = await emoji;
                        await (0, promises_1.setTimeout)(25);
                        bot.memory.set('I_EMOJI-' + emojinumber + '-' + sender, emoji.toString());
                        emojinumber = emojinumber + 1;
                        if (emojinumber > 20) {
                            emojistate = true;
                            return;
                        }
                        skipother = true;
                    }
                    if (!emojis2.includes(emoji) && skipother != true) {
                        emojis2[emojinumber - 1] = await emoji;
                        await (0, promises_1.setTimeout)(25);
                        bot.memory.set('I_EMOJI-' + emojinumber + '-' + sender, emoji.toString());
                        emojinumber = emojinumber + 1;
                        if (emojinumber > 20) {
                            emojistate = true;
                            return;
                        }
                    }
                }
            }
        };
        await rdo();
        // Transfer Money
        bot.money.rem(interaction.guild.id, sender, bet);
        bot.money.rem(interaction.guild.id, reciever, bet);
        // Create Embed
        let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
            .setTitle('<:GAMEPAD:1024395990679167066> » MEMORY')
            .setDescription('» <@' + sender + '> is playing Memory with <@' + reciever + '>!\nThe Bet is **$' + bet + '**\n\n🔵 » Points of <@' + sender + '> are **0**\n🔴 » Points of <@' + reciever + '> are **0**')
            .setFooter({ text: '» ' + client.config.version + ' » CURRENT TURN: 🔵' });
        if (lang === 'de') {
            message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:GAMEPAD:1024395990679167066> » MEMORY')
                .setDescription('» <@' + sender + '> spielt mit <@' + reciever + '> Memory!\nDie Wette ist **' + bet + '€**\n\n🔵 » Punkte von <@' + sender + '> sind **0**\n🔴 » Punkte von <@' + reciever + '> sind **0**')
                .setFooter({ text: '» ' + client.config.version + ' » AM ZUG: 🔵' });
        }
        // Set Default Button Values
        bot.memory.set('TURN-' + sender, sender);
        for (let i = 0; i < 20; i++) {
            bot.memory.set('STYLE-' + (i + 1) + '-' + sender, discord_js_1.ButtonStyle.Secondary);
            bot.memory.set('DISABLED-' + (i + 1) + '-' + sender, false);
            bot.memory.set('D_EMOJI-' + (i + 1) + '-' + sender, { id: '1020411843644243998', name: 'MEMORY' });
        }
        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] MEMORY : ' + sender + ' : ACCEPT');
        return interaction.editReply({ content: '', embeds: [message], components: [row1, row2, row3, row4] });
    }
};
//# sourceMappingURL=yes.js.map