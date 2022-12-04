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
const bot = __importStar(require("@functions/bot.js"));
exports.default = {
    data: {
        name: 'item-bomb'
    },
    async execute(interaction, client, lang, vote, solution, choice, solbutton, button, itemid, reciever) {
        if (interaction.user.id !== reciever) {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» This choice is up to <@' + reciever + '>!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Diese Frage ist für <@' + reciever + '>!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] ITEMUSE : NOTSENDER');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        bot.bomb.delete('TIMEOUT-' + reciever + '-' + interaction.guild.id);
        {
            interaction.message.components[0].components[0].data.disabled = true;
            interaction.message.components[0].components[1].data.disabled = true;
            interaction.message.components[0].components[2].data.disabled = true;
            interaction.message.components[0].components[3].data.disabled = true;
            interaction.message.components[0].components[Number(button) - 1].data.style = discord_js_1.ButtonStyle.Danger;
            interaction.message.components[0].components[Number(solbutton) - 1].data.style = discord_js_1.ButtonStyle.Success;
        }
        let message;
        if (solution == choice) {
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:BOXOPEN:1024395281460101213> » USE ITEM')
                .setDescription('» <@' + reciever + '> has diffused the Bomb! YAY')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:BOXOPEN:1024395281460101213> » GEGENSTAND NUTZEN')
                    .setDescription('» <@' + reciever + '> hat die Bombe entschärft! YAY')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
        }
        else {
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:BOXOPEN:1024395281460101213> » USE ITEM')
                .setDescription('» <@' + reciever + '> has failed to diffuse the Bomb! OHNO')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:BOXOPEN:1024395281460101213> » GEGENSTAND NUTZEN')
                    .setDescription('» <@' + reciever + '> hat es nicht geschafft, die Bombe zu entschärfen! OH')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
        }
        const messages = bot.bomb.get('MESSAGES-' + reciever + '-' + interaction.guild.id);
        bot.bomb.delete('MESSAGES-' + reciever + '-' + interaction.guild.id);
        if (solution !== choice) {
            if (itemid === 'nbomb') {
                const member = await interaction.guild.members.fetch(interaction.user.id);
                member.timeout(15 * 1000, 'BOMB TIMEOUT FROM ' + interaction.user.id).catch(() => { });
            }
            if (itemid === 'mbomb') {
                const member = await interaction.guild.members.fetch(interaction.user.id);
                member.timeout(30 * 1000, 'BOMB TIMEOUT FROM ' + interaction.user.id).catch(() => { });
            }
            if (itemid === 'hbomb') {
                const member = await interaction.guild.members.fetch(interaction.user.id);
                member.timeout(45 * 1000, 'BOMB TIMEOUT FROM ' + interaction.user.id).catch(() => { });
            }
            if (itemid === 'cbomb') {
                const filtered = [];
                let i = 0;
                {
                    (await messages).filter((m) => {
                        if (m.author.id === interaction.user.id && 1 > i) {
                            filtered.push(m);
                            i++;
                        }
                    });
                }
                await interaction.channel.bulkDelete(filtered, true);
            }
        }
        bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] ITEMUSE : BOMB : ' + choice + ' : ' + solution);
        return interaction.update({ content: '', embeds: [message], components: interaction.message.components });
    }
};
//# sourceMappingURL=bomb.js.map