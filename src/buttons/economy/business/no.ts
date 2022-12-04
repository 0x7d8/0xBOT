import { EmbedBuilder } from "discord.js"

import * as bot from "@functions/bot.js"
import Client from "@interfaces/Client.js"
import { ButtonInteraction } from "discord.js"
export default {
    data: {
        name: 'business-no'
    },

    async execute(interaction: ButtonInteraction, client: Client, lang: string, vote: string, business: string, userid: string, type: string) {
        // Translate to Business ID
        let businessid: string
        if (business === 'market') businessid = '1'
        if (business === 'parking garage') businessid = '2'
        if (business === 'car dealership') businessid = '3'

        // Calculate Cost
        let cost: number
        if (business === 'market') cost = 150000
        if (business === 'parking garage') cost = 390000
        if (business === 'car dealership') cost = 520000

        // Translate to Business Names
        let name: string
        if (business === 'market') name = 'MARKET'
        if (business === 'parking garage') name = 'PARKING GARAGE'
        if (business === 'car dealership') name = 'CAR DEALERSHIP'
        if (lang == 'de') {
            if (business === 'market') name = 'SUPERMARKT'
            if (business === 'parking garage') name = 'PARKHAUS'
            if (business === 'car dealership') name = 'AUTOHAUS'
        }

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
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] BUSINESSBUY : NOTSENDER')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }    

        // Edit Buttons
        {
            (interaction.message.components[0].components[0].data.disabled as boolean) = true;
            (interaction.message.components[0].components[1].data.disabled as boolean) = true;
            (interaction.message.components[0].components[1] as any).data.style = 2;
        }

        // Split Button with type
        if (type === 'buy') {
            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
                .setTitle('<:BOXCHECK:1024401101589590156> » BUY BUSINESS')
                .setDescription('» <@' + interaction.user.id + '> said **NO** to a **' + name + '**.')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version })

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:BOXCHECK:1024401101589590156> » GESCHÄFT KAUFEN')
                    .setDescription('» <@' + interaction.user.id + '> hat **NEIN** zu einem **' + name + '** gesagt.')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version })
            }

            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] BUSINESSBUY : ' + name + ' : DENY')
            return interaction.update({ embeds: [message], components: interaction.message.components })
        } else if (type === 'sell') {
            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
                .setTitle('<:BOXCHECK:1024401101589590156> » SELL BUSINESS')
                .setDescription('» <@' + interaction.user.id + '> said **NO** to selling his **' + name + '**.')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version })

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:BOXCHECK:1024401101589590156> » GESCHÄFT VERKAUFEN')
                    .setDescription('» <@' + interaction.user.id + '> hat **NEIN** zum verkaufen von seinem **' + name + '** gesagt.')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version })
            }

            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] BUSINESSSELL : ' + name + ' : DENY')
            return interaction.update({ embeds: [message], components: interaction.message.components })
        }
    }
}