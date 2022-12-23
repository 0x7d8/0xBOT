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
.setName('iteminfo')
.setDMPermission(false)
.setDescription('SHOW INFO ABOUT ITEMS')
.setDescriptionLocalizations({
de: 'ZEIGE INFOS ÜBER ITEMS'
})
.addStringOption(function (option) {
return option.setName('item')
.setNameLocalizations({
de: 'gegenstand'
})
.setDescription('THE ITEM')
.setDescriptionLocalizations({
de: 'DER GEGENSTAND'
})
.setRequired(true)
.addChoices({ name: '💣 NORMALE BOMBE', value: 'nbomb' }, { name: '💣 MEDIUM BOMBE', value: 'mbomb' }, { name: '💣 HYPER BOMBE', value: 'hbomb' }, { name: '💣 CRAZY BOMBE', value: 'cbomb' });
}),
execute: function (ctx) {
return __awaiter(this, void 0, void 0, function () {
var item, message;
return __generator(this, function (_a) {
item = ctx.getOption('item');
ctx.log(false, "[CMD] ITEMINFO : ".concat(item.toUpperCase()));
if (item === 'nbomb') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:QUESTION:1024402860210921503> » ITEM INFO')
.setDescription("\n\t\t\t\t\t\u00BB The **<:NBOMB:1021783222520127508> NORMAL BOMB** is used to temporarily mute people, yes, mute people.\n\t\t\t\t\tTo not get muted the reciever has to solve a small problem.\n\t\t\t\t").setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:QUESTION:1024402860210921503> » ITEM INFO')
.setDescription("\n\t\t\t\t\t\t\u00BB Die **<:NBOMB:1021783222520127508> NORMALE BOMBE** ist genutzt um Leute tempor\u00E4r zu muten, ja, muten.\n\t\t\t\t\t\tUm nicht gemuted zu werden, muss der empf\u00E4nger eine kleines Problem l\u00F6sen.\n\t\t\t\t\t").setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
return [2, ctx.interaction.reply({ embeds: [message], ephemeral: true })];
}
;
if (item === 'mbomb') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:QUESTION:1024402860210921503> » ITEM INFO')
.setDescription("\n\t\t\t\t\t\u00BB The **<:MBOMB:1021783295211601940> MEDIUM BOMB** is used to temporarily mute people, yes, mute people.\n\t\t\t\t\tIts slightly harder and has a longer mute time than the **<:NBOMB:1021783222520127508> NORMAL BOMB**.\n\t\t\t\t").setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:QUESTION:1024402860210921503> » ITEM INFO')
.setDescription("\n\t\t\t\t\t\t\u00BB Die **<:MBOMB:1021783295211601940> MEDIUM BOMBE** ist genutzt um Leute tempor\u00E4r zu muten, ja, muten.\n\t\t\t\t\t\tSie ist bisschen schwieriger und hat eine l\u00E4ngere Mute Zeit als die **<:NBOMB:1021783222520127508> NORMALE BOMBE**.\n\t\t\t\t\t").setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
return [2, ctx.interaction.reply({ embeds: [message], ephemeral: true })];
}
;
if (item === 'hbomb') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:QUESTION:1024402860210921503> » ITEM INFO')
.setDescription("\n\t\t\t\t\t\u00BB The **<:HBOMB:1022102357938536458> HYPER BOMB** is used to temporarily mute people, yes, mute people.\n\t\t\t\t\tIts alot harder and has a longer mute time than the **<:NBOMB:1021783222520127508> NORMAL BOMB** and the **<:MBOMB:1021783295211601940> MEDIUM BOMB**.\n\t\t\t\t").setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:QUESTION:1024402860210921503> » ITEM INFO')
.setDescription("\n\t\t\t\t\t\t\u00BB Die **<:HBOMB:1022102357938536458> HYPER BOMBE** ist genutzt um Leute tempor\u00E4r zu muten, ja, muten.\n\t\t\t\t\t\tSie ist deutlich schwieriger und hat eine l\u00E4ngere Mute Zeit als die **<:NBOMB:1021783222520127508> NORMALE BOMBE** und die **<:MBOMB:1021783295211601940> MEDIUM BOMBE**.\n\t\t\t\t\t").setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
return [2, ctx.interaction.reply({ embeds: [message], ephemeral: true })];
}
;
if (item === 'cbomb') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:QUESTION:1024402860210921503> » ITEM INFO')
.setDescription("\n\t\t\t\t\t\u00BB The **<:CBOMB:1021783405161091162> CRAZY BOMB** is used to delete the last Message from someone in the Channel.\n\t\t\t\t\tTo not get the last message deleted, the reciever has to solve a small problem.\n\t\t\t\t").setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:QUESTION:1024402860210921503> » ITEM INFO')
.setDescription("\n\t\t\t\t\t\t\u00BB Die **<:CBOMB:1021783405161091162> CRAZY BOMBE** ist genutzt um die Letzte Nachricht von jemanden im Kanal zu l\u00F6schen.\n\t\t\t\t\t\tUm nicht die letzte Nachricht gel\u00F6scht bekommen zu m\u00FCssen, muss der Empf\u00E4nger ein kleines Problem l\u00F6sen.\n\t\t\t\t\t").setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
return [2, ctx.interaction.reply({ embeds: [message], ephemeral: true })];
}
return [2];
});
});
}
};
//# sourceMappingURL=iteminfo.js.map