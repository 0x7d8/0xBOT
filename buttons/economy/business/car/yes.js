const { EmbedBuilder } = require('@discordjs/builders')
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const { version } = require('../../../../config.json')

const wait = require('node:timers/promises').setTimeout

module.exports = {
    data: {
        name: 'car-yes'
    },
    async execute(interaction, client, lang, vote, car, userid, type) {
        // Set Variables
        const balance = await bals.get(interaction.user.id)

        // Set Car Value
        let carvalue
        if (car == 'jeep') { carvalue = 25 }
        if (car == 'kia') { carvalue = 50 }
        if (car == 'tesla') { carvalue = 100 }
        if (car == 'porsche') { carvalue = 200 }

        // Calculate Cost
        let cost
        if (await bsns.get('g-' + interaction.guild.id + '-3-PRICES') === '0' || await bsns.get('g-' + interaction.guild.id + '-3-PRICES') === 0) {
            if (car == 'jeep') { cost = 150000 }
            if (car == 'kia') { cost = 200000 }
            if (car == 'tesla') { cost = 340000 }
            if (car == 'porsche') { cost = 490000 }
        } else {
            const dbprices = await bsns.get('g-' + interaction.guild.id + '-3-PRICES')
            const cache = dbprices.split('-')
			const [j, k, t, p] = cache

            if (car == 'jeep') { cost = parseInt(j) }
            if (car == 'kia') { cost = parseInt(k) }
            if (car == 'tesla') { cost = parseInt(t) }
            if (car == 'porsche') { cost = parseInt(p) }
        }

        // Translate to Car Names
        let name
        if (car == 'jeep') { name = '2016 JEEP PATRIOT SPORT' }
        if (car == 'kia') { name = '2022 KIA SORENTO' }
        if (car == 'tesla') { name = 'TESLA MODEL Y' }
        if (car == 'porsche') { name = '2019 PORSCHE 911 GT2RS' }

        // Check if User is Authorized
        if (interaction.user.id !== userid) {
            // Create Embed
            let message = new EmbedBuilder()
            	.setTitle('» ERROR')
  				.setDescription('» This choice is up to <@' + userid + '>!')
            	.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang.toString() == "de") {
                message = new EmbedBuilder()
            	    .setTitle('» FEHLER')
  				    .setDescription('» Diese Frage ist für <@' + userid + '>!')
            	    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] CARBUY : NOTSENDER')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Split Button with type
        if (type === 'buy') {
            // Check if User has enough Money
            if (balance < cost) {
                const missing = cost - balance
                
                // Create Embed
                let message = new EmbedBuilder()
                	.setTitle('» ERROR')
  		    		.setDescription('» You dont have enough Money for that, you are missing **$' + missing + '**!')
                	.setFooter({ text: '» ' + vote + ' » ' + version });

                if (lang.toString() == "de") {
                    message = new EmbedBuilder()
                	    .setTitle('» FEHLER')
  			    	    .setDescription('» Du hast dafür nicht genug Geld, dir fehlen **' + missing + '€**!')
                	    .setFooter({ text: '» ' + vote + ' » ' + version });
                }
            
                // Send Message
                bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] CARBUY : ' + name.toUpperCase() + ' : NOTENOUGHMONEY : ' + cost + '€')
                return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
            }

            // Check if User already has a Car
            if (await item.get(interaction.user.id + '-CAR', 'amount') !== 0) {
                // Translate to Car Names
                const dbcar = await item.get(interaction.user.id + '-CAR', 'value')
                if (dbcar == 'jeep') { name = '2016 JEEP PATRIOT SPORT' }
                if (dbcar == 'kia') { name = '2022 KIA SORENTO' }
                if (dbcar == 'tesla') { name = 'TESLA MODEL Y' }
                if (dbcar == 'porsche') { name = '2019 PORSCHE 911 GT2RS' }

                // Create Embed
                let message = new EmbedBuilder()
                	.setTitle('» ERROR')
  		    		.setDescription('» You already own a **' + name + '**!')
                	.setFooter({ text: '» ' + vote + ' » ' + version });

                if (lang.toString() == "de") {
                    message = new EmbedBuilder()
                	    .setTitle('» FEHLER')
  		    		    .setDescription('» Du besitzt schon einen **' + name +'**!')
                	    .setFooter({ text: '» ' + vote + ' » ' + version });
                }
                
                // Send Message
                bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] CARBUY : ALREADYOWNCAR : ' + name)
                return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
            }

            // Create Buttons
            let row = new ActionRowBuilder()
		    	.addComponents(
		    		new ButtonBuilder()
		    			.setLabel('YES')
                        .setCustomId('CAR-YES-' + car + '-' + interaction.user.id)
                        .setEmoji('1017050442431209543')
		    			.setStyle(ButtonStyle.Success)
                        .setDisabled(true),

                    new ButtonBuilder()
		    			.setLabel('NO')
                        .setCustomId('CAR-NO-' + car + '-' + interaction.user.id)
                        .setEmoji('1017050508252418068')
		    			.setStyle(ButtonStyle.Danger)
                        .setDisabled(true),
		    	);
            if (lang.toString() == "de") {
                row = new ActionRowBuilder()
		    	    .addComponents(
		    	    	new ButtonBuilder()
		    	    		.setLabel('JA')
                            .setCustomId('CAR-YES-' + car + '-' + interaction.user.id)
                            .setEmoji('1017050442431209543')
		    	    		.setStyle(ButtonStyle.Success)
                            .setDisabled(true),

                        new ButtonBuilder()
		    	    		.setLabel('NEIN')
                            .setCustomId('CAR-NO-' + car + '-' + interaction.user.id)
                            .setEmoji('1017050508252418068')
		    	    		.setStyle(ButtonStyle.Danger)
                            .setDisabled(true),
		    	    );
            }

            // Create Embed
            let message = new EmbedBuilder()
                .setTitle('» BUY CAR')
                .setDescription('» You successfully bought a **' + name + '** for **$' + cost + '**!')
                .setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang.toString() == 'de') {
                message = new EmbedBuilder()
                    .setTitle('» AUTO KAUFEN')
                    .setDescription('» Du hast erfolgreich einen **' + name + '** für **' + cost + '€** gekauft!')
                    .setFooter({ text: '» ' + vote + ' » ' + version });
            }

            // Remove Money
            bals.rem(interaction.user.id, cost)

            // Own Car
            item.set(interaction.user.id + '-CAR', car, carvalue)

            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] CARBUY : ' + name + ' : CONFIRM')
            return interaction.update({ embeds: [message.toJSON()], components: [row] })
        } else if (type === 'sell') {
            // Check if User has a Car
            if (await item.get(interaction.user.id + '-CAR', 'amount') === 0) {
                // Create Embed
                let message = new EmbedBuilder()
                	.setTitle('» ERROR')
  		    		.setDescription('» You dont own a Car!')
                	.setFooter({ text: '» ' + vote + ' » ' + version });

                if (lang.toString() == "de") {
                    message = new EmbedBuilder()
                	    .setTitle('» FEHLER')
  		    		    .setDescription('» Du besitzt kein Auto!')
                	    .setFooter({ text: '» ' + vote + ' » ' + version });
                }

                // Send Message
                bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] CARSELL : DONTOWNCAR')
                return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
            }

            // Create Buttons
            let row = new ActionRowBuilder()
		    	.addComponents(
		    		new ButtonBuilder()
		    			.setLabel('YES')
                        .setCustomId('CAR-YES-' + car + '-' + interaction.user.id)
                        .setEmoji('1017050442431209543')
		    			.setStyle(ButtonStyle.Success)
                        .setDisabled(true),

                    new ButtonBuilder()
		    			.setLabel('NO')
                        .setCustomId('CAR-NO-' + car + '-' + interaction.user.id)
                        .setEmoji('1017050508252418068')
		    			.setStyle(ButtonStyle.Danger)
                        .setDisabled(true),
		    	);
            if (lang.toString() == "de") {
                row = new ActionRowBuilder()
		    	    .addComponents(
		    	    	new ButtonBuilder()
		    	    		.setLabel('JA')
                            .setCustomId('CAR-YES-' + car + '-' + interaction.user.id)
                            .setEmoji('1017050442431209543')
		    	    		.setStyle(ButtonStyle.Success)
                            .setDisabled(true),

                        new ButtonBuilder()
		    	    		.setLabel('NEIN')
                            .setCustomId('CAR-NO-' + car + '-' + interaction.user.id)
                            .setEmoji('1017050508252418068')
		    	    		.setStyle(ButtonStyle.Danger)
                            .setDisabled(true),
		    	    );
            }

            // Create Embed
            let message = new EmbedBuilder()
                .setTitle('» SELL CAR')
                .setDescription('» You successfully sold your **' + name + '** for **$' + (cost/2) + '**!')
                .setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang.toString() == 'de') {
                message = new EmbedBuilder()
                    .setTitle('» AUTO VERKAUFEN')
                    .setDescription('» Du hast erfolgreich deinen **' + name + '** für **' + (cost/2) + '€** verkauft!')
                    .setFooter({ text: '» ' + vote + ' » ' + version });
            }

            // Add Money
            bals.add(interaction.user.id, (cost/2))

            // unOwn Car
            item.set(interaction.user.id + '-CAR', '0', 0)

            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] CARSELL : ' + name + ' : CONFIRM')
            return interaction.update({ embeds: [message.toJSON()], components: [row] })
        }
    }
}