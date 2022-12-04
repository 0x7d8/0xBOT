import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js"
import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import * as bot from "@functions/bot.js"
import Client from "@interfaces/Client.js"
import { CommandInteraction } from "discord.js"
export default {
    data: new SlashCommandBuilder()
        .setName('search')
    	.setDMPermission(false)
        .setDescription('SHOW A BUTTON TO A SEARCH')
        .setDescriptionLocalizations({
            de: 'ZEIGE EINEN KNOPF ZU EINER SUCHE'
        })
        .addStringOption((option: any) =>
            option.setName('query')
                .setNameLocalizations({
                    de: 'suche'
                })
                .setDescription('THE QUERY')
                .setDescriptionLocalizations({
                    de: 'DIE SUCHE'
                })
                .setRequired(true))
    	.addStringOption((option: any) =>
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

    async execute(interaction: CommandInteraction, client: Client, lang: string, vote: string) {
        // Set Variables
        let query = bot.getOption(interaction, 'query') as string
        let engine = bot.getOption(interaction, 'engine') as string
        if (!engine) engine = 'Google'
        
        // Create Query
        query = encodeURIComponent(query)

        // Create Buttons
        const google = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('👀 ANSCHAUEN')
					.setURL("https://google.com/search?q=" + query)
					.setStyle(ButtonStyle.Link),
			)
        const bing = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('👀 ANSCHAUEN')
					.setURL("https://bing.com/search?q=" + query)
					.setStyle(ButtonStyle.Link),
			)
        const yahoo = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('👀 ANSCHAUEN')
					.setURL("https://search.yahoo.com/search?q=" + query)
					.setStyle(ButtonStyle.Link),
			);
        const duck = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('👀 ANSCHAUEN')
					.setURL("https://duckduckgo.com/?q=" + query)
					.setStyle(ButtonStyle.Link),
			)
        
        // Create Embed
       	let message = new EmbedBuilder().setColor(0x37009B)
            .setTitle('<:SEARCH:1024389710279348354> » SEARCH')
  			.setDescription('» Click Below to look up results for **' + decodeURIComponent(query) + '** on **' + engine + '**!')
        	.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

        if (lang === 'de') {
            message = new EmbedBuilder().setColor(0x37009B)
                .setTitle('<:SEARCH:1024389710279348354> » SUCHEN')
  			    .setDescription('» Klicke unten um nach Ergebnissen für **' + decodeURIComponent(query) + '** auf **' + engine + '** zu finden!')
        	    .setFooter({ text: '» ' + vote + ' » ' + client.config.version })
        }
        
        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] SEARCH : "' + decodeURIComponent(query).toUpperCase() + '" : ' + engine.toUpperCase())
        if (engine === 'Google') {
        	await interaction.reply({ embeds: [message], components: [google as any] })
        }; if (engine === 'Bing') {
            await interaction.reply({ embeds: [message], components: [bing as any] })
        }; if (engine === 'Yahoo') {
            await interaction.reply({ embeds: [message], components: [yahoo as any] })
        }; if (engine === 'DuckDuckGo') {
            await interaction.reply({ embeds: [message], components: [duck as any] })
        }
    }
}