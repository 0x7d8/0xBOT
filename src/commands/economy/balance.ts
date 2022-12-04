import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import * as bot from "@functions/bot.js"
import Client from "@interfaces/Client.js"
import { CommandInteraction } from "discord.js"
export default {
    data: new SlashCommandBuilder()
        .setName('balance')
    	.setDMPermission(false)
        .setDescription('SEE THE BALANCE')
        .setDescriptionLocalizations({
            de: 'SEHE DEN KONTOSTAND'
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

        // Get Money
        let money: number
        if (!user) {
            money = await bot.money.get(interaction.user.id)
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] BALANCE : ' + money + '€')
        } else {
            money = await bot.money.get(user.id)
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] BALANCE : ' + user + ' : ' + money + '€')
        }
        
        // Create Embed
        let message: any
        if (!user) {
        	message = new EmbedBuilder().setColor(0x37009B)
            	.setTitle('<:WALLET:1024387370793050273> » YOUR BALANCE')
  				.setDescription('» Your Balance is **$' + money + '**!')
            	.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
            	    .setTitle('<:WALLET:1024387370793050273> » DEIN GELDSTAND')
  				    .setDescription('» Dein Geldstand beträgt **' + money + '€**!')
            	    .setFooter({ text: '» ' + vote + ' » ' + client.config.version })
            }
        } else {
            message = new EmbedBuilder().setColor(0x37009B)
            	.setTitle('<:WALLET:1024387370793050273> » THE BALANCE OF ' + user.username.toUpperCase())
  				.setDescription('» The Balance of <@' + user + '> is **$' + money + '**!')
            	.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
            	    .setTitle('<:WALLET:1024387370793050273> » DER GELDSTAND VON ' + user.username.toUpperCase())
  				    .setDescription('» Der Geldstand von <@' + user + '> ist **' + money + '€**!')
            	    .setFooter({ text: '» ' + vote + ' » ' + client.config.version })
            }
        }

        // Send Message
        return interaction.reply({ embeds: [message] })
    }
}