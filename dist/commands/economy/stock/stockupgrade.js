"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const discord_js_2 = require("discord.js");
exports.default = {
    data: new discord_js_2.SlashCommandBuilder()
        .setName('stockupgrade')
        .setDMPermission(false)
        .setDescription('BUY STOCK SLOTS')
        .setDescriptionLocalizations({
        de: 'KAUFE AKTIEN SLOTS'
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
        .setDescription('THE SLOTS')
        .setDescriptionLocalizations({
        de: 'DIE SLOTS'
    })
        .setRequired(true)),
    async execute(ctx) {
        if (!await ctx.bot.settings.get(ctx.interaction.guild.id, 'stocks')) {
            let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» Stocks are disabled on this Server!')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Aktien sind auf diesem Server deaktiviert!')
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            }
            ctx.log(false, `[CMD] STOCKUPGRADE : DISABLED`);
            return ctx.interaction.reply({ embeds: [message], ephemeral: true });
        }
        const stock = ctx.getOption('stock');
        const amount = ctx.getOption('amount');
        const balance = await ctx.bot.money.get(ctx.interaction.user.id);
        let baseCost;
        if (stock === 'green')
            baseCost = 15000;
        if (stock === 'blue')
            baseCost = 20000;
        if (stock === 'yellow')
            baseCost = 25000;
        if (stock === 'red')
            baseCost = 30000;
        if (stock === 'white')
            baseCost = 35000;
        if (stock === 'black')
            baseCost = 40000;
        const cost = amount * baseCost;
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
        if (balance < cost) {
            const missing = cost - balance;
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
            ctx.log(false, `[CMD] STOCKUPGRADE : ${stock.toUpperCase()} : ${amount}x : ${cost}€ : NOTENOUGHMONEY`);
            return ctx.interaction.reply({ embeds: [message], ephemeral: true });
        }
        let row = new discord_js_1.ActionRowBuilder()
            .addComponents(new discord_js_1.ButtonBuilder()
            .setLabel('YES')
            .setCustomId('STOCKUPGRADE-BUY-YES-' + stock + '-' + ctx.interaction.user.id + '-' + amount)
            .setEmoji('1024382935618572299')
            .setStyle(discord_js_1.ButtonStyle.Success)
            .setDisabled(false), new discord_js_1.ButtonBuilder()
            .setLabel('NO')
            .setCustomId('STOCKUPGRADE-BUY-NO-' + stock + '-' + ctx.interaction.user.id + '-' + amount)
            .setEmoji('1024382939020152982')
            .setStyle(discord_js_1.ButtonStyle.Danger)
            .setDisabled(false));
        if (ctx.metadata.language === 'de') {
            row = new discord_js_1.ActionRowBuilder()
                .addComponents(new discord_js_1.ButtonBuilder()
                .setLabel('JA')
                .setCustomId('STOCKUPGRADE-BUY-YES-' + stock + '-' + ctx.interaction.user.id + '-' + amount)
                .setEmoji('1024382935618572299')
                .setStyle(discord_js_1.ButtonStyle.Success)
                .setDisabled(false), new discord_js_1.ButtonBuilder()
                .setLabel('NEIN')
                .setCustomId('STOCKUPGRADE-BUY-NO-' + stock + '-' + ctx.interaction.user.id + '-' + amount)
                .setEmoji('1024382939020152982')
                .setStyle(discord_js_1.ButtonStyle.Danger)
                .setDisabled(false));
        }
        let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
            .setTitle('<:BOXCHECK:1024401101589590156> » BUY STOCK SLOTS')
            .setDescription('» Do you want to buy **' + amount + 'x** ' + emoji + ' for **$' + cost + '**?')
            .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
        if (ctx.metadata.language === 'de') {
            message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:BOXCHECK:1024401101589590156> » AKTIEN SLOTS KAUFEN')
                .setDescription('» Willst du **' + amount + 'x** ' + emoji + ' für **' + cost + '€** kaufen?')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
        }
        ctx.log(false, `[CMD] STOCKUPGRADE : ${amount}x : ${stock.toUpperCase()} : ${cost}€`);
        return ctx.interaction.reply({ embeds: [message], components: [row] });
    }
};
//# sourceMappingURL=stockupgrade.js.map