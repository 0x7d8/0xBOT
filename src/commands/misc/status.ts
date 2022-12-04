import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js"
import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import * as bot from "@functions/bot.js"
import Client from "@interfaces/Client.js"
import { CommandInteraction } from "discord.js"
export default {
    data: new SlashCommandBuilder()
        .setName('status')
    	.setDMPermission(false)
        .setDescription('GO TO THE STATUS PAGE')
        .setDescriptionLocalizations({
            de: 'GEHE ZUR STATUS SEITE'
        }),

    async execute(interaction: CommandInteraction, client: Client, lang: string, vote: string) {
        // Create Button
        let row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('GO')
					.setURL('https://status.0xbot.de')
					.setStyle(ButtonStyle.Link),
			)

        if (lang === 'de') {
            row = new ActionRowBuilder()
			    .addComponents(
			    	new ButtonBuilder()
			    		.setLabel('LOS')
			    		.setURL('https://status.0xbot.de')
			    		.setStyle(ButtonStyle.Link),
			    )
        }
        
        // Create Embed
       	let message = new EmbedBuilder().setColor(0x37009B)
            .setTitle('<:GLOBE:1024403680503529583> » STATUS')
  			.setDescription('» Click below to go to the Status Page!')
        	.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

        if (lang === 'de') {
            message = new EmbedBuilder().setColor(0x37009B)
                .setTitle('<:GLOBE:1024403680503529583> » STATUS')
  			    .setDescription('» Klicke unten um zur Status Seite zu gelangen!')
        	    .setFooter({ text: '» ' + vote + ' » ' + client.config.version })
        }
        
        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] STATUS')
        await interaction.reply({ embeds: [message], components: [row as any], ephemeral: true })
    }
}