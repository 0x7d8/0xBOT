"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
if (k2 === undefined) k2 = k;
var desc = Object.getOwnPropertyDescriptor(m, k);
if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
  desc = { enumerable: true, get: function() { return m[k]; } };
}
Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
if (k2 === undefined) k2 = k;
o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
if (mod && mod.__esModule) return mod;
var result = {};
if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
__setModuleDefault(result, mod);
return result;
};
const webserver = __importStar(require("rjweb-server"));
const discord_js_1 = require("discord.js");
module.exports = {
method: webserver.types.post,
path: '/webhook/dblcom',
async code(ctr) {
if (ctr.headers.get('authorization') !== ctr['@'].config.web.keys.dbl.webkey)
return ctr.status(401).print({ "success": false, "message": 'WRONG AUTHORIZATION' });
if (!ctr.body.id)
return;
const random = ctr['@'].bot.random(7500, 15000);
let extra;
if ((await ctr['@'].bot.votes.get(ctr.body.id + '-A') + 1) % 10 === 0)
extra = ((await ctr['@'].bot.votes.get(ctr.body.id + '-A') + 1) * 10000) / 2;
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('» VOTING')
.setDescription(`» Thanks for Voting! You got **\$${random}** from me :)\n» Danke fürs Voten! Du hast **${random}€** von mir erhalten :)`)
.setFooter({ text: '» ' + ctr['@'].config.version });
if (await ctr['@'].bot.language.get(ctr.body.id) === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('» VOTING')
.setDescription(`» Danke fürs Voten! Du hast **${random}€** von mir erhalten :)`)
.setFooter({ text: '» ' + ctr['@'].config.version });
}
else {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('» VOTING')
.setDescription(`» Thanks for Voting! You got **\$${random}** from me :)`)
.setFooter({ text: '» ' + ctr['@'].config.version });
}
;
let messageBonus = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('» VOTING')
.setDescription(`» Thanks for Voting **${(await ctr['@'].bot.votes.get(ctr.body.id + '-A')) + 1}** times!\nAs A Gift I give you extra **\$${extra}**!`)
.setFooter({ text: '» ' + ctr['@'].config.version });
if (await ctr['@'].bot.language.get(ctr.body.id) === 'de') {
messageBonus = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('» VOTING')
.setDescription(`» Danke, dass du **${(await ctr['@'].bot.votes.get(ctr.body.id + '-A')) + 1}** mal gevotet hast!\nAls Geschenk gebe ich dir extra **${extra}€**!`)
.setFooter({ text: '» ' + ctr['@'].config.version });
}
await ctr['@'].bot.money.add(false, ctr.body.id, random);
console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [WEB] VOTED : ${ctr.body.id} : ${random}€ : DBLCOM`);
ctr['@'].client.users.send(ctr.body.id, { embeds: [message] });
if ((await ctr['@'].bot.votes.get(ctr.body.id + '-A') + 1) % 10 === 0) {
ctr['@'].bot.money.add(false, ctr.body.id, extra);
ctr['@'].client.users.send(ctr.body.id, { embeds: [messageBonus] });
}
;
ctr['@'].bot.votes.add(ctr.body.id + '-A', 1);
ctr['@'].bot.votes.set(ctr.body.id + '-T', Date.now());
return ctr.print({ "success": true, "message": 'VOTE RECIEVED' });
}
};
//# sourceMappingURL=dblcom.js.map