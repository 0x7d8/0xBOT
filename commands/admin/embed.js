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
    async execute(interaction, client) {
        // Count to Global Commands
        cmds.add('t-all', 1)
        
        // Count Guild Commands and User
        cmds.add('g-' + interaction.guild.id, 1)
        cmds.add('u-' + interaction.user.id.replace(/\D/g, ''), 1)
        
        // Set Variables
        const titel = interaction.options.getString("title")
        const nachricht = interaction.options.getString("message")

        // Create Embed
        let message
        if (interaction.user.id.replace(/\D/g, '') != '745619551865012274') {
            message = new EmbedBuilder()
                .setTitle(titel)
  			    .setDescription(nachricht)
        	    .setFooter({ text: '» ' + version + ' » NOT OFFICIAL' });
            
            if (interaction.guildLocale == "de") {
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
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] EMBED : ' + titel.toUpperCase() + ' : ' + nachricht.toUpperCase())
        return interaction.reply({ embeds: [message.toJSON()] })
    },
};