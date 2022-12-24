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
name: 'commits-page'
},
async execute(ctx, commitCount, pageNumber, type) {
if (type === 'back')
pageNumber--;
if (type === 'next')
pageNumber++;
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
if (commits.length - commitCount > 0)
commits.splice(commitCount, commits.length - commitCount);
const startIndex = (pageNumber - 1) * 10;
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
ctx.components.rows[0].components[0].setCustomId(`COMMITS-REFRESH-${commitCount}-${pageNumber}`);
ctx.components.rows[0].components[1].setCustomId(`COMMITS-BACK-${commitCount}-${pageNumber}`);
ctx.components.rows[0].components[2].setCustomId(`COMMITS-NEXT-${commitCount}-${pageNumber}`);
if (!ctx.components.rows[0].components[1].data.disabled && pageNumber <= 1)
ctx.components.rows[0].components[1].setDisabled(true);
else
ctx.components.rows[0].components[1].setDisabled(false);
if (!ctx.components.rows[0].components[2].data.disabled && pageNumber >= Number(Math.floor(commits.length / 10) + 1))
ctx.components.rows[0].components[2].setDisabled(true);
else
ctx.components.rows[0].components[2].setDisabled(false);
let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GLOBE:1024403680503529583> » GIT COMMITS')
.setDescription(embedDesc)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version + ' » PAGE ' + pageNumber });
if (ctx.metadata.language === 'de') {
message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
.setTitle('<:GLOBE:1024403680503529583> » GIT COMMITS')
.setDescription(embedDesc)
.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version + ' » SEITE ' + pageNumber });
}
ctx.log(false, `[BTN] COMMITS : ${type.toUpperCase()} : ${commits.length} : ${pageNumber}`);
return ctx.interaction.update({ embeds: [message], components: (ctx.components.getAPI()) });
}
};
//# sourceMappingURL=page.js.map