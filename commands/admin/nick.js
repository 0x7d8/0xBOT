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
        .addStringOption(option =>
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
        const nickname = interaction.options.getString("nickname")
        const user = interaction.options.getUser("user")

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