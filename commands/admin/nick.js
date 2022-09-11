const { CommandInteraction, MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');
const { version, clientId } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nick')
        .setDescription('NICK SOMEONE')
        .setDescriptionLocalizations({
            de: 'NICKE JEMANDEN'
        })
    	.setDMPermission(false)
    	.addUserOption(option =>
            option.setName('user')
                .setNameLocalizations({
                    de: 'nutzer'
                })
                .setDescription('THE TARGET')
                .setDescriptionLocalizations({
                    de: 'DAS ZIEL'
                })
            .setRequired(true))
        .addIntegerOption(option =>
            option.setName('nickname')
                .setNameLocalizations({
                    de: 'nickname'
                })
                .setDescription('THE NICKNAME')
                .setDescriptionLocalizations({
                    de: 'DER NICK NAME'
                })
            .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames),
    async execute(interaction, client) {
        // Set Variables
        const nickname = interaction.options.getInteger("nickname")
        const user = interaction.options.getUser("user")

        // Check if Bot has Permission
        if (!message.guild.members.get(clientId).hasPermission("MANAGE_NICKNAMES")) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('» ERROR')
        		.setDescription('» I dont have enough Permissions to nick that User!')
        		.setFooter({ text: '» ' + version });
            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
        		    .setTitle('» FEHLER')
        		    .setDescription('» Ich hab nicht genug Rechte um diesen Nutzer zu nicken!')
        		    .setFooter({ text: '» ' + version });
            }
            
            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] NICK : NOTENOUGHPERMS')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Nickname User
        user.setNickname(nickname)

        // Create Embed
        let message = new EmbedBuilder()
        		.setTitle('» ERROR')
        		.setDescription('» Changed the Nickname of <@' + user + '> to **' + nickname + '**!')
        		.setFooter({ text: '» ' + version });
        if (interaction.guildLocale == "de") {
            message = new EmbedBuilder()
    		    .setTitle('» FEHLER')
    		    .setDescription('» Nickname von <@' + user + '> zu **' + nickname + '** geändert!')
    		    .setFooter({ text: '» ' + version });
        }

        // Send Message
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] CLEAR : ' + amount)
        return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
    },
};