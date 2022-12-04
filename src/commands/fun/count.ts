import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js"
import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import * as bot from "@functions/bot.js"
import Client from "@interfaces/Client.js"
import { CommandInteraction } from "discord.js"
export default {
    data: new SlashCommandBuilder()
        .setName('count')
        .setDescription('PRESS A BUTTON')
        .setDescriptionLocalizations({
            de: 'DRÜCKE EINEN KNOPF'
        })
    	.setDMPermission(false)
        .addStringOption((option: any) =>
            option.setName('mode')
                .setNameLocalizations({
                    de: 'modus'
                })
                .setDescription('THE MODE')
                .setDescriptionLocalizations({
                    de: 'DER MODUS'
                })
                .setRequired(true)
    			.addChoices(
            		// Setup Choices
					{ name: '🟢 PLUS', value: 'plus' },
            		{ name: '🟡 PLUS & MINUS', value: 'minus' },
				)),

    async execute(interaction: CommandInteraction, client: Client, lang: string, vote: string) {
        // Set Variables
        const mode = bot.getOption(interaction, 'mode') as string

        // Create Button
        let row: any
        if (mode === 'plus') {
            row = new ActionRowBuilder()
		    	.addComponents(
		    		new ButtonBuilder()
		    			.setEmoji('1024358756940775504')
                        .setCustomId('COUNT-PLUS')
		    			.setStyle(ButtonStyle.Secondary),
		    	)
        } else {
            row = new ActionRowBuilder()
		    	.addComponents(
		    		new ButtonBuilder()
		    			.setEmoji('1024358756940775504')
                        .setCustomId('COUNT-PLUS')
		    			.setStyle(ButtonStyle.Secondary),

                    new ButtonBuilder()
		    			.setEmoji('1024358810418151494')
                        .setCustomId('COUNT-MINUS')
		    			.setStyle(ButtonStyle.Secondary)
                        .setDisabled(true),
		    	)
        }
        
        // Create Embed
      	let message = new EmbedBuilder().setColor(0x37009B)
                .setTitle('<:INFINITE:1024406060380979300> » COUNTING')
  			    .setDescription('» Lets Count! Current Number: **0**')
        	    .setFooter({ text: '» ' + client.config.version })

        if (lang === 'de') {
            message = new EmbedBuilder().setColor(0x37009B)
                .setTitle('<:INFINITE:1024406060380979300> » ZÄHLEN')
  		        .setDescription('» Komm Zählen! Aktuelle Nummer: **0**')
                .setFooter({ text: '» ' + client.config.version })
        }

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] COUNT : ' + mode.toUpperCase())
        return interaction.reply({ embeds: [message], components: [row as any] })
    }
}