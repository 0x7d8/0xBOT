import { SlashCommandBuilder, EmbedBuilder } from "discord.js"
import { PermissionFlagsBits } from "discord-api-types/v10"

import { Message } from "discord.js"
import CommandInteraction from "@interfaces/CommandInteraction.js"
export default {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('CLEAR MESSAGES')
		.setDescriptionLocalizations({
			de: 'ENTFERNE NACHRICHTEN'
		})
		.setDMPermission(false)
		.addIntegerOption(option =>
			option.setName('amount')
				.setNameLocalizations({
					de: 'anzahl'
				})
				.setDescription('THE AMOUNT OF MESSAGES')
				.setDescriptionLocalizations({
					de: 'DIE ANZAHL AN NACHRICHTEN'
				})
				.setRequired(true))
		.addUserOption(option =>
			option.setName('user')
				.setNameLocalizations({
					de: 'nutzer'
				})
				.setDescription('THE TARGET')
				.setDescriptionLocalizations({
					de: 'DAS ZIEL'
				})
				.setRequired(false))
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

	async execute(ctx: CommandInteraction) {
		// Check if Bot has Permission
		if (!ctx.interaction.appPermissions?.has('ManageMessages')) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
				.setDescription('» I dont think I have the **MANAGE MESSAGES** Permission!')
				.setFooter({ text: '» ' + ctx.client.config.version })
			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
					.setDescription('» Ich denke nicht, dass ich die **NACHRICHTEN VERWALTEN** Berechtigung habe!')
					.setFooter({ text: '» ' + ctx.client.config.version })
			}
			
			// Send Message
			ctx.log(false, `[CMD] CLEAR : NOPERM`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}; if (!ctx.interaction.appPermissions?.has('ViewChannel')) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
				.setDescription('» I dont think I have the **VIEW CHANNEL** Permission!')
				.setFooter({ text: '» ' + ctx.client.config.version })
			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
					.setDescription('» Ich denke nicht, dass ich die **KANÄLE ANSEHEN** Berechtigung habe!')
					.setFooter({ text: '» ' + ctx.client.config.version })
			}
			
			// Send Message
			ctx.log(false, `[CMD] CLEAR : NOPERM`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Set Variables
		const amount = ctx.getOption('amount') as number
		const target = ctx.interaction.options.getUser("user")
		const messages = ctx.interaction.channel?.messages.fetch()

		// Check if Message Amount is Negative
		if (amount < 1) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
				.setDescription('» You have to delete atleast **1** Message!')
				.setFooter({ text: '» ' + ctx.client.config.version })
			if (ctx.metadata.language === 'de') {

				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
					.setDescription('» Du musst mindestens **1** Nachricht löschen!')
					.setFooter({ text: '» ' + ctx.client.config.version })
			}
			
			// Send Message
			ctx.log(false, `[CMD] CLEAR : NOTENOUGH : ${amount}`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Delete Messages and Send Message
		if (target !== null) {
			const filtered = []
			let i = 0

			{(await messages).filter((message: Message) => {
				if(message.author.id === target.id && amount > i) {
					filtered.push(message)
					i++
				}
			})}

			await ctx.interaction.channel?.bulkDelete(filtered, true).then((messages) => {
				// Create Embed
				let message: any
				if (messages.size == 1) {
					message = new EmbedBuilder().setColor(0x37009B)
						.setTitle('» DELETE MESSAGES')
						.setDescription('» You deleted **' + messages.size + '** Message from <@' + target + '>!')
						.setFooter({ text: '» ' + ctx.client.config.version })

					if (ctx.metadata.language === 'de') {
						message = new EmbedBuilder().setColor(0x37009B)
							.setTitle('» NACHRICHTEN LÖSCHEN')
							.setDescription('» Du hast **' + messages.size + '** Nachricht von <@' + target + '> gelöscht!')
							.setFooter({ text: '» ' + ctx.client.config.version })
					}
				} else {
					message = new EmbedBuilder().setColor(0x37009B)
						.setTitle('» DELETE MESSAGES')
						.setDescription('» You deleted **' + messages.size + '** Messages from <@' + target + '>!')
						.setFooter({ text: '» ' + ctx.client.config.version })

					if (ctx.metadata.language === 'de') {
						message = new EmbedBuilder().setColor(0x37009B)
							.setTitle('» NACHRICHTEN LÖSCHEN')
							.setDescription('» Du hast **' + messages.size + '** Nachrichten von <@' + target + '> gelöscht!')
							.setFooter({ text: '» ' + ctx.client.config.version })
					}
				}

				// Send Message
				ctx.log(false, '[CMD] CLEAR : ' + target + ' : ' + amount)
				return ctx.interaction.reply({ embeds: [message], ephemeral: true })
			})
		} else {
			await ctx.interaction.channel?.bulkDelete(amount, true).then((messages) => {
				// Create Embed
				let message: any
				if (messages.size == 1) {
					message = new EmbedBuilder().setColor(0x37009B)
						.setTitle('» DELETE MESSAGES')
						.setDescription('» You deleted **' + messages.size + '** Message!')
						.setFooter({ text: '» ' + ctx.client.config.version })

					if (ctx.metadata.language === 'de') {
						message = new EmbedBuilder().setColor(0x37009B)
							.setTitle('» NACHRICHTEN LÖSCHEN')
							.setDescription('» Du hast **' + messages.size + '** Nachricht gelöscht!')
							.setFooter({ text: '» ' + ctx.client.config.version })
					}
				} else {
					message = new EmbedBuilder().setColor(0x37009B)
						.setTitle('» DELETE MESSAGES')
						.setDescription('» You deleted **' + messages.size + '** Messages!')
						.setFooter({ text: '» ' + ctx.client.config.version })

					if (ctx.metadata.language === 'de') {
						message = new EmbedBuilder().setColor(0x37009B)
							.setTitle('» NACHRICHTEN LÖSCHEN')
							.setDescription('» Du hast **' + messages.size + '** Nachrichten gelöscht!')
							.setFooter({ text: '» ' + ctx.client.config.version })
					}
				}

				// Send Message
				ctx.log(false, `[CMD] CLEAR : ${amount}`)
				return ctx.interaction.reply({ embeds: [message], ephemeral: true })
			})
		}
	}
}