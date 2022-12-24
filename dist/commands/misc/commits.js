"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const discord_js_2 = require("discord.js");
const simple_git_1 = __importDefault(require("simple-git"));
const git = (0, simple_git_1.default)();
exports.default = {
data: new discord_js_2.SlashCommandBuilder()
.setName('commits')
.setDMPermission(false)
.setDescription('SEE ALL COMMITS')
.setDescriptionLocalizations({
de: 'SEHE ALLE COMMITS'
}),
async execute(ctx) {
let embedDesc = '';
const gitInfos = await git.log({
'--pretty': 'format:{"hash":"%h","subject":"%s","author":"%aN","authorDate":"%ad"}'
});
const commits = gitInfos.all;
commits.sort((a, b) => {
const dateA = new Date(a.authorDate).getTime();
const dateB = new Date(b.authorDate).getTime();
return dateA - dateB;
});
let index = 0;
commits.reverse().forEach((commit) => {
commits[index++] = { ...commit, count: index };
});
const startIndex = (Number(Math.floor(commits.length / 10) + 1) - 1) * 10;
const endIndex = Math.min(startIndex + 10, commits.length);
for (const element of commits.slice(startIndex, endIndex).reverse()) {
const count = element.count;
let formattedCount = count.toString();
if (count < 100)
formattedCount = '0' + count;
if (count < 10)
formattedCount = '00' + count;
embedDesc += `**\`${formattedCount}.\`** » ${element.message}\n`;
}
let row = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setEmoji('1055826473442873385')
.setLabel('UPDATE')
.setCustomId(`COMMITS-REFRESH-${commits.length}`)
.setStyle(discord_js_1.ButtonStyle.Primary), new discord_js_1.ButtonBuilder()
.setEmoji('1055825023987888169')
.setCustomId(`COMMITS-BACK-${commits.length}-${Math.floor(commits.length / 10) + 1}`)
.setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
.setEmoji('1055825050126786590')
.setCustomId(`COMMITS-NEXT-${commits.length}-${Math.floor(commits.length / 10) + 1}`)
.setStyle(discord_js_1.ButtonStyle.Secondary)
.setDisabled(true));
if (ctx.metadata.language === 'de') {
row = new discord_js_1.ActionRowBuilder()
.addComponents(new discord_js_1.ButtonBuilder()
.setEmoji('1055826473442873385')
.setLabel('AKTUALISIEREN')
.setCustomId(`COMMITS-REFRESH-${commits.length}`)
.setStyle(discord_js_1.ButtonStyle.Primary), new discord_js_1.ButtonBuilder()
.setEmoji('1055825023987888169')
.setCustomId(`COMMITS-BACK-${commits.length}-${Math.floor(commits.length / 10) + 1}`)
.setStyle(discord_js_1.ButtonStyle.Secondary), new discord_js_1.ButtonBuilder()
.setEmoji('1055825050126786590')
.setCustomId(`COMMITS-NEXT-${commits.length}-${Math.floor(commits.length / 10) + 1}`)
.setStyle(discord_js_1.ButtonStyle.Secondary)
.setDisabled(true));
}
let message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GLOBE:1024403680503529583> » GIT COMMITS')
.setDescription(embedDesc)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version + ' » PAGE ' + (Math.floor(commits.length / 10) + 1) });
if (ctx.metadata.language === 'de') {
message = new discord_js_2.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GLOBE:1024403680503529583> » GIT COMMITS')
.setDescription(embedDesc)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version + ' » SEITE ' + (Math.floor(commits.length / 10) + 1) });
}
ctx.log(false, `[CMD] COMMITS : ${commits.length} : ${Math.floor(commits.length / 10) + 1}`);
return ctx.interaction.reply({ embeds: [message], components: [row] }).catch(() => { });
}
};
//# sourceMappingURL=commits.js.map