import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import * as bot from "@functions/bot.js"
import Client from "@interfaces/Client.js"
import { CommandInteraction } from "discord.js"
export default {
    data: new SlashCommandBuilder()
        .setName('guess')
    	.setDMPermission(false)
        .setDescription('GUESS NUMBERS')
        .setDescriptionLocalizations({
            de: 'RATE ZAHLEN'
        })
        .addStringOption((option: any) =>
            option.setName('range')
                .setNameLocalizations({
                    de: 'bereich'
                })
                .setDescription('THE RANGE')
                .setDescriptionLocalizations({
                    de: 'DER BEREICH'
                })
                .setRequired(true)
    			.addChoices(
                    // Setup Choices
            		{ name: '🟢 [x2] 1-10', value: '10' },
                    { name: '🟡 [x4] 1-100', value: '100' },
                    { name: '🔴 [x6] 1-1000', value: '1000' },
				))
        .addIntegerOption((option: any) =>
            option.setName('bet')
                .setNameLocalizations({
                    de: 'wette'
                })
                .setDescription('THE BET')
                .setDescriptionLocalizations({
                    de: 'DIE WETTE'
                })
                .setRequired(true))
    	.addIntegerOption((option: any) =>
            option.setName('number')
                .setNameLocalizations({
                    de: 'nummer'
                })
                .setDescription('THE NUMBER')
                .setDescriptionLocalizations({
                    de: 'DIE NUMMER'
                })
                .setRequired(true)),
    async execute(interaction: CommandInteraction, client: Client, lang: string, vote: string) {
        // Check if RNG Games are Enabled in Server
        if (!await bot.settings.get(interaction.guild.id, 'luckgames')) {
            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» Luck Games are disabled on this Server!')
        		.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Glücksspiele sind auf diesem Server deaktiviert!')
        		    .setFooter({ text: '» ' + vote + ' » ' + client.config.version })
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ROULETTE : DISABLED')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }
        
        // Set Variables
        const bet = bot.getOption(interaction, 'bet') as number
        const range = bot.getOption(interaction, 'range') as string
        const guess = bot.getOption(interaction, 'number') as number
        const money = await bot.money.get(interaction.user.id)

        const random10 = bot.random(1, 10)
        const random100 = bot.random(1, 100)
        const random1000 = bot.random(1, 1000)

        // Check if Balance is Minus
        if (bet < 0) {
            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» You cant play with negative Money!')
        		.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Du kannst keine negativen Einsätze spielen!')
        		    .setFooter({ text: '» ' + vote + ' » ' + client.config.version })
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] GUESS : NEGATIVEMONEY : ' + bet + '€')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }
        
       	// Check for enough Money
        let status: string, result: number
        if (money >= bet) {
            // Check for Max Amount
            if (bet > 15000) {
                // Create Embed
                let message = new EmbedBuilder().setColor(0x37009B)
            		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  					.setDescription('» You cant bet that much! **$15000** is the Maximum.')
            		.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

                if (lang === 'de') {
                    message = new EmbedBuilder().setColor(0x37009B)
            		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  					    .setDescription('» Du kannst nicht soviel Wetten! **15000€** ist das Maximum.')
            		    .setFooter({ text: '» ' + vote + ' » ' + client.config.version })
                }
                
                // Send Message
            	bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] GUESS : TOOMUCHMONEY : ' + bet + '€')
        		return interaction.reply({ embeds: [message], ephemeral: true })
            }
            
            // Calculate Winnings
            if (range === '10') { if (guess === random10) { status = 'WON'; result = bet * 2 } else { 
                status = 'LOST'; result = bet } }
            if (range === '100') { if (guess === random100) { status = 'WON'; result = bet * 4 } else { 
                status = 'LOST'; result = bet } }
            if (range === '1000') { if (guess === random1000) { status = 'WON'; result = bet * 6 } else { 
                status = 'LOST'; result = bet } }

            if (lang === 'de') {
                if (range === '10') { if (guess === random10) { status = 'GEWONNEN'; result = bet * 2 } else { 
                    status = 'VERLOREN'; result = bet } }
                if (range === '100') { if (guess === random100) { status = 'GEWONNEN'; result = bet * 4 } else { 
                    status = 'VERLOREN'; result = bet } }
                if (range === '1000') { if (guess === random1000) { status = 'GEWONNEN'; result = bet * 6 } else { 
                    status = 'VERLOREN'; result = bet } }
            }
        } else {
            const missing = bet - money

            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
            	.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  				.setDescription('» You dont have enough Money for that, you are missing **$' + missing + '**!')
            	.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
            	    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				    .setDescription('» Du hast dafür nicht genug Geld, dir fehlen **' + missing + '€**!')
            	    .setFooter({ text: '» ' + vote + ' » ' + client.config.version })
            }

            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] GUESS : NOTENOUGHMONEY : ' + missing + '€')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Set Money
        let transaction: any
        bot.money.rem(interaction.guild.id, interaction.user.id, result)
        if (status === 'GEWONNEN' || status === 'WON') {
        	bot.money.add(interaction.guild.id, interaction.user.id, result)

            // Log Transaction
            transaction = await bot.transactions.log({
                success: true,
                sender: {
                    id: 'CASINO',
                    amount: bet,
                    type: 'negative'
                }, reciever: {
                    id: interaction.user.id,
                    amount: bet,
                    type: 'positive'
                }
            })
        } else {
            // Log Transaction
            transaction = await bot.transactions.log({
                success: true,
                sender: {
                    id: interaction.user.id,
                    amount: bet,
                    type: 'negative'
                }, reciever: {
                    id: 'CASINO',
                    amount: bet,
                    type: 'positive'
                }
            })
        }
        
        // Create Embed
      	let message = new EmbedBuilder().setColor(0x37009B)
            .setTitle('<:CLOVER:1024388649418235925> » GUESS')
  			.setDescription('» You set **$' + bet + '** on **' + guess + '** and **' + status + '** **$' + result + '**!\n\nID: ' + transaction.id)
        	.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

        if (lang === 'de') {
            message = new EmbedBuilder().setColor(0x37009B)
                .setTitle('<:CLOVER:1024388649418235925> » RATEN')
  			    .setDescription('» Du hast **' + bet + '€** auf **' + guess + '** gesetzt und **' + result + '€** **' + status + '**!\n\nID: ' + transaction.id)
        	    .setFooter({ text: '» ' + vote + ' » ' + client.config.version })
        }

        // Send Message
       	bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] GUESS : ' + guess + ' : ' + status + ' : ' + result + '€')
        return interaction.reply({ embeds: [message] })
    }
}