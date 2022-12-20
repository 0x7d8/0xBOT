"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
data: new discord_js_1.SlashCommandBuilder()
.setName('donate')
.setDMPermission(false)
.setDescription('DONATE THE BOT')
.setDescriptionLocalizations({
de: 'SPENDE DEM BOT'
}),
async execute(ctx) {
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:DONATE:1024397357988720711> » DONATE')
.setDescription('**»» DONATE**\n» LINK\nhttps://donate.rjansen.de\n» QR CODE')
.setImage("https://img.rjansen.de/bot/donate.png")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:DONATE:1024397357988720711> » SPENDEN')
.setDescription('**»» SPENDEN**\n» LINK\nhttps://donate.rjansen.de\n» QR CODE')
.setImage("https://img.rjansen.de/bot/donate.png")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[CMD] DONATE <3`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
};
//# sourceMappingURL=donate.js.map