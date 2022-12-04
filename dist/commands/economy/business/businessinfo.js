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
        .setName('businessinfo')
        .setDMPermission(false)
        .setDescription('VIEW INFO ABOUT BUSINESSES')
        .setDescriptionLocalizations({
        de: 'SEHE INFOS VON GESCHÄFTEN'
    })
        .addStringOption((option) => option.setName('business')
        .setNameLocalizations({
        de: 'geschäft'
    })
        .setDescription('THE BUSINESS')
        .setDescriptionLocalizations({
        de: 'DAS GESCHÄFT'
    })
        .setRequired(true)
        .addChoices({ name: '🟢 SUPERMARKT', value: 'market' }, { name: '🔵 PARKHAUS', value: 'parking garage' }, { name: '🟡 AUTOHAUS', value: 'car dealership' })),
    async execute(interaction, client, lang, vote) {
        if (!await bot.settings.get(interaction.guild.id, 'businesses')) {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» Businesses are disabled on this Server!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Geschäfte sind auf diesem Server deaktiviert!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] BUSINESS : DISABLED');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        const business = bot.getOption(interaction, 'business');
        let businessid;
        if (business === 'market')
            businessid = '1';
        if (business === 'parking garage')
            businessid = '2';
        if (business === 'car dealership')
            businessid = '3';
        let businessowner;
        if (await bot.businesses.get('g-' + interaction.guild.id + '-' + businessid + '-OWNER') != 0) {
            let oldleft = false;
            businessowner = await bot.businesses.get('g-' + interaction.guild.id + '-' + businessid + '-OWNER');
            const businessearning = await bot.businesses.get('g-' + interaction.guild.id + '-' + businessid + '-EARNING', true);
            try {
                await interaction.guild.members.fetch(businessowner);
            }
            catch (e) {
                oldleft = true;
            }
            if (!oldleft) {
                let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:QUESTION:1024402860210921503> » BUSINESS INFO')
                    .setDescription('» Business Infos:\n\nOwner: <@' + businessowner + '>\nEarnings: ' + businessearning + '€')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
                if (lang === 'de') {
                    message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                        .setTitle('<:QUESTION:1024402860210921503> » GESCHÄFTS INFO')
                        .setDescription('» Geschäfts Infos:\n\nBesitzer: <@' + businessowner + '>\nEinkommen: ' + businessearning + '€')
                        .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
                }
                bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] BUSINESSINFO : ' + business.toUpperCase());
                return interaction.reply({ embeds: [message], ephemeral: true });
            }
        }
        let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
            .setTitle('<:QUESTION:1024402860210921503> » BUSINESS INFO')
            .setDescription('» Noone owns this Business, people say its profitable though!\n*mhm, I say that for everything*')
            .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        if (lang === 'de') {
            message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:QUESTION:1024402860210921503> » GESCHÄFTS INFO')
                .setDescription('» Niemanden gehört dieses Geschäft, es besagt sich es sei aber profitabel!\n*naja, das sag ich bei jedem*')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
        }
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] BUSINESSINFO : ' + business.toUpperCase() + ' : NOTOWNED');
        return interaction.reply({ embeds: [message], ephemeral: true });
    }
};
//# sourceMappingURL=businessinfo.js.map