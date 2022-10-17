const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
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
    async execute(interaction, client, lang, vote) {
        // Set Variables
        const frage = interaction.options.getString("text")
        const reactions = interaction.options.getString("reactions")

        // Create Embed
       	let message = new EmbedBuilder().setColor(0x37009B)
            .setTitle('<:POLL:1024391847092703365> » A ' + reactions.toUpperCase())
  			.setDescription('» ' + frage)
        	.setFooter({ text: '» ' + vote + ' » ' + version });

        if (lang === 'de') {
            let reactionsde
            if (reactions == "question") { reactionsde = "frage" }
            if (reactions == "vote") { reactionsde = "abstimmung" }

            message = new EmbedBuilder().setColor(0x37009B)
                .setTitle('<:POLL:1024391847092703365> » EINE ' + reactionsde.toUpperCase())
  			    .setDescription('» ' + frage)
        	    .setFooter({ text: '» ' + vote + ' » ' + version });
        }
        
        // Send Message
        await interaction.reply({ embeds: [message] })
        const sendcache = await interaction.fetchReply();
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] POLL : ' + frage.toUpperCase() + ' : ' + reactions.toUpperCase())
        
        // Add the correct Reactions
		if (reactions == 'question') {
            sendcache.react('<:YES:1017050442431209543>');
			sendcache.react('<:NO:1017050508252418068>');
        }
        if (reactions == 'vote') {
            sendcache.react('🇦');
			sendcache.react('🇧');
            sendcache.react('🇨');
            sendcache.react('🇩');
            sendcache.react('🇪');
        }
    },
};