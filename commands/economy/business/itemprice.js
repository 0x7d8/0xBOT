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
        .setName('itemprice')
    	.setDMPermission(false)
        .setDescription('SET STORE PRICES')
        .setDescriptionLocalizations({
            de: 'SETZE SHOP PREISE'
        })
        .addStringOption(option =>
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
    async execute(interaction, client, lang, vote) {
        // Check if Businesses are Enabled in Server
        const bes = await gopt.get(interaction.guild.id + '-BUSINESS')
        if (parseInt(bes) == 1) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('» ERROR')
        		.setDescription('» Businesses are disabled on this Server!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang == "de") {
                message = new EmbedBuilder()
        		    .setTitle('» FEHLER')
        		    .setDescription('» Geschäfte sind auf diesem Server deaktiviert!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] BUSINESS : DISABLED')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Set Variables
        const itemid = interaction.options.getString("item")
        const newprice = interaction.options.getInteger("price")

        // Check if User owns Business
        if (await bsns.get('g-' + interaction.guild.id + '-1-OWNER') !== interaction.user.id) {
            // Create Embed
            let message = new EmbedBuilder()
            	.setTitle('» ERROR')
  				.setDescription('» You dont own this Business!')
            	.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang == "de") {
                message = new EmbedBuilder()
            	    .setTitle('» FEHLER')
  				    .setDescription('» Du besitzt dieses Geschäft nicht!')
            	    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ITEMPRICE : NOTOWNER')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Check if Price is valid
        let doscream = false
        if (itemid == 'nbomb' && !inRange(parseInt(newprice), 250, 1500)) { doscream = true }
        if (itemid == 'mbomb' && !inRange(parseInt(newprice), 750, 5000)) { doscream = true }
        if (itemid == 'hbomb' && !inRange(parseInt(newprice), 2500, 15000)) { doscream = true }
        if (itemid == 'cbomb' && !inRange(parseInt(newprice), 7500, 20000)) { doscream = true }
        if (doscream) {
            // Create Embed
            let message = new EmbedBuilder()
            	.setTitle('» ERROR')
  				.setDescription('» Please follow the limits seen in the first step!')
            	.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang == "de") {
                message = new EmbedBuilder()
            	    .setTitle('» FEHLER')
  				    .setDescription('» Bitte folge den Limits zu sehen im ersten Schritt!')
            	    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ITEMPRICE : NOTLIMIT')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Adjust Prices
        let resp
        const oldp = await bsns.get('g-' + interaction.guild.id + '-1-PRICES')
        const cache = oldp.toString().split('-')
        const [o1, o2, o3, o4] = cache
        if (itemid == 'nbomb') { resp = (newprice.toString() + '-' + o2.toString() + '-' + o3.toString() + '-' + o4.toString()) }
        if (itemid == 'mbomb') { resp = (o1.toString() + '-' + newprice.toString() + '-' + o3.toString() + '-' + o4.toString()) }
        if (itemid == 'hbomb') { resp = (o1.toString() + '-' + o2.toString() + '-' + newprice.toString() + '-' + o4.toString()) }
        if (itemid == 'cbomb') { resp = (o1.toString() + '-' + o2.toString() + '-' + o3.toString() + '-' + newprice.toString()) }
        bsns.set('g-' + interaction.guild.id + '-1-PRICES', resp.toString())

        // Create Embed
        let message = new EmbedBuilder()
            .setTitle('» MARKET PRICES')
            .setDescription('» Successfully set the price to **$' + newprice + '**.')
            .setFooter({ text: '» ' + vote + ' » ' + version });

        if (lang == 'de') {
            message = new EmbedBuilder()
                .setTitle('» SHOP PREISE')
                .setDescription('» Erfolgreich den Preis auf **' + newprice + '€** gesetzt.')
                .setFooter({ text: '» ' + vote + ' » ' + version });
        }

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ITEMPRICE : ' + itemid.toUpperCase() + ' : ' + newprice + '€')
        return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
    },
};