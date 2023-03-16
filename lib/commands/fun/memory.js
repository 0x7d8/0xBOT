"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const discord_js_2 = require("discord.js");
exports.default = {
data: new discord_js_2.SlashCommandBuilder()
.setName('memory')
.setDescription('PLAY MEMORY')
.setDescriptionLocalizations({
de: 'SPIELE MEMORY'
})
.setDMPermission(false)
.addUserOption((option) => option.setName('user')
.setNameLocalizations({
de: 'nutzer'
})
.setDescription('THE USER')
.setDescriptionLocalizations({
de: 'DER NUTZER'
})
.setRequired(true))
.addIntegerOption((option) => option.setName('bet')
.setNameLocalizations({
de: 'wette'
})
.setDescription('THE AMOUNT OF MONEY')
.setDescriptionLocalizations({
de: 'DIE ANZAHL VON GELD'
})
.setRequired(false)),
async execute(ctx) {
const user = ctx.interaction.options.getUser("user");
let bet = ctx.getOption('bet');
const money = await ctx.bot.money.get(ctx.interaction.user.id);
const othermoney = await ctx.bot.money.get(user.id);
if (user.bot) {
let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription(`» You cant play Memory with a Bot!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription(`» Du kannst Memory nicht mit einem Bot spielen!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[CMD] MEMORY : ${user.id} : BOT`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
if (ctx.bot.game.has('PLAYING-' + ctx.interaction.user.id)) {
let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription(`» You are already in a Lobby!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription(`» Du bist schon in einer Lobby!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[CMD] MEMORY : ${user.id} : ALREADYLOBBY`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
if (ctx.bot.game.has('PLAYING-' + user.id)) {
let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription(`» <@${user.id}> is already in a Lobby!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription(`» <@${user.id}> ist schon in einer Lobby!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[CMD] MEMORY : ${user.id} : ALREADYLOBBY`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
if (bet < 0 && bet !== null) {
let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription(`» You cant bet negative Money!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription(`» Du kannst kein negatives Geld wetten!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[CMD] MEMORY : ${user.id} : NEGATIVEMONEY : ${bet}€`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
if (ctx.interaction.user.id == user.id) {
let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription(`» You cant play Memory with yourself?`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription(`» Du kannst Memory nicht mit dir selber spielen?`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[CMD] MEMORY : ${user.id} : ${bet}€ : SAMEPERSON`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
if (money < bet && bet !== null) {
const missing = bet - money;
let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription(`» You dont have enough Money for that, you are missing **\$${missing}**!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription(`» Du hast nicht genug Geld dafür, dir fehlen **${missing}€**!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[CMD] MEMORY : ${user.id} : NOTENOUGHMONEY`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
if (othermoney < bet && bet !== null) {
const missing = bet - othermoney;
let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription(`» <@${user.id}> doesnt have enough Money for that, he is Missing **\$${missing}**!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription(`» <@${user.id}> hat dafür nicht genug Geld, im fehlen **${missing}€**!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[CMD] MEMORY : ${user.id} : NOTENOUGHMONEY`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
if (!bet)
bet = 0;
let row = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setLabel('YES')
.setCustomId('MEMORY-YES-' + bet)
.setEmoji('1024382942153285632')
.setStyle(discord_js_1.ButtonStyle.Success), new discord_js_1.ButtonBuilder()
.setLabel('NO')
.setCustomId('MEMORY-NO-' + bet)
.setEmoji('1024382939020152982')
.setStyle(discord_js_1.ButtonStyle.Danger));
if (ctx.metadata.language === 'de') {
row = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setLabel('JA')
.setCustomId('MEMORY-YES-' + bet)
.setEmoji('1024382942153285632')
.setStyle(discord_js_1.ButtonStyle.Success), new discord_js_1.ButtonBuilder()
.setLabel('NEIN')
.setCustomId('MEMORY-NO-' + bet)
.setEmoji('1024382939020152982')
.setStyle(discord_js_1.ButtonStyle.Danger));
}
let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GAMEPAD:1024395990679167066> » MEMORY')
.setDescription(`
» <@${ctx.interaction.user.id}> challenges you, <@${user.id}> to a battle of Memory! The Bet is **$${bet}**.
Do you accept?

» This Request expires <t:${Math.floor(+new Date() / 1000) + 29}:R>
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GAMEPAD:1024395990679167066> » MEMORY')
.setDescription(`
» <@${ctx.interaction.user.id}> fordert dich, <@${user.id}> zu einem Spiel von Memory heraus! Die Wette ist **${bet}€**.
Akzeptierst du?

» Diese Anfrage wird ungültig <t:${Math.floor(+new Date() / 1000) + 29}:R>
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[CMD] MEMORY : ${user.id} : ${bet}€`);
let msg = await ctx.interaction.reply({ content: '<@' + user.id + '>', embeds: [message], components: [row], fetchReply: true });
ctx.bot.memory.set('TIMEOUT-' + ctx.interaction.user.id + '-' + msg.id, true);
const expiration = async () => {
if (!ctx.bot.memory.has('TIMEOUT-' + ctx.interaction.user.id + '-' + msg.id))
return;
ctx.bot.memory.delete('TIMEOUT-' + ctx.interaction.user.id + '-' + msg.id);
{
msg.components[0].components[0].data.disabled = true;
msg.components[0].components[1].data.disabled = true;
msg.components[0].components[0].data.style = 2;
msg.components[0].components[1].data.style = 2;
}
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GAMEPAD:1024395990679167066> » MEMORY')
.setDescription(`» The Request expired.`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GAMEPAD:1024395990679167066> » MEMORY')
.setDescription(`» Die Anfrage ist abgelaufen.`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[CMD] MEMORY : ${user.id} : EXPIRED`);
ctx.interaction.editReply({ content: '', embeds: [message], components: msg.components }).catch(() => { });
};
setTimeout(() => expiration(), 27000);
}
};
//# sourceMappingURL=memory.js.map