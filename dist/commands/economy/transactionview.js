"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
data: new discord_js_1.SlashCommandBuilder()
.setName('transactionview')
.setDescription('VIEW A TRANSACTION')
.setDescriptionLocalizations({
de: 'SCHAU EINE TRANSAKTION AN'
})
.setDMPermission(false)
.addStringOption((option) => option.setName('id')
.setDescription('THE TRANSACTION ID')
.setDescriptionLocalizations({
de: 'DIE TRANSAKTIONS ID'
})
.setRequired(true)),
async execute(ctx) {
const transactionId = ctx.getOption('id');
const transaction = await ctx.bot.transactions.get(transactionId);
if (transaction === 'N-FOUND') {
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription(`» This Transaction doesnt exist!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription(`» Diese Transaktion existiert nicht!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[CMD] TRANSACTIONVIEW : NOTEXIST : ${transactionId}`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
let sender, reciever;
if (isNaN(transaction.sender.id.slice(-1))) {
const senderInfo = await ctx.bot.userdb.get(transaction.sender.id);
sender = senderInfo.username + '#' + senderInfo.usertag;
}
else {
sender = transaction.sender.id;
}
;
if (!isNaN(transaction.reciever.id.slice(-1))) {
const recieverInfo = await ctx.bot.userdb.get(transaction.reciever.id);
reciever = recieverInfo.username + '#' + recieverInfo.usertag;
}
else {
reciever = transaction.reciever.id;
}
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BAG:1024389219558367292> » TRANSACTION INFOS')
.setDescription(`» ID: \`${transactionId}\`
<t:${transaction.timestamp}>

» ${sender}
**${transaction.sender.type === 'positive' ? '+' : '-'}$${transaction.sender.amount}**

» ${reciever}
**${transaction.reciever.type === 'positive' ? '+' : '-'}$${transaction.reciever.amount}**
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BAG:1024389219558367292> » TRANSAKTIONS INFOS')
.setDescription(`» ID: \`${transactionId}\`
<t:${transaction.timestamp}>

» ${sender}
**${transaction.sender.type === 'positive' ? '+' : '-'}${transaction.sender.amount}€**

» ${reciever}
**${transaction.reciever.type === 'positive' ? '+' : '-'}${transaction.reciever.amount}€**
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[CMD] TRANSACTIONVIEW : ${transactionId}`);
return ctx.interaction.reply({ embeds: [message] });
}
};
