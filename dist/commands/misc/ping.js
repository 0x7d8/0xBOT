"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
data: new discord_js_1.SlashCommandBuilder()
.setName('ping')
.setDMPermission(false)
.setDescription('THE BOT PING')
.setDescriptionLocalizations({
de: 'DER BOT PING'
}),
async execute(ctx) {
const ping = ctx.client.ws.ping;
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GLOBE:1024403680503529583> » BOT PING')
.setDescription(`» The Bot Ping is **${ping}ms**!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GLOBE:1024403680503529583> » BOT PING')
.setDescription(`» Der Ping vom Bot ist **${ping}ms**!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[CMD] PING : ${ping}ms`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
};
//# sourceMappingURL=ping.js.map