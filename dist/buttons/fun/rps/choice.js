"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    data: {
        name: 'rps-choice'
    },
    async execute(ctx, bet, choice) {
        const cache = ctx.interaction.message.embeds;
        const description = cache[0].description.toString().replace(/[^\d@!]/g, '').split('!')[0].substring(1).split("@");
        const [sender, reciever] = description;
        if (sender !== ctx.interaction.user.id && reciever !== ctx.interaction.user.id) {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» You arent playing!')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Du spielst garnicht mit!')
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            }
            ctx.log(false, `[BTN] RPS : NOTPLAYING`);
            return ctx.interaction.reply({ embeds: [message], ephemeral: true });
        }
        let choiceen;
        if (choice === 'ROCK')
            choiceen = '🪨 ROCK';
        if (choice === 'PAPER')
            choiceen = '📝 PAPER';
        if (choice === 'SCISSORS')
            choiceen = '✂️ SCISSORS';
        let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
            .setTitle('<:GAMEPAD:1024395990679167066> » ROCK PAPER SCISSORS')
            .setDescription('» You selected **' + choiceen + '**!')
            .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
        if (ctx.metadata.language === 'de') {
            let choicede;
            if (choice === 'ROCK')
                choicede = '🪨 STEIN';
            if (choice === 'PAPER')
                choicede = '📝 PAPIER';
            if (choice === 'SCISSORS')
                choicede = '✂️ SCHERE';
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:GAMEPAD:1024395990679167066> » SCHERE STEIN PAPIER')
                .setDescription('» Du hast **' + choicede + '** ausgewählt!')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
        }
        ctx.log(false, `[BTN] RPS : ${choice}`);
        ctx.interaction.reply({ embeds: [message], ephemeral: true });
        ctx.bot.rps.set('CHOICE-' + ctx.interaction.user.id, choice);
        if (ctx.bot.rps.has('CHOICE-' + sender) && ctx.bot.rps.has('CHOICE-' + reciever)) {
            const psc = ctx.bot.rps.get('CHOICE-' + sender);
            const prc = ctx.bot.rps.get('CHOICE-' + reciever);
            let win = 'none';
            if (psc === 'ROCK' && prc === 'PAPER')
                win = 'pr';
            if (psc === 'ROCK' && prc === 'SCISSORS')
                win = 'ps';
            if (psc === 'SCISSORS' && prc === 'ROCK')
                win = 'pr';
            if (psc === 'SCISSORS' && prc === 'PAPER')
                win = 'ps';
            if (psc === 'PAPER' && prc === 'ROCK')
                win = 'ps';
            if (psc === 'PAPER' && prc === 'SCISSORS')
                win = 'pr';
            let winner = '**Noone**', rawWinner;
            if (ctx.metadata.language === 'de')
                winner = '**Niemand**';
            if (win === 'ps') {
                winner = '<@' + sender + '>';
                rawWinner = sender;
            }
            if (win === 'pr') {
                winner = '<@' + reciever + '>';
                rawWinner = reciever;
            }
            const betwon = bet * 2;
            let transaction;
            if (winner !== '**Noone**' && winner !== '**Niemand**') {
                ctx.bot.money.add(ctx.interaction.guild.id, rawWinner, betwon);
                if (betwon > 0)
                    transaction = await ctx.bot.transactions.log({
                        success: true,
                        sender: {
                            id: (rawWinner === sender ? reciever : sender),
                            amount: betwon,
                            type: 'negative'
                        }, reciever: {
                            id: rawWinner,
                            amount: betwon,
                            type: 'positive'
                        }
                    });
            }
            else {
                ctx.bot.money.add(ctx.interaction.guild.id, sender, bet);
                ctx.bot.money.add(ctx.interaction.guild.id, reciever, bet);
            }
            let send, reci;
            if (psc === 'SCISSORS')
                send = '✂️ SCISSORS';
            if (psc === 'PAPER')
                send = '📝 PAPER';
            if (psc === 'ROCK')
                send = '🪨 ROCK';
            if (prc === 'ROCK')
                reci = '🪨 ROCK';
            if (prc === 'PAPER')
                reci = '📝 PAPER';
            if (prc === 'SCISSORS')
                reci = '✂️ SCISSORS';
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:GAMEPAD:1024395990679167066> » ROCK PAPER SCISSORS')
                .setDescription('» <@' + sender + '> selected **' + ctx.bot.rps.get('CHOICE-' + sender) + '**\n» <@' + reciever + '> selected **' + ctx.bot.rps.get('CHOICE-' + reciever) + '**\n\n<:AWARD:1024385473524793445> ' + winner + ' won **$' + betwon + '**.' + ((typeof transaction === 'object') ? `\nID: ${transaction.id}` : ''))
                .setFooter({ text: '» ' + ctx.client.config.version });
            if (ctx.metadata.language === 'de') {
                if (psc === 'SCISSORS')
                    send = '✂️ SCHERE';
                if (psc === 'PAPER')
                    send = '📝 PAPIER';
                if (psc === 'ROCK')
                    send = '🪨 STEIN';
                if (prc === 'ROCK')
                    reci = '🪨 STEIN';
                if (prc === 'PAPER')
                    reci = '📝 PAPIER';
                if (prc === 'SCISSORS')
                    reci = '✂️ SCHERE';
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:GAMEPAD:1024395990679167066> » SCHERE STEIN PAPIER')
                    .setDescription('» <@' + sender + '> wählte **' + send + '**\n» <@' + reciever + '> wählte **' + reci + '**\n\n<:AWARD:1024385473524793445> ' + winner + ' hat **' + betwon + '€** gewonnen.' + ((typeof transaction === 'object') ? `\nID: ${transaction.id}` : ''))
                    .setFooter({ text: '» ' + ctx.client.config.version });
            }
            ctx.bot.rps.delete('CHOICE-' + sender);
            ctx.bot.rps.delete('CHOICE-' + reciever);
            {
                ctx.interaction.message.components[0].components[0].data.disabled = true;
                ctx.interaction.message.components[0].components[1].data.disabled = true;
                ctx.interaction.message.components[0].components[2].data.disabled = true;
            }
            ctx.log(false, `[BTN] RPS : DONE`);
            return ctx.interaction.message.edit({ embeds: [message], components: ctx.interaction.message.components, ephemeral: true });
        }
    }
};
//# sourceMappingURL=choice.js.map