"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('quoteremove')
        .setDMPermission(false)
        .setDescription('REMOVE QUOTES')
        .setDescriptionLocalizations({
        de: 'ENTFERNE ZITATE'
    })
        .addIntegerOption((option) => option.setName('amount')
        .setNameLocalizations({
        de: 'anzahl'
    })
        .setDescription('THE AMOUNT')
        .setDescriptionLocalizations({
        de: 'DIE ANZAHL'
    })
        .setRequired(true)
        .addChoices({ name: '💰 [01] 1000€', value: 1 }, { name: '💰 [02] 2000€', value: 2 }, { name: '💰 [03] 3000€', value: 3 }, { name: '💰 [04] 4000€', value: 4 }, { name: '💰 [05] 5000€', value: 5 })),
    async execute(ctx) {
        if (!await ctx.bot.settings.get(ctx.interaction.guild.id, 'quotes')) {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» Quotes are disabled on this Server!')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Zitate sind auf diesem Server deaktiviert!')
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            }
            ctx.log(false, `[CMD] QUOTEREMOVE : DISABLED`);
            return ctx.interaction.reply({ embeds: [message], ephemeral: true });
        }
        const amount = ctx.getOption('amount');
        const cost = amount * 1000;
        const quotes = await ctx.bot.quotes.get(ctx.interaction.user.id);
        const money = await ctx.bot.money.get(ctx.interaction.user.id);
        if (quotes - amount < 0) {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» You dont have that many Quotes, you only have **' + quotes + '**!')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Du hast garnicht so viele Zitate, du hast nur **' + quotes + '**!')
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            }
            ctx.log(false, `[CMD] QUOTEREMOVE : ${amount} : NOTENOUGHQUOTES`);
            return ctx.interaction.reply({ embeds: [message], ephemeral: true });
        }
        if (money < cost) {
            const missing = cost - money;
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» You dont have enough Money for that, you are Missing **$' + missing + '**!')
                .setFooter({ text: '» ' + ctx.client.config.version + ' » QUOTES: ' + quotes });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Du hast nicht genug Geld dafür, dir fehlen **' + missing + '€**!')
                    .setFooter({ text: '» ' + ctx.client.config.version + ' » QUOTES: ' + quotes });
            }
            ctx.log(false, `[CMD] QUOTEREMOVE : ${amount} : NOTENOUGHMONEY`);
            return ctx.interaction.reply({ embeds: [message], ephemeral: true });
        }
        let word;
        if (amount === 1)
            word = 'Quote';
        else
            word = 'Quotes';
        if (ctx.metadata.language === 'de') {
            if (amount == 1)
                word = 'Zitat';
            else
                word = 'Zitate';
        }
        const newquotes = quotes - 1;
        let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
            .setTitle('<:QUOTES:1024406448127623228> » ZITATE ENTFERNEN')
            .setDescription('» You successfully removed **' + amount + '** ' + word + ' for **$' + cost + '**!')
            .setFooter({ text: '» ' + ctx.client.config.version + ' » QUOTES: ' + newquotes });
        if (ctx.metadata.language === 'de') {
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:QUOTES:1024406448127623228> » ZITATE ENTFERNEN')
                .setDescription('» Du hast erfolgreich **' + amount + '** ' + word + ' für **' + cost + '€** entfernt!')
                .setFooter({ text: '» ' + ctx.client.config.version + ' » QUOTES: ' + newquotes });
        }
        ctx.bot.money.rem(ctx.interaction.guild.id, ctx.interaction.user.id, cost);
        ctx.bot.quotes.rem(ctx.interaction.user.id, amount);
        ctx.log(false, `[CMD] QUOTEREMOVE : ${amount} : ${cost}€`);
        return ctx.interaction.reply({ embeds: [message] });
    }
};
//# sourceMappingURL=quoteremove.js.map