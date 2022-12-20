"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
data: new discord_js_1.SlashCommandBuilder()
.setName('mcsrvinfo')
.setDMPermission(false)
.setDescription('GET INFO ABOUT A MINECRAFT SERVER')
.setDescriptionLocalizations({
de: 'BEKOMME INFO ÜBER EINEN MINECRAFT SERVER'
})
.addStringOption((option) => option.setName('address')
.setNameLocalizations({
de: 'adresse'
})
.setDescription('THE ADDRESS')
.setDescriptionLocalizations({
de: 'DIE ADRESSE'
})
.setRequired(true)),
async execute(ctx) {
const axios = (await import('axios')).default;
await ctx.interaction.deferReply();
const address = ctx.getOption('address');
const req = await axios({
method: 'GET',
url: `https://api.mcsrvstat.us/2/${encodeURIComponent(address)}`,
validateStatus: false,
headers: {}
});
const info = req.data;
if (info.ip === '127.0.0.1') {
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CUBE:1024404832452350032> » MINECRAFT SERVER INFO')
.setDescription(`» The Server **${address}** was not found!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CUBE:1024404832452350032> » MINECRAFT SERVER INFO')
.setDescription(`» Der Server **${address}** wurde nicht gefunden!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[CMD] MCSRVINFO : ${address.toUpperCase()} : NOTEXIST`);
return ctx.interaction.editReply({ embeds: [message] });
}
let status = '🟡 UNKNOWN';
if ('online' in info && info.online)
status = '🟢 ONLINE';
if ('online' in info && !info.online)
status = '🔴 OFFLINE';
let players = { online: '?', slots: '?' };
if ('players' in info)
players = { online: info.players.online.toString(), slots: info.players.max.toString() };
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CUBE:1024404832452350032> » MINECRAFT SERVER INFO')
.setThumbnail(`https://api.mcsrvstat.us/icon/${encodeURIComponent(address)}`)
.setDescription(`${status}\n\n» IP\n\`${info.ip}:${info.port}\`\n\n» Players\n\`${players.online}/${players.slots}\``)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CUBE:1024404832452350032> » MINECRAFT SERVER INFO')
.setThumbnail(`https://api.mcsrvstat.us/icon/${encodeURIComponent(address)}`)
.setDescription(`${status}\n\n» IP\n\`${info.ip}:${info.port}\`\n\n» Spieler\n\`${players.online}/${players.slots}\``)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, '[CMD] MCSRVINFO : ' + address.toUpperCase());
return ctx.interaction.editReply({ embeds: [message] });
}
};
//# sourceMappingURL=mcsrvinfo.js.map