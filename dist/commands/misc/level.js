"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const discord_js_2 = require("discord.js");
exports.default = {
data: new discord_js_1.SlashCommandBuilder()
.setName('level')
.setDMPermission(false)
.setDescription('VIEW THE LEVELS')
.setDescriptionLocalizations({
de: 'SEHE DIE LEVEL'
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
const canvas = (await import('canvacord')).default;
if (!await ctx.bot.settings.get(ctx.interaction.guild.id, 'levels')) {
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription(`» The Level System is disabled on this Server!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription(`» Das Level System ist auf diesem Server deaktiviert!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[CMD] LEVEL : DISABLED`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
const user = ctx.interaction.options.getUser('user');
let userobj;
if (!user)
userobj = ctx.interaction.user;
else
userobj = user;
await ctx.interaction.deferReply();
const counts = [];
if (!user) {
counts.push(await ctx.bot.stat.get('u-' + ctx.interaction.user.id + '-' + ctx.interaction.guild.id + '-C', 'msg'));
counts.push(await ctx.bot.stat.get('u-' + ctx.interaction.user.id + '-' + ctx.interaction.guild.id + '-A', 'msg'));
ctx.log(false, `[CMD] LEVEL : ${counts[0]}`);
}
else {
counts.push(await ctx.bot.stat.get('u-' + user.id + '-' + ctx.interaction.guild.id + '-C', 'msg'));
counts.push(await ctx.bot.stat.get('u-' + user.id + '-' + ctx.interaction.guild.id + '-A', 'msg'));
ctx.log(false, `[CMD] LEVEL : ${user.id} : ${counts[0]}`);
}
const XP = Math.round(counts[0] / 5);
let level = 0, levelXP = XP;
while (levelXP >= 500) {
level++;
levelXP -= 500;
}
let totalxp = 'TOTAL XP';
if (ctx.metadata.language === 'de')
totalxp = 'ALLE XP';
const rankCard = new canvas.Rank()
.setAvatar(userobj.displayAvatarURL({ format: 'png' }))
.setCurrentXP(levelXP)
.setRequiredXP(500)
.setProgressBar('#90CDF4', 'COLOR')
.setUsername(userobj.username)
.setDiscriminator(userobj.discriminator)
.setOverlay('#00000000')
.setBackground('COLOR', '#00000000')
.setProgressBarTrack('#413E4D')
.setLevel(level, 'LEVEL ', true)
.setRank(XP, totalxp, true);
let attachment;
const buildCard = async () => {
await rankCard.build()
.then((data) => {
attachment = new discord_js_2.AttachmentBuilder(data, { name: 'rank.png', description: 'Rank Card Image' });
});
return;
};
await buildCard();
let message;
if (!user) {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GLOBE:1024403680503529583> » YOUR LEVEL')
.setImage('attachment://rank.png')
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GLOBE:1024403680503529583> » DEIN LEVEL')
.setImage('attachment://rank.png')
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
}
else {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GLOBE:1024403680503529583> » THE LEVEL OF ' + user.username.toUpperCase())
.setImage('attachment://rank.png')
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GLOBE:1024403680503529583> » DAS LEVEL VON ' + user.username.toUpperCase())
.setImage('attachment://rank.png')
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
}
return ctx.interaction.editReply({ embeds: [message], files: [attachment] });
}
};
//# sourceMappingURL=level.js.map