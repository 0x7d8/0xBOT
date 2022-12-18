import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import CommandInteraction from "@interfaces/CommandInteraction.js"
export default {
	data: new SlashCommandBuilder()
		.setName('businessinfo')
		.setDMPermission(false)
		.setDescription('VIEW INFO ABOUT BUSINESSES')
		.setDescriptionLocalizations({
			de: 'SEHE INFOS VON GESCHÄFTEN'
		})
		.addStringOption((option: any) =>
			option.setName('business')
				.setNameLocalizations({
					de: 'geschäft'
				})
				.setDescription('THE BUSINESS')
				.setDescriptionLocalizations({
					de: 'DAS GESCHÄFT'
				})
				.setRequired(true)
				.addChoices(
					// Setup Choices
					{ name: '🟢 SUPERMARKT', value: 'market' },
					{ name: '🔵 PARKHAUS', value: 'parking garage' },
					{ name: '🟡 AUTOHAUS', value: 'car dealership' },
				)),

	async execute(ctx: CommandInteraction) {
		// Check if Businesses are Enabled in Server
		if (!await ctx.bot.settings.get(ctx.interaction.guild.id, 'businesses')) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
				.setDescription('» Businesses are disabled on this Server!')
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
					.setDescription('» Geschäfte sind auf diesem Server deaktiviert!')
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
			
			// Send Message
			ctx.log(false, `[CMD] BUSINESS : DISABLED`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Set Variables
		const business = ctx.getOption('business') as string

		// Translate to Business ID
		let businessid: string
		if (business === 'market') businessid = '1'
		if (business === 'parking garage') businessid = '2'
		if (business === 'car dealership') businessid = '3'

		// Check if Business is Empty
		let businessowner: string
		if (await ctx.bot.businesses.get('g-' + ctx.interaction.guild.id + '-' + businessid + '-OWNER') != 0) {
			let oldleft = false
			businessowner = await ctx.bot.businesses.get('g-' + ctx.interaction.guild.id + '-' + businessid + '-OWNER')
			const businessearning = await ctx.bot.businesses.get('g-' + ctx.interaction.guild.id + '-' + businessid + '-EARNING', true)
			try {
				await ctx.interaction.guild.members.fetch(businessowner)
			} catch (e) { oldleft = true }

			if (!oldleft) {
				// Create Embed
				let message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:QUESTION:1024402860210921503> » BUSINESS INFO')
					.setDescription('» Business Infos:\n\nOwner: <@' + businessowner + '>\nEarnings: ' + businessearning + '€')
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

				if (ctx.metadata.language === 'de') {
					message = new EmbedBuilder().setColor(0x37009B)
						.setTitle('<:QUESTION:1024402860210921503> » GESCHÄFTS INFO')
						.setDescription('» Geschäfts Infos:\n\nBesitzer: <@' + businessowner + '>\nEinkommen: ' + businessearning + '€')
						.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
				}
				
				// Send Message
				ctx.log(false, `[CMD] BUSINESSINFO : ${business.toUpperCase()}`)
				return ctx.interaction.reply({ embeds: [message], ephemeral: true })
			}
		}

		// Create Embed
		let message = new EmbedBuilder().setColor(0x37009B)
			.setTitle('<:QUESTION:1024402860210921503> » BUSINESS INFO')
			.setDescription('» Noone owns this Business, people say its profitable though!\n*mhm, I say that for everything*')
			.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

		if (ctx.metadata.language === 'de') {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:QUESTION:1024402860210921503> » GESCHÄFTS INFO')
				.setDescription('» Niemanden gehört dieses Geschäft, es besagt sich es sei aber profitabel!\n*naja, das sag ich bei jedem*')
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
		}

		// Send Message
		ctx.log(false, `[CMD] BUSINESSINFO : ${business.toUpperCase()} : NOTOWNED`)
		return ctx.interaction.reply({ embeds: [message], ephemeral: true })
	}
}