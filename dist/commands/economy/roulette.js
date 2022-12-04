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
        .setName('roulette')
        .setDMPermission(false)
        .setDescription('PLAY ROULETTE')
        .setDescriptionLocalizations({
        de: 'SPIELE ROULETTE'
    })
        .addStringOption((option) => option.setName('color')
        .setNameLocalizations({
        de: 'farbe'
    })
        .setDescription('THE COLOR')
        .setDescriptionLocalizations({
        de: 'DIE FARBE'
    })
        .setRequired(true)
        .addChoices({ name: '🟢 [x4] GRÜN', value: 'grün' }, { name: '⚫ [x2] SCHWARZ', value: 'schwarz' }, { name: '🔴 [x2] ROT', value: 'rot' }))
        .addIntegerOption((option) => option.setName('bet')
        .setNameLocalizations({
        de: 'wette'
    })
        .setDescription('THE BET')
        .setDescriptionLocalizations({
        de: 'DIE WETTE'
    })
        .setRequired(true)),
    async execute(interaction, client, lang, vote) {
        if (!await bot.settings.get(interaction.guild.id, 'luckgames')) {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» Luck Games are disabled on this Server!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Glücksspiele sind auf diesem Server deaktiviert!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ROULETTE : DISABLED');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        const farbe = bot.getOption(interaction, 'color');
        const wette = bot.getOption(interaction, 'bet');
        const money = await bot.money.get(interaction.user.id);
        const random = bot.random(1, 21);
        if (wette < 0) {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» You cant play with negative Money!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Du kannst keine negativen Einsätze spielen!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ROULETTE : NEGATIVEMONEY : ' + wette + '€');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        let color;
        if (random == 1)
            color = 'grün';
        if (random >= 2)
            color = 'schwarz';
        if (random >= 11)
            color = 'rot';
        let status, transaction;
        if (color === farbe) {
            status = 'WON';
            transaction = await bot.transactions.log({
                success: true,
                sender: {
                    id: 'CASINO',
                    amount: wette,
                    type: 'negative'
                }, reciever: {
                    id: interaction.user.id,
                    amount: wette,
                    type: 'positive'
                }
            });
        }
        ;
        if (color !== farbe) {
            status = 'LOST';
            transaction = await bot.transactions.log({
                success: true,
                sender: {
                    id: interaction.user.id,
                    amount: wette,
                    type: 'negative'
                }, reciever: {
                    id: 'CASINO',
                    amount: wette,
                    type: 'positive'
                }
            });
        }
        if (lang === 'de') {
            if (color === farbe)
                status = 'GEWONNEN';
            if (color !== farbe)
                status = 'VERLOREN';
        }
        if (money >= wette) {
            if (wette > 15000) {
                let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                    .setDescription('» You cant bet that much! **$15000** is the Maximum.')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
                if (lang === 'de') {
                    message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                        .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                        .setDescription('» Du kannst nicht soviel Wetten! **15000€** ist das Maximum.')
                        .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
                }
                bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ROULETTE : TOOMUCHMONEY : ' + wette + '€');
                return interaction.reply({ embeds: [message], ephemeral: true });
            }
            let resultmul;
            if (color === farbe && color === 'grün')
                resultmul = 4;
            if (color === farbe && color !== 'grün')
                resultmul = 2;
            if (color !== farbe)
                resultmul = 0;
            const result = wette * resultmul;
            const resultadd = result - wette;
            let resultdis;
            if (result == 0)
                resultdis = wette;
            else
                resultdis = result;
            let colordis;
            if (farbe === 'grün')
                colordis = 'green';
            if (farbe === 'rot')
                colordis = 'red';
            if (farbe === 'schwarz')
                colordis = 'black';
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:CLOVER:1024388649418235925> » ROULETTE')
                .setDescription('» You bet **$' + wette + '** on **' + colordis.toUpperCase() + '** and **' + status + '** **$' + resultdis + '**!\n\nID: ' + transaction.id)
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:CLOVER:1024388649418235925> » ROULETTE')
                    .setDescription('» Du hast **' + wette + '€** auf **' + farbe.toUpperCase() + '** gesetzt und **' + resultdis + '€** **' + status + '**!\n\nID: ' + transaction.id)
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            if (color !== farbe)
                bot.money.rem(interaction.guild.id, interaction.user.id, wette);
            if (color === farbe)
                bot.money.add(interaction.guild.id, interaction.user.id, resultadd);
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ROULETTE : ' + farbe.toUpperCase() + '[W:' + color.toUpperCase() + '] : ' + status + ' : ' + resultdis + '€');
            return interaction.reply({ embeds: [message] });
        }
        else {
            const missing = wette - money;
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» You dont have enough Money for that, you are missing **$' + missing + '**!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Du hast dafür nicht genug Geld, dir fehlen **' + missing + '€**!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ROULETTE : NOTENOUGHMONEY : ' + missing + '€');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
    }
};
//# sourceMappingURL=roulette.js.map