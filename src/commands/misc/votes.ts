import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import * as bot from "@functions/bot.js"
import Client from "@interfaces/Client.js"
import { CommandInteraction } from "discord.js"
export default {
    data: new SlashCommandBuilder()
        .setName('votes')
    	.setDMPermission(false)
        .setDescription('SEE THE VOTES')
        .setDescriptionLocalizations({
            de: 'SEHE DIE VOTES'
        })
        .addUserOption((option: any) =>
            option.setName('user')
                .setNameLocalizations({
                    de: 'nutzer'
                })
                .setDescription('THE USER')
                .setDescriptionLocalizations({
                    de: 'DER NUTZER'
                })
                .setRequired(false)),

    async execute(interaction: CommandInteraction, client: Client, lang: string, vote: string) {
        // Set Variables
        const user = interaction.options.getUser("user")
        
        // Set User ID
        let votes: number
        if (!user) {
            votes = await bot.votes.get(interaction.user.id + '-A');
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] VOTES : ' + votes)
        } else {
            votes = await bot.votes.get(user.id + '-A');
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] VOTES : ' + user.id + ' : ' + votes)
        }
        
        // Check if Plural or not
        let word: string
        if (votes === 1) word = 'Vote'
        else word = 'Votes'
        
        // Create Embed
        let message: any
        if (!user) {
        	message = new EmbedBuilder().setColor(0x37009B)
            	.setTitle('<:GLOBE:1024403680503529583> » YOUR VOTES')
  				.setDescription('» You have **' + votes + '** ' + word + '!')
            	.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
            	    .setTitle('<:GLOBE:1024403680503529583> » DEINE VOTES')
  				    .setDescription('» Du hast **' + votes + '** ' + word + '!')
            	    .setFooter({ text: '» ' + vote + ' » ' + client.config.version })
            }
        } else {
            message = new EmbedBuilder().setColor(0x37009B)
                .setTitle('<:GLOBE:1024403680503529583> » THE VOTES OF ' + user.username.toUpperCase())
  				.setDescription('» <@' + user.id + '> has **' + votes + '** ' + word + '!')
            	.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:GLOBE:1024403680503529583> » DIE VOTES VON ' + user.username.toUpperCase())
  				    .setDescription('» <@' + user.id + '> hat **' + votes + '** ' + word + '!')
            	    .setFooter({ text: '» ' + vote + ' » ' + client.config.version })
            }
        }

        // Send Message
        return interaction.reply({ embeds: [message] })
    }
}