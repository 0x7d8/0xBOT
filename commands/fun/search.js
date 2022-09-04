const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { version } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('search')
    	.setDMPermission(false)
        .setDescription('SHOW A BUTTON TO A SEARCH')
        .setDescriptionLocalizations({
            de: 'ZEIGE EINEN KNOPF ZU EINER SUCHE'
        })
        .addStringOption(option =>
            option.setName('query')
                .setNameLocalizations({
                    de: 'suche'
                })
                .setDescription('THE QUERY')
                .setDescriptionLocalizations({
                    de: 'SIE SUCHE'
                })
                .setRequired(true))
    	.addStringOption(option =>
            option.setName('engine')
                .setDescription('THE SEARCH ENGINE')
                .setDescriptionLocalizations({
                    de: 'DIE SUCHMASCHINE'
                })
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
        cmds.add('t-all', 1)
        
        // Count Guild Commands and User
        cmds.add('g-' + interaction.guild.id, 1)
        cmds.add('u-' + interaction.user.id.replace(/\D/g, ''), 1)
        
        // Set Variables
        const suche = interaction.options.getString("query")
        let engine = interaction.options.getString("engine")
        if (engine == null) { engine = 'Google' }
        
        // Create Query
        const query = encodeURIComponent(suche)

        // Create Buttons
        const google = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('ANSCHAUEN')
					.setURL("https://google.com/search?q=" + query)
					.setStyle(ButtonStyle.Link),
			);
        const bing = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('ANSCHAUEN')
					.setURL("https://bing.com/search?q=" + query)
					.setStyle(ButtonStyle.Link),
			);
        const yahoo = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('ANSCHAUEN')
					.setURL("https://search.yahoo.com/search?q=" + query)
					.setStyle(ButtonStyle.Link),
			);
        const duck = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('ANSCHAUEN')
					.setURL("https://duckduckgo.com/search?q=" + query)
					.setStyle(ButtonStyle.Link),
			);
        
        // Create Embed
       	const message = new EmbedBuilder()
            .setTitle('» SUCHEN')
  			.setDescription('» Klicke unten um nach Ergebnissen für **' + suche + '** auf **' + engine + '** zu finden!')
        	.setFooter({ text: '» ' + version });
        
        // Send Message
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] SEARCH : "' + suche.toUpperCase() + '" : ' + engine.toUpperCase())
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