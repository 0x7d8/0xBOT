"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
data: new discord_js_1.SlashCommandBuilder()
.setName('8ball')
.setDescription('ASK A MAGIC BALL')
.setDescriptionLocalizations({
de: 'FRAGE EINEN MAGISCHEN BALL'
})
.setDMPermission(false)
.addStringOption((option) => option.setName('question')
.setNameLocalizations({
de: 'frage'
})
.setDescription('THE QUESTION')
.setDescriptionLocalizations({
de: 'DIE FRAGE'
})
.setRequired(true)),
async execute(ctx) {
const question = ctx.getOption('question');
const random = ctx.bot.random(1, 20);
let result;
if (random === 1)
result = 'Certainly.';
if (random === 2)
result = 'Its Guaranteed!';
if (random === 3)
result = 'Without question!';
if (random === 4)
result = 'Definitely yes!';
if (random === 5)
result = 'You betcha!';
if (random === 6)
result = 'As I see it, yes!';
if (random === 7)
result = 'Most likely.';
if (random === 8)
result = 'Looks good!';
if (random === 9)
result = 'Yes!';
if (random === 10)
result = 'Looks all right!';
if (random === 11)
result = 'Im not sure, ask again.';
if (random === 12)
result = 'Ask me again later.';
if (random === 13)
result = 'Id rather not answer that right now.';
if (random === 14)
result = 'I cant tell you at all.';
if (random === 15)
result = 'Concentrate and ask again!';
if (random === 16)
result = 'I wouldnt count on it!';
if (random === 17)
result = 'Computer says no.';
if (random === 18)
result = 'After much deliberation, I would say no.';
if (random === 19)
result = 'I dont think so!';
if (random === 20)
result = 'I doubt it.';
if (ctx.metadata.language === 'de') {
if (random === 1)
result = 'Sicherlich.';
if (random === 2)
result = 'Es ist Garantiert!';
if (random === 3)
result = 'Ohne question!';
if (random === 4)
result = 'Definitiv ja!';
if (random === 5)
result = 'Da kannst du drauf wetten!';
if (random === 6)
result = 'Wie ich das sehe, ja!';
if (random === 7)
result = 'Höchstwahrscheinlich.';
if (random === 8)
result = 'Sieht gut aus!';
if (random === 9)
result = 'Ja!';
if (random === 10)
result = 'Sieht ganz so aus.';
if (random === 11)
result = 'Ich bin mir nicht sicher, frag nochmal.';
if (random === 12)
result = 'Frag mich später nochmal.';
if (random === 13)
result = 'Das würde ich jetzt lieber nicht beantworten.';
if (random === 14)
result = 'Kann ich dir garnicht sagen.';
if (random === 15)
result = 'Konzentrier dich und frag nochmal!';
if (random === 16)
result = 'Ich würde nicht darauf zählen!';
if (random === 17)
result = 'Computer sagt nein.';
if (random === 18)
result = 'Nach reichlicher Überlegung würde ich nein sagen.';
if (random === 19)
result = 'Ich glaube nicht!';
if (random === 20)
result = 'Ich bezweifle es.';
}
let formatted;
if (question.slice(-1) === '?')
formatted = question;
else
formatted = question + '?';
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:QUESTION:1024402860210921503> » MAGIC BALL')
.setDescription('» "' + formatted + '" -> ' + result)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:QUESTION:1024402860210921503> » MAGISCHER BALL')
.setDescription('» "' + formatted + '" -> ' + result)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, '[CMD] 8BALL : ' + formatted.toUpperCase() + ' : ' + result.toUpperCase());
return ctx.interaction.reply({ embeds: [message] });
}
};
//# sourceMappingURL=8ball.js.map