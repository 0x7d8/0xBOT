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
    data: new discord_js_1.SlashCommandBuilder()
        .setName('level')
        .setDMPermission(false)
        .setDescription('VIEW THE LEVELS')
        .setDescriptionLocalizations({
        de: 'SEHE DIE LEVEL'
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
        const canvas = (await import('canvacord')).default;
        if (!await bot.settings.get(interaction.guild.id, 'levels')) {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» The Level System is disabled on this Server!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Das Level System ist auf diesem Server deaktiviert!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] LEVEL : DISABLED');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        const user = interaction.options.getUser('user');
        let userobj;
        if (!user)
            userobj = interaction.user;
        else
            userobj = user;
        await interaction.deferReply();
        const counts = [];
        if (!user) {
            counts.push(await bot.stat.get('u-' + interaction.user.id + '-' + interaction.guild.id + '-C', 'msg'));
            counts.push(await bot.stat.get('u-' + interaction.user.id + '-' + interaction.guild.id + '-A', 'msg'));
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] LEVEL : ' + counts[0]);
        }
        else {
            counts.push(await bot.stat.get('u-' + user.id + '-' + interaction.guild.id + '-C', 'msg'));
            counts.push(await bot.stat.get('u-' + user.id + '-' + interaction.guild.id + '-A', 'msg'));
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] LEVEL : ' + user.id + ' : ' + counts[0]);
        }
        const XP = Math.round(counts[0] / 5);
        let level = 0, levelXP = XP;
        while (levelXP >= 500) {
            level++;
            levelXP -= 500;
        }
        ;
        levelXP = Math.floor(levelXP / 2);
        let totalxp = 'TOTAL XP';
        if (lang === 'de')
            totalxp = 'ALLE XP';
        const rankCard = new canvas.Rank()
            .setAvatar(userobj.displayAvatarURL({ format: 'png' }))
            .setCurrentXP(levelXP)
            .setRequiredXP(500)
            .setProgressBar('#90CDF4', 'COLOR')
            .setUsername(userobj.username)
            .setDiscriminator(userobj.discriminator)
            .setOverlay('#00000000')
            .setBackground('COLOR', '#00000000')
            .setProgressBarTrack('#413E4D')
            .setLevel(level, 'LEVEL ', true)
            .setRank(XP, totalxp, true);
        let attachment;
        const buildCard = async () => {
            await rankCard.build()
                .then((data) => {
                attachment = new discord_js_2.AttachmentBuilder(data, { name: 'rank.png', description: 'Rank Card Image' });
            });
            return;
        };
        await buildCard();
        let message;
        if (!user) {
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:GLOBE:1024403680503529583> » YOUR LEVEL')
                .setImage('attachment://rank.png')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:GLOBE:1024403680503529583> » DEIN LEVEL')
                    .setImage('attachment://rank.png')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
        }
        else {
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:GLOBE:1024403680503529583> » THE LEVEL OF ' + user.username.toUpperCase())
                .setImage('attachment://rank.png')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:GLOBE:1024403680503529583> » DAS LEVEL VON ' + user.username.toUpperCase())
                    .setImage('attachment://rank.png')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
        }
        return interaction.editReply({ embeds: [message], files: [attachment] });
    }
};
//# sourceMappingURL=level.js.map