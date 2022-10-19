const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders')
const { PermissionFlagsBits } = require('discord-api-types/v10')

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
        const lang = interaction.options.getString("language")

        // Get String
        let langString
        if (lang === 'de') { langString = 'DEUTSCH' }
        if (lang === 'en') { langString = 'ENGLISH' }

        // Set Language
        bot.languages.set(interaction.guild.id, 'guild', lang)

        // Create Embed
        let message = new EmbedBuilder().setColor(0x37009B)
        	.setTitle('» LANGUAGE')
        	.setDescription('» Language successfully set to **' + langString + '**!')
        	.setFooter({ text: '» ' + config.version });

        if (langs == "1") {
            message = new EmbedBuilder().setColor(0x37009B)
        	    .setTitle('» SPRACHE')
        	    .setDescription('» Sprache erfolgreich auf **' + langString + '** gesetzt!')
        	    .setFooter({ text: '» ' + config.version });
        }
            
        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] LANGUAGE : ' + langString)
        return interaction.reply({ embeds: [message], ephemeral: true })
    },
};