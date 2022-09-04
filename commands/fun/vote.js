const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('vote')
    	.setDMPermission(false)
        .setDescription('MAKE A POLL')
        .setDescriptionLocalizations({
            de: 'MACHE EINE UMFRAGE'
        })
        .addStringOption(option =>
            option.setName('text')
                .setDescription('THE TEXT')
                .setDescriptionLocalizations({
                    de: 'DER TEXT'
                })
                .setRequired(true))
    	.addStringOption(option =>
            option.setName('reactions')
                .setNameLocalizations({
                    de: 'reaktionen'
                })
                .setDescription('THE REACTIONS')
                .setDescriptionLocalizations({
                    de: 'DIE REAKTIONEN'
                })
                .setRequired(true)
    			.addChoices(
            		// Setup Choices
					{ name: '✅ JA & NEIN', value: 'frage' },
            		{ name: '🧮 BUCHSTABEN VON A BIS E', value: 'abstimmung' },
				)),
    async execute(interaction) {
        // Count to Global Commands
        cmds.add('t-all', 1)
        
        // Count Guild Commands and User
        cmds.add('g-' + interaction.guild.id, 1)
        cmds.add('u-' + interaction.user.id, 1)
        
        // Set Variables
        const frage = interaction.options.getString("text")
        const reactions = interaction.options.getString("reactions")

        // Create Embed
       	const message = new EmbedBuilder()
            .setTitle('» EINE ' + reactions.toUpperCase())
  			.setDescription('» ' + frage)
        	.setFooter({ text: '» ' + version });
        
        // Send Message
        interaction.reply({ embeds: [message.toJSON()] })
        const sendcache = await interaction.fetchReply();
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] VOTE : ' + frage.toUpperCase() + ' : ' + reactions.toUpperCase())
        
        // Add the correct Reactions
		if (reactions == 'frage') {
            sendcache.react('<:YES:1009735521154650123>');
			sendcache.react('<:NO:1009735555229163560>');
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