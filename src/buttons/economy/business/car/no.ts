import { EmbedBuilder } from "discord.js"

import * as bot from "@functions/bot.js"
import Client from "@interfaces/Client.js"
import { ButtonInteraction } from "discord.js"
export default {
    data: {
        name: 'car-no'
    },

    async execute(interaction: ButtonInteraction, client: Client, lang: string, vote: string, car: string, userid: string, type: string) {
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
                .setTitle('<:BOXCHECK:1024401101589590156> » BUY CAR')
                .setDescription('» <@' + interaction.user.id + '> said **NO** to a **' + name + '**.')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version })

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:BOXCHECK:1024401101589590156> » AUTO KAUFEN')
                    .setDescription('» <@' + interaction.user.id + '> hat **NEIN** zu einem **' + name + '** gesagt.')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version })
            }

            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] CARBUY : ' + name + ' : DENY')
            return interaction.update({ embeds: [message], components: interaction.message.components })
        } else if (type === 'sell') {
            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
                .setTitle('<:BOXDOLLAR:1024402261784403999> » SELL CAR')
                .setDescription('» <@' + interaction.user.id + '> said **NO** to selling his **' + name + '**.')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version })

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:BOXDOLLAR:1024402261784403999> » AUTO VERKAUFEN')
                    .setDescription('» <@' + interaction.user.id + '> hat **NEIN** zum verkaufen von seinem **' + name + '** gesagt.')
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version })
            }

            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] CARSELL : ' + name + ' : DENY')
            return interaction.update({ embeds: [message], components: interaction.message.components })
        }
    }
}