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
exports.default = {
data: {
name: 'poll'
},
execute: function (ctx, choice) {
return __awaiter(this, void 0, void 0, function () {
var cache, yes, no, dbChoice;
return __generator(this, function (_a) {
switch (_a.label) {
case 0:
cache = ctx.interaction.message.components[0];
yes = Number((cache.components[0].data.label.split(' ['))[0]);
no = Number((cache.components[1].data.label.split(' ['))[0]);
return [4, ctx.bot.polls.get(ctx.interaction.message.id, ctx.interaction.user.id)];
case 1:
dbChoice = _a.sent();
if (dbChoice === '') {
if (choice === 'yes')
yes++;
if (choice === 'no')
no++;
ctx.bot.polls.set(ctx.interaction.message.id, ctx.interaction.user.id, (choice === 'yes'));
}
else {
if ((choice === 'yes') === dbChoice) {
if (dbChoice)
yes--;
if (!dbChoice)
no--;
ctx.bot.polls.del(ctx.interaction.message.id, ctx.interaction.user.id);
}
else {
if (dbChoice)
yes--;
if (!dbChoice)
no--;
if (choice === 'yes')
yes++;
if (choice === 'no')
no++;
ctx.bot.polls.set(ctx.interaction.message.id, ctx.interaction.user.id, (choice === 'yes'));
}
}
if (yes + no === 0) {
ctx.components.rows[0].components[0].setLabel("0 [0%]");
ctx.components.rows[0].components[1].setLabel("0 [0%]");
}
else {
ctx.components.rows[0].components[0].setLabel("".concat(yes, " [").concat(Math.round(100 * yes / (yes + no)), "%]"));
ctx.components.rows[0].components[1].setLabel("".concat(no, " [").concat(Math.round(100 * no / (yes + no)), "%]"));
}
ctx.log(false, "[BTN] POLL : ".concat(choice.toUpperCase()));
return [2, ctx.interaction.update({ components: (ctx.components.getAPI()) })];
}
});
});
}
};
//# sourceMappingURL=poll.js.map