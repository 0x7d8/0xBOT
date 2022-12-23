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
name: 'meme'
},
execute: function (ctx, type) {
return __awaiter(this, void 0, void 0, function () {
var axios, message_1, random, subreddit, req, res, upvotes, comments, message;
return __generator(this, function (_a) {
switch (_a.label) {
case 0: return [4, import('axios')];
case 1:
axios = (_a.sent()).default;
return [4, ctx.bot.settings.get(ctx.interaction.guild.id, 'meme')];
case 2:
if (!(_a.sent())) {
message_1 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription("\u00BB The **`/meme`** Command is disabled on this Server!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message_1 = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription("\u00BB Der **`/meme`** Befehl ist auf diesem Server deaktiviert!")
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[BTN] MEME : DISABLED");
return [2, ctx.interaction.reply({ embeds: [message_1], ephemeral: true })];
}
return [4, ctx.interaction.deferUpdate()];
case 3:
_a.sent();
random = ctx.bot.random(1, 5);
if (random === 1)
subreddit = 'memes';
if (random === 2)
subreddit = 'me_irl';
if (random === 3)
subreddit = 'CrappyDesign';
if (random === 4)
subreddit = 'dankmemes';
if (random === 5)
subreddit = 'terriblefacebookmemes';
return [4, axios.get("https://www.reddit.com/r/".concat(subreddit, "/random/.json"))];
case 4:
req = _a.sent();
res = req.data;
upvotes = res[0].data.children[0].data.ups;
comments = res[0].data.children[0].data.num_comments;
if (upvotes === 187)
upvotes = upvotes + ' 🐊';
if (comments === 187)
comments = comments + ' 🐊';
ctx.components.rows[0].components[1].setLabel(String(upvotes));
ctx.components.rows[0].components[2].setLabel(String(comments));
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle("<:IMAGE:1024405297579696179> \u00BB ".concat(res[0].data.children[0].data.title.toUpperCase()))
.setDescription("\n\t\t\t\t\u00BB SUBREDDIT:\n\t\t\t\t`r/".concat(subreddit, "`\n\t\t\t")).setImage(res[0].data.children[0].data.url)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle("<:IMAGE:1024405297579696179> \u00BB ".concat(res[0].data.children[0].data.title.toUpperCase()))
.setDescription("\n\t\t\t\t\t\u00BB SUBREDDIT:\n\t\t\t\t\t`r/".concat(subreddit, "`\n\t\t\t\t")).setImage(res[0].data.children[0].data.url)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[BTN] MEME : ".concat(subreddit.toUpperCase(), " : ").concat(upvotes, "^ : ").concat(comments));
return [2, ctx.interaction.editReply({ embeds: [message], components: (ctx.components.getAPI()) })];
}
});
});
}
};
//# sourceMappingURL=meme.js.map