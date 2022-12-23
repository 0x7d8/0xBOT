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
.setName('language')
.setDescription('CHANGE THE LANGUAGE')
.setDescriptionLocalizations({
de: 'ÄNDERE DIE SPRACHE'
})
.setDMPermission(false)
.addStringOption(function (option) {
return option.setName('language')
.setNameLocalizations({
de: 'sprache'
})
.setDescription('THE LANGUAGE')
.setDescriptionLocalizations({
de: 'DIE SPRACHE'
})
.setRequired(true)
.addChoices({ name: '🇩🇪 DEUTSCH', value: 'de' }, { name: '🇬🇧 ENGLISH', value: 'en' });
})
.setDefaultMemberPermissions(v10_1.PermissionFlagsBits.ManageMessages),
execute: function (ctx) {
return __awaiter(this, void 0, void 0, function () {
var lang, langString, message;
return __generator(this, function (_a) {
lang = ctx.getOption('language');
if (lang === 'de')
langString = 'DEUTSCH';
if (lang === 'en')
langString = 'ENGLISH';
ctx.bot.language.set(ctx.interaction.guild.id, lang);
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('» LANGUAGE')
.setDescription("\u00BB Language successfully set to **".concat(langString, "**!"))
.setFooter({ text: '» ' + ctx.client.config.version });
if (lang === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('» SPRACHE')
.setDescription("\u00BB Sprache erfolgreich auf **".concat(langString, "** gesetzt!"))
.setFooter({ text: '» ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] LANGUAGE : ".concat(langString));
return [2, ctx.interaction.reply({ embeds: [message], ephemeral: true })];
});
});
}
};
//# sourceMappingURL=language.js.map