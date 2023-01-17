"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { EmbedBuilder } = require('discord.js');
exports.default = {
data: {
name: 'say'
},
async execute(ctx) {
const title = ctx.interaction.fields.getTextInputValue('say-title');
const content = ctx.interaction.fields.getTextInputValue('say-content');
let message;
if (ctx.interaction.user.id !== '745619551865012274') {
message = new EmbedBuilder().setColor(0x37009B)
.setTitle(title)
.setDescription(content)
.setFooter({ text: '» ' + ctx.client.config.version + ' » NOT OFFICIAL' });
if (ctx.metadata.language === 'de') {
message = new EmbedBuilder().setColor(0x37009B)
.setTitle(title)
.setDescription(content)
.setFooter({ text: '» ' + ctx.client.config.version + ' » NICHT OFFIZIELL' });
}
}
else {
message = new EmbedBuilder().setColor(0x37009B)
.setTitle(title)
.setDescription(content)
.setFooter({ text: '» ' + ctx.client.config.version });
}
ctx.log(false, `[MOD] SAY : ${title.toUpperCase()} : ${content.toUpperCase()}`);
return ctx.interaction.reply({ embeds: [message] });
}
};
//# sourceMappingURL=say.js.map