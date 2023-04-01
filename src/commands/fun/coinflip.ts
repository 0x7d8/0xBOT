import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import CommandInteraction from "@/interfaces/CommandInteraction"
export default {
	data: new SlashCommandBuilder()
		.setName('coinflip')
		.setDMPermission(false)
		.setDescription('FLIP A COIN')
		.setDescriptionLocalizations({
			de: 'WIRF EINE MÜNZE'
		})
		.addIntegerOption((option) =>
			option.setName('amount')
				.setNameLocalizations({
					de: 'anzahl'
				})
				.setDescription('THE AMOUNT')
				.setDescriptionLocalizations({
					de: 'DIE ANZAHL'
				})
				.setRequired(false)),

	async execute(ctx: CommandInteraction) {
		// Set Variables
		let amount = ctx.getOption('amount') as number
		let heads = 0; let tails = 0; let tries = 0
		if (!amount) amount = 1
		
		// Check if Number is negative
		if (amount < 1) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
				.setDescription(`» You need to throw atleast **1** Coin!`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
					.setDescription(`» Du musst schon mindestens **1** Münze werfen!`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
			
			// Send Message
			ctx.log(false, `[CMD] COINFLIP : NOTENOUGHCOINS : ${amount}`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Check if Number is too Big
		if (amount > 1000) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
				.setDescription(`» You cant throw more than **1000** Coins!`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
					.setDescription(`» Du darfst nicht mehr als **1000** Münzen werfen!`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
			
			// Send Message
			ctx.log(false, `[CMD] COINFLIP : TOOMANYCOINS : ${amount}`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Loop
		let coin: string
		while (amount !== tries) {
			const random = ctx.bot.random(1, 2)

			if (random === 1) { coin = 'HEAD'; heads++ }
			if (random === 2) { coin = 'TAIL'; tails++ }

			tries++
		}
		
		// Create Embed
		let message: EmbedBuilder
		if (amount === 1) {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:COINS:1024392690776944803> » COINFLIP')
  			.setDescription(`» The Coin Landed on **${coin}**!`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				if (coin === "HEAD") coin = "KOPF"
				if (coin === "TAIL") coin = "ZAHL"

				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:COINS:1024392690776944803> » COINFLIP')
  				.setDescription(`» Die Münze ist auf **${coin}** gelandet!`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
		} else {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:COINS:1024392690776944803> » COINFLIP')
  			.setDescription(`
					» Heads
					\`\`\`${heads}\`\`\`
					» Tails
					\`\`\`${tails}\`\`\`
				`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:COINS:1024392690776944803> » COINFLIP')
  				.setDescription(`
						» Köpfe
						\`\`\`${heads}\`\`\`
						» Zahlen
						\`\`\`${tails}\`\`\`
					`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
		}

		
		// Send Message
		ctx.log(false, `[CMD] COINFLIP : H[${heads}] : T[${tails}]`)
		return ctx.interaction.reply({ embeds: [message] })
	}
}