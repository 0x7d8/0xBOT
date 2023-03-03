"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const promises_1 = require("timers/promises");
const rowGet = (button) => {
let row, btn;
if (button < 10) {
row = 2;
btn = button - 6;
}
if (button < 7) {
row = 1;
btn = button - 3;
}
if (button < 4) {
row = 0;
btn = button;
}
const output = [];
if (btn > 0)
output[0] = (btn - 1);
else
output[0] = btn;
output[1] = row;
return output;
};
exports.default = {
data: {
name: 'ttt-choice'
},
async execute(ctx, bet, sel) {
const cache = ctx.interaction.message.embeds;
const description = cache[0].description.toString().replace(/[^\d@!]/g, '').split('!')[0].substring(1).split("@");
const [sender, reciever] = description;
if (sender !== ctx.interaction.user.id && reciever !== ctx.interaction.user.id) {
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription(`» You arent playing!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription(`» Du spielst garnicht mit!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[BTN] TICTACTOE : NOTPLAYING`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
const turn = ctx.bot.ttt.get('TURN-' + sender);
if (ctx.interaction.user.id !== turn) {
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription(`» Its not your turn!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription(`» Es ist nicht dein Zug!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[BTN] TICTACTOE : NOTTURN`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
await ctx.interaction.deferUpdate();
let turnemoji;
if (turn === sender)
turnemoji = '🔵';
if (turn === reciever)
turnemoji = '🔴';
if (turn === sender) {
ctx.bot.ttt.set('TURN-' + sender, reciever);
turnemoji = '🔴';
}
;
if (turn === reciever) {
ctx.bot.ttt.set('TURN-' + sender, sender);
turnemoji = '🔵';
}
const comp = rowGet(sel);
if (ctx.interaction.user.id === sender) {
ctx.bot.ttt.set('FIELD-' + sel + '-' + sender, sender);
ctx.bot.ttt.get('FIELDS-' + sender).push(sel);
ctx.components.rows[comp[1]].components[comp[0]].setDisabled(true);
ctx.components.rows[comp[1]].components[comp[0]].setEmoji('1020411088245903451');
ctx.components.rows[comp[1]].components[comp[0]].setStyle(1);
}
;
if (ctx.interaction.user.id === reciever) {
ctx.bot.ttt.set('FIELD-' + sel + '-' + sender, reciever);
ctx.bot.ttt.get('FIELDS-' + reciever).push(sel);
ctx.components.rows[comp[1]].components[comp[0]].setDisabled(true);
ctx.components.rows[comp[1]].components[comp[0]].setEmoji('1020411023414542447');
ctx.components.rows[comp[1]].components[comp[0]].setStyle(4);
}
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GAMEPAD:1024395990679167066> » TICTACTOE')
.setDescription(`
» <@${sender}> is playing Tic Tac Toe with <@${reciever}>!
The Bet is **\$${bet}**

🔵 » <@${sender}>\n🔴 » <@${reciever}>
`).setFooter({ text: '» ' + ctx.client.config.version + ' » CURRENT TURN: ' + turnemoji });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GAMEPAD:1024395990679167066> » TICTACTOE')
.setDescription(`
» <@${sender}> spielt mit <@${reciever}> Tic Tac Toe!
Die Wette ist **${bet}€**

🔵 » <@${sender}>\n🔴 » <@${reciever}>
`).setFooter({ text: '» ' + ctx.client.config.version + ' » AM ZUG: ' + turnemoji });
}
ctx.log(false, `[BTN] TICTACTOE : ${sel}`);
ctx.interaction.editReply({ embeds: [message], components: (ctx.components.getAPI()), ephemeral: true });
await (0, promises_1.setTimeout)(500);
const fields = [];
let won = false;
if (ctx.bot.ttt.get('FIELD-1-' + sender) === ctx.bot.ttt.get('FIELD-2-' + sender) &&
ctx.bot.ttt.get('FIELD-1-' + sender) === ctx.bot.ttt.get('FIELD-3-' + sender) &&
ctx.bot.ttt.get('FIELD-1-' + sender) !== null &&
ctx.bot.ttt.get('FIELD-2-' + sender) !== null &&
ctx.bot.ttt.get('FIELD-3-' + sender) !== null) {
won = true;
fields.push(1, 2, 3);
}
if (ctx.bot.ttt.get('FIELD-4-' + sender) === ctx.bot.ttt.get('FIELD-5-' + sender) &&
ctx.bot.ttt.get('FIELD-4-' + sender) === ctx.bot.ttt.get('FIELD-6-' + sender) &&
ctx.bot.ttt.get('FIELD-3-' + sender) !== null &&
ctx.bot.ttt.get('FIELD-4-' + sender) !== null &&
ctx.bot.ttt.get('FIELD-5-' + sender) !== null) {
won = true;
fields.push(3, 4, 5);
}
if (ctx.bot.ttt.get('FIELD-7-' + sender) === ctx.bot.ttt.get('FIELD-8-' + sender) &&
ctx.bot.ttt.get('FIELD-7-' + sender) === ctx.bot.ttt.get('FIELD-9-' + sender) &&
ctx.bot.ttt.get('FIELD-7-' + sender) !== null &&
ctx.bot.ttt.get('FIELD-8-' + sender) !== null &&
ctx.bot.ttt.get('FIELD-9-' + sender) !== null) {
won = true;
fields.push(7, 8, 9);
}
if (ctx.bot.ttt.get('FIELD-1-' + sender) === ctx.bot.ttt.get('FIELD-4-' + sender) &&
ctx.bot.ttt.get('FIELD-1-' + sender) === ctx.bot.ttt.get('FIELD-7-' + sender) &&
ctx.bot.ttt.get('FIELD-1-' + sender) !== null &&
ctx.bot.ttt.get('FIELD-4-' + sender) !== null &&
ctx.bot.ttt.get('FIELD-7-' + sender) !== null) {
won = true;
fields.push(1, 4, 7);
}
if (ctx.bot.ttt.get('FIELD-2-' + sender) === ctx.bot.ttt.get('FIELD-5-' + sender) &&
ctx.bot.ttt.get('FIELD-2-' + sender) === ctx.bot.ttt.get('FIELD-8-' + sender) &&
ctx.bot.ttt.get('FIELD-2-' + sender) !== null &&
ctx.bot.ttt.get('FIELD-5-' + sender) !== null &&
ctx.bot.ttt.get('FIELD-8-' + sender) !== null) {
won = true;
fields.push(2, 5, 8);
}
if (ctx.bot.ttt.get('FIELD-3-' + sender) === ctx.bot.ttt.get('FIELD-6-' + sender) &&
ctx.bot.ttt.get('FIELD-3-' + sender) === ctx.bot.ttt.get('FIELD-9-' + sender) &&
ctx.bot.ttt.get('FIELD-3-' + sender) !== null &&
ctx.bot.ttt.get('FIELD-6-' + sender) !== null &&
ctx.bot.ttt.get('FIELD-9-' + sender) !== null) {
won = true;
fields.push(3, 6, 9);
}
if (ctx.bot.ttt.get('FIELD-1-' + sender) === ctx.bot.ttt.get('FIELD-5-' + sender) &&
ctx.bot.ttt.get('FIELD-1-' + sender) === ctx.bot.ttt.get('FIELD-9-' + sender) &&
ctx.bot.ttt.get('FIELD-1-' + sender) !== null &&
ctx.bot.ttt.get('FIELD-5-' + sender) !== null &&
ctx.bot.ttt.get('FIELD-9-' + sender) !== null) {
won = true;
fields.push(1, 5, 9);
}
if (ctx.bot.ttt.get('FIELD-3-' + sender) === ctx.bot.ttt.get('FIELD-5-' + sender) &&
ctx.bot.ttt.get('FIELD-3-' + sender) === ctx.bot.ttt.get('FIELD-7-' + sender) &&
ctx.bot.ttt.get('FIELD-3-' + sender) !== null &&
ctx.bot.ttt.get('FIELD-5-' + sender) !== null &&
ctx.bot.ttt.get('FIELD-7-' + sender) !== null) {
won = true;
fields.push(3, 5, 7);
}
if (won || (ctx.bot.ttt.get('FIELDS-' + sender).length + ctx.bot.ttt.get('FIELDS-' + reciever).length) === 9) {
let winner = '**Noone**', rawWinner;
if (ctx.metadata.language === 'de')
winner = '**Niemand**';
if (won) {
rawWinner = ctx.bot.ttt.get('FIELD-' + fields[0] + '-' + sender);
winner = '<@' + ctx.bot.ttt.get('FIELD-' + fields[0] + '-' + sender) + '>';
}
fields.forEach((field) => {
const comp = rowGet(field);
ctx.components.rows[comp[1]].components[comp[0]].setStyle(3);
});
const betwon = bet * 2;
let transaction;
if (rawWinner) {
ctx.bot.money.add(ctx.interaction.guild.id, rawWinner, betwon);
if (betwon > 0)
transaction = await ctx.bot.transactions.log({
success: true,
sender: {
id: (rawWinner === sender ? reciever : sender),
amount: betwon,
type: 'negative'
}, reciever: {
id: rawWinner,
amount: betwon,
type: 'positive'
}
});
}
else {
ctx.bot.money.add(ctx.interaction.guild.id, sender, bet);
ctx.bot.money.add(ctx.interaction.guild.id, reciever, bet);
}
for (let i = 0; i < 10; i++) {
const row = Math.floor(i / 3);
ctx.components.rows[row].components[i % 3].setDisabled(true);
}
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GAMEPAD:1024395990679167066> » TICTACTOE')
.setDescription(`
» <@${sender}> is playing Tic Tac Toe with <@${reciever}>!
The Bet is **\$${bet}**

🔵 » <@${sender}>
🔴 » <@${reciever}>

<:AWARD:1024385473524793445> ${winner} has won **\$${betwon}**.${(typeof transaction === 'object') ? `\nID: ${transaction.id}` : ''}
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GAMEPAD:1024395990679167066> » TICTACTOE')
.setDescription(`
» <@${sender}> spielt mit <@${reciever}> Tic Tac Toe!
Die Wette ist **${bet}€**

🔵 » <@${sender}>
🔴 » <@${reciever}>

<:AWARD:1024385473524793445> ${winner} hat **${betwon}€** gewonnen.${(typeof transaction === 'object') ? `\nID: ${transaction.id}` : ''}
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.bot.game.delete('PLAYING-' + sender);
ctx.bot.game.delete('PLAYING-' + reciever);
ctx.bot.ttt.delete('TURN-' + sender);
ctx.bot.ttt.delete('TURN-' + reciever);
ctx.bot.ttt.delete('FIELDS-' + sender);
ctx.bot.ttt.delete('FIELDS-' + reciever);
ctx.bot.ttt.delete('FIELD-1-' + sender);
ctx.bot.ttt.delete('FIELD-2-' + sender);
ctx.bot.ttt.delete('FIELD-3-' + sender);
ctx.bot.ttt.delete('FIELD-4-' + sender);
ctx.bot.ttt.delete('FIELD-5-' + sender);
ctx.bot.ttt.delete('FIELD-6-' + sender);
ctx.bot.ttt.delete('FIELD-7-' + sender);
ctx.bot.ttt.delete('FIELD-8-' + sender);
ctx.bot.ttt.delete('FIELD-9-' + sender);
return ctx.interaction.message.edit({ embeds: [message], components: (ctx.components.getAPI()), ephemeral: true });
}
}
};
//# sourceMappingURL=choice.js.map