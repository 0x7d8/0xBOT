import { SlashCommandBuilder, EmbedBuilder, Collection } from "discord.js"
const cooldown = new Collection()

import * as bot from "@functions/bot.js"
import Client from "@interfaces/Client.js"
import { CommandInteraction } from "discord.js"
export default {
	data: new SlashCommandBuilder()
		.setName('quote')
		.setDescription('QUOTE SOMETHING')
		.setDescriptionLocalizations({
			de: 'ZITIERE ETWAS'
		})
		.setDMPermission(false)
		.addStringOption((option: any) =>
			option.setName('quote')
				.setNameLocalizations({
					de: 'zitat'
				})
				.setDescription('THE QUOTE')
				.setDescriptionLocalizations({
					de: 'DAS ZITAT'
				})
				.setRequired(true))
		.addUserOption((option: any) =>
			option.setName('author')
				.setNameLocalizations({
					de: 'autor'
				})
				.setDescription('THE AUTHOR')
				.setDescriptionLocalizations({
					de: 'DER AUTOR'
				})
				.setRequired(false)),

	async execute(interaction: CommandInteraction, client: Client, lang: string, vote: string) {
		// Check if Quotes are Enabled in Server
		if (!await bot.settings.get(interaction.guild.id, 'quotes')) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
				.setDescription('» Quotes are disabled on this Server!')
				.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

			if (lang === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
					.setDescription('» Zitate sind auf diesem Server deaktiviert!')
					.setFooter({ text: '» ' + vote + ' » ' + client.config.version })
			}
			
			// Send Message
			bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] QUOTE : DISABLED')
			return interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Set Variables
		const quote = bot.getOption(interaction, 'quote') as string
		const author = interaction.options.getUser("author")
	 
		// Cooldown
		if (cooldown.get(interaction.user.id) as number - Date.now() > 0) {
			// Translate Vars
			const timeLeft = cooldown.get(interaction.user.id) as number - Date.now()
			const cdown = timeLeft / 1000
			
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  				.setDescription('» You still have a Cooldown of **' + cdown.toFixed(0) + 's**!')
				.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

			if (lang === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  					.setDescription('» Du hast leider noch einen Cooldown von **' + cdown.toFixed(0) + 's**!')
					.setFooter({ text: '» ' + vote + ' » ' + client.config.version })
			}
			
			// Send Message
			bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] QUOTE : ONCOOLDOWN : ' + cdown.toFixed(0) + 's')
			return interaction.reply({ embeds: [message], ephemeral: true })
		}
		
		// Check if there is a author specified
		let message: any
		if (!author || interaction.user.id === author.id) {
			const amount = await bot.quotes.get(interaction.user.id) + 1
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:QUOTES:1024406448127623228> » A WISE QUOTE')
  				.setDescription('» "' + quote + '" ~<@' + interaction.user.id + '>')
				.setFooter({ text: '» ' + client.config.version + ' » QUOTES: ' + amount})

			if (lang === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:QUOTES:1024406448127623228> » EIN WEISES ZITAT')
  					.setDescription('» "' + quote + '" ~<@' + interaction.user.id + '>')
					.setFooter({ text: '» ' + client.config.version + ' » ZITATE: ' + amount})
			}
			
			bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] QUOTE : ' + quote.toUpperCase())
		} else {
			const amount = await bot.quotes.get(author.toString().replace(/\D/g, '')) + 1
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:QUOTES:1024406448127623228> » A QUOTE')
  				.setDescription('» "' + quote + '" ~<@' + author + '>')
				.setFooter({ text: '» ' + client.config.version + ' » QUOTES: ' + amount})

			if (lang === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:QUOTES:1024406448127623228> » EIN quote')
  					.setDescription('» "' + quote + '" ~<@' + author + '>')
					.setFooter({ text: '» ' + client.config.version + ' » ZITATE: ' + amount})
			}
			
			bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] QUOTE : ' + quote.toUpperCase() + ' : ~' + author)
			bot.quotes.add(author.toString().replace(/\D/g, ''), 1)
		}
		
		// Set Cooldown
		cooldown.set(interaction.user.id, Date.now() + 45000)
		setTimeout(() => cooldown.delete(interaction.user.id), 45000)

		// Send Message
		return interaction.reply({ embeds: [message] })
	}
}