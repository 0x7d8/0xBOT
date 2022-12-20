"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const discord_js_2 = require("discord.js");
exports.default = {
data: new discord_js_2.SlashCommandBuilder()
.setName('poll')
.setDMPermission(false)
.setDescription('MAKE A POLL')
.setDescriptionLocalizations({
de: 'MACHE EINE UMFRAGE'
})
.addStringOption((option) => option.setName('text')
.setDescription('THE TEXT')
.setDescriptionLocalizations({
de: 'DER TEXT'
})
.setRequired(true)),
async execute(ctx) {
const question = ctx.getOption('text');
const row = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setEmoji('1044959793317691513')
.setLabel('0 [0%]')
.setCustomId('POLL-YES')
.setStyle(discord_js_1.ButtonStyle.Success), new discord_js_1.ButtonBuilder()
.setEmoji('1044959826914070568')
.setLabel('0 [0%]')
.setCustomId('POLL-NO')
.setStyle(discord_js_1.ButtonStyle.Danger));
let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:POLL:1024391847092703365> » POLL')
.setDescription(`» ${question}`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:POLL:1024391847092703365> » ABSTIMMUNG')
.setDescription(`» ${question}`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[CMD] POLL : ${question.toUpperCase()}`);
return ctx.interaction.reply({ embeds: [message], components: [row] });
}
};
//# sourceMappingURL=poll.js.map