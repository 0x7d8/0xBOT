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
    data: new discord_js_1.SlashCommandBuilder()
        .setName('donate')
        .setDMPermission(false)
        .setDescription('DONATE THE BOT')
        .setDescriptionLocalizations({
        de: 'SPENDE DEM BOT'
    }),
    async execute(interaction, client, lang, vote) {
        // Create Embed
        let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
            .setTitle('<:DONATE:1024397357988720711> » DONATE')
            .setDescription('**»» DONATE**\n» LINK\nhttps://donate.rjansen.de\n» QR CODE')
            .setImage("https://img.rjansen.de/bot/donate.png")
            .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        if (lang === 'de') {
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:DONATE:1024397357988720711> » SPENDEN')
                .setDescription('**»» SPENDEN**\n» LINK\nhttps://donate.rjansen.de\n» QR CODE')
                .setImage("https://img.rjansen.de/bot/donate.png")
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        }
        // Send Correct Response
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] DONATE <3');
        return interaction.reply({ embeds: [message], ephemeral: true });
    }
};
//# sourceMappingURL=donate.js.map