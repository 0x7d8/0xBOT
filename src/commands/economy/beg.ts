import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js"
import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import CommandInteraction from "@/interfaces/CommandInteraction"
export default {
	data: new SlashCommandBuilder()
		.setName('beg')
		.setDescription('BEG FOR MONEY')
		.setDescriptionLocalizations({
			de: 'BETTEL FÜR GELD'
		})
		.setDMPermission(false)
		.addIntegerOption((option) =>
			option.setName('amount')
				.setNameLocalizations({
					de: 'anzahl'
				})
				.setDescription('THE AMOUNT OF MONEY')
				.setDescriptionLocalizations({
					de: 'DIE ANZAHL AN GELD'
				})
				.setRequired(true))
		.addStringOption((option) =>
			option.setName('reason')
				.setNameLocalizations({
					de: 'grund'
				})
				.setDescription('THE REASON')
				.setDescriptionLocalizations({
					de: 'DER GRUND'
				})
				.setRequired(false)),

	async execute(ctx: CommandInteraction) {
		// Set Variables
		const amount = ctx.getOption('amount') as number
		const reason = ctx.getOption('reason') as string

		// Check if Balance is Minus
		if (amount < 0) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
				.setDescription(`» You cant ask for negative Money!`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
					.setDescription(`» Du kannst nicht nach negativem Geld fragen!`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}

			// Send Message
			ctx.log(false, `[CMD] BEG : NEGATIVEMONEY : ${amount}€`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Check for Max Amount
		if (amount > 15000) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('» BEGGING')
				.setDescription(`» You cant beg that much! **$15000** is the Maximum.`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('» BETTELN')
					.setDescription(`» Du kannst nicht so viel erbetteln! **15000€** ist das Maximum.`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}

			// Send Message
			ctx.log(false, `[CMD] BEG : TOOMUCHMONEY : ${amount}€`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Set Reason Type
		let reasontype: string
		if (!reason) reasontype = 'NONE'
		else { reasontype = 'SET' }
		let reasonres = reason
		if (!reason) reasonres = 'NULL'

		// Create Button
		let row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel(`GIVE ${ctx.interaction.user.username.toUpperCase()} \$${amount}`)
					.setEmoji('1024382935618572299')
					.setCustomId(`BEG-${ctx.interaction.user.id}-${amount}-${reasontype}-${reasonres.toString()}`)
					.setStyle(ButtonStyle.Primary),
			)

		if (ctx.metadata.language === 'de') {
			row = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setLabel(`GEBE ${ctx.interaction.user.username.toUpperCase()} ${amount}€`)
						.setEmoji('1024382935618572299')
						.setCustomId(`BEG-${ctx.interaction.user.id}-${amount}-${reasontype}-${reasonres.toString()}`)
						.setStyle(ButtonStyle.Primary),
				)
		}

		// Create Embed
		let message: any
		if (!reason) {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:DONATE:1024397357988720711> » BEGGING')
				.setDescription(`
					» <@${ctx.interaction.user.id}> needs Money!
					Total Earnings: **$0**
				`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:DONATE:1024397357988720711> » BETTELN')
					.setDescription(`
						» <@${ctx.interaction.user.id}> braucht Geld!
						Insgesamte Einnahmen: **0€**
					`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
		} else {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:DONATE:1024397357988720711> » BEGGING')
				.setDescription(`
					» <@${ctx.interaction.user.id}> needs Money!
					Total Earnings: **$0**

					*"${reason}"*
				`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:DONATE:1024397357988720711> » BETTELN')
					.setDescription(`
						» <@${ctx.interaction.user.id}> braucht Geld!
						Insgesamte Einnahmen: **0€**

						*"${reason}"*
					`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
		}

		// Send Message
		ctx.log(false, `[CMD] BEG : ${amount}€`)
		return ctx.interaction.reply({ embeds: [message], components: [row as any] })
	}
}