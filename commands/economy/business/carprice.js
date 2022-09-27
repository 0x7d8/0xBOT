const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const { version } = require('../../../config.json');

const fetch = require("node-fetch");

// In Range Function
function inRange(x, min, max) {
    return ((x-min)*(x-max) <= 0);
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('carprice')
    	.setDMPermission(false)
        .setDescription('SET CAR PRICES')
        .setDescriptionLocalizations({
            de: 'SETZE AUTO PREISE'
        })
        .addStringOption(option =>
            option.setName('car')
                .setNameLocalizations({
                    de: 'auto'
                })
                .setDescription('THE CAR')
                .setDescriptionLocalizations({
                    de: 'DAS AUTO'
                })
                .setRequired(true)
    			.addChoices(
                    // Setup Choices
                    { name: '🟢 [5000€-15000€] 2016 JEEP PATRIOT SPORT', value: 'jeep' },
            		{ name: '🔵 [50000€-90000€] 2022 KIA SORENTO', value: 'kia' },
                    { name: '🟡 [140000€-200000€] AUDI R8 COUPE V10', value: 'audi' },
                    { name: '🟠 [220000€-260000€] TESLA MODEL Y', value: 'tesla' },
                    { name: '🔴 [400000€-500000€] 2019 PORSCHE 911 GT2RS', value: 'porsche' },
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
            .   setRequired(true)),
    async execute(interaction, client, lang, vote) {
        // Check if Businesses are Enabled in Server
        const bes = await gopt.get(interaction.guild.id + '-BUSINESS')
        if (parseInt(bes) == 1) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» Businesses are disabled on this Server!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang == "de") {
                message = new EmbedBuilder()
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Geschäfte sind auf diesem Server deaktiviert!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] BUSINESS : DISABLED')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Set Variables
        const car = interaction.options.getString("car")
        const newprice = interaction.options.getInteger("price")

        // Check if User owns Business
        if (await bsns.get('g-' + interaction.guild.id + '-3-OWNER') !== interaction.user.id) {
            // Create Embed
            let message = new EmbedBuilder()
            	.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  				.setDescription('» You dont own this Business!')
            	.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang == "de") {
                message = new EmbedBuilder()
            	    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				    .setDescription('» Du besitzt dieses Geschäft nicht!')
            	    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] CARPRICE : NOTOWNER')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Check if Price is valid
        let doscream = false
        if (car == 'jeep' && !inRange(parseInt(newprice), 5000, 15000)) { doscream = true }
        if (car == 'kia' && !inRange(parseInt(newprice), 50000, 90000)) { doscream = true }
        if (car == 'audi' && !inRange(parseInt(newprice), 140000, 200000)) { doscream = true }
        if (car == 'tesla' && !inRange(parseInt(newprice), 220000, 260000)) { doscream = true }
        if (car == 'porsche' && !inRange(parseInt(newprice), 400000, 500000)) { doscream = true }
        if (doscream) {
            // Create Embed
            let message = new EmbedBuilder()
            	.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  				.setDescription('» Please follow the limits seen in the first step!')
            	.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang == "de") {
                message = new EmbedBuilder()
            	    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				    .setDescription('» Bitte folge den Limits zu sehen im ersten Schritt!')
            	    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] CARPRICE : NOTLIMIT')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Adjust Prices
        bsns.set('g-' + interaction.guild.id + '-3-PRICE-' + car.toUppercase(), newprice.toString())

        // Create Embed
        let message = new EmbedBuilder()
            .setTitle('<:PARTITION:1024399126403747970> » CAR PRICES')
            .setDescription('» Successfully set the price to **$' + newprice + '**.')
            .setFooter({ text: '» ' + vote + ' » ' + version });

        if (lang == 'de') {
            message = new EmbedBuilder()
                .setTitle('<:PARTITION:1024399126403747970> » AUTO PREISE')
                .setDescription('» Erfolgreich den Preis auf **' + newprice + '€** gesetzt.')
                .setFooter({ text: '» ' + vote + ' » ' + version });
        }

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] CARPRICE : ' + car.toUpperCase() + ' : ' + newprice + '€')
        return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
    },
};