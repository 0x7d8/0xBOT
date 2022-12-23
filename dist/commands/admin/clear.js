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
var v10_1 = require("discord-api-types/v10");
exports.default = {
data: new discord_js_1.SlashCommandBuilder()
.setName('clear')
.setDescription('CLEAR MESSAGES')
.setDescriptionLocalizations({
de: 'ENTFERNE NACHRICHTEN'
})
.setDMPermission(false)
.addIntegerOption(function (option) {
return option.setName('amount')
.setNameLocalizations({
de: 'anzahl'
})
.setDescription('THE AMOUNT OF MESSAGES')
.setDescriptionLocalizations({
de: 'DIE ANZAHL AN NACHRICHTEN'
})
.setRequired(true);
})
.addUserOption(function (option) {
return option.setName('user')
.setNameLocalizations({
de: 'nutzer'
})
.setDescription('THE TARGET')
.setDescriptionLocalizations({
de: 'DAS ZIEL'
})
.setRequired(false);
})
.setDefaultMemberPermissions(v10_1.PermissionFlagsBits.ManageMessages),
execute: function (ctx) {
var _a, _b, _c, _d, _e;
return __awaiter(this, void 0, void 0, function () {
var message, message, amount, target, messages, message, filtered_1, i_1;
return __generator(this, function (_f) {
switch (_f.label) {
case 0:
if (!((_a = ctx.interaction.appPermissions) === null || _a === void 0 ? void 0 : _a.has('ManageMessages'))) {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB I dont think I have the **MANAGE MESSAGES** Permission!")
.setFooter({ text: '» ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Ich denke nicht, dass ich die **NACHRICHTEN VERWALTEN** Berechtigung habe!")
.setFooter({ text: '» ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] CLEAR : NOPERM");
return [2, ctx.interaction.reply({ embeds: [message], ephemeral: true })];
}
;
if (!((_b = ctx.interaction.appPermissions) === null || _b === void 0 ? void 0 : _b.has('ViewChannel'))) {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB I dont think I have the **VIEW CHANNEL** Permission!")
.setFooter({ text: '» ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Ich denke nicht, dass ich die **KAN\u00C4LE ANSEHEN** Berechtigung habe!")
.setFooter({ text: '» ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] CLEAR : NOPERM");
return [2, ctx.interaction.reply({ embeds: [message], ephemeral: true })];
}
amount = ctx.getOption('amount');
target = ctx.interaction.options.getUser("user");
messages = (_c = ctx.interaction.channel) === null || _c === void 0 ? void 0 : _c.messages.fetch();
if (amount < 1) {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB You have to delete atleast **1** Message!")
.setFooter({ text: '» ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Du musst mindestens **1** Nachricht l\u00F6schen!")
.setFooter({ text: '» ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] CLEAR : NOTENOUGH : ".concat(amount));
return [2, ctx.interaction.reply({ embeds: [message], ephemeral: true })];
}
if (!(target !== null)) return [3, 3];
filtered_1 = [];
i_1 = 0;
return [4, messages];
case 1:
(_f.sent()).filter(function (message) {
if (message.author.id === target.id && amount > i_1) {
filtered_1.push(message);
i_1++;
}
});
return [4, ((_d = ctx.interaction.channel) === null || _d === void 0 ? void 0 : _d.bulkDelete(filtered_1, true).then(function (messages) {
var message;
if (messages.size == 1) {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('» DELETE MESSAGES')
.setDescription("\u00BB You deleted **".concat(messages.size, "** Message from <@").concat(target, ">!"))
.setFooter({ text: '» ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('» NACHRICHTEN LÖSCHEN')
.setDescription("\u00BB Du hast **".concat(messages.size, "** Nachricht von <@").concat(target, "> gel\u00F6scht!"))
.setFooter({ text: '» ' + ctx.client.config.version });
}
}
else {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('» DELETE MESSAGES')
.setDescription("\u00BB You deleted **".concat(messages.size, "** Messages from <@").concat(target, ">!"))
.setFooter({ text: '» ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('» NACHRICHTEN LÖSCHEN')
.setDescription("\u00BB Du hast **".concat(messages.size, "** Nachrichten von <@").concat(target, "> gel\u00F6scht!"))
.setFooter({ text: '» ' + ctx.client.config.version });
}
}
ctx.log(false, '[CMD] CLEAR : ' + target + ' : ' + amount);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}))];
case 2:
_f.sent();
return [3, 5];
case 3: return [4, ((_e = ctx.interaction.channel) === null || _e === void 0 ? void 0 : _e.bulkDelete(amount, true).then(function (messages) {
var message;
if (messages.size == 1) {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('» DELETE MESSAGES')
.setDescription("\u00BB You deleted **".concat(messages.size, "** Message!"))
.setFooter({ text: '» ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('» NACHRICHTEN LÖSCHEN')
.setDescription("\u00BB Du hast **".concat(messages.size, "** Nachricht gel\u00F6scht!"))
.setFooter({ text: '» ' + ctx.client.config.version });
}
}
else {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('» DELETE MESSAGES')
.setDescription("\u00BB You deleted **".concat(messages.size, "** Messages!"))
.setFooter({ text: '» ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('» NACHRICHTEN LÖSCHEN')
.setDescription("\u00BB Du hast **".concat(messages.size, "** Nachrichten gel\u00F6scht!"))
.setFooter({ text: '» ' + ctx.client.config.version });
}
}
ctx.log(false, "[CMD] CLEAR : ".concat(amount));
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}))];
case 4:
_f.sent();
_f.label = 5;
case 5: return [2];
}
});
});
}
};
//# sourceMappingURL=clear.js.map