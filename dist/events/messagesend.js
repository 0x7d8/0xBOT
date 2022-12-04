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
const discord_js_2 = require("discord.js");
const bot = __importStar(require("@functions/bot.js"));
exports.default = {
    name: 'MESSAGE SEND',
    event: discord_js_2.Events.MessageCreate,
    once: false,
    async execute(message, client) {
        if (!message.guildId)
            return;
        if (!message.author.bot && parseInt(message.guildId) > 1000 && (await bot.settings.get(message.guildId, 'level'))) {
            const oldCache = await bot.stat.get('u-' + message.author.id + '-' + message.guildId + '-C', 'msg');
            const oldXP = Math.round(oldCache / 5);
            let oldLevel = 0, oldLevelXP = oldXP;
            while (oldLevelXP >= 500) {
                oldLevel++;
                oldLevelXP -= 500;
            }
            await bot.stat.add('u-' + message.author.id + '-TOTAL-A', 'msg', 1);
            await bot.stat.add('u-' + message.author.id + '-' + message.guildId + '-A', 'msg', 1);
            await bot.stat.add('u-' + message.author.id + '-TOTAL-C', 'msg', ((message.content.length > 1000) ? 100 : message.content.length));
            await bot.stat.add('u-' + message.author.id + '-' + message.guildId + '-C', 'msg', ((message.content.length > 1000) ? 100 : message.content.length));
            const newCache = await bot.stat.get('u-' + message.author.id + '-' + message.guildId + '-C', 'msg');
            const newXP = Math.round(newCache / 5);
            let newLevel = 0, newLevelXP = newXP;
            while (newLevelXP >= 500) {
                newLevel++;
                newLevelXP -= 500;
            }
            if (oldLevel < newLevel) {
                let guildlang = 'en';
                const glang = await bot.language.get(message.guildId);
                if (parseInt(glang) === 1)
                    guildlang = 'de';
                const row = new discord_js_1.ActionRowBuilder()
                    .addComponents(new discord_js_1.ButtonBuilder()
                    .setEmoji('1030476921777180672')
                    .setCustomId('rem-levelmsg')
                    .setStyle(discord_js_1.ButtonStyle.Danger));
                let content = `» Good Writing <@${message.author.id}>! You are now Level **${newLevel}**.\nTo view your level do </level:1030147810194100245>`;
                if (guildlang === 'de')
                    content = `» Gutes schreiben <@${message.author.id}>! Du bist nun Level **${newLevel}**.\nZum anschauen deines Levels mach </level:1030147810194100245>`;
                return message.channel.send({ content: content, components: [row] });
            }
        }
    }
};
//# sourceMappingURL=messagesend.js.map