"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const discord_js_2 = require("discord.js");
exports.default = {
data: new discord_js_2.SlashCommandBuilder()
.setName('showerthought')
.setDMPermission(false)
.setDescription('GET A SHOWERTHOUGHT')
.setDescriptionLocalizations({
de: 'BEKOMME EINE DUSCH-PHILOSOPHIE'
}),
async execute(ctx) {
const axios = (await import('axios')).default;
if (!await ctx.bot.settings.get(ctx.interaction.guild.id, 'showerthought')) {
let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription(`» The **\`/showerthought\`** Command is disabled on this Server!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription(`» Der **\`/showerthought\`** Befehl ist auf diesem Server deaktiviert!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[CMD] SHOWERTHOUGHT : DISABLED`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
await ctx.interaction.deferReply();
const req = await axios.get(`https://www.reddit.com/r/Showerthoughts/random/.json`);
const res = req.data;
let upvotes = res[0].data.children[0].data.ups;
if (upvotes === 187)
upvotes += ' 🐊';
let row = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setLabel('NEW')
.setEmoji('1055826473442873385')
.setCustomId('showerthought')
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
.setCustomId('showerthought')
.setStyle(discord_js_1.ButtonStyle.Primary), new discord_js_1.ButtonBuilder()
.setEmoji('1044959793317691513')
.setLabel(String(upvotes))
.setCustomId('BIN-1')
.setStyle(discord_js_1.ButtonStyle.Secondary)
.setDisabled(true));
}
let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:IMAGE:1024405297579696179> » SHOWERTHOUGHT')
.setDescription(`
» Thought
\`\`\`${res[0].data.children[0].data.title}\`\`\`
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
const germanThought = (await axios({
method: 'POST',
url: 'https://api-free.deepl.com/v2/translate',
headers: {
"Authentication": `DeepL-Auth-Key ${ctx.client.config.keys.deepl}`,
"User-Agent": `0xBOT/${ctx.client.config.version}`,
"Content-Type": 'application/x-www-form-urlencoded'
}, data: `auth_key=${ctx.client.config.keys.deepl}&text=${encodeURIComponent(res[0].data.children[0].data.title)}&target_lang=DE`
})).data;
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:IMAGE:1024405297579696179> » DUSCH-PHILOSOPHIE')
.setDescription(`
» Gedanke
\`\`\`${germanThought.translations[0].text}\`\`\`
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[CMD] SHOWERTHOUGHT : ${upvotes}^`);
return ctx.interaction.editReply({ embeds: [message], components: [row] });
}
};
//# sourceMappingURL=showerthought.js.map