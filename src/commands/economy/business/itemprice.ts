import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import * as bot from "@functions/bot.js"
import Client from "@interfaces/Client.js"
import { CommandInteraction } from "discord.js"
export default {
    data: new SlashCommandBuilder()
        .setName('itemprice')
    	.setDMPermission(false)
        .setDescription('SET STORE PRICES')
        .setDescriptionLocalizations({
            de: 'SETZE SHOP PREISE'
        })
        .addStringOption((option: any) =>
            option.setName('item')
                .setNameLocalizations({
                    de: 'gegenstand'
                })
                .setDescription('THE ITEM')
                .setDescriptionLocalizations({
                    de: 'DER GEGENSTAND'
                })
                .setRequired(true)
    			.addChoices(
                    // Setup Choices
                    { name: '💣 [250€-1500€] NORMALE BOMBE', value: 'nbomb' },
            		{ name: '💣 [750€-5000€] MEDIUM BOMBE', value: 'mbomb' },
            		{ name: '💣 [2500€-15000€] HYPER BOMBE', value: 'hbomb' },
            		{ name: '💣 [7500€-20000€] CRAZY BOMBE', value: 'cbomb' },
				))
        .addIntegerOption(option =>
            option.setName('price')
                .setNameLocalizations({
                    de: 'preis'
                })
                .setDescription('THE NEW PRICE [THE FIRST VALUE IS THE PRODUCTION COST]')
                .setDescriptionLocalizations({
                    de: 'DER NEUE PREIS [DIE ERSTE ZAHL IST DER PRODUKTIONS PREIS]'
                })
                .setRequired(true)),

    async execute(interaction: CommandInteraction, client: Client, lang: string, vote: string) {
        // Check if Businesses are Enabled in Server
        if (!await bot.settings.get(interaction.guild.id, 'businesses')) {
            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» Businesses are disabled on this Server!')
        		.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Geschäfte sind auf diesem Server deaktiviert!')
        		    .setFooter({ text: '» ' + vote + ' » ' + client.config.version })
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] BUSINESS : DISABLED')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Set Variables
        const itemid = bot.getOption(interaction, 'item') as string
        const newprice = bot.getOption(interaction, 'price') as number

        // Check if User owns Business
        if (await bot.businesses.get('g-' + interaction.guild.id + '-1-OWNER') !== interaction.user.id) {
            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
            	.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  				.setDescription('» You dont own this Business!')
            	.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
            	    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				    .setDescription('» Du besitzt dieses Geschäft nicht!')
            	    .setFooter({ text: '» ' + vote + ' » ' + client.config.version })
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ITEMPRICE : NOTOWNER')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Check if Price is valid
        let doscream = false
        if (itemid == 'nbomb' && !bot.inRange(newprice, 250, 1500)) doscream = true
        if (itemid == 'mbomb' && !bot.inRange(newprice, 750, 5000)) doscream = true
        if (itemid == 'hbomb' && !bot.inRange(newprice, 2500, 15000)) doscream = true
        if (itemid == 'cbomb' && !bot.inRange(newprice, 7500, 20000)) doscream = true
        if (doscream) {
            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
            	.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  				.setDescription('» Please follow the limits seen in the first step!')
            	.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
            	    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				    .setDescription('» Bitte folge den Limits zu sehen im ersten Schritt!')
            	    .setFooter({ text: '» ' + vote + ' » ' + client.config.version })
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ITEMPRICE : NOTLIMIT')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Adjust Prices
        bot.businesses.set('g-' + interaction.guild.id + '-1-PRICE-' + itemid.toUpperCase(), newprice.toString())

        // Create Embed
        let message = new EmbedBuilder().setColor(0x37009B)
            .setTitle('<:PARTITION:1024399126403747970> » ITEM PRICES')
            .setDescription('» Successfully set the price to **$' + newprice + '**.')
            .setFooter({ text: '» ' + vote + ' » ' + client.config.version })

        if (lang == 'de') {
            message = new EmbedBuilder().setColor(0x37009B)
                .setTitle('<:PARTITION:1024399126403747970> » ITEM PREISE')
                .setDescription('» Erfolgreich den Preis auf **' + newprice + '€** gesetzt.')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version })
        }

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ITEMPRICE : ' + itemid.toUpperCase() + ' : ' + newprice + '€')
        return interaction.reply({ embeds: [message], ephemeral: true })
    }
}