import { SlashCommandBuilder, EmbedBuilder, Collection } from "discord.js"
const cooldown = new Collection()

import * as bot from "@functions/bot.js"
import Client from "@interfaces/Client.js"
import { CommandInteraction } from "discord.js"
export default {
	data: new SlashCommandBuilder()
		.setName('work')
		.setDMPermission(false)
		.setDescription('WORK FOR MONEY')
		.setDescriptionLocalizations({
			de: 'ARBEITE FÜR GELD'
		}),

	async execute(interaction: CommandInteraction, client: Client, lang: string, vote: string) {
		// Check if Work is Enabled in Server
		if (!await bot.settings.get(interaction.guild.id, 'work')) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
				.setDescription('» The **`/work`** Command is disabled on this Server!')
				.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

			if (lang === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
					.setDescription('» Der **`/work`** Befehl ist auf diesem Server deaktiviert!')
					.setFooter({ text: '» ' + vote + ' » ' + client.config.version })
			}
			
			// Send Message
			bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] WORK : DISABLED')
			return interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Set Variables
		const random = bot.random(1, 4)

		// Cooldown
		if (cooldown.get(interaction.user.id) as number - Date.now() > 0) {
			// Translate Vars
			let use: string, cdown: number
			const timeLeft = cooldown.get(interaction.user.id) as number - Date.now()
			use = 's'; cdown = timeLeft / 1000
			if (cdown > 60) { cdown = timeLeft / 1000 / 60; use = 'm' }
			
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  				.setDescription('» You still have a Cooldown of **' + cdown.toFixed(0) + use + '**!')
				.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

			if (lang === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  					.setDescription('» Du hast leider noch einen Cooldown von **' + cdown.toFixed(0) + use + '**!')
					.setFooter({ text: '» ' + vote + ' » ' + client.config.version })
			}
			
			// Send Message
			bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] WORK : ONCOOLDOWN : ' + cdown.toFixed(0) + use)
			return interaction.reply({ embeds: [message], ephemeral: true })
		} else {
			
			// Set Jobs
			let job: string, result: number
			if (random === 1) job = 'PROGRAMMER'; result = bot.random(75, 200)
			if (random === 2) job = 'CLEANER'; result = bot.random(50, 100)
			if (random === 3) job = 'MCDONALDS WORKER'; result = bot.random(30, 120)
			if (random === 4) job = 'PAINTER'; result = bot.random(200, 500)

			if (lang === 'de') {
				if (random === 1) job = 'PROGRAMMIERER'
				if (random === 2) job = 'HAUSMEISTER'
				if (random === 3) job = 'MCDONALDS KASSIERER'
				if (random === 4) job = 'KÜNSTLER'
			}

			// Check for Car Boost
			let carboost = false; let carboostam: any
			const car = await bot.items.get(interaction.user.id + '-CAR-' + interaction.guild.id, 'value')
			if (car !== 0) {
				carboost = true
				carboostam = await bot.items.get(interaction.user.id + '-CAR-' + interaction.guild.id, 'amount')
			}
			
			// Set Extra Text
			let extra: string
			if (!carboost) {
				if (result < 40) extra = 'MEH.'
				if (result >= 40) extra = 'NICE.'
				if (result >= 60) extra = 'GREAT.'
				if (result >= 80) extra = 'WONDERFUL!'
				if (result >= 100) extra = 'WOW!'
				if (lang === 'de') {
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
				if (lang === 'de') {
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
			else resultcar = Math.round(bot.perAdd(result, carboostam))

			// Log Transaction
			const transaction = await bot.transactions.log({
				success: true,
				sender: {
					id: 'WORK',
					amount: resultcar,
					type: 'negative'
				}, reciever: {
					id: interaction.user.id,
					amount: resultcar,
					type: 'positive'
				}
			})
		
			// Create Embed
	  		let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:HAMMER:1024388163747184662> » WORK')
  				.setDescription('» You work as **' + job + '** and earn **$' + resultcar + '**! ' + extra + '\n\nID: ' + transaction.id)
				.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

			if (lang === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:HAMMER:1024388163747184662> » ARBEIT')
  					.setDescription('» Du arbeitest als **' + job + '** und verdienst **' + resultcar + '€**! ' + extra + '\n\nID: ' + transaction.id)
					.setFooter({ text: '» ' + vote + ' » ' + client.config.version })
			}
		
			// Send Money
			bot.money.add(interaction.guild.id, interaction.user.id, resultcar)
			bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] WORK : ' + resultcar + '€')
			
			// Set Cooldown
			cooldown.set(interaction.user.id, Date.now() + 1800000)
			setTimeout(() => cooldown.delete(interaction.user.id), 1800000)
			
			// Send Message
			return interaction.reply({ embeds: [message] })
		}
	}
}