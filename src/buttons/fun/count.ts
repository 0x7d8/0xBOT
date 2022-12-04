import { EmbedBuilder } from "discord.js"

import * as bot from "@functions/bot.js"
import Client from "@interfaces/Client.js"
import { ButtonInteraction } from "discord.js"
export default {
    data: {
        name: 'count'
    },

    async execute(interaction: ButtonInteraction, client: Client, lang: string, vote: string, type: string) {
        // Get Count
        const cache = interaction.message.embeds
        let number = parseInt(cache[0].description.toString().match(/\d+/g) as any)

        // Check if Number is Negative
        if (typeof interaction.message.components[0].components[1] !== 'undefined') {
            if (number === 1) {
                (interaction.message.components[0].components[1].data.disabled as boolean) = true
                await interaction.message.edit({ components: interaction.message.components })
            } else {
                (interaction.message.components[0].components[1].data.disabled as boolean) = false
                await interaction.message.edit({ components: interaction.message.components })
            }
        }

        // Count Number
        if (type === 'plus') number++
        else number--

        // Create Embeds
        let message = new EmbedBuilder().setColor(0x37009B)
            .setTitle('<:INFINITE:1024406060380979300> » COUNTING')
            .setDescription('» Lets Count! Current Number: **' + number + '**')
            .setFooter({ text: '» ' + client.config.version })

        if (lang === 'de') {
            message = new EmbedBuilder().setColor(0x37009B)
                .setTitle('<:INFINITE:1024406060380979300> » ZÄHLEN')
                .setDescription('» Komm Zählen! Aktuelle Nummer: **' + number + '**')
                .setFooter({ text: '» ' + client.config.version })
        }

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] COUNT : ' + number)
        return interaction.update({ embeds: [message], components: interaction.message.components })
    }
}