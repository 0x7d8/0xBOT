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
data: {
name: 'item-bomb'
},
execute: function (ctx, solution, choice, solbutton, button, itemid, reciever) {
return __awaiter(this, void 0, void 0, function () {
var message_1, message, messages, member, member, member, filtered_1, i_1;
return __generator(this, function (_a) {
switch (_a.label) {
case 0:
if (ctx.interaction.user.id !== reciever) {
message_1 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB This choice is up to <@".concat(reciever, ">!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_1 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Diese Frage ist f\u00FCr <@".concat(reciever, ">!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[BTN] ITEMUSE : NOTSENDER");
return [2, ctx.interaction.reply({ embeds: [message_1], ephemeral: true })];
}
ctx.bot.bomb.delete('TIMEOUT-' + reciever + '-' + ctx.interaction.guild.id);
ctx.components.rows[0].components[0].setDisabled(true);
ctx.components.rows[0].components[1].setDisabled(true);
ctx.components.rows[0].components[2].setDisabled(true);
ctx.components.rows[0].components[3].setDisabled(true);
ctx.components.rows[0].components[Number(button) - 1].setStyle(4);
ctx.components.rows[0].components[Number(solbutton) - 1].setStyle(3);
if (solution === choice) {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXOPEN:1024395281460101213> » USE ITEM')
.setDescription("\u00BB <@".concat(reciever, "> has diffused the Bomb! YAY"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXOPEN:1024395281460101213> » GEGENSTAND NUTZEN')
.setDescription("\u00BB <@".concat(reciever, "> hat die Bombe entsch\u00E4rft! YAY"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
}
else {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXOPEN:1024395281460101213> » USE ITEM')
.setDescription("\u00BB <@".concat(reciever, "> has failed to diffuse the Bomb! OHNO"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOXOPEN:1024395281460101213> » GEGENSTAND NUTZEN')
.setDescription("\u00BB <@".concat(reciever, "> hat es nicht geschafft, die Bombe zu entsch\u00E4rfen! OH"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
}
messages = ctx.bot.bomb.get('MESSAGES-' + reciever + '-' + ctx.interaction.guild.id);
ctx.bot.bomb.delete('MESSAGES-' + reciever + '-' + ctx.interaction.guild.id);
if (!(solution !== choice)) return [3, 9];
if (!(itemid === 'nbomb')) return [3, 2];
return [4, ctx.interaction.guild.members.fetch(ctx.interaction.user.id)];
case 1:
member = _a.sent();
member.timeout(15 * 1000, "BOMB TIMEOUT FROM ".concat(ctx.interaction.user.id)).catch(function () { });
_a.label = 2;
case 2:
;
if (!(itemid === 'mbomb')) return [3, 4];
return [4, ctx.interaction.guild.members.fetch(ctx.interaction.user.id)];
case 3:
member = _a.sent();
member.timeout(30 * 1000, "BOMB TIMEOUT FROM ".concat(ctx.interaction.user.id)).catch(function () { });
_a.label = 4;
case 4:
;
if (!(itemid === 'hbomb')) return [3, 6];
return [4, ctx.interaction.guild.members.fetch(ctx.interaction.user.id)];
case 5:
member = _a.sent();
member.timeout(45 * 1000, "BOMB TIMEOUT FROM ".concat(ctx.interaction.user.id)).catch(function () { });
_a.label = 6;
case 6:
;
if (!(itemid === 'cbomb')) return [3, 9];
filtered_1 = [];
i_1 = 0;
return [4, messages];
case 7:
(_a.sent()).filter(function (m) {
if (m.author.id === ctx.interaction.user.id && 1 > i_1) {
filtered_1.push(m);
i_1++;
}
});
return [4, ctx.interaction.channel.bulkDelete(filtered_1, true)];
case 8:
_a.sent();
_a.label = 9;
case 9:
ctx.log(false, "[BTN] ITEMUSE : BOMB : ".concat(choice, " : ").concat(solution));
return [2, ctx.interaction.update({ content: '', embeds: [message], components: (ctx.components.getAPI()) })];
}
});
});
}
};
//# sourceMappingURL=bomb.js.map