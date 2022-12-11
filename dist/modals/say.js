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
const { EmbedBuilder } = require('discord.js');
const bot = __importStar(require("../functions/bot.js"));
exports.default = {
    data: {
        name: 'say'
    },
    async execute(interaction, client, lang, vote) {
        const title = interaction.fields.getTextInputValue('say-title');
        const content = interaction.fields.getTextInputValue('say-content');
        let message;
        if (interaction.user.id !== '745619551865012274') {
            message = new EmbedBuilder().setColor(0x37009B)
                .setTitle(title)
                .setDescription(content)
                .setFooter({ text: '» ' + client.config.version + ' » NOT OFFICIAL' });
            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
                    .setTitle(title)
                    .setDescription(content)
                    .setFooter({ text: '» ' + client.config.version + ' » NICHT OFFIZIELL' });
            }
        }
        else {
            message = new EmbedBuilder().setColor(0x37009B)
                .setTitle(title)
                .setDescription(content)
                .setFooter({ text: '» ' + client.config.version });
        }
        bot.log(false, interaction.user.id, interaction.guild.id, '[MOD] SAY : ' + title.toUpperCase() + ' : "' + content.toUpperCase() + '"');
        return interaction.reply({ embeds: [message] });
    }
};
//# sourceMappingURL=say.js.map