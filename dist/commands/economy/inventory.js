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
.setName('inventory')
.setDMPermission(false)
.setDescription('SEE YOUR INVENTORY')
.setDescriptionLocalizations({
de: 'SEHE DEIN INVENTAR'
})
.addUserOption(function (option) {
return option.setName('user')
.setNameLocalizations({
de: 'nutzer'
})
.setDescription('THE USER')
.setDescriptionLocalizations({
de: 'DER NUTZER'
})
.setRequired(false);
}),
execute: function (ctx) {
return __awaiter(this, void 0, void 0, function () {
var user, nbombs, mbombs, hbombs, cbombs, carname, car, car, message;
return __generator(this, function (_a) {
switch (_a.label) {
case 0:
user = ctx.interaction.options.getUser("user");
if (!!user) return [3, 6];
return [4, ctx.bot.items.get(ctx.interaction.user.id + '-NBOMBS-' + ctx.interaction.guild.id, 'amount')];
case 1:
nbombs = _a.sent();
return [4, ctx.bot.items.get(ctx.interaction.user.id + '-MBOMBS-' + ctx.interaction.guild.id, 'amount')];
case 2:
mbombs = _a.sent();
return [4, ctx.bot.items.get(ctx.interaction.user.id + '-HBOMBS-' + ctx.interaction.guild.id, 'amount')];
case 3:
hbombs = _a.sent();
return [4, ctx.bot.items.get(ctx.interaction.user.id + '-CBOMBS-' + ctx.interaction.guild.id, 'amount')];
case 4:
cbombs = _a.sent();
return [4, ctx.bot.items.get(ctx.interaction.user.id + '-CAR-' + ctx.interaction.guild.id, 'value')];
case 5:
car = _a.sent();
carname = 'NONE';
if (ctx.metadata.language === 'de')
carname = 'KEINS';
if (car === 'jeep')
carname = '2016 JEEP PATRIOT SPORT';
if (car === 'kia')
carname = '2022 KIA SORENTO';
if (car === 'audi')
carname = 'AUDI R8 COUPE V10';
if (car === 'tesla')
carname = 'TESLA MODEL Y';
if (car === 'porsche')
carname = '2019 PORSCHE 911 GT2RS';
return [3, 12];
case 6: return [4, ctx.bot.items.get(user.id + '-NBOMBS-' + ctx.interaction.guild.id, 'amount')];
case 7:
nbombs = _a.sent();
return [4, ctx.bot.items.get(user.id + '-MBOMBS-' + ctx.interaction.guild.id, 'amount')];
case 8:
mbombs = _a.sent();
return [4, ctx.bot.items.get(user.id + '-HBOMBS-' + ctx.interaction.guild.id, 'amount')];
case 9:
hbombs = _a.sent();
return [4, ctx.bot.items.get(user.id + '-CBOMBS-' + ctx.interaction.guild.id, 'amount')];
case 10:
cbombs = _a.sent();
return [4, ctx.bot.items.get(user.id + '-CAR-' + ctx.interaction.guild.id, 'value')];
case 11:
car = _a.sent();
carname = 'NONE';
if (ctx.metadata.language === 'de')
carname = 'KEINS';
if (car === 'jeep')
carname = '2016 JEEP PATRIOT SPORT';
if (car === 'kia')
carname = '2022 KIA SORENTO';
if (car === 'audi')
carname = 'AUDI R8 COUPE V10';
if (car === 'tesla')
carname = 'TESLA MODEL Y';
if (car === 'porsche')
carname = '2019 PORSCHE 911 GT2RS';
_a.label = 12;
case 12:
if (!user) {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOX:1024394572555624510> » YOUR INVENTORY')
.setDescription("\n\t\t\t\t\t\u00BB <:NBOMB:1021783222520127508> NORMAL BOMBS\n\t\t\t\t\t**`".concat(nbombs, "/15`**\n\t\t\t\t\t\n\t\t\t\t\t\u00BB <:MBOMB:1021783295211601940> MEDIUM BOMBS\n\t\t\t\t\t**`").concat(mbombs, "/15`**\n\t\t\t\t\t\n\t\t\t\t\t\u00BB <:HBOMB:1022102357938536458> HYPER BOMBS\n\t\t\t\t\t**`").concat(hbombs, "/15`**\n\t\t\t\t\t\n\t\t\t\t\t\u00BB <:CBOMB:1021783405161091162> CRAZY BOMBS\n\t\t\t\t\t**`").concat(cbombs, "/15`**\n\t\t\t\t\t\n\t\t\t\t\t\u00BB <:CAR:1021844412998877294> CAR\n\t\t\t\t\t**`").concat(carname, "`**\n\t\t\t\t")).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOX:1024394572555624510> » DEIN INVENTAR')
.setDescription("\n\t\t\t\t\t\t\u00BB <:NBOMB:1021783222520127508> NORMALE BOMBEN\n\t\t\t\t\t\t**`".concat(nbombs, "/15`**\n\t\t\t\t\t\t\n\t\t\t\t\t\t\u00BB <:MBOMB:1021783295211601940> MEDIUM BOMBEN\n\t\t\t\t\t\t**`").concat(mbombs, "/15`**\n\t\t\t\t\t\t\n\t\t\t\t\t\t\u00BB <:HBOMB:1022102357938536458> HYPER BOMBEN\n\t\t\t\t\t\t**`").concat(hbombs, "/15`**\n\t\t\t\t\t\t\n\t\t\t\t\t\t\u00BB <:CBOMB:1021783405161091162> CRAZY BOMBEN\n\t\t\t\t\t\t**`").concat(cbombs, "/15`**\n\t\t\t\t\t\t\n\t\t\t\t\t\t\u00BB <:CAR:1021844412998877294> AUTO\n\t\t\t\t\t\t**`").concat(carname, "`**\n\t\t\t\t\t")).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
}
else {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOX:1024394572555624510> » THE INVENTORY OF ' + user.username.toUpperCase() + '#' + user.discriminator)
.setDescription("\n\t\t\t\t\t\u00BB <:NBOMB:1021783222520127508> NORMAL BOMBS\n\t\t\t\t\t**`".concat(nbombs, "/15`**\n\n\t\t\t\t\t\u00BB <:MBOMB:1021783295211601940> MEDIUM BOMBS\n\t\t\t\t\t**`").concat(mbombs, "/15`**\n\n\t\t\t\t\t\u00BB <:HBOMB:1022102357938536458> HYPER BOMBS\n\t\t\t\t\t**`").concat(hbombs, "/15`**\n\n\t\t\t\t\t\u00BB <:CBOMB:1021783405161091162> CRAZY BOMBS\n\t\t\t\t\t**`").concat(cbombs, "/15`**\n\n\t\t\t\t\t\u00BB <:CAR:1021844412998877294> CAR\n\t\t\t\t\t**`").concat(carname, "`**\n\t\t\t\t")).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BOX:1024394572555624510> » DAS INVENTAR VON ' + user.username.toUpperCase() + '#' + user.discriminator)
.setDescription("\n\t\t\t\t\t\t\u00BB <:NBOMB:1021783222520127508> NORMALE BOMBEN\n\t\t\t\t\t\t**`".concat(nbombs, "/15`**\n\n\t\t\t\t\t\t\u00BB <:MBOMB:1021783295211601940> MEDIUM BOMBEN\n\t\t\t\t\t\t**`").concat(mbombs, "/15`**\n\n\t\t\t\t\t\t\u00BB <:HBOMB:1022102357938536458> HYPER BOMBEN\n\t\t\t\t\t\t**`").concat(hbombs, "/15`**\n\n\t\t\t\t\t\t\u00BB <:CBOMB:1021783405161091162> CRAZY BOMBEN\n\t\t\t\t\t\t**`").concat(cbombs, "/15`**\n\n\t\t\t\t\t\t\u00BB <:CAR:1021844412998877294> AUTO\n\t\t\t\t\t\t**`").concat(carname, "`**\n\t\t\t\t\t")).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
}
ctx.log(false, "[CMD] INVENTORY");
return [2, ctx.interaction.reply({ embeds: [message] })];
}
});
});
}
};
//# sourceMappingURL=inventory.js.map