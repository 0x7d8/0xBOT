import { EmbedBuilder } from "discord.js"

import * as bot from "@functions/bot.js"
import Client from "@interfaces/Client.js"
import { ButtonInteraction } from "discord.js"
export default {
    data: {
        name: 'car-yes'
    },

    async execute(interaction: ButtonInteraction, client: Client, lang: string, vote: string, car: string, userid: string, type: string) {
        // Set Variables
        const balance = await bot.money.get(interaction.user.id)

        // Set Car Value
        let carvalue: number
        if (car === 'jeep') carvalue = 25
        if (car === 'kia') carvalue = 50
        if (car === 'audi') carvalue = 75
        if (car === 'tesla') carvalue = 100
        if (car === 'porsche') carvalue = 200

        // Calculate Cost
        let cost: number, dopay = false
        if (await bot.businesses.get('g-' + interaction.guild.id + '-3-PRICE-' + car.toUpperCase()) === '0' || await bot.businesses.get('g-' + interaction.guild.id + '-3-PRICE-' + car.toUpperCase()) === 0) {
            if (car === 'jeep') cost = 15000
            if (car === 'kia') cost = 75000
            if (car === 'audi') cost = 150000
            if (car === 'tesla') cost = 240000
            if (car === 'porsche') cost = 490000
        } else {
            if (type === 'buy') {
                cost = parseInt(await bot.businesses.get('g-' + interaction.guild.id + '-3-PRICE-' + car.toUpperCase()))
                dopay = true
            } else {
                if (car === 'jeep') cost = 15000
                if (car === 'kia') cost = 75000
                if (car === 'audi') cost = 150000
                if (car === 'tesla') cost = 240000
                if (car === 'porsche') cost = 490000
            }
        }

        // Translate to Car Names
        let name: string
        if (car === 'jeep') name = '2016 JEEP PATRIOT SPORT'
        if (car === 'kia') name = '2022 KIA SORENTO'
        if (car === 'audi') name = 'AUDI R8 COUPE V10'
        if (car === 'tesla') name = 'TESLA MODEL Y'
        if (car === 'porsche') name = '2019 PORSCHE 911 GT2RS'

        // Check if User is Authorized
        if (interaction.user.id !== userid) {
            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
            	.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  				.setDescription('» This choice is up to <@' + userid + '>!')
            	.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
            	    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				    .setDescription('» Diese Frage ist für <@' + userid + '>!')
            	    .setFooter({ text: '» ' + vote + ' » ' + client.config.version })
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] CARBUY : NOTSENDER')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Split Button with type
        if (type === 'buy') {
            // Check if User has enough Money
            if (balance < cost) {
                const missing = cost - balance
                
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
                bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] CARBUY : ' + name.toUpperCase() + ' : NOTENOUGHMONEY : ' + cost + '€')
                return interaction.reply({ embeds: [message], ephemeral: true })
            }

            // Check if User already has a Car
            if (await bot.items.get(interaction.user.id + '-CAR-' + interaction.guild.id, 'amount') !== 0) {
                // Translate to Car Names
                const dbcar = await bot.items.get(interaction.user.id + '-CAR-' + interaction.guild.id, 'value')
                if (dbcar == 'jeep') name = '2016 JEEP PATRIOT SPORT'
                if (dbcar == 'kia') name = '2022 KIA SORENTO'
                if (dbcar == 'audi') name = 'AUDI R8 COUPE V10'
                if (dbcar == 'tesla') name = 'TESLA MODEL Y'
                if (dbcar == 'porsche') name = '2019 PORSCHE 911 GT2RS'

                // Create Embed
                let message = new EmbedBuilder().setColor(0x37009B)
                	.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  		    		.setDescription('» You already own a **' + name + '**!')
                	.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

                if (lang === 'de') {
                    message = new EmbedBuilder().setColor(0x37009B)
                	    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  		    		    .setDescription('» Du besitzt schon einen **' + name +'**!')
                	    .setFooter({ text: '» ' + vote + ' » ' + client.config.version })
                }
                
                // Send Message
                bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] CARBUY : ALREADYOWNCAR : ' + name)
                return interaction.reply({ embeds: [message], ephemeral: true })
            }

            // Edit Buttons
            {
                (interaction.message.components[0].components[0].data.disabled as boolean) = true;
                (interaction.message.components[0].components[1].data.disabled as boolean) = true;
                (interaction.message.components[0].components[1] as any).data.style = 2;
            }

            // Log Transaction
            const transaction = await bot.transactions.log({
                success: true,
                sender: {
                    id: interaction.user.id,
                    amount: cost,
                    type: 'negative'
                }, reciever: {
                    id: `1x ${car.toUpperCase()}`,
                    amount: cost,
                    type: 'positive'
                }
            })

            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
                .setTitle('<:BOXCHECK:1024401101589590156> » BUY CAR')
                .setDescription('» You successfully bought a **' + name + '** for **$' + cost + '**!\n\nID: ' + transaction.id)
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version })

            if (lang == 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:BOXCHECK:1024401101589590156> » AUTO KAUFEN')
                    .setDescription('» Du hast erfolgreich einen **' + name + '** für **' + cost + '€** gekauft!\n\nID: ' + transaction.id)
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version })
            }

            // Remove Money
            bot.money.rem(interaction.guild.id, interaction.user.id, cost)

            // Transfer Money if Business is owned
            if (dopay) {
                const businessowner = await bot.businesses.get('g-' + interaction.guild.id + '-3-OWNER')
                if (car === 'jeep') { bot.money.add(interaction.guild.id, businessowner, cost-5000); bot.businesses.add('g-' + interaction.guild.id + '-3-EARNING', cost-5000) }
                if (car === 'kia') { bot.money.add(interaction.guild.id, businessowner, cost-50000); bot.businesses.add('g-' + interaction.guild.id + '-3-EARNING', cost-50000) }
                if (car === 'audi') { bot.money.add(interaction.guild.id, businessowner, cost-150000); bot.businesses.add('g-' + interaction.guild.id + '-3-EARNING', cost-150000) }
                if (car === 'tesla') { bot.money.add(interaction.guild.id, businessowner, cost-220000); bot.businesses.add('g-' + interaction.guild.id + '-3-EARNING', cost-260000) }
                if (car === 'porsche') { bot.money.add(interaction.guild.id, businessowner, cost-400000); bot.businesses.add('g-' + interaction.guild.id + '-3-EARNING', cost-500000) }
            }

            // Own Car
            bot.items.set(interaction.user.id + '-CAR-' + interaction.guild.id, car, carvalue)

            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] CARBUY : ' + name + ' : CONFIRM')
            return interaction.update({ embeds: [message], components: interaction.message.components })
        } else if (type === 'sell') {
            // Check if User has a Car
            if (await bot.items.get(interaction.user.id + '-CAR-' + interaction.guild.id, 'amount') === 0) {
                // Create Embed
                let message = new EmbedBuilder().setColor(0x37009B)
                	.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  		    		.setDescription('» You dont own a Car!')
                	.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

                if (lang === 'de') {
                    message = new EmbedBuilder().setColor(0x37009B)
                	    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  		    		    .setDescription('» Du besitzt kein Auto!')
                	    .setFooter({ text: '» ' + vote + ' » ' + client.config.version })
                }

                // Send Message
                bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] CARSELL : DONTOWNCAR')
                return interaction.reply({ embeds: [message], ephemeral: true })
            }

            // Edit Buttons
            {
                (interaction.message.components[0].components[0].data.disabled as boolean) = true;
                (interaction.message.components[0].components[1].data.disabled as boolean) = true;
                (interaction.message.components[0].components[1] as any).data.style = 2;
            }

            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
                .setTitle('<:BOXDOLLAR:1024402261784403999> » SELL CAR')
                .setDescription('» You successfully sold your **' + name + '** for **$' + (cost/2) + '**!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:BOXDOLLAR:1024402261784403999> » AUTO VERKAUFEN')
                    .setDescription('» Du hast erfolgreich deinen **' + name + '** für **' + (cost/2) + '€** verkauft!')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version });
            }

            // Add Money
            bot.money.add(interaction.guild.id, interaction.user.id, (cost/2))

            // unOwn Car
            bot.items.del(interaction.user.id + '-CAR-' + interaction.guild.id)

            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] CARSELL : ' + name + ' : CONFIRM')
            return interaction.update({ embeds: [message], components: interaction.message.components })
        }
    }
}