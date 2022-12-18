"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    data: {
        name: 'stockupgrade-no'
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
            ctx.interaction.message.components[0].components[0].data.style = 2;
        }
        const type = 'buy';
        if (type === 'buy') {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:BOXCHECK:1024401101589590156> » BUY STOCK SLOTS')
                .setDescription('» <@' + ctx.interaction.user.id + '> said **NO** to **' + amount + 'x** ' + emoji + ' Slots.')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:BOXCHECK:1024401101589590156> » AKTIEN SLOTS KAUFEN')
                    .setDescription('» <@' + ctx.interaction.user.id + '> hat **NEIN** zu **' + amount + 'x** ' + emoji + ' Slots gesagt.')
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            }
            ctx.log(false, `[BTN] STOCKUPGRADE : ${amount}x : ${stock.toUpperCase()} : DENY`);
            return ctx.interaction.update({ embeds: [message], components: ctx.interaction.message.components });
        }
    }
};
//# sourceMappingURL=no.js.map