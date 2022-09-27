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
        if (await bsns.get('g-' + interaction.guild.id + '-1-PRICE-' + itemid.toUpperCase()) === '0' || await bsns.get('g-' + interaction.guild.id + '-1-PRICE-' + itemid.toUpperCase()) === 0) {
            if (itemid == 'nbomb') { cost = 500*costmul }
            if (itemid == 'mbomb') { cost = 1000*costmul }
            if (itemid == 'hbomb') { cost = 5000*costmul }
            if (itemid == 'cbomb') { cost = 15000*costmul }
        } else {
            dopay = true
            cost = parseInt(await bsns.get('g-' + interaction.guild.id + '-1-PRICE-' + itemid.toUpperCase()))*costmul
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

            // Edit Buttons
            interaction.message.components[0].components[0].data.disabled = true
            interaction.message.components[0].components[1].data.disabled = true
            interaction.message.components[0].components[1].data.style = 2

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
                if (itemid == 'nbomb') { bals.add(businessowner, cost-250); bsns.add('g-' + interaction.guild.id + '-1-EARNING', cost-250) }
                if (itemid == 'mbomb') { bals.add(businessowner, cost-750); bsns.add('g-' + interaction.guild.id + '-1-EARNING', cost-750) }
                if (itemid == 'hbomb') { bals.add(businessowner, cost-2500); bsns.add('g-' + interaction.guild.id + '-1-EARNING', cost-2500) }
                if (itemid == 'cbomb') { bals.add(businessowner, cost-7500); bsns.add('g-' + interaction.guild.id + '-1-EARNING', cost-7500) }
            }

            // Own Item(s)
            item.add(interaction.user.id + '-' + itemid.toUpperCase() + 'S-' + interaction.guild.id, 'x', amount)

            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] ITEMBUY : ' + itemid.toUpperCase() + ' : CONFIRM')
            return interaction.update({ embeds: [message.toJSON()], components: interaction.message.components })
        } else if (type === 'sell') {

        }
    }
}