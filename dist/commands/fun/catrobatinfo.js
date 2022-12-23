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
.setName('catrobatinfo')
.setDMPermission(false)
.setDescription('GET INFO ABOUT A CATROBAT PROJECT')
.setDescriptionLocalizations({
de: 'BEKOMME INFO ÜBER EIN CATROBAT PROJEKT'
})
.addStringOption(function (option) {
return option.setName('id')
.setDescription('THE ID')
.setDescriptionLocalizations({
de: 'DIE ID'
})
.setRequired(true);
}),
execute: function (ctx) {
return __awaiter(this, void 0, void 0, function () {
var axios, id, req, info, message_1, message_2, message;
return __generator(this, function (_a) {
switch (_a.label) {
case 0: return [4, import('axios')];
case 1:
axios = (_a.sent()).default;
return [4, ctx.interaction.deferReply()];
case 2:
_a.sent();
id = ctx.getOption('id');
return [4, axios({
method: 'GET',
url: "https://share.catrob.at/api/project/".concat(id),
validateStatus: false,
headers: {}
})];
case 3:
req = _a.sent();
info = req.data;
if (req.status !== 200 && req.status !== 404) {
message_1 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CUBE:1024404832452350032> » CATROBAT PROJECT INFO')
.setDescription("\u00BB Couldnt reach the Catrobat Servers! (Status ".concat(req.status, ")"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_1 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CUBE:1024404832452350032> » CATROBAT PROJEKT INFO')
.setDescription("\u00BB Konnte die Catrobat Server nicht erreichen! (Status ".concat(req.status, ")"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] CATROBATINFO : ".concat(id.toUpperCase(), " : SERVERSDOWN"));
return [2, ctx.interaction.editReply({ embeds: [message_1] })];
}
if (req.status === 404) {
message_2 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CUBE:1024404832452350032> » CATROBAT PROJECT INFO')
.setDescription("\u00BB The Project **".concat(id, "** was not found!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_2 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CUBE:1024404832452350032> » CATROBAT PROJEKT INFO')
.setDescription("\u00BB Das Projekt **".concat(id, "** wurde nicht gefunden!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] CATROBATINFO : ".concat(id.toUpperCase(), " : NOTEXIST"));
return [2, ctx.interaction.editReply({ embeds: [message_2] })];
}
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CUBE:1024404832452350032> » CATROBAT PROJECT INFO')
.setThumbnail(info.screenshot_small)
.setDescription("\n\t\t\t\t[".concat(info.name, "](https://share.catrob.at/project/").concat(id, ")\n\t\t\t\t\n\t\t\t\t\u00BB Description\n\t\t\t\t`").concat(info.description.replace('`', '"'), "`\n\t\t\t\t\n\t\t\t\t\u00BB Size\n\t\t\t\t`").concat(Number(info.filesize).toFixed(2), "MB`\n\t\t\t")).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:CUBE:1024404832452350032> » CATOBAT PROJEKT INFO')
.setThumbnail(info.screenshot_small)
.setDescription("\n\t\t\t\t\t[".concat(info.name, "](https://share.catrob.at/project/").concat(id, ")\n\t\t\t\t\t\n\t\t\t\t\t\u00BB Beschreibung\n\t\t\t\t\t`").concat(info.description.replace('`', '"'), "`\n\t\t\t\t\t\n\t\t\t\t\t\u00BB Gr\u00F6\u00DFe\n\t\t\t\t\t`").concat(Number(info.filesize).toFixed(2), "MB`\n\t\t\t\t")).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] CATROBATINFO : ".concat(id.toUpperCase()));
return [2, ctx.interaction.editReply({ embeds: [message] })];
}
});
});
}
};
//# sourceMappingURL=catrobatinfo.js.map