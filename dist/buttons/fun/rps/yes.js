"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const discord_js_2 = require("discord.js");
exports.default = {
data: {
name: 'rps-yes'
},
async execute(ctx, bet) {
const cache = ctx.interaction.message.embeds;
const description = cache[0].description.toString().replace(/[^\d@!]/g, '').split('!')[0].substring(1).split("@");
const [sender, reciever] = description;
const balance = await ctx.bot.money.get(reciever);
const otherbalance = await ctx.bot.money.get(sender);
if (ctx.interaction.user.id !== reciever) {
let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription(`» <@${reciever}> has to decide this!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription(`» <@${reciever}> muss das entscheiden!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[BTN] RPS : YES : NOTALLOWED`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
if (ctx.bot.game.has('PLAYING-' + reciever)) {
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
ctx.log(false, `[BTN] RPS : ' + reciever + ' : ALREADYLOBBY`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
if (ctx.bot.game.has('PLAYING-' + sender)) {
let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription(`» <@${sender}> is already in a Lobby!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription(`» <@${sender}> ist schon in einer Lobby!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[BTN] RPS : ${sender} : ALREADYLOBBY`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
if (balance < bet) {
const missing = bet - balance;
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
ctx.log(false, `[BTN] RPS : ${reciever} : ${bet}€ : NOTENOUGHMONEY`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
if (otherbalance < bet) {
const missing = bet - otherbalance;
let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription(`» <@${sender}> doesnt have enough Money, he is Missing **\$${missing}**!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription(`» <@${sender}> hat nicht genug Geld, im fehlen **${missing}€**!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[BTN] RPS : ${reciever} : ${bet}€ : NOTENOUGHMONEY`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
ctx.bot.rps.delete('TIMEOUT-' + sender + '-' + ctx.interaction.message.id);
let row1 = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setLabel('🪨 ROCK')
.setCustomId('RPS-1-' + bet)
.setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
.setLabel('📝 PAPER')
.setCustomId('RPS-2-' + bet)
.setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
.setLabel('✂️ SCISSORS')
.setCustomId('RPS-3-' + bet)
.setStyle(discord_js_1.ButtonStyle.Secondary));
let row2 = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setEmoji('1024382939020152982')
.setLabel('CANCEL')
.setCustomId(`RPS-CANCEL-${bet}`)
.setStyle(discord_js_1.ButtonStyle.Danger));
if (ctx.metadata.language === 'de') {
row1 = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setLabel('✂️ SCHERE')
.setCustomId('RPS-3-' + bet)
.setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
.setLabel('🪨 STEIN')
.setCustomId('RPS-1-' + bet)
.setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
.setLabel('📝 PAPIER')
.setCustomId('RPS-2-' + bet)
.setStyle(discord_js_1.ButtonStyle.Secondary));
row2 = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setEmoji('1024382939020152982')
.setLabel('ABBRECHEN')
.setCustomId(`RPS-CANCEL-${bet}`)
.setStyle(discord_js_1.ButtonStyle.Danger));
}
ctx.bot.money.rem(ctx.interaction.guild.id, sender, bet);
ctx.bot.money.rem(ctx.interaction.guild.id, reciever, bet);
let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GAMEPAD:1024395990679167066> » ROCK PAPER SCISSORS')
.setDescription(`
» <@${sender}> is playing Rock Paper Scissors with <@${reciever}>!
The Bet is **\$${bet}**
`).setFooter({ text: '» ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GAMEPAD:1024395990679167066> » SCHERE STEIN PAPIER')
.setDescription(`
» <@${sender}> spielt mit <@${reciever}> Schere Stein Papier!
Die Wette ist **${bet}€**
`).setFooter({ text: '» ' + ctx.client.config.version });
}
ctx.log(false, `[BTN] RPS : ${sender} : ACCEPT`);
return ctx.interaction.update({ content: '', embeds: [message], components: [row1, row2] });
}
};
