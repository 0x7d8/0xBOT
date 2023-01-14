"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const simple_git_1 = __importDefault(require("simple-git"));
const git = (0, simple_git_1.default)();
exports.default = {
data: {
name: 'commits-refresh'
},
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
const startIndex = (Math.ceil(commits.length / 10) - 1) * 10;
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
ctx.components.rows[0].components[0].setCustomId(`COMMITS-REFRESH-${commits.length}-${Math.ceil(commits.length / 10)}`);
ctx.components.rows[0].components[1].setCustomId(`COMMITS-BACK-${commits.length}-${Math.ceil(commits.length / 10)}`);
ctx.components.rows[0].components[2].setCustomId(`COMMITS-NEXT-${commits.length}-${Math.ceil(commits.length / 10)}`);
ctx.components.rows[0].components[1].setDisabled(false);
ctx.components.rows[0].components[2].setDisabled(true);
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GLOBE:1024403680503529583> » GIT COMMITS')
.setDescription(embedDesc)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version + ' » PAGE ' + (Math.ceil(commits.length / 10)) });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GLOBE:1024403680503529583> » GIT COMMITS')
.setDescription(embedDesc)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version + ' » SEITE ' + (Math.ceil(commits.length / 10)) });
}
ctx.log(false, `[BTN] COMMITS : REFRESH : ${commits.length} : ${Math.ceil(commits.length / 10)}`);
return ctx.interaction.update({ embeds: [message], components: (ctx.components.getAPI()) });
}
};
