"use strict";
var __assign = (this && this.__assign) || function () {
__assign = Object.assign || function(t) {
for (var s, i = 1, n = arguments.length; i < n; i++) {
s = arguments[i];
for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
t[p] = s[p];
}
return t;
};
return __assign.apply(this, arguments);
};
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
var __values = (this && this.__values) || function(o) {
var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
if (m) return m.call(o);
if (o && typeof o.length === "number") return {
next: function () {
if (o && i >= o.length) o = void 0;
return { value: o && o[i++], done: !o };
}
};
throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var simple_git_1 = __importDefault(require("simple-git"));
var git = (0, simple_git_1.default)();
exports.default = {
data: {
name: 'commits-page'
},
execute: function (ctx, commitCount, pageNumber, type) {
return __awaiter(this, void 0, void 0, function () {
var embedDesc, gitInfos, commits, index, startIndex, endIndex, _a, _b, element, count, formattedCount, message;
var e_1, _c;
return __generator(this, function (_d) {
switch (_d.label) {
case 0:
if (type === 'back')
pageNumber--;
if (type === 'next')
pageNumber++;
embedDesc = '';
return [4, git.log({
'--pretty': 'format:{"hash":"%h","subject":"%s","author":"%aN","authorDate":"%ad"}'
})];
case 1:
gitInfos = _d.sent();
commits = gitInfos.all;
commits.sort(function (a, b) {
var dateA = new Date(a.authorDate).getTime();
var dateB = new Date(b.authorDate).getTime();
return dateA - dateB;
});
commits.splice(commitCount);
index = 0;
commits.reverse().forEach(function (commit) {
commits[index++] = __assign(__assign({}, commit), { count: index });
});
startIndex = (pageNumber - 1) * 10;
endIndex = Math.min(startIndex + 10, commits.length);
try {
for (_a = __values(commits.slice(startIndex, endIndex).reverse()), _b = _a.next(); !_b.done; _b = _a.next()) {
element = _b.value;
count = element.count;
formattedCount = count.toString();
if (count < 100)
formattedCount = '0' + count;
if (count < 10)
formattedCount = '00' + count;
embedDesc += "**`".concat(formattedCount, ".`** \u00BB ").concat(element.message, "\n");
}
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
try {
if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
}
finally { if (e_1) throw e_1.error; }
}
ctx.components.rows[0].components[0].setCustomId("COMMITS-REFRESH-".concat(commitCount, "-").concat(pageNumber));
ctx.components.rows[0].components[1].setCustomId("COMMITS-BACK-".concat(commitCount, "-").concat(pageNumber));
ctx.components.rows[0].components[2].setCustomId("COMMITS-NEXT-".concat(commitCount, "-").concat(pageNumber));
if (!ctx.components.rows[0].components[1].data.disabled && pageNumber <= 1) {
ctx.components.rows[0].components[1].setDisabled(true);
}
else {
ctx.components.rows[0].components[1].setDisabled(false);
}
;
if (!ctx.components.rows[0].components[2].data.disabled && pageNumber >= Number((commits.length / 10).toFixed(0))) {
ctx.components.rows[0].components[2].setDisabled(true);
}
else {
ctx.components.rows[0].components[2].setDisabled(false);
}
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GLOBE:1024403680503529583> » GIT COMMITS')
.setDescription(embedDesc)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version + ' » PAGE ' + pageNumber });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GLOBE:1024403680503529583> » GIT COMMITS')
.setDescription(embedDesc)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version + ' » SEITE ' + pageNumber });
}
ctx.log(false, "[BTN] COMMITS : ".concat(type.toUpperCase(), " : ").concat(commits.length, " : ").concat(pageNumber));
return [2, ctx.interaction.update({ embeds: [message], components: (ctx.components.getAPI()) })];
}
});
});
}
};
//# sourceMappingURL=page.js.map