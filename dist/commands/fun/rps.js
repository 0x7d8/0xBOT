"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const discord_js_2 = require("discord.js");
exports.default = {
    data: new discord_js_2.SlashCommandBuilder()
        .setName('rps')
        .setDescription('PLAY ROCK-PAPER-SCISSORS')
        .setDescriptionLocalizations({
        de: 'SPIELE SCHERE-STEIN-PAPIER'
    })
        .setDMPermission(false)
        .addUserOption((option) => option.setName('user')
        .setNameLocalizations({
        de: 'nutzer'
    })
        .setDescription('THE USER')
        .setDescriptionLocalizations({
        de: 'DER NUTZER'
    })
        .setRequired(true))
        .addIntegerOption((option) => option.setName('bet')
        .setNameLocalizations({
        de: 'wette'
    })
        .setDescription('THE AMOUNT OF MONEY')
        .setDescriptionLocalizations({
        de: 'DIE ANZAHL VON GELD'
    })
        .setRequired(false)),
    async execute(ctx) {
        const user = ctx.interaction.options.getUser("user");
        let bet = ctx.getOption('bet');
        const money = await ctx.bot.money.get(ctx.interaction.user.id);
        const othermoney = await ctx.bot.money.get(user.id);
        if (user.bot) {
            let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» You cant play Rock Paper Scissors with a Bot!')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Du kannst Schere Stein Papier nicht mit einem Bot spielen!')
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            }
            ctx.log(false, `[CMD] RPS : ${user.id} : BOT`);
            return ctx.interaction.reply({ embeds: [message], ephemeral: true });
        }
        if (ctx.bot.game.has('PLAYING-' + ctx.interaction.user.id)) {
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
            ctx.log(false, `[CMD] RPS : ${user.id} : ALREADYLOBBY`);
            return ctx.interaction.reply({ embeds: [message], ephemeral: true });
        }
        if (ctx.bot.game.has('PLAYING-' + user.id)) {
            let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» <@' + user.id + '> is already in a Lobby!')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» <@' + user.id + '> ist schon in einer Lobby!')
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            }
            ctx.log(false, `[CMD] RPS : ${user.id} : ALREADYLOBBY`);
            return ctx.interaction.reply({ embeds: [message], ephemeral: true });
        }
        if (bet < 0 && bet !== null) {
            let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» You cant bet negative Money!')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Du kannst kein negatives Geld wetten!')
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            }
            ctx.log(false, `[CMD] RPS : ${user.id} : NEGATIVEMONEY : ${bet}€`);
            return ctx.interaction.reply({ embeds: [message], ephemeral: true });
        }
        if (ctx.interaction.user.id === user.id) {
            let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» You cant play Rock Paper Scissors with yourself?')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Du kannst Schere Stein Papier nicht mit dir alleine spielen?')
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            }
            ctx.log(false, `[CMD] RPS : ${user.id} : ${bet}€ : SAMEPERSON`);
            return ctx.interaction.reply({ embeds: [message], ephemeral: true });
        }
        if (money < bet && bet !== null) {
            const missing = bet - money;
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
            ctx.log(false, `[CMD] RPS : ${user.id} : NOTENOUGHMONEY`);
            return ctx.interaction.reply({ embeds: [message], ephemeral: true });
        }
        if (othermoney < bet && bet !== null) {
            const missing = bet - othermoney;
            let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» <@' + user.id + '> doesnt have enough Money for that, he is Missing **$' + missing + '**!')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» <@' + user.id + '> hat dafür nicht genug Geld, im fehlen **' + missing + '€**!')
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            }
            ctx.log(false, `[CMD] RPS : ${user.id} : NOTENOUGHMONEY`);
            return ctx.interaction.reply({ embeds: [message], ephemeral: true });
        }
        if (!bet)
            bet = 0;
        let row = new discord_js_1.ActionRowBuilder()
            .addComponents(new discord_js_1.ButtonBuilder()
            .setLabel('YES')
            .setCustomId('RPS-YES-' + bet)
            .setEmoji('1024382942153285632')
            .setStyle(discord_js_1.ButtonStyle.Success), new discord_js_1.ButtonBuilder()
            .setLabel('NO')
            .setCustomId('RPS-NO-' + bet)
            .setEmoji('1024382939020152982')
            .setStyle(discord_js_1.ButtonStyle.Danger));
        if (ctx.metadata.language === 'de') {
            row = new discord_js_1.ActionRowBuilder()
                .addComponents(new discord_js_1.ButtonBuilder()
                .setLabel('JA')
                .setCustomId('RPS-YES-' + bet)
                .setEmoji('1024382942153285632')
                .setStyle(discord_js_1.ButtonStyle.Success), new discord_js_1.ButtonBuilder()
                .setLabel('NEIN')
                .setCustomId('RPS-NO-' + bet)
                .setEmoji('1024382939020152982')
                .setStyle(discord_js_1.ButtonStyle.Danger));
        }
        let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
            .setTitle('<:GAMEPAD:1024395990679167066> » ROCK PAPER SCISSORS')
            .setDescription('» <@' + ctx.interaction.user.id + '> challenges you, <@' + user.id + '> to a battle of Rock Paper Scissors! The Bet is **$' + bet + '**.\nDo you accept?\n\n» This Request expires <t:' + (Math.floor(+new Date() / 1000) + 29) + ':R>')
            .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
        if (ctx.metadata.language === 'de') {
            message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:GAMEPAD:1024395990679167066> » SCHERE STEIN PAPIER')
                .setDescription('» <@' + ctx.interaction.user.id + '> fordert dich, <@' + user.id + '> zu einem Spiel von Schere Stein Papier heraus! Die Wette ist **' + bet + '€**.\nAkzeptierst du?\n\n» Diese Anfrage wird ungültig <t:' + (Math.floor(+new Date() / 1000) + 29) + ':R>')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
        }
        ctx.log(false, `[CMD] RPS : ${user.id} : ${bet}€`);
        let msg = await ctx.interaction.reply({ content: '<@' + user.id + '>', embeds: [message], components: [row], fetchReply: true });
        ctx.bot.rps.set('TIMEOUT-' + ctx.interaction.user.id + '-' + msg.id, true);
        const expiration = async () => {
            if (!ctx.bot.rps.has('TIMEOUT-' + ctx.interaction.user.id + '-' + msg.id))
                return;
            ctx.bot.rps.delete('TIMEOUT-' + ctx.interaction.user.id + '-' + msg.id);
            {
                msg.components[0].components[0].data.disabled = true;
                msg.components[0].components[1].data.disabled = true;
                msg.components[0].components[0].data.style = 2;
                msg.components[0].components[1].data.style = 2;
            }
            message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:GAMEPAD:1024395990679167066> » ROCK PAPER SCISSORS')
                .setDescription('» The Request expired.')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:GAMEPAD:1024395990679167066> » SCHERE STEIN PAPIER')
                    .setDescription('» Die Anfrage ist abgelaufen.')
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            }
            ctx.log(false, `[CMD] RPS : ${user.id} : EXPIRED`);
            ctx.interaction.editReply({ content: '', embeds: [message], components: msg.components }).catch(() => { });
        };
        setTimeout(() => expiration(), 27000);
    }
};
//# sourceMappingURL=rps.js.map