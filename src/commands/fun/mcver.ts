import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import * as bot from "@functions/bot.js"
import Client from "@interfaces/Client.js"
import { CommandInteraction } from "discord.js"
export default {
    data: new SlashCommandBuilder()
        .setName('mcver')
    	.setDMPermission(false)
        .setDescription('GENERATE A MINECRAFT VERSION')
        .setDescriptionLocalizations({
            de: 'GENERIERE EINE MINECRAFT VERSION'
        }),

    async execute(interaction: CommandInteraction, client: Client, lang: string, vote: string) {
        // Set Variables
        const result = bot.random(1, 21)

        // Create Embed
        let message = new EmbedBuilder().setColor(0x37009B)
        	.setTitle('<:CUBE:1024404832452350032> » RANDOM MINECRAFT VERSION')
  			.setDescription('» I would choose **1.' + result + '**!')
        	.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

        if (lang === 'de') {
            message = new EmbedBuilder().setColor(0x37009B)
        	    .setTitle('<:CUBE:1024404832452350032> » ZUFÄLLIGE MINECRAFT VERSION')
  			    .setDescription('» Ich würde **1.' + result + '** nehmen!')
        	    .setFooter({ text: '» ' + vote + ' » ' + client.config.version })
        }

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] MCVER : 1.' + result)
        return interaction.reply({ embeds: [message] })
    }
}