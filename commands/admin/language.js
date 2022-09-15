const { CommandInteraction, MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');
const { version } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('language')
        .setDescription('CHANGE THE LANGUAGE')
        .setDescriptionLocalizations({
            de: 'ÄNDERE DIE SPRACHE'
        })
    	.setDMPermission(false)
    	.addStringOption(option =>
            option.setName('language')
                .setNameLocalizations({
                    de: 'sprache'
                })
                .setDescription('THE LANGUAGE')
                .setDescriptionLocalizations({
                    de: 'DIE SPRACHE'
                })
                .setRequired(true)
                .addChoices(
            		// Setup Choices
					{ name: '🇩🇪 DEUTSCH', value: '1' },
					{ name: '🇬🇧 ENGLISH', value: '2' },
				))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    async execute(interaction, client, bin, vote) {
        // Set Variables
        const langs = interaction.options.getString("language")

        // Get String
        let langString
        if (parseInt(langs) == 1) { langString = 'DEUTSCH' }
        if (parseInt(langs) == 2) { langString = 'ENGLISH' }

        // Set Language
        if (parseInt(langs) == 1) {
            await lang.rem(interaction.guild.id, 1)
        }
        if (parseInt(langs) == 2) {
            await lang.add(interaction.guild.id, 1)
        }

        // Create Embed
        let message = new EmbedBuilder()
        	.setTitle('» LANGUAGE')
        	.setDescription('» Language successfully set to **' + langString + '**!')
        	.setFooter({ text: '» ' + version });

        if (langs == "1") {
            message = new EmbedBuilder()
        	    .setTitle('» SPRACHE')
        	    .setDescription('» Sprache erfolgreich auf **' + langString + '** gesetzt!')
        	    .setFooter({ text: '» ' + version });
        }
            
        // Send Message
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] LANGUAGE : ' + langString)
        return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
    },
};