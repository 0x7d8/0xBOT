"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('stockbuy')
        .setDMPermission(false)
        .setDescription('BUY STOCKS')
        .setDescriptionLocalizations({
        de: 'KAUFE AKTIEN'
    })
        .addStringOption((option) => option.setName('stock')
        .setNameLocalizations({
        de: 'aktie'
    })
        .setDescription('THE STOCK')
        .setDescriptionLocalizations({
        de: 'DIE AKTIE'
    })
        .setRequired(true)
        .addChoices({ name: '🟢 GRÜNE AKTIE', value: 'green' }, { name: '🔵 BLAUE AKTIE', value: 'blue' }, { name: '🟡 GELBE AKTIE', value: 'yellow' }, { name: '🔴 ROTE AKTIE', value: 'red' }, { name: '⚪ WEISSE AKTIE', value: 'white' }, { name: '⚫ SCHWARZE AKTIE', value: 'black' }))
        .addIntegerOption((option) => option.setName('amount')
        .setNameLocalizations({
        de: 'anzahl'
    })
        .setDescription('THE AMOUNT')
        .setDescriptionLocalizations({
        de: 'DIE ANZAHL'
    })
        .setRequired(true)),
    async execute(ctx) {
        if (!await ctx.bot.settings.get(ctx.interaction.guild.id, 'stocks')) {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» Stocks are disabled on this Server!')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Aktien sind auf diesem Server deaktiviert!')
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            }
            ctx.log(false, `[CMD] STOCKBUY : DISABLED`);
            return ctx.interaction.reply({ embeds: [message], ephemeral: true });
        }
        const stock = ctx.getOption('stock');
        const amount = ctx.getOption('amount');
        const balance = await ctx.bot.money.get(ctx.interaction.user.id);
        if (amount < 0) {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» You cant buy a negative amount of Stocks!')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Du kannst keine negativen Anzahlen kaufen!')
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            }
            ctx.log(false, `[CMD] STOCKBUY : NEGATIVESTOCKS : ${amount}€`);
            return ctx.interaction.reply({ embeds: [message], ephemeral: true });
        }
        const used = await ctx.bot.stocks.get(ctx.interaction.user.id, stock, 'used');
        const max = await ctx.bot.stocks.get(ctx.interaction.user.id, stock, 'max');
        if (max < (used + amount)) {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» You cant buy more than **' + max + '** of this Stock!')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Du kannst nicht mehr als **' + max + '** von dieser Aktie kaufen!')
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            }
            ctx.log(false, `[CMD] STOCKBUY : MAX : ${stock.toUpperCase()} : ${amount}`);
            return ctx.interaction.reply({ embeds: [message], ephemeral: true });
        }
        const cost = amount * ctx.client.stocks[stock];
        if (balance < cost) {
            const missing = cost - balance;
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» You dont have enough Money for that, you are missing **$' + missing + '**!')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Du hast dafür nicht genug Geld, dir fehlen **' + missing + '€**!')
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            }
            ctx.log(false, `[CMD] STOCKBUY : ${stock.toUpperCase()} : ${amount} : ${cost}€ : NOTENOUGHMONEY`);
            return ctx.interaction.reply({ embeds: [message], ephemeral: true });
        }
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
        const transaction = await ctx.bot.transactions.log({
            success: true,
            sender: {
                id: ctx.interaction.user.id,
                amount: cost,
                type: 'negative'
            }, reciever: {
                id: `${amount}x ${stock.toUpperCase()} STOCK`,
                amount: cost,
                type: 'positive'
            }
        });
        ctx.bot.stocks.add(ctx.interaction.user.id, stock, 'used', amount);
        ctx.bot.money.rem(ctx.interaction.guild.id, ctx.interaction.user.id, cost);
        let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
            .setTitle('<:CHART:1024398298204876941> » BUY STOCKS')
            .setDescription('» You successfully bought **' + amount + '** ' + emoji + ' for **$' + cost + '**! (**$' + ctx.client.stocks[stock] + '** per Stock)\n\nID: ' + transaction.id)
            .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
        if (ctx.metadata.language === 'de') {
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:CHART:1024398298204876941> » AKTIEN KAUFEN')
                .setDescription('» Du hast erfolgreich **' + amount + '** ' + emoji + ' für **' + cost + '€** gekauft! (**' + ctx.client.stocks[stock] + '€** pro Aktie)\n\nID: ' + transaction.id)
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
        }
        ctx.log(false, `[CMD] STOCKBUY : ${stock.toUpperCase()} : ${amount} : ${cost}€`);
        return ctx.interaction.reply({ embeds: [message], ephemeral: true });
    }
};
//# sourceMappingURL=stockbuy.js.map