import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import CommandInteraction from "@interfaces/CommandInteraction.js"
export default {
	data: new SlashCommandBuilder()
		.setName('pay')
		.setDescription('GIVE SOMEONE MONEY')
		.setDescriptionLocalizations({
			de: 'GEBE JEMANDEN GELD'
		})
		.setDMPermission(false)
		.addUserOption((option: any) =>
			option.setName('user')
				.setNameLocalizations({
					de: 'nutzer'
				})
				.setDescription('THE USER')
				.setDescriptionLocalizations({
					de: 'DER NUTZER'
				})
				.setRequired(true))
		.addIntegerOption((option: any) =>
			option.setName('amount')
				.setNameLocalizations({
					de: 'amount'
				})
				.setDescription('THE AMOUNT OF MONEY')
				.setDescriptionLocalizations({
					de: 'DIE amount VON GELD'
				})
				.setRequired(true)),

	async execute(ctx: CommandInteraction) {
		// Set Variables
		const user = ctx.interaction.options.getUser("user")
		const amount = ctx.getOption('amount') as number
		const balance = await ctx.bot.money.get(ctx.interaction.user.id)

		// Check if Balance is Minus
		if (amount < 0) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
				.setDescription(`» You cant send negative Money!`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
					.setDescription(`» Du kannst kein negatives Geld senden!`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
			
			// Send Message
			ctx.log(false, `[CMD] PAY : NEGATIVEMONEY : ${amount}€`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Check if Target is Bot
		if (user.bot) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
				.setDescription(`» You cant give a Bot Money!`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
					.setDescription(`» Du kannst einem Bot kein Geld geben!`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
			
			// Send Message
			ctx.log(false, `[CMD] PAY : ${user.id} : BOT : ${amount}€`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Check if User is Author
		if (ctx.interaction.user.id === user.id) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  			.setDescription(`» You cant pay yourself Money?`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				.setDescription(`» Du kannst dir selber kein Geld überweisen?`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}

			// Send Message
			ctx.log(false, `[CMD] PAY : ${user.id} : ${amount}€ : SAMEPERSON`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Check for enough Money
		if (balance < amount) {
			const missing = amount - balance
			
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  			.setDescription(`» You dont have enough Money for that, you are missing **$${missing}**!`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				.setDescription(`» Du hast dafür nicht genug Geld, dir fehlen **${missing}€**!`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
			
			// Send Message
			ctx.log(false, `[CMD] PAY : ${user.id} : NOTENOUGHMONEY : ${amount}€`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Log Transaction
		const transaction = await ctx.bot.transactions.log({
			success: true,
			sender: {
				id: ctx.interaction.user.id,
				amount: amount,
				type: 'negative'
			}, reciever: {
				id: user.id,
				amount: amount,
				type: 'positive'
			}
		})
		
		// Create Embeds
	  	let message = new EmbedBuilder().setColor(0x37009B)
			.setTitle('<:BAG:1024389219558367292> » GIVE MONEY')
  		.setDescription(`
				» You gave <@${user.id}> **$${amount}**!

				ID: ${transaction.id}
			`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

		if (ctx.metadata.language === 'de') {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:BAG:1024389219558367292> » GELD GEBEN')
  			.setDescription(`
					» Du hast <@${user.id}> **${amount}€** gegeben!

					ID: ${transaction.id}
				`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
		}
		
		// Set Money
		ctx.bot.money.rem(ctx.interaction.guild.id, ctx.interaction.user.id, amount)
		ctx.bot.money.add(ctx.interaction.guild.id, user.id, amount)

		// Send Message
		ctx.log(false, `[CMD] PAY : ${user.id} : ${amount}€`)
		return ctx.interaction.reply({ embeds: [message] })
	}
}