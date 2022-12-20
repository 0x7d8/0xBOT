"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
data: new discord_js_1.SlashCommandBuilder()
.setName('quotes')
.setDMPermission(false)
.setDescription('SEE THE QUOTES')
.setDescriptionLocalizations({
de: 'SEHE DIE ZITATE'
})
.addUserOption((option) => option.setName('user')
.setNameLocalizations({
de: 'nutzer'
})
.setDescription('THE USER')
.setDescriptionLocalizations({
de: 'DER NUTZER'
})
.setRequired(false)),
async execute(ctx) {
if (!await ctx.bot.settings.get(ctx.interaction.guild.id, 'quotes')) {
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription('» Quotes are disabled on this Server!')
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription('» Zitate sind auf diesem Server deaktiviert!')
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[CMD] QUOTES : DISABLED`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
const user = ctx.interaction.options.getUser("user");
let quotes;
if (user == null) {
quotes = await ctx.bot.quotes.get(ctx.interaction.user.id);
ctx.log(false, `[CMD] QUOTES : ${quotes}`);
}
else {
quotes = await ctx.bot.quotes.get(user.id);
ctx.log(false, `[CMD] QUOTES : ${user} : ${quotes}`);
}
let word;
if (quotes === 1)
word = 'Quote';
else
word = 'Quotes';
if (ctx.metadata.language === 'de') {
if (quotes === 1)
word = 'Zitat';
else
word = 'Zitate';
}
let message;
if (!user) {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:QUOTES:1024406448127623228> » YOUR QUOTES')
.setDescription('» You have **' + quotes + '** ' + word + '!')
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:QUOTES:1024406448127623228> » DEINE ZITATE')
.setDescription('» Du hast **' + quotes + '** ' + word + '!')
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
}
else {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:QUOTES:1024406448127623228> » THE QUOTES OF ' + user.username.toUpperCase())
.setDescription('» <@' + user + '> has **' + quotes + '** ' + word + '!')
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:QUOTES:1024406448127623228> » DIE ZITATE VON ' + user.username.toUpperCase())
.setDescription('» <@' + user + '> hat **' + quotes + '** ' + word + '!')
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
}
return ctx.interaction.reply({ embeds: [message] });
}
};
//# sourceMappingURL=quotes.js.map