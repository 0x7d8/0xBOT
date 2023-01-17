"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const v10_1 = require("discord-api-types/v10");
exports.default = {
data: new discord_js_1.SlashCommandBuilder()
.setName('language')
.setDescription('CHANGE THE LANGUAGE')
.setDescriptionLocalizations({
de: 'ÄNDERE DIE SPRACHE'
})
.setDMPermission(false)
.addStringOption(option => option.setName('language')
.setNameLocalizations({
de: 'sprache'
})
.setDescription('THE LANGUAGE')
.setDescriptionLocalizations({
de: 'DIE SPRACHE'
})
.setRequired(true)
.addChoices({ name: '🇩🇪 DEUTSCH', value: 'de' }, { name: '🇬🇧 ENGLISH', value: 'en' }))
.setDefaultMemberPermissions(v10_1.PermissionFlagsBits.ManageMessages),
async execute(ctx) {
const lang = ctx.getOption('language');
let langString;
if (lang === 'de')
langString = 'DEUTSCH';
if (lang === 'en')
langString = 'ENGLISH';
ctx.bot.language.set(ctx.interaction.guild.id, lang);
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('» LANGUAGE')
.setDescription(`» Language successfully set to **${langString}**!`)
.setFooter({ text: '» ' + ctx.client.config.version });
if (lang === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('» SPRACHE')
.setDescription(`» Sprache erfolgreich auf **${langString}** gesetzt!`)
.setFooter({ text: '» ' + ctx.client.config.version });
}
ctx.log(false, `[CMD] LANGUAGE : ${langString}`);
return ctx.interaction.reply({ embeds: [message], ephemeral: true });
}
};
//# sourceMappingURL=language.js.map