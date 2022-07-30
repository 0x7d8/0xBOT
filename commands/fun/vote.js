const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('vote')
    	.setDMPermission(false)
        .setDescription('MACHE EINE UMFRAGE')
        .addStringOption(option =>
            option.setName('text')
                .setDescription('DER TEXT')
                .setRequired(true))
    	.addStringOption(option =>
            option.setName('reaktionen')
                .setDescription('DIE REAKTIONEN')
                .setRequired(true)
    			.addChoices(
            		// Setup Choices
					{ name: '✅ JA & NEIN', value: 'frage' },
            		{ name: '🧮 BUCHSTABEN VON A BIS E', value: 'abstimmung' },
				)),
    async execute(interaction) {
        // Count to Global Commands
        addcmd('t-all', 1)
        
        // Count Guild Commands and User
        addcmd('g-' + interaction.guild.id, 1)
        addcmd('u-' + interaction.user.id, 1)
        
        // Set Variables
        const frage = interaction.options.getString("text")
        const reactions = interaction.options.getString("reaktionen")
        
        // Check Maintenance
        const { maintenance } = require('../../config.json');
        if (maintenance == 'yes' && interaction.user.id != '745619551865012274') {
            // Create Embed
            var mterr = new EmbedBuilder()
        		.setTitle('» FEHLER')
        		.setDescription('» Der Bot ist aktuell unter Wartungsarbeiten!')
        		.setFooter({ text: '» ' + version });
            
            return interaction.reply({ embeds: [mterr.toJSON()], ephemeral: true })
        }
        
        // Create Embed
       	const message = new EmbedBuilder()
            .setTitle('» EINE ' + reactions.toUpperCase())
  			.setDescription('» ' + frage)
        	.setFooter({ text: '» ' + version });
        
        // Send Message
        interaction.reply({ embeds: [message.toJSON()] })
        const sendcache = await interaction.fetchReply();
        console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] VOTE : ' + frage.toUpperCase() + ' : ' + reactions.toUpperCase())
        
        // Add the correct Reactions
		if (reactions == 'frage') {
            sendcache.react('<:JA:995310506749464607>');
			sendcache.react('<:NEIN:995310466593198201>');
        }
        if (reactions == 'abstimmung') {
            sendcache.react('🇦');
			sendcache.react('🇧');
            sendcache.react('🇨');
            sendcache.react('🇩');
            sendcache.react('🇪');
        }
    },
};