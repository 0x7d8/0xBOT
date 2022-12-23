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
.setName('action')
.setDMPermission(false)
.setDescription('EXECUTE ACTIONS ON USERS')
.setDescriptionLocalizations({
de: 'FÜHRE AKTIONEN AN NUTZERN AUS'
})
.addUserOption(function (option) {
return option.setName('user')
.setNameLocalizations({
de: 'nutzer'
})
.setDescription('THE PERSON')
.setDescriptionLocalizations({
de: 'DIE PERSON'
})
.setRequired(true);
})
.addStringOption(function (option) {
return option.setName('action')
.setNameLocalizations({
de: 'aktion'
})
.setDescription('THE ACTION')
.setDescriptionLocalizations({
de: 'DIE AKTION'
})
.setRequired(true)
.addChoices({ name: '👊 SCHLAGEN', value: 'box' }, { name: '💀 TÖTEN', value: 'kill' }, { name: '👀 ANSTARREN', value: 'stare' }, { name: '🧐 TWERKEN', value: 'twerk' }, { name: '🏁 FANGEN', value: 'catch' }, { name: '😠 RUFEN', value: 'call' });
}),
execute: function (ctx) {
return __awaiter(this, void 0, void 0, function () {
var user, event, message, message, message, message, message, message, message;
return __generator(this, function (_a) {
user = ctx.interaction.options.getUser("user");
event = ctx.getOption('action');
if (ctx.interaction.user.id === user.id) {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB You cant execute Actions on yourself?")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Du kannst keine Aktionen auf dir selbst ausf\u00FChren?")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] ACTION : ".concat(user.id, " : ").concat(event.toUpperCase(), " : SAMEPERSON"));
return [2, ctx.interaction.reply({ embeds: [message], ephemeral: true })];
}
ctx.log(false, "[CMD] ACTION : ".concat(user.id, " : ").concat(event.toUpperCase()));
if (event === 'box') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BURST:1024393250611671170> » ACTION!')
.setDescription("\u00BB <@".concat(ctx.interaction.user.id, "> boxed <@").concat(user.id, ">! AHH."))
.setImage("https://media2.giphy.com/media/qyjexFwQwJp9yUvMxq/giphy.gif?cid=ecf05e479xhsqd2p8ap5zmeqbog4w7dn6kykqanap5j4zklq&rid=giphy.gif&ct=g")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BURST:1024393250611671170> » ACTION!')
.setDescription("\u00BB **<@".concat(ctx.interaction.user.id, ">** hat <@").concat(user.id, "> Geschlagen! AUA."))
.setImage("https://media2.giphy.com/media/qyjexFwQwJp9yUvMxq/giphy.gif?cid=ecf05e479xhsqd2p8ap5zmeqbog4w7dn6kykqanap5j4zklq&rid=giphy.gif&ct=g")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
return [2, ctx.interaction.reply({ embeds: [message] })];
}
;
if (event === 'kill') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BURST:1024393250611671170> » ACTION!')
.setDescription("\u00BB <@".concat(ctx.interaction.user.id, "> killed <@").concat(user.id, ">! MH."))
.setImage("https://media1.giphy.com/media/yNFjQR6zKOGmk/giphy.gif?cid=ecf05e47tyf8463zbs3431j0spus4vugtaq22m4occdccspm&rid=giphy.gif&ct=g")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BURST:1024393250611671170> » ACTION!')
.setDescription("\u00BB **<@".concat(ctx.interaction.user.id, ">** hat <@").concat(user.id, "> Get\u00F6tet! MH."))
.setImage("https://media1.giphy.com/media/yNFjQR6zKOGmk/giphy.gif?cid=ecf05e47tyf8463zbs3431j0spus4vugtaq22m4occdccspm&rid=giphy.gif&ct=g")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
return [2, ctx.interaction.reply({ embeds: [message] })];
}
;
if (event === 'stare') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BURST:1024393250611671170> » ACTION!')
.setDescription("\u00BB <@".concat(ctx.interaction.user.id, "> stares at <@").concat(user.id, ">! MENACINGLY."))
.setImage("https://media2.giphy.com/media/aXUU30cDBa9tVQz37V/giphy.gif?cid=ecf05e474vdm6e12euchkog2475qj5srvqa3ozinvz7xse0j&rid=giphy.gif&ct=g")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BURST:1024393250611671170> » ACTION!')
.setDescription("» **<@" + ctx.interaction.user.id + ">** starrt <@" + user.id + "> an! STILL.")
.setImage("https://media2.giphy.com/media/aXUU30cDBa9tVQz37V/giphy.gif?cid=ecf05e474vdm6e12euchkog2475qj5srvqa3ozinvz7xse0j&rid=giphy.gif&ct=g")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
return [2, ctx.interaction.reply({ embeds: [message] })];
}
;
if (event === 'twerk') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BURST:1024393250611671170> » ACTION!')
.setDescription("\u00BB <@".concat(ctx.interaction.user.id, "> twerks over <@").concat(user.id, ">! EWW!"))
.setImage("https://media2.giphy.com/media/DqhwoR9RHm3EA/giphy.gif?cid=ecf05e47jxhd2do5ws18knygottsfiz0qqci5qm6x8w5ikjc&rid=giphy.gif&ct=g")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BURST:1024393250611671170> » ACTION!')
.setDescription("» **<@" + ctx.interaction.user.id + ">** twerkt über <@" + user.id + ">! EKLIG!")
.setImage("https://media2.giphy.com/media/DqhwoR9RHm3EA/giphy.gif?cid=ecf05e47jxhd2do5ws18knygottsfiz0qqci5qm6x8w5ikjc&rid=giphy.gif&ct=g")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
return [2, ctx.interaction.reply({ embeds: [message] })];
}
;
if (event === 'catch') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BURST:1024393250611671170> » ACTION!')
.setDescription("\u00BB <@".concat(ctx.interaction.user.id, "> catches <@").concat(user.id, ">! WHY?"))
.setImage("https://media3.giphy.com/media/vsyKKf1t22nmw/giphy.gif?cid=ecf05e47kzkk3lkzs7wsxrpluelxo9pvve8x5946n7mj5rzv&rid=giphy.gif&ct=g")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BURST:1024393250611671170> » ACTION!')
.setDescription("» **<@" + ctx.interaction.user.id + ">** fängt <@" + user.id + ">! WIESO?")
.setImage("https://media3.giphy.com/media/vsyKKf1t22nmw/giphy.gif?cid=ecf05e47kzkk3lkzs7wsxrpluelxo9pvve8x5946n7mj5rzv&rid=giphy.gif&ct=g")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
return [2, ctx.interaction.reply({ embeds: [message] })];
}
;
if (event === 'call') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BURST:1024393250611671170> » ACTION!')
.setDescription("\u00BB <@".concat(ctx.interaction.user.id, "> calls <@").concat(user.id, ">! ARE YOU THERE?"))
.setImage("https://media2.giphy.com/media/NPFQpRI1KpIq9S0YKa/giphy.gif?cid=ecf05e47xfvrmgjqorm0p5hn2iz9kxjw6ngykph6bireyunn&rid=giphy.gif&ct=g")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BURST:1024393250611671170> » ACTION!')
.setDescription("» **<@" + ctx.interaction.user.id + ">** ruft <@" + user.id + "> an! BIST DU DRAN?")
.setImage("https://media2.giphy.com/media/NPFQpRI1KpIq9S0YKa/giphy.gif?cid=ecf05e47xfvrmgjqorm0p5hn2iz9kxjw6ngykph6bireyunn&rid=giphy.gif&ct=g")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
return [2, ctx.interaction.reply({ embeds: [message] })];
}
return [2];
});
});
}
};
//# sourceMappingURL=action.js.map