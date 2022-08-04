const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');
const { version } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('SENDE EINE EMBED')
    	.setDMPermission(false)
        .addStringOption(option =>
            option.setName('titel')
                .setDescription('DER TITEL')
                .setRequired(true))
    	.addStringOption(option =>
            option.setName('nachricht')
                .setDescription('DIE NACHRICHT')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        // Count to Global Commands
        addcmd('t-all', 1)
        
        // Count Guild Commands and User
        addcmd('g-' + interaction.guild.id, 1)
        addcmd('u-' + interaction.user.id, 1)
        
        // Set Variables
        const titel = interaction.options.getString("titel")
        const nachricht = interaction.options.getString("nachricht")
        
        // Check Maintenance
        const { maintenance } = require('../../config.json');
        if (maintenance == 'yes' && interaction.user.id != '745619551865012274') {
            // Create Embed
            var err = new EmbedBuilder()
        		.setTitle('» FEHLER')
        		.setDescription('» Der Bot ist aktuell unter Wartungsarbeiten!')
        		.setFooter({ text: '» ' + version });
            
            return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
        }
        
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