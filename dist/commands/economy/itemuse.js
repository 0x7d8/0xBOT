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
var __read = (this && this.__read) || function (o, n) {
var m = typeof Symbol === "function" && o[Symbol.iterator];
if (!m) return o;
var i = m.call(o), r, ar = [], e;
try {
while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
}
catch (error) { e = { error: error }; }
finally {
try {
if (r && !r.done && (m = i["return"])) m.call(i);
}
finally { if (e) throw e.error; }
}
return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var discord_js_2 = require("discord.js");
exports.default = {
data: new discord_js_2.SlashCommandBuilder()
.setName('itemuse')
.setDescription('USE AN ITEM')
.setDescriptionLocalizations({
de: 'NUTZE EINEN GEGENSTAND'
})
.setDMPermission(false)
.addUserOption(function (option) {
return option.setName('user')
.setNameLocalizations({
de: 'nutzer'
})
.setDescription('THE USER')
.setDescriptionLocalizations({
de: 'DER NUTZER'
})
.setRequired(true);
})
.addStringOption(function (option) {
return option.setName('item')
.setNameLocalizations({
de: 'gegenstand'
})
.setDescription('THE itemid')
.setDescriptionLocalizations({
de: 'DER GEGENSTAND'
})
.setRequired(true)
.addChoices({ name: '💣 NORMALE BOMBE', value: 'nbomb-bomb' }, { name: '💣 MEDIUM BOMBE', value: 'mbomb-bomb' }, { name: '💣 HYPER BOMBE', value: 'hbomb-bomb' }, { name: '💣 CRAZY BOMBE', value: 'cbomb-bomb' });
}),
execute: function (ctx) {
return __awaiter(this, void 0, void 0, function () {
var mathjs, message_1, user, itemstr, cache, _a, itemid, itemcat, name, message_2, message_3, message_4, message_5, channel, messages, math, mathres, b1, b2, b3, b4, sb, row, message, msg_1, expiration_1;
var _this = this;
return __generator(this, function (_b) {
switch (_b.label) {
case 0: return [4, import('mathjs')];
case 1:
mathjs = _b.sent();
return [4, ctx.bot.settings.get(ctx.interaction.guild.id, 'items')];
case 2:
if (!(_b.sent())) {
message_1 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB Items are disabled on this Server!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_1 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Items sind auf diesem Server deaktiviert!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] ITEM : DISABLED");
return [2, ctx.interaction.reply({ embeds: [message_1], ephemeral: true })];
}
user = ctx.interaction.options.getUser("user");
itemstr = ctx.getOption('item');
cache = itemstr.split('-');
_a = __read(cache, 2), itemid = _a[0], itemcat = _a[1];
if (itemid === 'nbomb')
name = '<:NBOMB:1021783222520127508> NORMAL BOMB';
if (itemid === 'mbomb')
name = '<:MBOMB:1021783295211601940> MEDIUM BOMB';
if (itemid === 'hbomb')
name = '<:HBOMB:1022102357938536458> HYPER BOMB';
if (itemid === 'cbomb')
name = '<:CBOMB:1021783405161091162> CRAZY BOMB';
if (ctx.metadata.language === 'de') {
if (itemid === 'nbomb')
name = '<:NBOMB:1021783222520127508> NORMALE BOMBE';
if (itemid === 'mbomb')
name = '<:MBOMB:1021783295211601940> MEDIUM BOMBE';
if (itemid === 'hbomb')
name = '<:HBOMB:1022102357938536458> HYPER BOMBE';
if (itemid === 'cbomb')
name = '<:CBOMB:1021783405161091162> CRAZY BOMBE';
}
if (user.bot) {
message_2 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB You cant use Items on Bots!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_2 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Du kannst keine Gegenst\u00E4nde auf einem Bot nutzen!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] ITEMUSE : ".concat(user.id, " : BOT : ").concat(itemid.toUpperCase()));
return [2, ctx.interaction.reply({ embeds: [message_2], ephemeral: true })];
}
return [4, ctx.bot.items.get(ctx.interaction.user.id + '-' + itemid.toUpperCase() + 'S-' + ctx.interaction.guild.id, 'amount')];
case 3:
if ((_b.sent()) < 1) {
message_3 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB You dont have enough of that Item!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_3 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Du hast nicht genug von dem Gegenstand!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] ITEMUSE : ".concat(user.id, " : NOTENOUGHITEMS : ").concat(itemid.toUpperCase()));
return [2, ctx.interaction.reply({ embeds: [message_3], ephemeral: true })];
}
if (ctx.interaction.user.id === user.id && itemcat === 'bomb') {
message_4 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB You cant use Bombs on yourself?")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_4 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Du kannst Bomben nicht auf dir selber nutzen?")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] ITEMUSE : ".concat(user.id, " : ").concat(itemid.toUpperCase()));
return [2, ctx.interaction.reply({ embeds: [message_4], ephemeral: true })];
}
if (ctx.bot.bomb.has('TIMEOUT-' + user.id + '-' + ctx.interaction.guild.id)) {
message_5 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB <@".concat(user.id, "> is already being bombed!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_5 = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB <@".concat(user.id, "> wird schon bombadiert!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] ITEMUSE : ".concat(user.id, " : ").concat(itemid.toUpperCase()));
return [2, ctx.interaction.reply({ embeds: [message_5], ephemeral: true })];
}
channel = ctx.interaction.channel;
messages = channel.messages.fetch();
ctx.bot.bomb.set('MESSAGES-' + user.id + '-' + ctx.interaction.guild.id, messages);
ctx.bot.bomb.set('TIMEOUT-' + user.id + '-' + ctx.interaction.guild.id, true);
if (itemid === 'nbomb')
math = ctx.bot.random(80, 1000) + ' + ' + ctx.bot.random(10, 20) + ' - ' + ctx.bot.random(150, 200);
if (itemid === 'mbomb')
math = ctx.bot.random(10, 20) + ' * ' + ctx.bot.random(10, 30) + ' - ' + ctx.bot.random(60, 100);
if (itemid === 'hbomb')
math = ctx.bot.random(10, 20) + ' * ' + ctx.bot.random(10, 40) + ' * ' + ctx.bot.random(60, 100);
if (itemid === 'cbomb')
math = ctx.bot.random(10, 40) + ' * (' + ctx.bot.random(100, 4000) + ' + ' + ctx.bot.random(600, 2000) + ')';
return [4, mathjs.evaluate(math)];
case 4:
mathres = _b.sent();
b1 = (mathres - ctx.bot.random(10, 50));
b2 = (mathres + ctx.bot.random(10, 50) + ctx.bot.random(10, 50));
b3 = (mathres + ctx.bot.random(50, 100) + 50);
b4 = (mathres - ctx.bot.random(100, 150) + ctx.bot.random(5, 25));
sb = ctx.bot.random(1, 4);
return [4, eval('b' + sb + ' = ' + mathres)];
case 5:
_b.sent();
row = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setLabel(b1.toString())
.setCustomId('BOMB-' + mathres + '-' + b1 + '-' + sb + '-1-' + itemid + '-' + user.id)
.setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
.setLabel(b2.toString())
.setCustomId('BOMB-' + mathres + '-' + b2 + '-' + sb + '-2-' + itemid + '-' + user.id)
.setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
.setLabel(b3.toString())
.setCustomId('BOMB-' + mathres + '-' + b3 + '-' + sb + '-3-' + itemid + '-' + user.id)
.setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
.setLabel(b4.toString())
.setCustomId('BOMB-' + mathres + '-' + b4 + '-' + sb + '-4-' + itemid + '-' + user.id)
.setStyle(discord_js_1.ButtonStyle.Secondary));
if (itemcat === 'bomb') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXOPEN:1024395281460101213> » USE ITEM')
.setDescription("\n\t\t\t\t\t\u00BB Oh <@".concat(user.id, ">, <@").concat(ctx.interaction.user.id, "> used a **").concat(name, "** on you!\n\t\t\t\t\tIf you solve this Math Equation, it wont do anything.\n\n\t\t\t\t\t**```").concat(math, "```**\n\t\t\t\t\tThe Bomb explodes <t:").concat(Math.floor(+new Date() / 1000) + 10, ":R>\n\t\t\t\t")).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXOPEN:1024395281460101213> » GEGENSTAND NUTZEN')
.setDescription("\n\t\t\t\t\t\t\u00BB Oh <@".concat(user.id, ">, <@").concat(ctx.interaction.user.id, "> hat eine **").concat(name, "** an dir benutzt!\n\t\t\t\t\t\tFalls du dieses Mathe R\u00E4tsel l\u00F6st, passiert nichts.\n\n\t\t\t\t\t\t**```").concat(math, "```**\n\t\t\t\t\t\tDie Bombe explodiert <t:").concat(Math.floor(+new Date() / 1000) + 10, ":R>\n\t\t\t\t\t")).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
}
ctx.bot.items.rem(ctx.interaction.user.id + '-' + itemid.toUpperCase() + 'S-' + ctx.interaction.guild.id, 1);
ctx.log(false, "[CMD] ITEMUSE : ".concat(user.id, " : ").concat(itemid.toUpperCase()));
if (!(itemcat === 'bomb')) return [3, 7];
return [4, ctx.interaction.reply({ content: '<@' + user.id + '>', embeds: [message], components: [row], fetchReply: true })];
case 6:
msg_1 = _b.sent();
expiration_1 = function () { return __awaiter(_this, void 0, void 0, function () {
var member, member, member, filtered_1, i_1;
return __generator(this, function (_a) {
switch (_a.label) {
case 0:
if (!ctx.bot.bomb.has('TIMEOUT-' + user.id + '-' + ctx.interaction.guild.id))
return [2];
ctx.bot.bomb.delete('TIMEOUT-' + user.id + '-' + ctx.interaction.guild.id);
ctx.bot.bomb.delete('MESSAGES-' + user.id + '-' + ctx.interaction.guild.id);
{
msg_1.components[0].components[0].data.disabled = true;
msg_1.components[0].components[1].data.disabled = true;
msg_1.components[0].components[2].data.disabled = true;
msg_1.components[0].components[3].data.disabled = true;
}
;
msg_1.components[0].components[Number(sb) - 1].data.style = discord_js_1.ButtonStyle.Success;
if (!(itemid === 'nbomb')) return [3, 2];
return [4, ctx.interaction.guild.members.fetch(user.id)];
case 1:
member = _a.sent();
member.timeout(15 * 1000, 'BOMB TIMEOUT FROM ' + ctx.interaction.user.id).catch(function () { });
_a.label = 2;
case 2:
;
if (!(itemid === 'mbomb')) return [3, 4];
return [4, ctx.interaction.guild.members.fetch(user.id)];
case 3:
member = _a.sent();
member.timeout(30 * 1000, 'BOMB TIMEOUT FROM ' + ctx.interaction.user.id).catch(function () { });
_a.label = 4;
case 4:
;
if (!(itemid === 'hbomb')) return [3, 6];
return [4, ctx.interaction.guild.members.fetch(user.id)];
case 5:
member = _a.sent();
member.timeout(45 * 1000, 'BOMB TIMEOUT FROM ' + ctx.interaction.user.id).catch(function () { });
_a.label = 6;
case 6:
;
if (!(itemid === 'cbomb')) return [3, 9];
filtered_1 = [];
i_1 = 0;
return [4, messages];
case 7:
(_a.sent()).filter(function (m) {
if (m.author.id === user.id && 1 > i_1) {
filtered_1.push(m);
i_1++;
}
});
return [4, channel.bulkDelete(filtered_1, true)];
case 8:
_a.sent();
_a.label = 9;
case 9:
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXOPEN:1024395281460101213> » USE ITEM')
.setDescription("\u00BB <@".concat(user.id, "> has failed to diffuse the Bomb! OHNO"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXOPEN:1024395281460101213> » GEGENSTAND NUTZEN')
.setDescription("\u00BB <@".concat(user.id, "> hat es nicht geschafft, die Bombe zu entsch\u00E4rfen! OH"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] ITEMUSE : ".concat(user.id, " : EXPIRED"));
ctx.interaction.editReply({ content: '', embeds: [message], components: msg_1.components }).catch(function () { });
return [2];
}
});
}); };
setTimeout(function () { return expiration_1(); }, 10000);
_b.label = 7;
case 7: return [2];
}
});
});
}
};
//# sourceMappingURL=itemuse.js.map