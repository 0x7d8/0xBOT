"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
data: new discord_js_1.SlashCommandBuilder()
.setName('mcver')
.setDMPermission(false)
.setDescription('GENERATE A MINECRAFT VERSION')
.setDescriptionLocalizations({
de: 'GENERIERE EINE MINECRAFT VERSION'
}),
async execute(ctx) {
const result = ctx.bot.random(1, 20);
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CUBE:1024404832452350032> » RANDOM MINECRAFT VERSION')
.setDescription(`» I would choose **1.${result}**!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CUBE:1024404832452350032> » ZUFÄLLIGE MINECRAFT VERSION')
.setDescription(`» Ich würde **1.${result}** nehmen!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[CMD] MCVER : 1.${result}`);
return ctx.interaction.reply({ embeds: [message] });
}
};
//# sourceMappingURL=mcver.js.map