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
var discord_js_2 = require("discord.js");
exports.default = {
data: new discord_js_1.SlashCommandBuilder()
.setName('level')
.setDMPermission(false)
.setDescription('VIEW THE LEVELS')
.setDescriptionLocalizations({
de: 'SEHE DIE LEVEL'
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
var canvas, message_1, user, userobj, counts, _a, _b, _c, _d, _e, _f, _g, _h, XP, level, levelXP, totalxp, rankCard, attachment, buildCard, message;
var _this = this;
return __generator(this, function (_j) {
switch (_j.label) {
case 0: return [4, import('canvacord')];
case 1:
canvas = (_j.sent()).default;
return [4, ctx.bot.settings.get(ctx.interaction.guild.id, 'levels')];
case 2:
if (!(_j.sent())) {
message_1 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB The Level System is disabled on this Server!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_1 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Das Level System ist auf diesem Server deaktiviert!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] LEVEL : DISABLED");
return [2, ctx.interaction.reply({ embeds: [message_1], ephemeral: true })];
}
user = ctx.interaction.options.getUser('user');
if (!user)
userobj = ctx.interaction.user;
else
userobj = user;
return [4, ctx.interaction.deferReply()];
case 3:
_j.sent();
counts = [];
if (!!user) return [3, 6];
_b = (_a = counts).push;
return [4, ctx.bot.stat.get('u-' + ctx.interaction.user.id + '-' + ctx.interaction.guild.id + '-C', 'msg')];
case 4:
_b.apply(_a, [_j.sent()]);
_d = (_c = counts).push;
return [4, ctx.bot.stat.get('u-' + ctx.interaction.user.id + '-' + ctx.interaction.guild.id + '-A', 'msg')];
case 5:
_d.apply(_c, [_j.sent()]);
ctx.log(false, "[CMD] LEVEL : ".concat(counts[0]));
return [3, 9];
case 6:
_f = (_e = counts).push;
return [4, ctx.bot.stat.get('u-' + user.id + '-' + ctx.interaction.guild.id + '-C', 'msg')];
case 7:
_f.apply(_e, [_j.sent()]);
_h = (_g = counts).push;
return [4, ctx.bot.stat.get('u-' + user.id + '-' + ctx.interaction.guild.id + '-A', 'msg')];
case 8:
_h.apply(_g, [_j.sent()]);
ctx.log(false, "[CMD] LEVEL : ".concat(user.id, " : ").concat(counts[0]));
_j.label = 9;
case 9:
XP = Math.round(counts[0] / 5);
level = 0, levelXP = XP;
while (levelXP >= 500) {
level++;
levelXP -= 500;
}
totalxp = 'TOTAL XP';
if (ctx.metadata.language === 'de')
totalxp = 'ALLE XP';
rankCard = new canvas.Rank()
.setAvatar(userobj.displayAvatarURL({ format: 'png' }))
.setCurrentXP(levelXP)
.setRequiredXP(500)
.setProgressBar('#90CDF4', 'COLOR')
.setUsername(userobj.username)
.setDiscriminator(userobj.discriminator)
.setOverlay('#00000000')
.setBackground('COLOR', '#00000000')
.setProgressBarTrack('#413E4D')
.setLevel(level, 'LEVEL ', true)
.setRank(XP, totalxp, true);
buildCard = function () { return __awaiter(_this, void 0, void 0, function () {
return __generator(this, function (_a) {
switch (_a.label) {
case 0: return [4, rankCard.build()
.then(function (data) {
attachment = new discord_js_2.AttachmentBuilder(data, { name: 'rank.png', description: 'Rank Card Image' });
})];
case 1:
_a.sent();
return [2];
}
});
}); };
return [4, buildCard()];
case 10:
_j.sent();
if (!user) {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GLOBE:1024403680503529583> » YOUR LEVEL')
.setImage('attachment://rank.png')
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GLOBE:1024403680503529583> » DEIN LEVEL')
.setImage('attachment://rank.png')
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
}
else {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GLOBE:1024403680503529583> » THE LEVEL OF ' + user.username.toUpperCase())
.setImage('attachment://rank.png')
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GLOBE:1024403680503529583> » DAS LEVEL VON ' + user.username.toUpperCase())
.setImage('attachment://rank.png')
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
}
return [2, ctx.interaction.editReply({ embeds: [message], files: [attachment] })];
}
});
});
}
};
//# sourceMappingURL=level.js.map