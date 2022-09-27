const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const { version } = require('../../../config.json');

const fetch = require("node-fetch");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('businessbuy')
    	.setDMPermission(false)
        .setDescription('BUY BUSINESSES')
        .setDescriptionLocalizations({
            de: 'KAUFE GESCHÄFTE'
        })
        .addStringOption(option =>
            option.setName('business')
                .setNameLocalizations({
                    de: 'geschäft'
                })
                .setDescription('THE BUSINESS')
                .setDescriptionLocalizations({
                    de: 'DAS GESCHÄFT'
                })
                .setRequired(true)
    			.addChoices(
                    // Setup Choices
                    { name: '🟢 [150000€] SUPERMARKT', value: 'market' },
            		{ name: '🔵 [390000€] PARKHAUS (WIP)', value: 'parking garage' },
                    { name: '🟡 [520000€] AUTOHAUS', value: 'car dealership' },
				)),
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
        const business = interaction.options.getString("business")
        const balance = await bals.get(interaction.user.id)

        // Check if User Selected Parking Garage
        if (business == 'parking garage') {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» This Business will be included in **2.0.5**!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang == "de") {
                message = new EmbedBuilder()
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Dieses Geschäft wird in **2.0.5** hinzugefügt!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] BUSINESSBUY : WIP')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Translate to Business ID
        let businessid
        if (business == 'market') { businessid = '1' }
        if (business == 'parking garage') { businessid = '2' }
        if (business == 'car dealership') { businessid = '3' }

        // Check if Business is Empty
        let businessowner, oldleft
        if (await bsns.get('g-' + interaction.guild.id + '-' + businessid + '-OWNER') !== '0' && await bsns.get('g-' + interaction.guild.id + '-' + businessid + '-OWNER') !== 0) {
            oldleft = false
            businessowner = await bsns.get('g-' + interaction.guild.id + '-' + businessid + '-OWNER')
            const fetchc = await interaction.guild.members.fetch(businessowner)
            if (typeof fetchc === 'undefined') { oldleft = true }

            if (!oldleft) {
                // Create Embed
                let message
                if (interaction.user.id !== businessowner) {
                    message = new EmbedBuilder()
        	            .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        	            .setDescription('» <@' + businessowner + '> already owns this Business!')
        	            .setFooter({ text: '» ' + vote + ' » ' + version });

                    if (lang == 'de') {
                        message = new EmbedBuilder()
        	                .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        	                .setDescription('» Dieses Geschäft gehört schon <@' + businessowner + '>!')
        	                .setFooter({ text: '» ' + vote + ' » ' + version });
                    }
                } else {
                    message = new EmbedBuilder()
        	            .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        	            .setDescription('» You already own this Business!')
        	            .setFooter({ text: '» ' + vote + ' » ' + version });

                    if (lang == 'de') {
                        message = new EmbedBuilder()
        	                .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        	                .setDescription('» Dieses Geschäft gehört schon dir!')
        	                .setFooter({ text: '» ' + vote + ' » ' + version });
                    }
                }
            
                // Send Message
                bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] BUSINESSBUY : ALREADYOWNED')
                return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
            }
        }

        // Check if User already has Business
        if (await bsns.get('u-' + interaction.user.id + '-BUSINESS') !== '0' && await bsns.get('u-' + interaction.user.id + '-BUSINESS') !== 0) {
            const userbusiness = await bsns.get('u-' + interaction.user.id + '-BUSINESS')

            // Translate to Business Names
            let name
            if (userbusiness == 'market') { name = 'MARKET' }
            if (userbusiness == 'parking garage') { name = 'PARKING GARAGE' }
            if (userbusiness == 'car dealership') { name = 'CAR DEALERSHIP' }
            if (lang == 'de') {
                if (userbusiness == 'market') { name = 'SUPERMARKT' }
                if (userbusiness == 'parking garage') { name = 'PARKHAUS' }
                if (userbusiness == 'car dealership') { name = 'AUTOHAUS' }
            }

            // Create Embed
            let message = new EmbedBuilder()
        	    .setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        	    .setDescription('» You already own a **' + name + '**!')
        	    .setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang == 'de') {
                message = new EmbedBuilder()
        	        .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        	        .setDescription('» Du besitzt schon ein **' + name + '**!')
        	        .setFooter({ text: '» ' + vote + ' » ' + version });
            }

            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] BUSINESSBUY : ALREADYBUSINESS')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Calculate Cost
        let cost
        if (business == 'market') { cost = 150000 }
        if (business == 'parking garage') { cost = 390000 }
        if (business == 'car dealership') { cost = 520000 }

        // Translate to Business Names
        let name
        if (business == 'market') { name = 'MARKET' }
        if (business == 'parking garage') { name = 'PARKING GARAGE' }
        if (business == 'car dealership') { name = 'CAR DEALERSHIP' }
        if (lang == 'de') {
            if (business == 'market') { name = 'SUPERMARKT' }
            if (business == 'parking garage') { name = 'PARKHAUS' }
            if (business == 'car dealership') { name = 'AUTOHAUS' }
        }

        // Check if User has enough Money
        if (balance < cost) {
            const missing = cost - balance
            
            // Create Embed
            let message = new EmbedBuilder()
            	.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  				.setDescription('» You dont have enough Money for that, you are missing **$' + missing + '**!')
            	.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang == "de") {
                message = new EmbedBuilder()
            	    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				    .setDescription('» Du hast dafür nicht genug Geld, dir fehlen **' + missing + '€**!')
            	    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] BUSINESSBUY : ' + name.toUpperCase() + ' : NOTENOUGHMONEY : ' + cost + '€')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Create Buttons
        let row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('YES')
                    .setCustomId('BUSINESS-BUY-YES-' + business + '-' + interaction.user.id)
                    .setEmoji('1024382935618572299')
					.setStyle(ButtonStyle.Success)
                    .setDisabled(false),

                new ButtonBuilder()
					.setLabel('NO')
                    .setCustomId('BUSINESS-BUY-NO-' + business + '-' + interaction.user.id)
                    .setEmoji('1024382939020152982')
					.setStyle(ButtonStyle.Danger)
                    .setDisabled(false),
			);
        if (lang == "de") {
            row = new ActionRowBuilder()
			    .addComponents(
			    	new ButtonBuilder()
			    		.setLabel('JA')
                        .setCustomId('BUSINESS-BUY-YES-' + business + '-' + interaction.user.id)
                        .setEmoji('1024382935618572299')
			    		.setStyle(ButtonStyle.Success)
                        .setDisabled(false),

                    new ButtonBuilder()
			    		.setLabel('NEIN')
                        .setCustomId('BUSINESS-BUY-NO-' + business + '-' + interaction.user.id)
                        .setEmoji('1024382939020152982')
			    		.setStyle(ButtonStyle.Danger)
                        .setDisabled(false),
			    );
        }

        // Create Embed
        let message = new EmbedBuilder()
            .setTitle('<:BOXCHECK:1024401101589590156> » BUY BUSINESS')
            .setDescription('» Do you want to buy a **' + name + '** for **$' + cost + '**?')
            .setFooter({ text: '» ' + vote + ' » ' + version });

        if (lang == 'de') {
            message = new EmbedBuilder()
                .setTitle('<:BOXCHECK:1024401101589590156> » GESCHÄFT KAUFEN')
                .setDescription('» Willst du ein **' + name + '** für **' + cost + '€** kaufen?')
                .setFooter({ text: '» ' + vote + ' » ' + version });
        }

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] BUSINESSBUY : ' + name.toUpperCase() + ' : ' + cost + '€')
        return interaction.reply({ embeds: [message.toJSON()], components: [row] })
    },
};