import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import CommandInteraction from "@interfaces/CommandInteraction.js"
export default {
	data: new SlashCommandBuilder()
		.setName('work')
		.setDMPermission(false)
		.setDescription('WORK FOR MONEY')
		.setDescriptionLocalizations({
			de: 'ARBEITE FÜR GELD'
		}),

	async execute(ctx: CommandInteraction) {
		// Check if Work is Enabled in Server
		if (!await ctx.bot.settings.get(ctx.interaction.guild.id, 'work')) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
				.setDescription('» The **`/work`** Command is disabled on this Server!')
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
					.setDescription('» Der **`/work`** Befehl ist auf diesem Server deaktiviert!')
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
			
			// Send Message
			ctx.log(false, `[CMD] WORK : DISABLED`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Set Variables
		const random = ctx.bot.random(1, 4)

		// Cooldown
		if ((await ctx.bot.cooldown.get(ctx.interaction.user.id, 'work')).onCooldown) {
			// Translate Vars
			let use: string, cdown: number
			const timeLeft = (await ctx.bot.cooldown.get(ctx.interaction.user.id, 'work')).remaining
			use = 's'; cdown = timeLeft / 1000
			if (cdown > 60) { cdown = timeLeft / 1000 / 60; use = 'm' }
			
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  			.setDescription('» You still have a Cooldown of **' + cdown.toFixed(0) + use + '**!')
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				.setDescription('» Du hast leider noch einen Cooldown von **' + cdown.toFixed(0) + use + '**!')
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
			
			// Send Message
			ctx.log(false, `[CMD] WORK : ONCOOLDOWN : ${cdown.toFixed(0) + use}`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		} else {
			
			// Set Jobs
			let job: string, result: number
			if (random === 1) job = 'PROGRAMMER'; result = ctx.bot.random(75, 200)
			if (random === 2) job = 'CLEANER'; result = ctx.bot.random(50, 100)
			if (random === 3) job = 'MCDONALDS WORKER'; result = ctx.bot.random(30, 120)
			if (random === 4) job = 'PAINTER'; result = ctx.bot.random(200, 500)

			if (ctx.metadata.language === 'de') {
				if (random === 1) job = 'PROGRAMMIERER'
				if (random === 2) job = 'HAUSMEISTER'
				if (random === 3) job = 'MCDONALDS KASSIERER'
				if (random === 4) job = 'KÜNSTLER'
			}

			// Check for Car Boost
			let carboost = false; let carboostam: any
			const car = await ctx.bot.items.get(ctx.interaction.user.id + '-CAR-' + ctx.interaction.guild.id, 'value')
			if (car !== 0) {
				carboost = true
				carboostam = await ctx.bot.items.get(ctx.interaction.user.id + '-CAR-' + ctx.interaction.guild.id, 'amount')
			}
			
			// Set Extra Text
			let extra: string
			if (!carboost) {
				if (result < 40) extra = 'MEH.'
				if (result >= 40) extra = 'NICE.'
				if (result >= 60) extra = 'GREAT.'
				if (result >= 80) extra = 'WONDERFUL!'
				if (result >= 100) extra = 'WOW!'
				if (ctx.metadata.language === 'de') {
					if (result < 40) extra = 'MEH.'
					if (result >= 40) extra = 'NICE.'
					if (result >= 60) extra = 'PRIMA.'
					if (result >= 80) extra = 'TOLL!'
					if (result >= 100) extra = 'WOW!'
				}
			} else {
				if (result < 40) extra = 'MEH.\n**+' + carboostam + '%** thanks to your Car!'
				if (result >= 40) extra = 'NICE.\n**+' + carboostam + '%** thanks to your Car!'
				if (result >= 60) extra = 'GREAT.\n**+' + carboostam + '%** thanks to your Car!'
				if (result >= 80) extra = 'WONDERFUL!\n**+' + carboostam + '%** thanks to your Car!'
				if (result >= 100) extra = 'WOW!\n**+' + carboostam + '%** thanks to your Car!'
				if (ctx.metadata.language === 'de') {
					if (result < 40) extra = 'MEH.\n**+' + carboostam + '%** wegen deinem Auto!'
					if (result >= 40) extra = 'NICE.\n**+' + carboostam + '%** wegen deinem Auto!'
					if (result >= 60) extra = 'PRIMA.\n**+' + carboostam + '%** wegen deinem Auto!'
					if (result >= 80) extra = 'TOLL!\n**+' + carboostam + '%** wegen deinem Auto!'
					if (result >= 100) extra = 'WOW!\n**+' + carboostam + '%** wegen deinem Auto!'
				}
			}

			// Calculate Result with Car
			let resultcar: number
			if (!carboost) resultcar = result
			else resultcar = Math.round(ctx.bot.perAdd(result, carboostam))

			// Log Transaction
			const transaction = await ctx.bot.transactions.log({
				success: true,
				sender: {
					id: 'WORK',
					amount: resultcar,
					type: 'negative'
				}, reciever: {
					id: ctx.interaction.user.id,
					amount: resultcar,
					type: 'positive'
				}
			})
		
			// Create Embed
	  		let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:HAMMER:1024388163747184662> » WORK')
  			.setDescription('» You work as **' + job + '** and earn **$' + resultcar + '**! ' + extra + '\n\nID: ' + transaction.id)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:HAMMER:1024388163747184662> » ARBEIT')
  				.setDescription('» Du arbeitest als **' + job + '** und verdienst **' + resultcar + '€**! ' + extra + '\n\nID: ' + transaction.id)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
		
			// Send Money
			ctx.bot.money.add(ctx.interaction.guild.id, ctx.interaction.user.id, resultcar)
			ctx.log(false, `[CMD] WORK : ${resultcar}€`)
			
			// Set Cooldown
			ctx.bot.cooldown.set(ctx.interaction.user.id, 'work', 60*45*1000)
			
			// Send Message
			return ctx.interaction.reply({ embeds: [message] })
		}
	}
}