const { EmbedBuilder } = require('@discordjs/builders')
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const { version } = require('../../../config.json')

const wait = require('node:timers/promises').setTimeout

module.exports = {
    data: {
        name: 'business-yes'
    },
    async execute(interaction, client, lang, vote, business, userid, type) {
        // Set Variables
        const balance = await bals.get(interaction.user.id)

        // Translate to Business ID
        let businessid
        if (business == 'market') { businessid = '1' }
        if (business == 'parking garage') { businessid = '2' }
        if (business == 'car dealership') { businessid = '3' }

        // Calculate Cost
        let cost
        if (business == 'market') { cost = 150000 }
        if (business == 'parking garage') { cost = 390000 }
        if (business == 'car dealership') { cost = 520000 }

        // Translate to Business Names
        let name
        if (business == 'market') { name = 'MARKET' }
        if (business == 'parking garage') { name = 'PARKING GARAGE' }
        if (business == 'car dealership') { name = 'CAR DEALERSHIP' }
        if (lang == 'de') {
            if (business == 'market') { name = 'SUPERMARKT' }
            if (business == 'parking garage') { name = 'PARKHAUS' }
            if (business == 'car dealership') { name = 'AUTOHAUS' }
        }

        // Check if User is Authorized
        if (interaction.user.id !== userid) {
            // Create Embed
            let message = new EmbedBuilder()
            	.setTitle('» ERROR')
  				.setDescription('» This choice is up to <@' + userid + '>!')
            	.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang == "de") {
                message = new EmbedBuilder()
            	    .setTitle('» FEHLER')
  				    .setDescription('» Diese Frage ist für <@' + userid + '>!')
            	    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] BUSINESSBUY : NOTSENDER')
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

                if (lang == "de") {
                    message = new EmbedBuilder()
                	    .setTitle('» FEHLER')
  			    	    .setDescription('» Du hast dafür nicht genug Geld, dir fehlen **' + missing + '€**!')
                	    .setFooter({ text: '» ' + vote + ' » ' + version });
                }
            
                // Send Message
                bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] BUSINESSBUY : ' + name.toUpperCase() + ' : NOTENOUGHMONEY : ' + cost + '€')
                return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
            }

            // Check if User already has Business
            if (await bsns.get('u-' + interaction.user.id + '-BUSINESS') !== 0) {
                const userbusiness = await bsns.get('u-' + interaction.user.id + '-BUSINESS')

            // Translate to Business Names
                let name
                if (userbusiness == 'market') { name = 'MARKET' }
                if (userbusiness == 'parking garage') { name = 'PARKING GARAGE' }
                if (userbusiness == 'car dealership') { name = 'CAR DEALERSHIP' }
                if (lang == 'de') {
                    if (userbusiness == 'market') { name = 'SUPERMARKT' }
                    if (userbusiness == 'parking garage') { name = 'PARKHAUS' }
                    if (userbusiness == 'car dealership') { name = 'AUTOHAUS' }
                }

                // Create Embed
                let message = new EmbedBuilder()
            	    .setTitle('» ERROR')
            	    .setDescription('» You already own a **' + name + '**!')
            	    .setFooter({ text: '» ' + vote + ' » ' + version });

                if (lang == 'de') {
                    message = new EmbedBuilder()
            	        .setTitle('» FEHLER')
            	        .setDescription('» Du besitzt schon ein **' + name + '**!')
            	        .setFooter({ text: '» ' + vote + ' » ' + version });
                }

                // Send Message
                bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] BUSINESSBUY : ALREADYBUSINESS')
                return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
            }

            // Create Buttons
            let row = new ActionRowBuilder()
		    	.addComponents(
		    		new ButtonBuilder()
		    			.setLabel('YES')
                        .setCustomId('BUSINESS-YES-' + business + '-' + interaction.user.id)
                        .setEmoji('1017050442431209543')
		    			.setStyle(ButtonStyle.Success)
                        .setDisabled(true),

                    new ButtonBuilder()
		    			.setLabel('NO')
                        .setCustomId('BUSINESS-NO-' + business + '-' + interaction.user.id)
                        .setEmoji('1017050508252418068')
		    			.setStyle(ButtonStyle.Danger)
                        .setDisabled(true),
		    	);
            if (lang == "de") {
                row = new ActionRowBuilder()
		    	    .addComponents(
		    	    	new ButtonBuilder()
		    	    		.setLabel('JA')
                            .setCustomId('BUSINESS-YES-' + business + '-' + interaction.user.id)
                            .setEmoji('1017050442431209543')
		    	    		.setStyle(ButtonStyle.Success)
                            .setDisabled(true),

                        new ButtonBuilder()
		    	    		.setLabel('NEIN')
                            .setCustomId('BUSINESS-NO-' + business + '-' + interaction.user.id)
                            .setEmoji('1017050508252418068')
		    	    		.setStyle(ButtonStyle.Danger)
                            .setDisabled(true),
		    	    );
            }

            // Remove Money
            bals.rem(interaction.user.id, cost)

            // Own Business
            bsns.set('g-' + interaction.guild.id + '-' + businessid + '-OWNER', interaction.user.id)
            bsns.set('u-' + interaction.user.id + '-BUSINESS', business)
            if (business === 'market') { bsns.set('g-' + interaction.guild.id + '-1-PRICES', '500-1000-5000-15000')}

            // Create Embed
            let message = new EmbedBuilder()
                .setTitle('» BUY BUSINESS')
                .setDescription('» You successfully bought a **' + name + '** for **$' + cost + '**!')
                .setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang == 'de') {
                message = new EmbedBuilder()
                    .setTitle('» GESCHÄFT KAUFEN')
                    .setDescription('» Du hast erfolgreich ein **' + name + '** für **' + cost + '€** gekauft!')
                    .setFooter({ text: '» ' + vote + ' » ' + version });
            }

            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] BUSINESSBUY : ' + name + ' : CONFIRM')
            return interaction.update({ embeds: [message.toJSON()], components: [row] })
        } else if (type === 'sell') {
            const business = await bsns.get('u-' + interaction.user.id + '-BUSINESS')

            // Translate to Business ID
            let businessid
            if (business == 'market') { businessid = '1' }
            if (business == 'parking garage') { businessid = '2' }
            if (business == 'car dealership') { businessid = '3' }

            // Calculate Cost
            let cost
            if (business == 'market') { cost = 150000 }
            if (business == 'parking garage') { cost = 390000 }
            if (business == 'car dealership') { cost = 520000 }

            // Check if User has a Business
            if (await bsns.get('u-' + interaction.user.id + '-BUSINESS', 'amount') === '0') {
                // Create Embed
                let message = new EmbedBuilder()
                	.setTitle('» ERROR')
  		    		.setDescription('» You dont own a Business!')
                	.setFooter({ text: '» ' + vote + ' » ' + version });

                if (lang == "de") {
                    message = new EmbedBuilder()
                	    .setTitle('» FEHLER')
  		    		    .setDescription('» Du besitzt kein Geschäft!')
                	    .setFooter({ text: '» ' + vote + ' » ' + version });
                }

                // Send Message
                bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] BUSINESSSELL : DONTOWNBUSINESS')
                return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
            }

            // Create Buttons
            let row = new ActionRowBuilder()
		    	.addComponents(
		    		new ButtonBuilder()
		    			.setLabel('YES')
                        .setCustomId('BUSINESS-YES-' + business + '-' + interaction.user.id)
                        .setEmoji('1017050442431209543')
		    			.setStyle(ButtonStyle.Success)
                        .setDisabled(true),

                    new ButtonBuilder()
		    			.setLabel('NO')
                        .setCustomId('BUSINESS-NO-' + business + '-' + interaction.user.id)
                        .setEmoji('1017050508252418068')
		    			.setStyle(ButtonStyle.Danger)
                        .setDisabled(true),
		    	);
            if (lang == "de") {
                row = new ActionRowBuilder()
		    	    .addComponents(
		    	    	new ButtonBuilder()
		    	    		.setLabel('JA')
                            .setCustomId('BUSINESS-YES-' + business + '-' + interaction.user.id)
                            .setEmoji('1017050442431209543')
		    	    		.setStyle(ButtonStyle.Success)
                            .setDisabled(true),

                        new ButtonBuilder()
		    	    		.setLabel('NEIN')
                            .setCustomId('BUSINESS-NO-' + business + '-' + interaction.user.id)
                            .setEmoji('1017050508252418068')
		    	    		.setStyle(ButtonStyle.Danger)
                            .setDisabled(true),
		    	    );
            }

            // Create Embed
            let message = new EmbedBuilder()
                .setTitle('» SELL BUSINESS')
                .setDescription('» You successfully sold your **' + name + '** for **$' + (cost/2) + '**!')
                .setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang == 'de') {
                message = new EmbedBuilder()
                    .setTitle('» GESCHÄFT VERKAUFEN')
                    .setDescription('» Du hast erfolgreich dein **' + name + '** für **' + (cost/2) + '€** verkauft!')
                    .setFooter({ text: '» ' + vote + ' » ' + version });
            }

            // Add Money
            bals.add(interaction.user.id, (cost/2))

            // unOwn Business
            bsns.set('u-' + interaction.user.id + '-BUSINESS', 0)
            bsns.set('g-' + interaction.guild.id + '-' + businessid + '-OWNER', 0)

            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] CARSELL : ' + name + ' : CONFIRM')
            return interaction.update({ embeds: [message.toJSON()], components: [row] })
        }
    }
}