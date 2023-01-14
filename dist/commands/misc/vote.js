"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const discord_js_2 = require("discord.js");
exports.default = {
data: new discord_js_2.SlashCommandBuilder()
.setName('vote')
.setDMPermission(false)
.setDescription('VOTE FOR THE BOT')
.setDescriptionLocalizations({
de: 'VOTE FÜR DEN BOT'
}),
async execute(ctx) {
const row = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setLabel('TOP.GG')
.setURL('https://top.gg/bot/1001944224545128588/vote')
.setStyle(discord_js_1.ButtonStyle.Link), new discord_js_1.ButtonBuilder()
.setLabel('DBL.COM')
.setURL('https://discordbotlist.com/bots/0xbot/upvote')
.setStyle(discord_js_1.ButtonStyle.Link));
let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GLOBE:1024403680503529583> » VOTE')
.setDescription(`» Click below to go to Vote for the Bot!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GLOBE:1024403680503529583> » VOTEN')
.setDescription(`» Klicke unten um für den Bot zu Voten!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[CMD] VOTE`);
return ctx.interaction.reply({ embeds: [message], components: [row], ephemeral: true });
}
};
