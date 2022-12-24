"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const discord_js_2 = require("discord.js");
exports.default = {
data: new discord_js_2.SlashCommandBuilder()
.setName('count')
.setDescription('PRESS A BUTTON')
.setDescriptionLocalizations({
de: 'DRÜCKE EINEN KNOPF'
})
.setDMPermission(false)
.addStringOption((option) => option.setName('mode')
.setNameLocalizations({
de: 'modus'
})
.setDescription('THE MODE')
.setDescriptionLocalizations({
de: 'DER MODUS'
})
.setRequired(true)
.addChoices({ name: '🟢 PLUS', value: 'plus' }, { name: '🟡 PLUS & MINUS', value: 'minus' })),
async execute(ctx) {
const mode = ctx.getOption('mode');
let row;
if (mode === 'plus') {
row = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setEmoji('1024358756940775504')
.setCustomId('COUNT-PLUS')
.setStyle(discord_js_1.ButtonStyle.Secondary));
}
else {
row = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setEmoji('1024358756940775504')
.setCustomId('COUNT-PLUS')
.setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
.setEmoji('1024358810418151494')
.setCustomId('COUNT-MINUS')
.setStyle(discord_js_1.ButtonStyle.Secondary)
.setDisabled(true));
}
let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:INFINITE:1024406060380979300> » COUNTING')
.setDescription(`
» Current Number
\`\`\`0\`\`\`
`).setFooter({ text: '» ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:INFINITE:1024406060380979300> » ZÄHLEN')
.setDescription(`
» Aktuelle Nummer
\`\`\`0\`\`\`
`).setFooter({ text: '» ' + ctx.client.config.version });
}
ctx.log(false, `[CMD] COUNT : ${mode.toUpperCase()}`);
return ctx.interaction.reply({ embeds: [message], components: [row] });
}
};
//# sourceMappingURL=count.js.map