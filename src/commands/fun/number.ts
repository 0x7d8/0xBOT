import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import * as bot from "@functions/bot.js"
import Client from "@interfaces/Client.js"
import { CommandInteraction } from "discord.js"
export default {
    data: new SlashCommandBuilder()
        .setName('number')
    	.setDMPermission(false)
        .setDescription('GENERATE A NUMBER')
        .setDescriptionLocalizations({
            de: 'GENERIERE EINE NUMMER'
        })
        .addIntegerOption((option: any) =>
            option.setName('min')
                .setDescription('THE MIN AMOUNT')
                .setDescriptionLocalizations({
                    de: 'DAS MINIMUM'
                })
                .setRequired(true))
        .addIntegerOption((option: any) =>
            option.setName('max')
                .setDescription('THE MAX AMOUNT')
                .setDescriptionLocalizations({
                    de: 'DAS MAXIMUM'
                })
                .setRequired(true)),

    async execute(interaction: CommandInteraction, client: Client, lang: string, vote: string) {
        // Set Variables
        const min = bot.getOption(interaction, 'min') as number
        const max = bot.getOption(interaction, 'max') as number
        const res = bot.random(min, max)

        // Create Embed
        let message = new EmbedBuilder().setColor(0x37009B)
        	.setTitle('<:GEAR:1024404241701417011> » RANDOM NUMBER')
  			.setDescription('» Between **' + min + '** and **' + max + '** I choose **' + res + '**!')
        	.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

        if (lang === 'de') {
            message = new EmbedBuilder().setColor(0x37009B)
        	    .setTitle('<:GEAR:1024404241701417011> » ZUFÄLLIGE NUMMER')
  			    .setDescription('» Zwischen **' + min + '** und **' + max + '** wähle ich **' + res + '**!')
        	    .setFooter({ text: '» ' + vote + ' » ' + client.config.version })
        }

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] NUMBER : ' + min + ' : ' + max + ' : ' + res)
        return interaction.reply({ embeds: [message] })
    }
}