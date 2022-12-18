"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('daily')
        .setDMPermission(false)
        .setDescription('GET YOUR DAILY BONUS')
        .setDescriptionLocalizations({
        de: 'HOLE DEINEN TÄGLICHEN BONUS'
    }),
    async execute(ctx) {
        const ms = (await import('pretty-ms')).default;
        if (!await ctx.bot.settings.get(ctx.interaction.guild.id, 'daily')) {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» The **`/daily`** Command is disabled on this Server!')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Der **`/daily`** Befehl ist auf diesem Server deaktiviert!')
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            }
            ctx.log(false, `[CMD] DAILY : DISABLED`);
            return ctx.interaction.reply({ embeds: [message], ephemeral: true });
        }
        if ((await ctx.bot.cooldown.get(ctx.interaction.user.id, 'daily')).onCooldown) {
            const timeLeft = (await ctx.bot.cooldown.get(ctx.interaction.user.id, 'daily')).remaining;
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» You still have a Cooldown of **' + ms(timeLeft, { secondsDecimalDigits: 0 }) + '**!')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Du hast leider noch einen Cooldown von **' + ms(timeLeft, { secondsDecimalDigits: 0 }) + '**!')
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            }
            ctx.log(false, `[CMD] DAILY : ONCOOLDOWN : ${ms(timeLeft, { secondsDecimalDigits: 0 })}`);
            return ctx.interaction.reply({ embeds: [message], ephemeral: true });
        }
        else {
            const result = ctx.bot.random(750, 1500);
            let extra;
            if (result < 800)
                extra = 'MEH.';
            if (result >= 800)
                extra = 'NICE.';
            if (result >= 1000)
                extra = 'GREAT.';
            if (result >= 1200)
                extra = 'WONDERFUL!';
            if (result >= 1400)
                extra = 'WOW!';
            if (ctx.metadata.language === 'de') {
                if (result < 800)
                    extra = 'MEH.';
                if (result >= 800)
                    extra = 'NICE.';
                if (result >= 1000)
                    extra = 'PRIMA.';
                if (result >= 1200)
                    extra = 'TOLL!';
                if (result >= 1400)
                    extra = 'WOW!';
            }
            const transaction = await ctx.bot.transactions.log({
                success: true,
                sender: {
                    id: 'DAILY',
                    amount: result,
                    type: 'negative'
                }, reciever: {
                    id: ctx.interaction.user.id,
                    amount: result,
                    type: 'positive'
                }
            });
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:HAMMER:1024388163747184662> » DAILY')
                .setDescription('» You get **$' + result + '** from me Today! ' + extra + '\n\nID: ' + transaction.id)
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:HAMMER:1024388163747184662> » DAILY')
                    .setDescription('» Du kriegst heute **' + result + '€** von mir! ' + extra + '\n\nID: ' + transaction.id)
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            }
            ctx.bot.money.add(ctx.interaction.guild.id, ctx.interaction.user.id, result);
            ctx.log(false, `[CMD] DAILY : ${result}€`);
            ctx.bot.cooldown.set(ctx.interaction.user.id, 'daily', 24 * 60 * 60 * 1000);
            return ctx.interaction.reply({ embeds: [message] });
        }
    }
};
//# sourceMappingURL=daily.js.map