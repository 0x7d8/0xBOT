import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js"
import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import CommandInteraction from "@interfaces/CommandInteraction.js"
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

	async execute(ctx: CommandInteraction) {
		// Set Variables
		let query = ctx.getOption('query') as string
		let engine = ctx.getOption('engine') as string
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
  		.setDescription(`» Click Below to look up results for **${decodeURIComponent(query)}** on **${engine}**!`)
			.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

		if (ctx.metadata.language === 'de') {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:SEARCH:1024389710279348354> » SUCHEN')
  			.setDescription(`» Klicke unten um nach Ergebnissen für **${decodeURIComponent(query)}** auf **${engine}** zu finden!`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
		}
		
		// Send Message
		ctx.log(false, `[CMD] SEARCH : "${decodeURIComponent(query).toUpperCase()}" : ${engine.toUpperCase()}`)
		if (engine === 'Google') {
			await ctx.interaction.reply({ embeds: [message], components: [google as any] })
		}; if (engine === 'Bing') {
			await ctx.interaction.reply({ embeds: [message], components: [bing as any] })
		}; if (engine === 'Yahoo') {
			await ctx.interaction.reply({ embeds: [message], components: [yahoo as any] })
		}; if (engine === 'DuckDuckGo') {
			await ctx.interaction.reply({ embeds: [message], components: [duck as any] })
		}
	}
}