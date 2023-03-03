"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const discord_js_2 = require("discord.js");
const axios_1 = __importDefault(require("axios"));
exports.default = {
data: new discord_js_2.SlashCommandBuilder()
.setName('cursedimage')
.setDMPermission(false)
.setDescription('GET A CURSED IMAGE')
.setDescriptionLocalizations({
de: 'BEKOMME EIN VERSTÖRENDES BILD'
}),
async execute(ctx) {
if (!await ctx.bot.settings.get(ctx.interaction.guild.id, 'cursedimage')) {
let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription(`» The **\`/cursedimage\`** Command is disabled on this Server!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription(`» Der **\`/cursedimage\`** Befehl ist auf diesem Server deaktiviert!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[CMD] CURSEDIMAGE : DISABLED`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
await ctx.interaction.deferReply();
const req = await axios_1.default.get(`https://www.reddit.com/r/cursedimages/random/.json`);
const res = req.data;
let upvotes = res[0].data.children[0].data.ups;
if (upvotes === 187)
upvotes += ' 🐊';
let row = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setLabel('NEW')
.setEmoji('1055826473442873385')
.setCustomId('cursedimage')
.setStyle(discord_js_1.ButtonStyle.Primary), new discord_js_1.ButtonBuilder()
.setEmoji('1044959793317691513')
.setLabel(String(upvotes))
.setCustomId('BIN-1')
.setStyle(discord_js_1.ButtonStyle.Secondary)
.setDisabled(true));
if (ctx.metadata.language === 'de') {
row = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setLabel('NEU')
.setEmoji('1055826473442873385')
.setCustomId('cursedimage')
.setStyle(discord_js_1.ButtonStyle.Primary), new discord_js_1.ButtonBuilder()
.setEmoji('1044959793317691513')
.setLabel(String(upvotes))
.setCustomId('BIN-1')
.setStyle(discord_js_1.ButtonStyle.Secondary)
.setDisabled(true));
}
let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:IMAGE:1024405297579696179> » CURSED IMAGE')
.setDescription(`
» Title
\`\`\`${res[0].data.children[0].data.title}\`\`\`
`).setImage(res[0].data.children[0].data.url)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:IMAGE:1024405297579696179> » VERSTÖRENDES BILD')
.setDescription(`
» Titel
\`\`\`${res[0].data.children[0].data.title}\`\`\`
`).setImage(res[0].data.children[0].data.url)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[CMD] CURSEDIMAGE : ${upvotes}^`);
return ctx.interaction.editReply({ embeds: [message], components: [row] });
}
};
//# sourceMappingURL=cursedimage.js.map