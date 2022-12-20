"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
data: new discord_js_1.SlashCommandBuilder()
.setName('votes')
.setDMPermission(false)
.setDescription('SEE THE VOTES')
.setDescriptionLocalizations({
de: 'SEHE DIE VOTES'
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
const user = ctx.interaction.options.getUser("user");
let votes;
if (!user) {
votes = await ctx.bot.votes.get(ctx.interaction.user.id + '-A');
ctx.log(false, `[CMD] VOTES : ${votes}`);
}
else {
votes = await ctx.bot.votes.get(user.id + '-A');
ctx.log(false, `[CMD] VOTES : ${user.id} : ${votes}`);
}
let word;
if (votes === 1)
word = 'Vote';
else
word = 'Votes';
let message;
if (!user) {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GLOBE:1024403680503529583> » YOUR VOTES')
.setDescription('» You have **' + votes + '** ' + word + '!')
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GLOBE:1024403680503529583> » DEINE VOTES')
.setDescription('» Du hast **' + votes + '** ' + word + '!')
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
}
else {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GLOBE:1024403680503529583> » THE VOTES OF ' + user.username.toUpperCase())
.setDescription('» <@' + user.id + '> has **' + votes + '** ' + word + '!')
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GLOBE:1024403680503529583> » DIE VOTES VON ' + user.username.toUpperCase())
.setDescription('» <@' + user.id + '> hat **' + votes + '** ' + word + '!')
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
}
return ctx.interaction.reply({ embeds: [message] });
}
};
//# sourceMappingURL=votes.js.map