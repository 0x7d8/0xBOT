import { SlashCommandBuilder, EmbedBuilder } from "discord.js"
import * as utils from "rjutils-collection"

import CommandInteraction from "@interfaces/CommandInteraction.js"
export default {
	data: new SlashCommandBuilder()
		.setName('password')
		.setDMPermission(false)
		.setDescription('GENERATE A PASSWORD')
		.setDescriptionLocalizations({
			de: 'GENERIERE EIN PASSWORT'
		})
		.addIntegerOption((option) =>
			option.setName('length')
				.setNameLocalizations({
					de: 'länge'
				})
				.setDescription('THE length')
				.setDescriptionLocalizations({
					de: 'DIE LÄNGE'
				})
				.setRequired(true)),

	async execute(ctx: CommandInteraction) {
		// Set Variables
		const length = ctx.getOption('length') as number

		// Check length
		if (length > 512) {

			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
				.setDescription(`» The Maximum Size is **512**!`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
					.setDescription(`» Die Maximale Größe ist **512**!`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
			
			ctx.log(false, `[CMD] PASSWORD : TOOBIG : ${length}`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })

		}

		if (length < 4) {

			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
				.setDescription(`» The Minimum Size is **4**!`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
					.setDescription(`» Die Minimale Größe ist **4**!`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
			
			ctx.log(false, `[CMD] PASSWORD : TOOSMALL : ${length}`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })

		}

		// Generate Password
		const password: string = utils.randomStr({
			"numbers": true,
			"uppercase": true,
			"symbols": true,
			"length": length
		})

		// Create Embed
		let message = new EmbedBuilder().setColor(0x37009B)
			.setTitle('<:KEY:1024392167130664980> » GENERATE PASSWORD')
  		.setDescription(`
				» Password
				\`\`\`${password.replace('```', '``"')}\`
			`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

		if (ctx.metadata.language === 'de') {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:KEY:1024392167130664980> » PASSWORT GENERIEREN')
  			.setDescription(`
					» Passwort
					\`\`\`${password.replace('```', '``"')}\`\`\`
				`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
		}

		// Send Message
		ctx.log(false, `[CMD] PASSWORD : ${length}`)
		return ctx.interaction.reply({ embeds: [message], ephemeral: true })
	}
}