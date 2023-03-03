"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
data: new discord_js_1.SlashCommandBuilder()
.setName('transactionsearch')
.setDescription('SEARCH A TRANSACTION')
.setDescriptionLocalizations({
de: 'SUCHE EINE TRANSAKTION'
})
.setDMPermission(false)
.addUserOption((option) => option.setName('sender')
.setDescription('THE SENDER')
.setDescriptionLocalizations({
de: 'DER SENDER'
})
.setRequired(false))
.addUserOption((option) => option.setName('reciever')
.setNameLocalizations({
de: 'empfänger'
})
.setDescription('THE RECIEVER')
.setDescriptionLocalizations({
de: 'DER EMPFÄNGER'
})
.setRequired(false)),
async execute(ctx) {
const sender = ctx.interaction.options.getUser("sender");
const reciever = ctx.interaction.options.getUser("reciever");
let embedDesc = '';
let rawvalues;
if (sender && reciever) {
rawvalues = await ctx.db.query(`select * from usertransactions where senderid = $1 and recieverid = $2 order by timestamp desc limit 20;`, [
sender.id,
reciever.id
]);
}
else if (sender && !reciever) {
rawvalues = await ctx.db.query(`select * from usertransactions where senderid = $1 order by timestamp desc limit 20;`, [
sender.id
]);
}
else if (!sender && reciever) {
rawvalues = await ctx.db.query(`select * from usertransactions where recieverid = $1 order by timestamp desc limit 20;`, [
reciever.id
]);
}
else {
rawvalues = await ctx.db.query(`select * from usertransactions order by timestamp desc limit 20;`);
}
for (const element of rawvalues.rows) {
if (ctx.metadata.language === 'de')
embedDesc += `» ${(/^\d/.test(element.senderid) ? `<@${element.senderid}>` : element.senderid)} | **${element.senderamount}€** -> ${(/^\d/.test(element.recieverid) ? `<@${element.recieverid}>` : element.recieverid)}\nID: \`${element.id}\`\n`;
else
embedDesc += `» ${(/^\d/.test(element.senderid) ? `<@${element.senderid}>` : element.senderid)} | **$${element.senderamount}** -> ${(/^\d/.test(element.recieverid) ? `<@${element.recieverid}>` : element.recieverid)}\nID: \`${element.id}\`\n`;
}
;
if (embedDesc === '') {
embedDesc = 'Nothing Found.';
if (ctx.metadata.language === 'de') {
embedDesc = 'Nichts Gefunden.';
}
}
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BAG:1024389219558367292> » TRANSACTION SEARCH')
.setDescription(embedDesc)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BAG:1024389219558367292> » TRANSAKTIONS SUCHE')
.setDescription(embedDesc)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[CMD] TRANSACTIONSEARCH : ${sender ? 'EMPTY' : sender.id} : ${reciever ? 'EMPTY' : reciever.id}`);
return ctx.interaction.reply({ embeds: [message] });
}
};
//# sourceMappingURL=transactionsearch.js.map