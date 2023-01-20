"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const axios_1 = __importDefault(require("axios"));
exports.default = {
data: {
name: 'showerthought'
},
async execute(ctx, type) {
if (!await ctx.bot.settings.get(ctx.interaction.guild.id, 'showerthought')) {
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription(`» The **\`/showerthought\`** Command is disabled on this Server!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription(`» Der **\`/showerthought\`** Befehl ist auf diesem Server deaktiviert!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[BTN] SHOWERTHOUGHT : DISABLED`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
await ctx.interaction.deferUpdate();
const req = await axios_1.default.get(`https://www.reddit.com/r/Showerthoughts/random/.json`);
const res = req.data;
let upvotes = res[0].data.children[0].data.ups;
if (upvotes === 187)
upvotes += ' 🐊';
ctx.components.rows[0].components[1].setLabel(String(upvotes));
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:IMAGE:1024405297579696179> » SHOWERTHOUGHT')
.setDescription(`
» Thought
\`\`\`${res[0].data.children[0].data.title}\`\`\`
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
const germanThought = (await (0, axios_1.default)({
method: 'POST',
url: 'https://api-free.deepl.com/v2/translate',
headers: {
"Authentication": `DeepL-Auth-Key ${ctx.client.config.keys.deepl}`,
"User-Agent": `0xBOT/${ctx.client.config.version}`,
"Content-Type": 'application/x-www-form-urlencoded'
}, data: `auth_key=${ctx.client.config.keys.deepl}&text=${encodeURIComponent(res[0].data.children[0].data.title)}&target_lang=DE`
})).data;
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:IMAGE:1024405297579696179> » DUSCH-PHILOSOPHIE')
.setDescription(`
» Gedanke
\`\`\`${germanThought.translations[0].text}\`\`\`
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[BTN] SHOWERTHOUGHT : ${upvotes}^`);
return ctx.interaction.editReply({ embeds: [message], components: (ctx.components.getAPI()) });
}
};
//# sourceMappingURL=showerthought.js.map