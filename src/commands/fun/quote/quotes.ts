import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import * as bot from "@functions/bot.js"
import Client from "@interfaces/Client.js"
import { CommandInteraction } from "discord.js"
export default {
    data: new SlashCommandBuilder()
        .setName('quotes')
    	.setDMPermission(false)
        .setDescription('SEE THE QUOTES')
        .setDescriptionLocalizations({
            de: 'SEHE DIE ZITATE'
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
        // Check if Quotes are Enabled in Server
        if (!await bot.settings.get(interaction.guild.id, 'quotes')) {
            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» Quotes are disabled on this Server!')
        		.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Zitate sind auf diesem Server deaktiviert!')
        		    .setFooter({ text: '» ' + vote + ' » ' + client.config.version })
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] QUOTES : DISABLED')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Set Variables
        const user = interaction.options.getUser("user")
        
        // Set User ID
        let quotes: number
        if (user == null) {
            quotes = await bot.quotes.get(interaction.user.id)
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] QUOTES : ' + quotes)
        } else {
            quotes = await bot.quotes.get(user.id)
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] QUOTES : ' + user + ' : ' + quotes)
        }
        
        // Check if Plural or not
        let word: string
        if (quotes === 1) word = 'Quote'
        else word = 'Quotes'

        if (lang === 'de') {
            if (quotes === 1) word = 'Zitat'
            else word = 'Zitate'
        }
        
        // Create Embed
        let message: any
        if (!user) {
        	message = new EmbedBuilder().setColor(0x37009B)
            	.setTitle('<:QUOTES:1024406448127623228> » YOUR QUOTES')
  				.setDescription('» You have **' + quotes + '** ' + word + '!')
            	.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
            	    .setTitle('<:QUOTES:1024406448127623228> » DEINE ZITATE')
  				    .setDescription('» Du hast **' + quotes + '** ' + word + '!')
            	    .setFooter({ text: '» ' + vote + ' » ' + client.config.version })
            }
        } else {
            message = new EmbedBuilder().setColor(0x37009B)
                .setTitle('<:QUOTES:1024406448127623228> » THE QUOTES OF ' + user.username.toUpperCase())
  				.setDescription('» <@' + user + '> has **' + quotes + '** ' + word + '!')
            	.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:QUOTES:1024406448127623228> » DIE ZITATE VON ' + user.username.toUpperCase())
  				    .setDescription('» <@' + user + '> hat **' + quotes + '** ' + word + '!')
            	    .setFooter({ text: '» ' + vote + ' » ' + client.config.version })
            }
        }

        // Send Message
        return interaction.reply({ embeds: [message] })
    }
}