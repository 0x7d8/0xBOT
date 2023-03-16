"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
data: new discord_js_1.SlashCommandBuilder()
.setName('iteminfo')
.setDMPermission(false)
.setDescription('SHOW INFO ABOUT ITEMS')
.setDescriptionLocalizations({
de: 'ZEIGE INFOS ÜBER ITEMS'
})
.addStringOption((option) => option.setName('item')
.setNameLocalizations({
de: 'gegenstand'
})
.setDescription('THE ITEM')
.setDescriptionLocalizations({
de: 'DER GEGENSTAND'
})
.setRequired(true)
.addChoices({ name: '💣 NORMALE BOMBE', value: 'nbomb' }, { name: '💣 MEDIUM BOMBE', value: 'mbomb' }, { name: '💣 HYPER BOMBE', value: 'hbomb' }, { name: '💣 CRAZY BOMBE', value: 'cbomb' })),
async execute(ctx) {
const item = ctx.getOption('item');
let message;
ctx.log(false, `[CMD] ITEMINFO : ${item.toUpperCase()}`);
if (item === 'nbomb') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:QUESTION:1024402860210921503> » ITEM INFO')
.setDescription(`
» The **<:NBOMB:1021783222520127508> NORMAL BOMB** is used to temporarily mute people, yes, mute people.
To not get muted the reciever has to solve a small problem.
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:QUESTION:1024402860210921503> » ITEM INFO')
.setDescription(`
» Die **<:NBOMB:1021783222520127508> NORMALE BOMBE** ist genutzt um Leute temporär zu muten, ja, muten.
Um nicht gemuted zu werden, muss der empfänger eine kleines Problem lösen.
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
;
if (item === 'mbomb') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:QUESTION:1024402860210921503> » ITEM INFO')
.setDescription(`
» The **<:MBOMB:1021783295211601940> MEDIUM BOMB** is used to temporarily mute people, yes, mute people.
Its slightly harder and has a longer mute time than the **<:NBOMB:1021783222520127508> NORMAL BOMB**.
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:QUESTION:1024402860210921503> » ITEM INFO')
.setDescription(`
» Die **<:MBOMB:1021783295211601940> MEDIUM BOMBE** ist genutzt um Leute temporär zu muten, ja, muten.
Sie ist bisschen schwieriger und hat eine längere Mute Zeit als die **<:NBOMB:1021783222520127508> NORMALE BOMBE**.
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
;
if (item === 'hbomb') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:QUESTION:1024402860210921503> » ITEM INFO')
.setDescription(`
» The **<:HBOMB:1022102357938536458> HYPER BOMB** is used to temporarily mute people, yes, mute people.
Its alot harder and has a longer mute time than the **<:NBOMB:1021783222520127508> NORMAL BOMB** and the **<:MBOMB:1021783295211601940> MEDIUM BOMB**.
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:QUESTION:1024402860210921503> » ITEM INFO')
.setDescription(`
» Die **<:HBOMB:1022102357938536458> HYPER BOMBE** ist genutzt um Leute temporär zu muten, ja, muten.
Sie ist deutlich schwieriger und hat eine längere Mute Zeit als die **<:NBOMB:1021783222520127508> NORMALE BOMBE** und die **<:MBOMB:1021783295211601940> MEDIUM BOMBE**.
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
;
if (item === 'cbomb') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:QUESTION:1024402860210921503> » ITEM INFO')
.setDescription(`
» The **<:CBOMB:1021783405161091162> CRAZY BOMB** is used to delete the last Message from someone in the Channel.
To not get the last message deleted, the reciever has to solve a small problem.
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:QUESTION:1024402860210921503> » ITEM INFO')
.setDescription(`
» Die **<:CBOMB:1021783405161091162> CRAZY BOMBE** ist genutzt um die Letzte Nachricht von jemanden im Kanal zu löschen.
Um nicht die letzte Nachricht gelöscht bekommen zu müssen, muss der Empfänger ein kleines Problem lösen.
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
}
};
//# sourceMappingURL=iteminfo.js.map