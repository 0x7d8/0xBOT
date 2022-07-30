const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');
const { version } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('search')
    	.setDMPermission(false)
        .setDescription('ZEIGE JEMANDEN GOOGLE')
        .addStringOption(option =>
            option.setName('suche')
                .setDescription('DIE SUCHE')
                .setRequired(true))
    	.addStringOption(option =>
            option.setName('engine')
                .setDescription('DIE SUCHMASCHINE')
                .setRequired(false)
                .addChoices(
            		// Setup Choices
            		{ name: '🤔 GOOGLE', value: 'Google' },
            		{ name: '⭐ BING', value: 'Bing' },
            		{ name: '⭐ YAHOO', value: 'Yahoo' },
            		{ name: '⭐ DUCKDUCKGO', value: 'DuckDuckGo' },
				)),
    async execute(interaction) {
        // Count to Global Commands
        addcmd('t-all', 1)
        
        // Count Guild Commands and User
        addcmd('g-' + interaction.guild.id, 1)
        addcmd('u-' + interaction.user.id, 1)
        
        // Set Variables
        const suche = interaction.options.getString("suche")
        var engine = interaction.options.getString("engine")
        if (engine == null) { var engine = 'Google' }
        
        // Create Query
        const query = encodeURIComponent(suche)
        
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
        
        // Create Buttons
		const google = new MessageActionRow()
			.addComponents(
				new MessageButton()
    				.setLabel('ANSCHAUEN')
    				.setURL("https://google.com/search?q=" + query)
    				.setStyle('LINK'),
		);
		const bing = new MessageActionRow()
			.addComponents(
				new MessageButton()
    				.setLabel('ANSCHAUEN')
    				.setURL("https://bing.com/search?q=" + query)
    				.setStyle('LINK'),
		);
        const yahoo = new MessageActionRow()
			.addComponents(
				new MessageButton()
    				.setLabel('ANSCHAUEN')
    				.setURL("https://search.yahoo.com/search?q=" + query)
    				.setStyle('LINK'),
		);
        const duck = new MessageActionRow()
			.addComponents(
				new MessageButton()
    				.setLabel('ANSCHAUEN')
    				.setURL("https://duckduckgo.com/?q=" + query)
    				.setStyle('LINK'),
		);
        
        // Create Embed
       	const message = new EmbedBuilder()
            .setTitle('» SUCHEN')
  			.setDescription('» Klicke unten um nach Ergebnissen für **' + suche + '** auf **' + engine + '** zu finden!')
        	.setFooter({ text: '» ' + version });
        
        // Send Message
        console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] SEARCH : "' + suche.toUpperCase() + '" : ' + engine.toUpperCase())
        if (engine == 'Google') {
        	interaction.reply({ embeds: [message.toJSON()], components: [google] })
        }
        if (engine == 'Bing') {
            interaction.reply({ embeds: [message.toJSON()], components: [bing] })
        }
        if (engine == 'Yahoo') {
            interaction.reply({ embeds: [message.toJSON()], components: [yahoo] })
        }
        if (engine == 'DuckDuckGo') {
            interaction.reply({ embeds: [message.toJSON()], components: [duck] })
        }
    },
};