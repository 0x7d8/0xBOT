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
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const utils = __importStar(require("rjutils-collection"));
exports.default = {
data: new discord_js_1.SlashCommandBuilder()
.setName('password')
.setDMPermission(false)
.setDescription('GENERATE A PASSWORD')
.setDescriptionLocalizations({
de: 'GENERIERE EIN PASSWORT'
})
.addIntegerOption((option) => option.setName('length')
.setNameLocalizations({
de: 'länge'
})
.setDescription('THE length')
.setDescriptionLocalizations({
de: 'DIE LÄNGE'
})
.setRequired(true)),
async execute(ctx) {
const length = ctx.getOption('length');
if (length > 512) {
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription(`» The Maximum Size is **512**!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription(`» Die Maximale Größe ist **512**!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[CMD] PASSWORD : TOOBIG : ${length}`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
if (length < 4) {
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
.setDescription(`» The Minimum Size is **4**!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
.setDescription(`» Die Minimale Größe ist **4**!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[CMD] PASSWORD : TOOSMALL : ${length}`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
const password = utils.randomStr({
"numbers": true,
"uppercase": true,
"symbols": true,
"length": length
});
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:KEY:1024392167130664980> » GENERATE PASSWORD')
.setDescription(`
» Password
\`\`\`${password.replace('```', '``"')}\`
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:KEY:1024392167130664980> » PASSWORT GENERIEREN')
.setDescription(`
» Passwort
\`\`\`${password.replace('```', '``"')}\`\`\`
`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[CMD] PASSWORD : ${length}`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
};
//# sourceMappingURL=password.js.map