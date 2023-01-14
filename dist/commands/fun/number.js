"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
data: new discord_js_1.SlashCommandBuilder()
.setName('number')
.setDMPermission(false)
.setDescription('GENERATE A NUMBER')
.setDescriptionLocalizations({
de: 'GENERIERE EINE NUMMER'
})
.addIntegerOption((option) => option.setName('min')
.setDescription('THE MIN AMOUNT')
.setDescriptionLocalizations({
de: 'DAS MINIMUM'
})
.setRequired(true))
.addIntegerOption((option) => option.setName('max')
.setDescription('THE MAX AMOUNT')
.setDescriptionLocalizations({
de: 'DAS MAXIMUM'
})
.setRequired(true)),
async execute(ctx) {
const min = ctx.getOption('min');
const max = ctx.getOption('max');
const res = ctx.bot.random(min, max);
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GEAR:1024404241701417011> » RANDOM NUMBER')
.setDescription(`» Between **${min}** and **${max}** I choose **${res}**!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GEAR:1024404241701417011> » ZUFÄLLIGE NUMMER')
.setDescription(`» Zwischen **${min}** und **${max}** wähle ich **${res}**!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[CMD] NUMBER : ${min} : ${max} : ${res}`);
return ctx.interaction.reply({ embeds: [message] });
}
};
