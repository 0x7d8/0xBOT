const { EmbedBuilder } = require('@discordjs/builders')
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const { version } = require('../../../../config.json')

const wait = require('node:timers/promises').setTimeout

module.exports = {
    data: {
        name: 'item-yes'
    },
    async execute(interaction, client, lang, vote, itemid, userid, type, amount) {
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
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] ITEMBUY : NOTSENDER')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Set Variables
        const balance = await bals.get(interaction.user.id)

        // Calculate Cost Multiplier
        let costmul
        if (amount == null) { costmul = 1 } else { costmul = amount }

        // Calculate Cost
        let cost
        let dopay = false
        if (await bsns.get('g-' + interaction.guild.id + '-1-PRICES') === '0' || await bsns.get('g-' + interaction.guild.id + '-1-PRICES') === 0) {
            if (itemid == 'nbomb') { cost = 500*costmul }
            if (itemid == 'mbomb') { cost = 1000*costmul }
            if (itemid == 'hbomb') { cost = 5000*costmul }
            if (itemid == 'cbomb') { cost = 15000*costmul }
        } else {
            const dbprices = await bsns.get('g-' + interaction.guild.id + '-1-PRICES')
            const cache = dbprices.split('-')
			const [j, k, t, p] = cache

            if (itemid == 'nbomb') { cost = parseInt(j)*costmul }
            if (itemid == 'mbomb') { cost = parseInt(k)*costmul }
            if (itemid == 'hbomb') { cost = parseInt(t)*costmul }
            if (itemid == 'cbomb') { cost = parseInt(p)*costmul }

            dopay = true
        }

        // Translate to itemid Names
        let name
        if (itemid == 'nbomb') { name = '<:NBOMB:1021783222520127508> NORMAL BOMB' }
        if (itemid == 'mbomb') { name = '<:MBOMB:1021783295211601940> MEDIUM BOMB' }
        if (itemid == 'hbomb') { name = '<:HBOMB:1022102357938536458> HYPER BOMB' }
        if (itemid == 'cbomb') { name = '<:CBOMB:1021783405161091162> CRAZY BOMB' }
        if (lang == 'de') {
            if (itemid == 'nbomb') { name = '<:NBOMB:1021783222520127508> NORMALE BOMBE' }
            if (itemid == 'mbomb') { name = '<:MBOMB:1021783295211601940> MEDIUM BOMBE' }
            if (itemid == 'hbomb') { name = '<:HBOMB:1022102357938536458> HYPER BOMBE' }
            if (itemid == 'cbomb') { name = '<:CBOMB:1021783405161091162> CRAZY BOMBE' }
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
                bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] ITEMBUY : ' + itemid.toUpperCase() + ' : NOTENOUGHMONEY : ' + cost + '€')
                return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
            }

            // Check if Max Slots are used
            const oldamount = await item.get(interaction.user.id + '-' + itemid.toUpperCase() + 'S-' + interaction.guild.id, 'amount')
            if ((parseInt(amount) + oldamount) > 15) {
                // Create Embed
                let message = new EmbedBuilder()
                    .setTitle('» ERROR')
                    .setDescription('» You dont have enough Slots for that!')
                    .setFooter({ text: '» ' + vote + ' » ' + version });

                if (lang == "de") {
                    message = new EmbedBuilder()
                        .setTitle('» FEHLER')
                        .setDescription('» Du hast nicht genug Slots dafür!')
                        .setFooter({ text: '» ' + vote + ' » ' + version });
                }
        
                // Send Message
                bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] ITEMBUY : ' + itemid.toUpperCase() + ' : MAXSLOTS')
                return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
            }

            // Check if Business has Stock
            if (dopay && await bsns.get('g-' + interaction.guild.id + '-1-STOCK-' + itemid.toUpperCase()) < 1) {
                // Create Embed
                let message = new EmbedBuilder()
                	.setTitle('» ERROR')
  		    		.setDescription('» The Business doesnt have any Stock!')
                	.setFooter({ text: '» ' + vote + ' » ' + version });

                if (lang == "de") {
                    message = new EmbedBuilder()
                	    .setTitle('» FEHLER')
  		    		    .setDescription('» Das Geschäft hat nichts auf Lager!')
                	    .setFooter({ text: '» ' + vote + ' » ' + version });
                }
                
                // Send Message
                bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] ITEMBUY : NOSTOCK : ' + name)
                return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
            }

            // Create Buttons
            let row = new ActionRowBuilder()
		    	.addComponents(
		    		new ButtonBuilder()
		    			.setLabel('YES')
                        .setCustomId('ITEM-YES-' + itemid + '-' + interaction.user.id)
                        .setEmoji('1017050442431209543')
		    			.setStyle(ButtonStyle.Success)
                        .setDisabled(true),

                    new ButtonBuilder()
		    			.setLabel('NO')
                        .setCustomId('ITEM-NO-' + itemid + '-' + interaction.user.id)
                        .setEmoji('1017050508252418068')
		    			.setStyle(ButtonStyle.Danger)
                        .setDisabled(true),
		    	);
            if (lang == "de") {
                row = new ActionRowBuilder()
		    	    .addComponents(
		    	    	new ButtonBuilder()
		    	    		.setLabel('JA')
                            .setCustomId('ITEM-YES-' + itemid + '-' + interaction.user.id)
                            .setEmoji('1017050442431209543')
		    	    		.setStyle(ButtonStyle.Success)
                            .setDisabled(true),

                        new ButtonBuilder()
		    	    		.setLabel('NEIN')
                            .setCustomId('ITEM-NO-' + itemid + '-' + interaction.user.id)
                            .setEmoji('1017050508252418068')
		    	    		.setStyle(ButtonStyle.Danger)
                            .setDisabled(true),
		    	    );
            }

            // Create Embed
            let message
            if (amount == 1) {
                message = new EmbedBuilder()
                    .setTitle('» BUY ITEM')
                    .setDescription('» You successfully bought a **' + name + '** for **$' + cost + '**!')
                    .setFooter({ text: '» ' + vote + ' » ' + version });

                if (lang == 'de') {
                    message = new EmbedBuilder()
                        .setTitle('» GEGENSTAND KAUFEN')
                        .setDescription('» Du hast erfolgreich eine **' + name + '** für **' + cost + '€** gekauft!')
                        .setFooter({ text: '» ' + vote + ' » ' + version });
                }
            } else {
                message = new EmbedBuilder()
                    .setTitle('» BUY ITEMS')
                    .setDescription('» You successfully bought **' + amount + 'x** **' + name + '** for **$' + cost + '**!')
                    .setFooter({ text: '» ' + vote + ' » ' + version });

                if (lang == 'de') {
                    message = new EmbedBuilder()
                        .setTitle('» GEGENSTÄNDE KAUFEN')
                        .setDescription('» Du hast erfolgreich **' + amount + 'x** **' + name + '** für **' + cost + '€** gekauft!')
                        .setFooter({ text: '» ' + vote + ' » ' + version });
                }
            }

            // Remove Money
            bals.rem(interaction.user.id, cost)

            // Transfer Money if Business is owned
            if (dopay) {
                const businessowner = await bsns.get('g-' + interaction.guild.id + '-1-OWNER')
                bals.add(businessowner, cost)
                bsns.rem('g-' + interaction.guild.id + '-1-STOCK-' + itemid.toUpperCase(), amount)
            }

            // Own itemid(s)
            item.add(interaction.user.id + '-' + itemid.toUpperCase() + 'S-' + interaction.guild.id, 'x', amount)

            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] ITEMBUY : ' + itemid.toUpperCase() + ' : CONFIRM')
            return interaction.update({ embeds: [message.toJSON()], components: [row] })
        } else if (type === 'sell') {

        }
    }
}