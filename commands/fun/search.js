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
    async execute(interaction, client, lang, vote) {
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
       	let message = new EmbedBuilder()
            .setTitle('» SEARCH')
  			.setDescription('» Click Below to look up results for **' + suche + '** on **' + engine + '**!')
        	.setFooter({ text: '» ' + vote + ' » ' + version });

        if (lang == "de") {
            message = new EmbedBuilder()
                .setTitle('» SUCHEN')
  			    .setDescription('» Klicke unten um nach Ergebnissen für **' + suche + '** auf **' + engine + '** zu finden!')
        	    .setFooter({ text: '» ' + vote + ' » ' + version });
        }
        
        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] SEARCH : "' + suche.toUpperCase() + '" : ' + engine.toUpperCase())
        if (engine == 'Google') {
        	await interaction.reply({ embeds: [message.toJSON()], components: [google] })
        }
        if (engine == 'Bing') {
            await interaction.reply({ embeds: [message.toJSON()], components: [bing] })
        }
        if (engine == 'Yahoo') {
            await interaction.reply({ embeds: [message.toJSON()], components: [yahoo] })
        }
        if (engine == 'DuckDuckGo') {
            await interaction.reply({ embeds: [message.toJSON()], components: [duck] })
        }
    },
};