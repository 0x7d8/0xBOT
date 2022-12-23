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
.setName('businessinfo')
.setDMPermission(false)
.setDescription('VIEW INFO ABOUT BUSINESSES')
.setDescriptionLocalizations({
de: 'SEHE INFOS VON GESCHÄFTEN'
})
.addStringOption(function (option) {
return option.setName('business')
.setNameLocalizations({
de: 'geschäft'
})
.setDescription('THE BUSINESS')
.setDescriptionLocalizations({
de: 'DAS GESCHÄFT'
})
.setRequired(true)
.addChoices({ name: '🟢 SUPERMARKT', value: 'market' }, { name: '🔵 PARKHAUS', value: 'parking garage' }, { name: '🟡 AUTOHAUS', value: 'car dealership' });
}),
execute: function (ctx) {
return __awaiter(this, void 0, void 0, function () {
var message_1, business, businessid, businessowner, oldleft, businessearning, e_1, message_2, message;
return __generator(this, function (_a) {
switch (_a.label) {
case 0: return [4, ctx.bot.settings.get(ctx.interaction.guild.id, 'businesses')];
case 1:
if (!(_a.sent())) {
message_1 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB Businesses are disabled on this Server!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_1 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Gesch\u00E4fte sind auf diesem Server deaktiviert!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] BUSINESS : DISABLED");
return [2, ctx.interaction.reply({ embeds: [message_1], ephemeral: true })];
}
business = ctx.getOption('business');
if (business === 'market')
businessid = '1';
if (business === 'parking garage')
businessid = '2';
if (business === 'car dealership')
businessid = '3';
return [4, ctx.bot.businesses.get('g-' + ctx.interaction.guild.id + '-' + businessid + '-OWNER')];
case 2:
if (!((_a.sent()) != 0)) return [3, 9];
oldleft = false;
return [4, ctx.bot.businesses.get('g-' + ctx.interaction.guild.id + '-' + businessid + '-OWNER')];
case 3:
businessowner = _a.sent();
return [4, ctx.bot.businesses.get('g-' + ctx.interaction.guild.id + '-' + businessid + '-EARNING', true)];
case 4:
businessearning = _a.sent();
_a.label = 5;
case 5:
_a.trys.push([5, 7, , 8]);
return [4, ctx.interaction.guild.members.fetch(businessowner)];
case 6:
_a.sent();
return [3, 8];
case 7:
e_1 = _a.sent();
oldleft = true;
return [3, 8];
case 8:
if (!oldleft) {
message_2 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:QUESTION:1024402860210921503> » BUSINESS INFO')
.setDescription("\n\t\t\t\t\t\t\u00BB Business Infos:\n\t\t\t\t\t\t\n\t\t\t\t\t\tOwner: <@".concat(businessowner, ">\n\t\t\t\t\t\tEarnings: ").concat(businessearning, "\u20AC\n\t\t\t\t\t")).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_2 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:QUESTION:1024402860210921503> » GESCHÄFTS INFO')
.setDescription("\n\t\t\t\t\t\t\t\u00BB Gesch\u00E4fts Infos:\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\tBesitzer: <@".concat(businessowner, ">\n\t\t\t\t\t\t\tEinkommen: ").concat(businessearning, "\u20AC\n\t\t\t\t\t\t")).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] BUSINESSINFO : ".concat(business.toUpperCase()));
return [2, ctx.interaction.reply({ embeds: [message_2], ephemeral: true })];
}
_a.label = 9;
case 9:
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:QUESTION:1024402860210921503> » BUSINESS INFO')
.setDescription("\n\t\t\t\t\u00BB Noone owns this Business, people say its profitable though!\n\t\t\t\t*mhm, I say that for everything*\n\t\t\t").setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:QUESTION:1024402860210921503> » GESCHÄFTS INFO')
.setDescription("\n\t\t\t\t\t\u00BB Niemanden geh\u00F6rt dieses Gesch\u00E4ft, es besagt sich es sei aber profitabel!\n\t\t\t\t\t*naja, das sag ich bei jedem*\n\t\t\t\t").setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] BUSINESSINFO : ".concat(business.toUpperCase(), " : NOTOWNED"));
return [2, ctx.interaction.reply({ embeds: [message], ephemeral: true })];
}
});
});
}
};
//# sourceMappingURL=businessinfo.js.map