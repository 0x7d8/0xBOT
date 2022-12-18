"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    data: {
        name: 'stockupgrade-yes'
    },
    async execute(ctx, stock, userid, amount) {
        if (ctx.interaction.user.id !== userid) {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» This choice is up to <@' + userid + '>!')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Diese Frage ist für <@' + userid + '>!')
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            }
            ctx.log(false, `[BTN] STOCKUPGRADE : NOTSENDER`);
            return ctx.interaction.reply({ embeds: [message], ephemeral: true });
        }
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
        const type = 'buy';
        if (type === 'buy') {
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
                ctx.log(false, `[BTN] STOCKUPGRADE : ${stock.toUpperCase()} : NOTENOUGHMONEY : ${cost}€`);
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
            {
                ctx.interaction.message.components[0].components[0].data.disabled = true;
                ctx.interaction.message.components[0].components[1].data.disabled = true;
                ctx.interaction.message.components[0].components[1].data.style = 2;
            }
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:BOXCHECK:1024401101589590156> » BUY STOCK SLOTS')
                .setDescription('» You successfully bought **' + amount + 'x** ' + emoji + ' Slots for **$' + cost + '**!')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            if (ctx.metadata.language == 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:BOXCHECK:1024401101589590156> » AKTIEN SLOTS KAUFEN')
                    .setDescription('» Du hast erfolgreich **' + amount + 'x** ' + emoji + ' Slots für **' + cost + '€** gekauft!')
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            }
            ctx.bot.money.rem(ctx.interaction.guild.id, ctx.interaction.user.id, cost);
            ctx.bot.stocks.add(ctx.interaction.user.id, stock, 'max', amount);
            ctx.log(false, `[BTN] STOCKUPGRADE : ${amount}x : ${stock.toUpperCase()} : CONFIRM`);
            return ctx.interaction.update({ embeds: [message], components: ctx.interaction.message.components });
        }
    }
};
//# sourceMappingURL=yes.js.map