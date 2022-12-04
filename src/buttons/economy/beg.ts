import { EmbedBuilder } from "discord.js"

import * as bot from "@functions/bot.js"
import Client from "@interfaces/Client.js"
import { ButtonInteraction } from "discord.js"
export default {
    data: {
        name: 'beg'
    },

    async execute(interaction: ButtonInteraction, client: Client, lang: string, vote: string, reciever: string, amount: number, reasontype: string, reason: string) {
        // Set Variables
        const balance = await bot.money.get(interaction.user.id)
        const args = interaction.message.embeds[0].description.split('**')
        const total = parseInt(args[1].match(/\d+/g) as any)+amount

        // Check for enough Money
        if (balance < amount) {
            const missing = amount - balance
            
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
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] BEG : ' + reciever + ' : ' + amount + '€ : NOTENOUGHMONEY')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Check if User is Author
        if (interaction.user.id == reciever) {
            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
            	.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  				.setDescription('» You cant give yourself Money?')
            	.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
            	    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				    .setDescription('» Du kannst dir selber kein Geld geben?')
            	    .setFooter({ text: '» ' + vote + ' » ' + client.config.version })
            }

            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] BEG : ' + reciever + ' : ' + amount + '€ : SAMEPERSON')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Log Transaction
        const transaction = await bot.transactions.log({
            success: true,
            sender: {
                id: interaction.user.id,
                amount: amount,
                type: 'negative'
            }, reciever: {
                id: reciever,
                amount: amount,
                type: 'positive'
            }
        })

        // Transfer Money
        bot.money.rem(interaction.guild.id, interaction.user.id, amount)
        bot.money.add(interaction.guild.id, reciever, amount)

        // Create Embeds
        let message: any
        if (reasontype !== 'SET') {
      	    message = new EmbedBuilder().setColor(0x37009B)
                .setTitle('<:DONATE:1024397357988720711> » BEGGING')
  			    .setDescription('» <@' + reciever + '> needs Money!\nTotal Earnings: **$' + total + '**')
        	    .setFooter({ text: '» ' + vote + ' » ' + client.config.version })

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:DONATE:1024397357988720711> » BETTELN')
  			        .setDescription('» <@' + reciever + '> braucht Geld!\nInsgesamte Einnahmen: **' + total + '€**')
        	        .setFooter({ text: '» ' + vote + ' » ' + client.config.version })
            }
        } else {
            message = new EmbedBuilder().setColor(0x37009B)
                .setTitle('<:DONATE:1024397357988720711> » BEGGING')
  			    .setDescription('» <@' + reciever + '> needs Money!\nTotal Earnings: **$' + total + '**\n*"' + reason + '"*')
        	    .setFooter({ text: '» ' + vote + ' » ' + client.config.version })

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:DONATE:1024397357988720711> » BETTELN')
  			        .setDescription('» <@' + reciever + '> braucht Geld!\nInsgesamte Einnahmen: **' + total + '€**\n*"' + reason + '"*')
        	        .setFooter({ text: '» ' + vote + ' » ' + client.config.version })
            }
        }; let rmessage = new EmbedBuilder().setColor(0x37009B)
            .setTitle('<:DONATE:1024397357988720711> » BEGGING')
            .setDescription('» <@' + interaction.user.id + '> gave <@' + reciever + '> **$' + amount + '**!\n\nID: ' + transaction.id)
            .setFooter({ text: '» ' + vote + ' » ' + client.config.version })

        if (lang === 'de') {
            rmessage = new EmbedBuilder().setColor(0x37009B)
                .setTitle('<:DONATE:1024397357988720711> » BETTELN')
                .setDescription('» <@' + interaction.user.id + '> hat <@' + reciever + '> **' + amount + '€** gegeben!\n\nID: ' + transaction.id)
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version })
        }

        // Send Response Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] BEG : ' + reciever + ' : ' + amount + '€')
        await interaction.reply({ embeds: [rmessage] })

        // Edit Original Message
        return interaction.message.edit({ embeds: [message] }).catch(() => {})
    }
}