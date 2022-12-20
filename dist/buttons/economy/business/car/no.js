"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
data: {
name: 'car-no'
},
async execute(ctx, car, userid, type) {
let name;
if (car === 'jeep')
name = '2016 JEEP PATRIOT SPORT';
if (car === 'kia')
name = '2022 KIA SORENTO';
if (car === 'audi')
name = 'AUDI R8 COUPE V10';
if (car === 'tesla')
name = 'TESLA MODEL Y';
if (car === 'porsche')
name = '2019 PORSCHE 911 GT2RS';
if (ctx.interaction.user.id !== userid) {
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription(`» This choice is up to <@${userid}>!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription(`» Diese Frage ist für <@${userid}>!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[BTN] CARBUY : NOTSENDER`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
{
ctx.interaction.message.components[0].components[0].data.disabled = true;
ctx.interaction.message.components[0].components[1].data.disabled = true;
ctx.interaction.message.components[0].components[1].data.style = 2;
}
if (type === 'buy') {
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXCHECK:1024401101589590156> » BUY CAR')
.setDescription(`» <@${ctx.interaction.user.id}> said **NO** to a **${name}**.`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXCHECK:1024401101589590156> » AUTO KAUFEN')
.setDescription(`» <@${ctx.interaction.user.id}> hat **NEIN** zu einem **${name}** gesagt.`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[BTN] CARBUY : ${name} : DENY`);
return ctx.interaction.update({ embeds: [message], components: ctx.interaction.message.components });
}
else if (type === 'sell') {
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXDOLLAR:1024402261784403999> » SELL CAR')
.setDescription(`» <@${ctx.interaction.user.id}> said **NO** to selling his **${name}**.`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXDOLLAR:1024402261784403999> » AUTO VERKAUFEN')
.setDescription(`» <@${ctx.interaction.user.id}> hat **NEIN** zum verkaufen von seinem **${name}** gesagt.`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[BTN] CARSELL : ${name} : DENY`);
return ctx.interaction.update({ embeds: [message], components: ctx.interaction.message.components });
}
}
};
//# sourceMappingURL=no.js.map