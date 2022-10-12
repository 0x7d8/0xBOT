const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');
const { version } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('SEND AN EMBED')
        .setDescriptionLocalizations({
            de: 'SENDE EINE EMBED'
        })
    	.setDMPermission(false)
        .addStringOption(option =>
            option.setName('title')
                .setNameLocalizations({
                    de: 'titel'
                })
                .setDescription('THE TITLE')
                .setDescriptionLocalizations({
                    de: 'DER TITEL'
                })
                .setRequired(true))
    	.addStringOption(option =>
            option.setName('message')
                .setNameLocalizations({
                    de: 'nachricht'
                })
                .setDescription('THE MESSAGE')
                .setDescriptionLocalizations({
                    de: 'DIE NACHRICHT'
                })
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction, client, lang, vote) {
        // Set Variables
        const titel = interaction.options.getString("title")
        const nachricht = interaction.options.getString("message")

        // Create Embed
        let message
        if (interaction.user.id != '745619551865012274') {
            message = new EmbedBuilder()
                .setTitle(titel)
  			    .setDescription(nachricht)
        	    .setFooter({ text: '» ' + version + ' » NOT OFFICIAL' });
            
            if (lang === 'de') {
                message = new EmbedBuilder()
                    .setTitle(titel)
  			        .setDescription(nachricht)
        	        .setFooter({ text: '» ' + version + ' » NICHT OFFIZIELL' });
            }
        } else {
            message = new EmbedBuilder()
                .setTitle(titel)
  			    .setDescription(nachricht)
        	    .setFooter({ text: '» ' + version });
        }

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] EMBED : ' + titel.toUpperCase() + ' : ' + nachricht.toUpperCase())
        return interaction.reply({ embeds: [message] })
    },
};