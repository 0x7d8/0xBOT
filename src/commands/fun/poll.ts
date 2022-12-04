import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js"
import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import * as bot from "@functions/bot.js"
import Client from "@interfaces/Client.js"
import { CommandInteraction } from "discord.js"
export default {
    data: new SlashCommandBuilder()
        .setName('poll')
    	.setDMPermission(false)
        .setDescription('MAKE A POLL')
        .setDescriptionLocalizations({
            de: 'MACHE EINE UMFRAGE'
        })
        .addStringOption((option: any) =>
            option.setName('text')
                .setDescription('THE TEXT')
                .setDescriptionLocalizations({
                    de: 'DER TEXT'
                })
                .setRequired(true)),

    async execute(interaction: CommandInteraction, client: Client, lang: string, vote: string) {
        // Set Variables
        const question = bot.getOption(interaction, 'text') as string

        // Create Buttons
        const row = new ActionRowBuilder()
		    .addComponents(
		    	new ButtonBuilder()
		    		.setEmoji('1044959793317691513')
                    .setLabel('0 [0%]')
                    .setCustomId('POLL-YES')
		    		.setStyle(ButtonStyle.Success),

                new ButtonBuilder()
		    		.setEmoji('1044959826914070568')
                    .setLabel('0 [0%]')
                    .setCustomId('POLL-NO')
		    		.setStyle(ButtonStyle.Danger),
		    )

        // Create Embed
       	let message = new EmbedBuilder().setColor(0x37009B)
            .setTitle('<:POLL:1024391847092703365> » POLL')
  			.setDescription('» ' + question)
        	.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

        if (lang === 'de') {
            message = new EmbedBuilder().setColor(0x37009B)
                .setTitle('<:POLL:1024391847092703365> » ABSTIMMUNG')
  			    .setDescription('» ' + question)
        	    .setFooter({ text: '» ' + vote + ' » ' + client.config.version })
        }
        
        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] POLL : ' + question.toUpperCase())
        return interaction.reply({ embeds: [message], components: [row as any] })
    }
}