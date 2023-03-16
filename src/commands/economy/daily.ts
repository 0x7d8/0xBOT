import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import CommandInteraction from "@/interfaces/CommandInteraction"
export default {
	data: new SlashCommandBuilder()
		.setName('daily')
		.setDMPermission(false)
		.setDescription('GET YOUR DAILY BONUS')
		.setDescriptionLocalizations({
			de: 'HOLE DEINEN TÄGLICHEN BONUS'
		}),

	async execute(ctx: CommandInteraction) {
		const ms = (await import('pretty-ms')).default

		// Check if Daily is Enabled in Server
		if (!await ctx.bot.settings.get(ctx.interaction.guild.id, 'daily')) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
				.setDescription('» The **`/daily`** Command is disabled on this Server!')
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
					.setDescription('» Der **`/daily`** Befehl ist auf diesem Server deaktiviert!')
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
			
			// Send Message
			ctx.log(false, `[CMD] DAILY : DISABLED`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Cooldown
		if ((await ctx.bot.cooldown.get(ctx.interaction.user.id, 'daily')).onCooldown) {
			// Set Variables
			const timeLeft = (await ctx.bot.cooldown.get(ctx.interaction.user.id, 'daily')).remaining
			
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  			.setDescription(`» You still have a Cooldown of **${ms(timeLeft, { secondsDecimalDigits: 0 })}**!`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				.setDescription(`» Du hast leider noch einen Cooldown von **${ms(timeLeft, { secondsDecimalDigits: 0 })}**!`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
			
			// Send Message
			ctx.log(false, `[CMD] DAILY : ONCOOLDOWN : ${ms(timeLeft, { secondsDecimalDigits: 0 })}`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		} else {
			const result = ctx.bot.random(750, 1500)
			
			// Set Extra Text
			let extra: string
			if (result < 800) extra = 'MEH.'
			if (result >= 800) extra = 'NICE.'
			if (result >= 1000) extra = 'GREAT.'
			if (result >= 1200) extra = 'WONDERFUL!'
			if (result >= 1400) extra = 'WOW!'
			if (ctx.metadata.language === 'de') {
				if (result < 800) extra = 'MEH.'
				if (result >= 800) extra = 'NICE.'
				if (result >= 1000) extra = 'PRIMA.'
				if (result >= 1200) extra = 'TOLL!'
				if (result >= 1400) extra = 'WOW!'
			}

			// Log Transaction
			const transaction = await ctx.bot.transactions.log({
				success: true,
				sender: {
					id: 'DAILY',
					amount: result,
					type: 'negative'
				}, reciever: {
					id: ctx.interaction.user.id,
					amount: result,
					type: 'positive'
				}
			})
		
			// Create Embed
	  	let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:HAMMER:1024388163747184662> » DAILY')
  			.setDescription(`
					» You get **$${result}** from me Today! ${extra}

					ID: ${transaction.id}`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:HAMMER:1024388163747184662> » DAILY')
  				.setDescription(`
						» Du kriegst heute **${result}€** von mir! ${extra}

						ID: ${transaction.id}
					`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
		
			// Send Money
			ctx.bot.money.add(ctx.interaction.guild.id, ctx.interaction.user.id, result)
			ctx.log(false, `[CMD] DAILY : ${result}€`)
			
			// Set Cooldown
			ctx.bot.cooldown.set(ctx.interaction.user.id, 'daily', 24*60*60*1000)
			
			// Send Message
			return ctx.interaction.reply({ embeds: [message] })
		}
	}
}