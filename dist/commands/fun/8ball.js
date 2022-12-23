"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
return new (P || (P = Promise))(function (resolve, reject) {
function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
step((generator = generator.apply(thisArg, _arguments || [])).next());
});
};
var __generator = (this && this.__generator) || function (thisArg, body) {
var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
function verb(n) { return function (v) { return step([n, v]); }; }
function step(op) {
if (f) throw new TypeError("Generator is already executing.");
while (g && (g = 0, op[0] && (_ = 0)), _) try {
if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
if (y = 0, t) op = [op[0] & 2, t.value];
switch (op[0]) {
case 0: case 1: t = op; break;
case 4: _.label++; return { value: op[1], done: false };
case 5: _.label++; y = op[1]; op = [0]; continue;
case 7: op = _.ops.pop(); _.trys.pop(); continue;
default:
if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
if (t[2]) _.ops.pop();
_.trys.pop(); continue;
}
op = body.call(thisArg, _);
} catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
}
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
exports.default = {
data: new discord_js_1.SlashCommandBuilder()
.setName('8ball')
.setDescription('ASK A MAGIC BALL')
.setDescriptionLocalizations({
de: 'FRAGE EINEN MAGISCHEN BALL'
})
.setDMPermission(false)
.addStringOption(function (option) {
return option.setName('question')
.setNameLocalizations({
de: 'frage'
})
.setDescription('THE QUESTION')
.setDescriptionLocalizations({
de: 'DIE FRAGE'
})
.setRequired(true);
}),
execute: function (ctx) {
return __awaiter(this, void 0, void 0, function () {
var question, random, result, formatted, message;
return __generator(this, function (_a) {
question = ctx.getOption('question');
random = ctx.bot.random(1, 20);
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
if (question.slice(-1) === '?')
formatted = question;
else
formatted = question + '?';
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:QUESTION:1024402860210921503> » MAGIC BALL')
.setDescription("\u00BB \"".concat(formatted, "\" -> ").concat(result))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:QUESTION:1024402860210921503> » MAGISCHER BALL')
.setDescription("\u00BB \"".concat(formatted, "\" -> ").concat(result))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, '[CMD] 8BALL : ' + formatted.toUpperCase() + ' : ' + result.toUpperCase());
return [2, ctx.interaction.reply({ embeds: [message] })];
});
});
}
};
//# sourceMappingURL=8ball.js.map