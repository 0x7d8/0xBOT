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
        .setName('votes')
        .setDMPermission(false)
        .setDescription('SEE THE VOTES')
        .setDescriptionLocalizations({
        de: 'SEHE DIE VOTES'
    })
        .addUserOption((option) => option.setName('user')
        .setNameLocalizations({
        de: 'nutzer'
    })
        .setDescription('THE USER')
        .setDescriptionLocalizations({
        de: 'DER NUTZER'
    })
        .setRequired(false)),
    async execute(interaction, client, lang, vote) {
        const user = interaction.options.getUser("user");
        let votes;
        if (!user) {
            votes = await bot.votes.get(interaction.user.id + '-A');
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] VOTES : ' + votes);
        }
        else {
            votes = await bot.votes.get(user.id + '-A');
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] VOTES : ' + user.id + ' : ' + votes);
        }
        let word;
        if (votes === 1)
            word = 'Vote';
        else
            word = 'Votes';
        let message;
        if (!user) {
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:GLOBE:1024403680503529583> » YOUR VOTES')
                .setDescription('» You have **' + votes + '** ' + word + '!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:GLOBE:1024403680503529583> » DEINE VOTES')
                    .setDescription('» Du hast **' + votes + '** ' + word + '!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
        }
        else {
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:GLOBE:1024403680503529583> » THE VOTES OF ' + user.username.toUpperCase())
                .setDescription('» <@' + user.id + '> has **' + votes + '** ' + word + '!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:GLOBE:1024403680503529583> » DIE VOTES VON ' + user.username.toUpperCase())
                    .setDescription('» <@' + user.id + '> hat **' + votes + '** ' + word + '!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
        }
        return interaction.reply({ embeds: [message] });
    }
};
//# sourceMappingURL=votes.js.map