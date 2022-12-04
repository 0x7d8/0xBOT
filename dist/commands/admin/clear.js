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
const v10_1 = require("discord-api-types/v10");
const bot = __importStar(require("../../functions/bot.js"));
exports.default = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName('clear')
        .setDescription('CLEAR MESSAGES')
        .setDescriptionLocalizations({
        de: 'ENTFERNE NACHRICHTEN'
    })
        .setDMPermission(false)
        .addIntegerOption(option => option.setName('amount')
        .setNameLocalizations({
        de: 'anzahl'
    })
        .setDescription('THE AMOUNT OF MESSAGES')
        .setDescriptionLocalizations({
        de: 'DIE ANZAHL AN NACHRICHTEN'
    })
        .setRequired(true))
        .addUserOption(option => option.setName('user')
        .setNameLocalizations({
        de: 'nutzer'
    })
        .setDescription('THE TARGET')
        .setDescriptionLocalizations({
        de: 'DAS ZIEL'
    })
        .setRequired(false))
        .setDefaultMemberPermissions(v10_1.PermissionFlagsBits.ManageMessages),
    async execute(interaction, client, lang, vote) {
        if (!interaction.appPermissions?.has('ManageMessages')) {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» I dont think I have the **MANAGE MESSAGES** Permission!')
                .setFooter({ text: '» ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Ich denke nicht, dass ich die **NACHRICHTEN VERWALTEN** Berechtigung habe!')
                    .setFooter({ text: '» ' + client.config.version });
            }
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] CLEAR : NOPERM');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        if (!interaction.appPermissions?.has('ViewChannel')) {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» I dont think I have the **VIEW CHANNEL** Permission!')
                .setFooter({ text: '» ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Ich denke nicht, dass ich die **KANÄLE ANSEHEN** Berechtigung habe!')
                    .setFooter({ text: '» ' + client.config.version });
            }
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] CLEAR : NOPERM');
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        const amount = bot.getOption(interaction, 'amount');
        const target = interaction.options.getUser("user");
        const messages = interaction.channel?.messages.fetch();
        if (amount < 1) {
            let message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
                .setDescription('» You have to delete atleast **1** Message!')
                .setFooter({ text: '» ' + client.config.version });
            if (lang === 'de') {
                message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
                    .setDescription('» Du musst mindestens **1** Nachricht löschen!')
                    .setFooter({ text: '» ' + client.config.version });
            }
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] CLEAR : NOTENOUGH : ' + amount);
            return interaction.reply({ embeds: [message], ephemeral: true });
        }
        if (target !== null) {
            const filtered = [];
            let i = 0;
            {
                (await messages).filter((message) => {
                    if (message.author.id === target.id && amount > i) {
                        filtered.push(message);
                        i++;
                    }
                });
            }
            await interaction.channel?.bulkDelete(filtered, true).then((messages) => {
                let message;
                if (messages.size == 1) {
                    message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                        .setTitle('» DELETE MESSAGES')
                        .setDescription('» You deleted **' + messages.size + '** Message from <@' + target + '>!')
                        .setFooter({ text: '» ' + client.config.version });
                    if (lang === 'de') {
                        message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                            .setTitle('» NACHRICHTEN LÖSCHEN')
                            .setDescription('» Du hast **' + messages.size + '** Nachricht von <@' + target + '> gelöscht!')
                            .setFooter({ text: '» ' + client.config.version });
                    }
                }
                else {
                    message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                        .setTitle('» DELETE MESSAGES')
                        .setDescription('» You deleted **' + messages.size + '** Messages from <@' + target + '>!')
                        .setFooter({ text: '» ' + client.config.version });
                    if (lang === 'de') {
                        message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                            .setTitle('» NACHRICHTEN LÖSCHEN')
                            .setDescription('» Du hast **' + messages.size + '** Nachrichten von <@' + target + '> gelöscht!')
                            .setFooter({ text: '» ' + client.config.version });
                    }
                }
                bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] CLEAR : ' + target + ' : ' + amount);
                return interaction.reply({ embeds: [message], ephemeral: true });
            });
        }
        else {
            await interaction.channel?.bulkDelete(amount, true).then((messages) => {
                let message;
                if (messages.size == 1) {
                    message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                        .setTitle('» DELETE MESSAGES')
                        .setDescription('» You deleted **' + messages.size + '** Message!')
                        .setFooter({ text: '» ' + client.config.version });
                    if (lang === 'de') {
                        message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                            .setTitle('» NACHRICHTEN LÖSCHEN')
                            .setDescription('» Du hast **' + messages.size + '** Nachricht gelöscht!')
                            .setFooter({ text: '» ' + client.config.version });
                    }
                }
                else {
                    message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                        .setTitle('» DELETE MESSAGES')
                        .setDescription('» You deleted **' + messages.size + '** Messages!')
                        .setFooter({ text: '» ' + client.config.version });
                    if (lang === 'de') {
                        message = new discord_js_1.EmbedBuilder().setColor(0x37009B)
                            .setTitle('» NACHRICHTEN LÖSCHEN')
                            .setDescription('» Du hast **' + messages.size + '** Nachrichten gelöscht!')
                            .setFooter({ text: '» ' + client.config.version });
                    }
                }
                bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] CLEAR : ' + amount);
                return interaction.reply({ embeds: [message], ephemeral: true });
            });
        }
    }
};
//# sourceMappingURL=clear.js.map