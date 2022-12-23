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
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
exports.default = {
data: new discord_js_1.SlashCommandBuilder()
.setName('transactionsearch')
.setDescription('SEARCH A TRANSACTION')
.setDescriptionLocalizations({
de: 'SUCHE EINE TRANSAKTION'
})
.setDMPermission(false)
.addUserOption(function (option) {
return option.setName('sender')
.setDescription('THE SENDER')
.setDescriptionLocalizations({
de: 'DER SENDER'
})
.setRequired(false);
})
.addUserOption(function (option) {
return option.setName('reciever')
.setNameLocalizations({
de: 'empfänger'
})
.setDescription('THE RECIEVER')
.setDescriptionLocalizations({
de: 'DER EMPFÄNGER'
})
.setRequired(false);
}),
execute: function (ctx) {
return __awaiter(this, void 0, void 0, function () {
var sender, reciever, embedDesc, rawvalues, _a, _b, element, message;
var e_1, _c;
return __generator(this, function (_d) {
switch (_d.label) {
case 0:
sender = ctx.interaction.options.getUser("sender");
reciever = ctx.interaction.options.getUser("reciever");
embedDesc = '';
if (!(sender && reciever)) return [3, 2];
return [4, ctx.db.query("select * from usertransactions where senderid = $1 and recieverid = $2 order by timestamp desc limit 20;", [
sender.id,
reciever.id
])];
case 1:
rawvalues = _d.sent();
return [3, 8];
case 2:
if (!(sender && !reciever)) return [3, 4];
return [4, ctx.db.query("select * from usertransactions where senderid = $1 order by timestamp desc limit 20;", [
sender.id
])];
case 3:
rawvalues = _d.sent();
return [3, 8];
case 4:
if (!(!sender && reciever)) return [3, 6];
return [4, ctx.db.query("select * from usertransactions where recieverid = $1 order by timestamp desc limit 20;", [
reciever.id
])];
case 5:
rawvalues = _d.sent();
return [3, 8];
case 6: return [4, ctx.db.query("select * from usertransactions order by timestamp desc limit 20;")];
case 7:
rawvalues = _d.sent();
_d.label = 8;
case 8:
try {
for (_a = __values(rawvalues.rows), _b = _a.next(); !_b.done; _b = _a.next()) {
element = _b.value;
if (ctx.metadata.language === 'de')
embedDesc += "\u00BB ".concat((/^\d/.test(element.senderid) ? "<@".concat(element.senderid, ">") : element.senderid), " | **").concat(element.senderamount, "\u20AC** -> ").concat((/^\d/.test(element.recieverid) ? "<@".concat(element.recieverid, ">") : element.recieverid), "\nID: `").concat(element.id, "`\n");
else
embedDesc += "\u00BB ".concat((/^\d/.test(element.senderid) ? "<@".concat(element.senderid, ">") : element.senderid), " | **$").concat(element.senderamount, "** -> ").concat((/^\d/.test(element.recieverid) ? "<@".concat(element.recieverid, ">") : element.recieverid), "\nID: `").concat(element.id, "`\n");
}
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
try {
if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
}
finally { if (e_1) throw e_1.error; }
}
;
if (embedDesc === '') {
embedDesc = 'Nothing Found.';
if (ctx.metadata.language === 'de') {
embedDesc = 'Nichts Gefunden.';
}
}
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BAG:1024389219558367292> » TRANSACTION SEARCH')
.setDescription(embedDesc)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:BAG:1024389219558367292> » TRANSAKTIONS SUCHE')
.setDescription(embedDesc)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, "[CMD] TRANSACTIONSEARCH : ".concat(sender ? 'EMPTY' : sender.id, " : ").concat(reciever ? 'EMPTY' : reciever.id));
return [2, ctx.interaction.reply({ embeds: [message] })];
}
});
});
}
};
//# sourceMappingURL=transactionsearch.js.map