"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
data: new discord_js_1.SlashCommandBuilder()
.setName('version')
.setDMPermission(false)
.setDescription('THE BOT VERSION')
.setDescriptionLocalizations({
de: 'DIE BOT VERSION'
}),
async execute(ctx) {
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GEAR:1024404241701417011> » BOT VERSION')
.setDescription(`
» Bot Version
\`\`\`${ctx.client.config.version} (V3)\`\`\`
» Framework
\`\`\`discord.js v14 (14.7.1)\`\`\`
» Author
\`\`\`0x4096#7678\`\`\`
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GEAR:1024404241701417011> » BOT VERSION')
.setDescription(`
» Bot Version
\`\`\`${ctx.client.config.version} (V3)\`\`\`
» Framework
\`\`\`discord.js v14 (14.7.1)\`\`\`
» Autor
\`\`\`0x4096#7678\`\`\`
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[CMD] VERSION`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
};
//# sourceMappingURL=version.js.map