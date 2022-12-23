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
data: new discord_js_2.SlashCommandBuilder()
.setName('search')
.setDMPermission(false)
.setDescription('SHOW A BUTTON TO A SEARCH')
.setDescriptionLocalizations({
de: 'ZEIGE EINEN KNOPF ZU EINER SUCHE'
})
.addStringOption(function (option) {
return option.setName('query')
.setNameLocalizations({
de: 'suche'
})
.setDescription('THE QUERY')
.setDescriptionLocalizations({
de: 'DIE SUCHE'
})
.setRequired(true);
})
.addStringOption(function (option) {
return option.setName('engine')
.setDescription('THE SEARCH ENGINE')
.setDescriptionLocalizations({
de: 'DIE SUCHMASCHINE'
})
.setRequired(false)
.addChoices({ name: '🤔 GOOGLE', value: 'Google' }, { name: '⭐ BING', value: 'Bing' }, { name: '⭐ YAHOO', value: 'Yahoo' }, { name: '⭐ DUCKDUCKGO', value: 'DuckDuckGo' });
}),
execute: function (ctx) {
return __awaiter(this, void 0, void 0, function () {
var query, engine, google, bing, yahoo, duck, message;
return __generator(this, function (_a) {
switch (_a.label) {
case 0:
query = ctx.getOption('query');
engine = ctx.getOption('engine');
if (!engine)
engine = 'Google';
query = encodeURIComponent(query);
google = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setLabel('👀 ANSCHAUEN')
.setURL("https://google.com/search?q=" + query)
.setStyle(discord_js_1.ButtonStyle.Link));
bing = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setLabel('👀 ANSCHAUEN')
.setURL("https://bing.com/search?q=" + query)
.setStyle(discord_js_1.ButtonStyle.Link));
yahoo = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setLabel('👀 ANSCHAUEN')
.setURL("https://search.yahoo.com/search?q=" + query)
.setStyle(discord_js_1.ButtonStyle.Link));
duck = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setLabel('👀 ANSCHAUEN')
.setURL("https://duckduckgo.com/?q=" + query)
.setStyle(discord_js_1.ButtonStyle.Link));
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:SEARCH:1024389710279348354> » SEARCH')
.setDescription("\u00BB Click Below to look up results for **".concat(decodeURIComponent(query), "** on **").concat(engine, "**!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:SEARCH:1024389710279348354> » SUCHEN')
.setDescription("\u00BB Klicke unten um nach Ergebnissen f\u00FCr **".concat(decodeURIComponent(query), "** auf **").concat(engine, "** zu finden!"))
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] SEARCH : \"".concat(decodeURIComponent(query).toUpperCase(), "\" : ").concat(engine.toUpperCase()));
if (!(engine === 'Google')) return [3, 2];
return [4, ctx.interaction.reply({ embeds: [message], components: [google] })];
case 1:
_a.sent();
_a.label = 2;
case 2:
;
if (!(engine === 'Bing')) return [3, 4];
return [4, ctx.interaction.reply({ embeds: [message], components: [bing] })];
case 3:
_a.sent();
_a.label = 4;
case 4:
;
if (!(engine === 'Yahoo')) return [3, 6];
return [4, ctx.interaction.reply({ embeds: [message], components: [yahoo] })];
case 5:
_a.sent();
_a.label = 6;
case 6:
;
if (!(engine === 'DuckDuckGo')) return [3, 8];
return [4, ctx.interaction.reply({ embeds: [message], components: [duck] })];
case 7:
_a.sent();
_a.label = 8;
case 8: return [2];
}
});
});
}
};
//# sourceMappingURL=search.js.map