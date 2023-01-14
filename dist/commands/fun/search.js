"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const discord_js_2 = require("discord.js");
exports.default = {
data: new discord_js_2.SlashCommandBuilder()
.setName('search')
.setDMPermission(false)
.setDescription('SHOW A BUTTON TO A SEARCH')
.setDescriptionLocalizations({
de: 'ZEIGE EINEN KNOPF ZU EINER SUCHE'
})
.addStringOption((option) => option.setName('query')
.setNameLocalizations({
de: 'suche'
})
.setDescription('THE QUERY')
.setDescriptionLocalizations({
de: 'DIE SUCHE'
})
.setRequired(true))
.addStringOption((option) => option.setName('engine')
.setDescription('THE SEARCH ENGINE')
.setDescriptionLocalizations({
de: 'DIE SUCHMASCHINE'
})
.setRequired(false)
.addChoices({ name: '🤔 GOOGLE', value: 'Google' }, { name: '⭐ BING', value: 'Bing' }, { name: '⭐ YAHOO', value: 'Yahoo' }, { name: '⭐ DUCKDUCKGO', value: 'DuckDuckGo' })),
async execute(ctx) {
let query = ctx.getOption('query');
let engine = ctx.getOption('engine');
if (!engine)
engine = 'Google';
query = encodeURIComponent(query);
const google = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setLabel('👀 ANSCHAUEN')
.setURL("https://google.com/search?q=" + query)
.setStyle(discord_js_1.ButtonStyle.Link));
const bing = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setLabel('👀 ANSCHAUEN')
.setURL("https://bing.com/search?q=" + query)
.setStyle(discord_js_1.ButtonStyle.Link));
const yahoo = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setLabel('👀 ANSCHAUEN')
.setURL("https://search.yahoo.com/search?q=" + query)
.setStyle(discord_js_1.ButtonStyle.Link));
const duck = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setLabel('👀 ANSCHAUEN')
.setURL("https://duckduckgo.com/?q=" + query)
.setStyle(discord_js_1.ButtonStyle.Link));
let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:SEARCH:1024389710279348354> » SEARCH')
.setDescription(`» Click Below to look up results for **${decodeURIComponent(query)}** on **${engine}**!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:SEARCH:1024389710279348354> » SUCHEN')
.setDescription(`» Klicke unten um nach Ergebnissen für **${decodeURIComponent(query)}** auf **${engine}** zu finden!`)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version });
}
ctx.log(false, `[CMD] SEARCH : "${decodeURIComponent(query).toUpperCase()}" : ${engine.toUpperCase()}`);
if (engine === 'Google') {
await ctx.interaction.reply({ embeds: [message], components: [google] });
}
;
if (engine === 'Bing') {
await ctx.interaction.reply({ embeds: [message], components: [bing] });
}
;
if (engine === 'Yahoo') {
await ctx.interaction.reply({ embeds: [message], components: [yahoo] });
}
;
if (engine === 'DuckDuckGo') {
await ctx.interaction.reply({ embeds: [message], components: [duck] });
}
}
};
