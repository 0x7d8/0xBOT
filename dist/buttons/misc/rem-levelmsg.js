"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    data: {
        name: 'rem-levelmsg'
    },
    async execute(ctx) {
        const [mention] = ctx.interaction.message.mentions.parsedUsers.values();
        if (ctx.interaction.user.id !== mention.id) {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» <@' + mention.id + '> has to decide this!')
                .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            if (ctx.metadata.language === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» <@' + mention.id + '> muss das entscheiden!')
                    .setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
            }
            ctx.log(false, `[BTN] REM-LEVELMSG : NOTALLOWED`);
            return ctx.interaction.reply({ embeds: [message], ephemeral: true });
        }
        return ctx.interaction.message.delete();
    }
};
//# sourceMappingURL=rem-levelmsg.js.map