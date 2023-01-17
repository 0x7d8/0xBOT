"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
data: {
name: 'cursedimage'
},
async execute(ctx, type) {
const axios = (await import('axios')).default;
if (!await ctx.bot.settings.get(ctx.interaction.guild.id, 'cursedimage')) {
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription(`» The **\`/cursedimage\`** Command is disabled on this Server!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription(`» Der **\`/cursedimage\`** Befehl ist auf diesem Server deaktiviert!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[BTN] CURSEDIMAGE : DISABLED`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
await ctx.interaction.deferUpdate();
const req = await axios.get(`https://www.reddit.com/r/cursedimages/random/.json`);
const res = req.data;
let upvotes = res[0].data.children[0].data.ups;
if (upvotes === 187)
upvotes += ' 🐊';
ctx.components.rows[0].components[1].setLabel(String(upvotes));
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:IMAGE:1024405297579696179> » CURSED IMAGE')
.setDescription(`
» Title
\`\`\`${res[0].data.children[0].data.title}\`\`\`
`).setImage(res[0].data.children[0].data.url)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:IMAGE:1024405297579696179> » VERSTÖRENDES BILD')
.setDescription(`
» Titel
\`\`\`${res[0].data.children[0].data.title}\`\`\`
`).setImage(res[0].data.children[0].data.url)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[BTN] CURSEDIMAGE : ${upvotes}^`);
return ctx.interaction.editReply({ embeds: [message], components: (ctx.components.getAPI()) });
}
};
//# sourceMappingURL=cursedimage.js.map