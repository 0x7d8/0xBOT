"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
data: new discord_js_1.SlashCommandBuilder()
.setName('catrobatinfo')
.setDMPermission(false)
.setDescription('GET INFO ABOUT A CATROBAT PROJECT')
.setDescriptionLocalizations({
de: 'BEKOMME INFO ÜBER EIN CATROBAT PROJEKT'
})
.addStringOption((option) => option.setName('id')
.setDescription('THE ID')
.setDescriptionLocalizations({
de: 'DIE ID'
})
.setRequired(true)),
async execute(ctx) {
const axios = (await import('axios')).default;
await ctx.interaction.deferReply();
const id = ctx.getOption('id');
const req = await axios({
method: 'GET',
url: `https://share.catrob.at/api/project/${id}`,
validateStatus: false,
headers: {}
});
const info = req.data;
if (req.status !== 200 && req.status !== 404) {
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CUBE:1024404832452350032> » CATROBAT PROJECT INFO')
.setDescription(`» Couldnt reach the Catrobat Servers! (Status ${req.status})`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CUBE:1024404832452350032> » CATROBAT PROJEKT INFO')
.setDescription(`» Konnte die Catrobat Server nicht erreichen! (Status ${req.status})`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[CMD] CATROBATINFO : ${id.toUpperCase()} : SERVERSDOWN`);
return ctx.interaction.editReply({ embeds: [message] });
}
if (req.status === 404) {
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CUBE:1024404832452350032> » CATROBAT PROJECT INFO')
.setDescription(`» The Project **${id}** was not found!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CUBE:1024404832452350032> » CATROBAT PROJEKT INFO')
.setDescription(`» Das Projekt **${id}** wurde nicht gefunden!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[CMD] CATROBATINFO : ${id.toUpperCase()} : NOTEXIST`);
return ctx.interaction.editReply({ embeds: [message] });
}
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CUBE:1024404832452350032> » CATROBAT PROJECT INFO')
.setThumbnail(info.screenshot_small)
.setDescription(`
[${info.name}](https://share.catrob.at/project/${id})

» Description
\`\`\`${info.description.replace('```', '``')}\`\`\`
» Size
\`\`\`${Number(info.filesize).toFixed(2)}MB\`\`\`
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CUBE:1024404832452350032> » CATOBAT PROJEKT INFO')
.setThumbnail(info.screenshot_small)
.setDescription(`
[${info.name}](https://share.catrob.at/project/${id})

» Beschreibung
\`\`\`${info.description.replace('```', '``')}\`\`\`
» Größe
\`\`\`${Number(info.filesize).toFixed(2)}MB\`\`\`
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[CMD] CATROBATINFO : ${id.toUpperCase()}`);
return ctx.interaction.editReply({ embeds: [message] });
}
};
//# sourceMappingURL=catrobatinfo.js.map