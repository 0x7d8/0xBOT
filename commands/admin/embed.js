const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');
const { version } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed')
        .setNameLocalizations({
            de: 'embed'
        })
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
    async execute(interaction) {
        // Count to Global Commands
        addcmd('t-all', 1)
        
        // Count Guild Commands and User
        addcmd('g-' + interaction.guild.id, 1)
        addcmd('u-' + interaction.user.id, 1)
        
        // Set Variables
        const titel = interaction.options.getString("title")
        const nachricht = interaction.options.getString("message")

        // Create Embed
        if (interaction.user.id != '745619551865012274') {
            var message = new EmbedBuilder()
                .setTitle(titel)
  			    .setDescription(nachricht)
        	    .setFooter({ text: '» ' + version + ' » NICHT OFFIZIELL' });
        } else {
            var message = new EmbedBuilder()
                .setTitle(titel)
  			    .setDescription(nachricht)
        	    .setFooter({ text: '» ' + version });
        }

        // Send Message
        console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] EMBED : ' + titel.toUpperCase() + ' : ' + nachricht.toUpperCase())
        return interaction.reply({ embeds: [message.toJSON()] })
    },
};