"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const discord_js_2 = require("discord.js");
const promises_1 = require("timers/promises");
exports.default = {
    data: {
        name: 'memory-yes'
    },
    async execute(ctx, bet) {
        const cache = ctx.interaction.message.embeds;
        const description = cache[0].description.toString().replace(/[^\d@!]/g, '').split('!')[0].substring(1).split("@");
        const [sender, reciever] = description;
        const balance = await ctx.bot.money.get(reciever);
        const otherbalance = await ctx.bot.money.get(sender);
        if (ctx.interaction.user.id !== reciever) {
            let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» <@' + reciever + '> has to decide this!')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» <@' + reciever + '> muss das entscheiden!')
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            }
            ctx.log(false, `[BTN] MEMORY : YES : NOTALLOWED`);
            return ctx.interaction.reply({ embeds: [message], ephemeral: true });
        }
        if (ctx.bot.game.has('PLAYING-' + reciever)) {
            let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» You are already in a Lobby!')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Du bist schon in einer Lobby!')
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            }
            ctx.log(false, `[BTN] MEMORY : ${reciever} : ALREADYLOBBY`);
            return ctx.interaction.reply({ embeds: [message], ephemeral: true });
        }
        if (ctx.bot.game.has('PLAYING-' + sender)) {
            let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» <@' + sender + '> is already in a Lobby!')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» <@' + sender + '> ist schon in einer Lobby!')
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            }
            ctx.log(false, `[BTN] MEMORY : ${sender} : ALREADYLOBBY`);
            return ctx.interaction.reply({ embeds: [message], ephemeral: true });
        }
        if (balance < bet) {
            const missing = bet - balance;
            let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» You dont have enough Money for that, you are missing **$' + missing + '**!')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Du hast dafür nicht genug Geld, dir fehlen **' + missing + '€**!')
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            }
            ctx.log(false, `[BTN] MEMORY : ${reciever} : ${bet}€ : NOTENOUGHMONEY`);
            return ctx.interaction.reply({ embeds: [message], ephemeral: true });
        }
        if (otherbalance < bet) {
            const missing = bet - otherbalance;
            let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» <@' + sender + '> doesnt have enough Money, he is Missing **$' + missing + '**!')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» <@' + sender + '> hat nicht genug Geld, im fehlen **' + missing + '€**!')
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            }
            ctx.log(false, `[BTN] MEMORY : ${reciever} : ${bet}€ : NOTENOUGHMONEY`);
            return ctx.interaction.reply({ embeds: [message], ephemeral: true });
        }
        await ctx.interaction.deferUpdate();
        ctx.bot.memory.delete('TIMEOUT-' + sender + '-' + ctx.interaction.message.id);
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
        ctx.bot.game.set('PLAYING-' + sender, 'MEMORY');
        ctx.bot.game.set('PLAYING-' + reciever, 'MEMORY');
        ctx.bot.memory.set('A_PLAYERSELECT-' + sender, 0);
        ctx.bot.memory.set('A_PLAYERSELECT-' + reciever, 0);
        ctx.bot.memory.set('POINTS-' + sender, 0);
        ctx.bot.memory.set('POINTS-' + reciever, 0);
        ctx.bot.memory.set('E_PLAYERSELECT-' + sender, []);
        ctx.bot.memory.set('E_PLAYERSELECT-' + reciever, []);
        ctx.bot.memory.set('B_PLAYERSELECT-' + reciever, []);
        ctx.bot.memory.set('B_PLAYERSELECT-' + sender, []);
        ctx.bot.memory.set('C_PLAYERSELECT-' + reciever, []);
        ctx.bot.memory.set('C_PLAYERSELECT-' + sender, []);
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
            "790990037982248971",
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
                const emojirandom = ctx.bot.random(1, 10);
                const emoji = await emojilist[emojirandom - 1];
                skipother = false;
                if (typeof emoji !== 'undefined' && typeof emojinumber !== 'undefined') {
                    if (!emojis.includes(emoji)) {
                        emojis[emojinumber - 1] = await emoji;
                        await (0, promises_1.setTimeout)(25);
                        ctx.bot.memory.set('I_EMOJI-' + emojinumber + '-' + sender, emoji.toString());
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
                        ctx.bot.memory.set('I_EMOJI-' + emojinumber + '-' + sender, emoji.toString());
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
        ctx.bot.money.rem(ctx.interaction.guild.id, sender, bet);
        ctx.bot.money.rem(ctx.interaction.guild.id, reciever, bet);
        let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
            .setTitle('<:GAMEPAD:1024395990679167066> » MEMORY')
            .setDescription('» <@' + sender + '> is playing Memory with <@' + reciever + '>!\nThe Bet is **$' + bet + '**\n\n🔵 » Points of <@' + sender + '> are **0**\n🔴 » Points of <@' + reciever + '> are **0**')
            .setFooter({ text: '» ' + ctx.client.config.version + ' » CURRENT TURN: 🔵' });
        if (ctx.metadata.language === 'de') {
            message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:GAMEPAD:1024395990679167066> » MEMORY')
                .setDescription('» <@' + sender + '> spielt mit <@' + reciever + '> Memory!\nDie Wette ist **' + bet + '€**\n\n🔵 » Punkte von <@' + sender + '> sind **0**\n🔴 » Punkte von <@' + reciever + '> sind **0**')
                .setFooter({ text: '» ' + ctx.client.config.version + ' » AM ZUG: 🔵' });
        }
        ctx.bot.memory.set('TURN-' + sender, sender);
        for (let i = 0; i < 20; i++) {
            ctx.bot.memory.set('STYLE-' + (i + 1) + '-' + sender, discord_js_1.ButtonStyle.Secondary);
            ctx.bot.memory.set('DISABLED-' + (i + 1) + '-' + sender, false);
            ctx.bot.memory.set('D_EMOJI-' + (i + 1) + '-' + sender, { id: '1020411843644243998', name: 'MEMORY' });
        }
        ctx.log(false, `[BTN] MEMORY : ${sender} : ACCEPT`);
        return ctx.interaction.editReply({ content: '', embeds: [message], components: [row1, row2, row3, row4] });
    }
};
//# sourceMappingURL=yes.js.map