const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
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
					{ name: '✅ JA & NEIN', value: 'question' },
            		{ name: '🧮 BUCHSTABEN VON A BIS E', value: 'vote' },
				)),
    async execute(interaction, client, vote) {
        // Set Variables
        const frage = interaction.options.getString("text")
        const reactions = interaction.options.getString("reactions")

        // Create Embed
       	let message = new EmbedBuilder()
            .setTitle('» A ' + reactions.toUpperCase())
  			.setDescription('» ' + frage)
        	.setFooter({ text: '» ' + vote + ' » ' + version });

        if (interaction.guildLocale == "de") {
            let reactionsde
            if (reactions == "question") { reactionsde = "frage" }
            if (reactions == "vote") { reactionsde = "abstimmung" }

            message = new EmbedBuilder()
                .setTitle('» EINE ' + reactionsde.toUpperCase())
  			    .setDescription('» ' + frage)
        	    .setFooter({ text: '» ' + vote + ' » ' + version });
        }
        
        // Send Message
        await interaction.reply({ embeds: [message.toJSON()] })
        const sendcache = await interaction.fetchReply();
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] VOTE : ' + frage.toUpperCase() + ' : ' + reactions.toUpperCase())
        
        // Add the correct Reactions
		if (reactions == 'frage') {
            sendcache.react('<:YES:1017050442431209543>');
			sendcache.react('<:NO:1017050508252418068>');
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