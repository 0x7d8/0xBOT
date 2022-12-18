"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    data: {
        name: 'ttt-no'
    },
    async execute(ctx) {
        const cache = ctx.interaction.message.embeds;
        const description = cache[0].description.toString().replace(/[^\d@!]/g, '').split('!')[0].substring(1).split("@");
        const [sender, reciever] = description;
        if (ctx.interaction.user.id !== reciever && ctx.interaction.user.id !== sender) {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» <@' + reciever + '> or <@' + sender + '> has to decide this!')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» <@' + reciever + '> oder <@' + sender + '> muss das entscheiden!')
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            }
            ctx.log(false, `[BTN] TICTACTOE : NO : NOTALLOWED`);
            return ctx.interaction.reply({ embeds: [message], ephemeral: true });
        }
        ctx.bot.ttt.delete('TIMEOUT-' + sender + '-' + ctx.interaction.message.id);
        {
            ctx.interaction.message.components[0].components[0].data.disabled = true;
            ctx.interaction.message.components[0].components[1].data.disabled = true;
            ctx.interaction.message.components[0].components[0].data.style = 2;
        }
        let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
            .setTitle('<:GAMEPAD:1024395990679167066> » TICTACTOE')
            .setDescription('» <@' + ctx.interaction.user.id + '> said **NO**.')
            .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
        if (ctx.metadata.language === 'de') {
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:GAMEPAD:1024395990679167066> » TICTACTOE')
                .setDescription('» <@' + ctx.interaction.user.id + '> hat **NEIN** gesagt.')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
        }
        ctx.log(false, `[BTN] TICTACTOE : ${sender} : DENY`);
        return ctx.interaction.update({ content: '', embeds: [message], components: ctx.interaction.message.components });
    }
};
//# sourceMappingURL=no.js.map