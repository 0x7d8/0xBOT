"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
data: {
name: 'item-bomb'
},
async execute(ctx, solution, choice, solbutton, button, itemid, reciever) {
if (ctx.interaction.user.id !== reciever) {
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription(`» This choice is up to <@${reciever}>!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription(`» Diese Frage ist für <@${reciever}>!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[BTN] ITEMUSE : NOTSENDER`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
ctx.bot.bomb.delete('TIMEOUT-' + reciever + '-' + ctx.interaction.guild.id);
{
ctx.interaction.message.components[0].components[0].data.disabled = true;
ctx.interaction.message.components[0].components[1].data.disabled = true;
ctx.interaction.message.components[0].components[2].data.disabled = true;
ctx.interaction.message.components[0].components[3].data.disabled = true;
ctx.interaction.message.components[0].components[Number(button) - 1].data.style = discord_js_1.ButtonStyle.Danger;
ctx.interaction.message.components[0].components[Number(solbutton) - 1].data.style = discord_js_1.ButtonStyle.Success;
}
let message;
if (solution === choice) {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXOPEN:1024395281460101213> » USE ITEM')
.setDescription(`» <@${reciever}> has diffused the Bomb! YAY`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXOPEN:1024395281460101213> » GEGENSTAND NUTZEN')
.setDescription(`» <@${reciever}> hat die Bombe entschärft! YAY`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
}
else {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXOPEN:1024395281460101213> » USE ITEM')
.setDescription(`» <@${reciever}> has failed to diffuse the Bomb! OHNO`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXOPEN:1024395281460101213> » GEGENSTAND NUTZEN')
.setDescription(`» <@${reciever}> hat es nicht geschafft, die Bombe zu entschärfen! OH`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
}
const messages = ctx.bot.bomb.get('MESSAGES-' + reciever + '-' + ctx.interaction.guild.id);
ctx.bot.bomb.delete('MESSAGES-' + reciever + '-' + ctx.interaction.guild.id);
if (solution !== choice) {
if (itemid === 'nbomb') {
const member = await ctx.interaction.guild.members.fetch(ctx.interaction.user.id);
member.timeout(15 * 1000, 'BOMB TIMEOUT FROM ' + ctx.interaction.user.id).catch(() => { });
}
;
if (itemid === 'mbomb') {
const member = await ctx.interaction.guild.members.fetch(ctx.interaction.user.id);
member.timeout(30 * 1000, 'BOMB TIMEOUT FROM ' + ctx.interaction.user.id).catch(() => { });
}
;
if (itemid === 'hbomb') {
const member = await ctx.interaction.guild.members.fetch(ctx.interaction.user.id);
member.timeout(45 * 1000, 'BOMB TIMEOUT FROM ' + ctx.interaction.user.id).catch(() => { });
}
;
if (itemid === 'cbomb') {
const filtered = [];
let i = 0;
{
(await messages).filter((m) => {
if (m.author.id === ctx.interaction.user.id && 1 > i) {
filtered.push(m);
i++;
}
});
}
await ctx.interaction.channel.bulkDelete(filtered, true);
}
}
ctx.log(false, `[BTN] ITEMUSE : BOMB : ${choice} : ${solution}`);
return ctx.interaction.update({ content: '', embeds: [message], components: ctx.interaction.message.components });
}
};
//# sourceMappingURL=bomb.js.map