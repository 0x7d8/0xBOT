const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../../../config.json');

const fetch = require("node-fetch");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('carbuy')
    	.setDMPermission(false)
        .setDescription('BUY CARS')
        .setDescriptionLocalizations({
            de: 'KAUFE AUTOS'
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
                    { name: '🟢 [10000€-25000€] 2016 JEEP PATRIOT SPORT', value: 'jeep' },
            		{ name: '🔵 [50000€-75000€] 2022 KIA SORENTO', value: 'kia' },
                    { name: '🟡 [100000€-200000€] TESLA MODEL Y', value: 'tesla' },
                    { name: '🟡 [500000€-1000000€] 2019 PORSCHE 911 GT2RS', value: 'porsche' },
				)),
    async execute(interaction, client, lang, vote) {
        // Set Variables
        const car = interaction.options.getString("car")
        const balance = await bals.get(interaction.user.id.replace(/\D/g, ''));

        // Check if Command is Allowed :P
        if (interaction.user.id.replace(/\D/g, '') != "745619551865012274" && interaction.user.id.replace(/\D/g, '') != "994495187617321010") {
            // Create Embed
            const err = new EmbedBuilder()
                .setTitle('» FEHLER')
                .setDescription('» Nur für Devs!')
                .setFooter({ text: '» ' + vote + ' » ' + version });
    
            // Send Message
            console.log(interaction.user.id + ' is a lol')
            return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
        }

        // Calculate Cost
        let cost
        if (car == 'jeep') { cost = 150000 }
        if (car == 'kia') { cost = 390000 }
        if (car == 'tesla') { cost = 520000 }
        if (car == 'porsche') { cost = 520000 }

        // Translate to Car Names
        let name
        if (car == 'jeep') { name = '2016 JEEP PATRIOT SPORT' }
        if (car == 'kia') { name = '2022 KIA SORENTO' }
        if (car == 'tesla') { name = 'TESLA MODEL Y' }
        if (car == 'porsche') { name = '2019 PORSCHE 911 GT2RS' }

        // Check if User has enough Money
        if (balance < cost) {
            const missing = cost - balance
            
            // Create Embed
            let message = new EmbedBuilder()
            	.setTitle('» ERROR')
  				.setDescription('» You dont have enough Money for that, you are missing **$' + missing + '**!')
            	.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang.toString() == "de") {
                message = new EmbedBuilder()
            	    .setTitle('» FEHLER')
  				    .setDescription('» Du hast dafür nicht genug Geld, dir fehlen **' + missing + '€**!')
            	    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] CARBUY : ' + name.toUpperCase() + ' : NOTENOUGHMONEY : ' + cost + '€')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Check if User already has a Car
        if (await item.get(interaction.user.id.replace(/\D/g, '') + '-CAR', 'amount') !== 0) {
            // Translate to Car Names
            const dbcar = await item.get(interaction.user.id.replace(/\D/g, '') + '-CAR', 'value')
            if (dbcar == 'jeep') { name = '2016 JEEP PATRIOT SPORT' }
            if (dbcar == 'kia') { name = '2022 KIA SORENTO' }
            if (dbcar == 'tesla') { name = 'TESLA MODEL Y' }
            if (dbcar == 'porsche') { name = '2019 PORSCHE 911 GT2RS' }

            // Create Embed
            let message = new EmbedBuilder()
            	.setTitle('» ERROR')
  				.setDescription('» You already own a **' + name + '**!')
            	.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang.toString() == "de") {
                message = new EmbedBuilder()
            	    .setTitle('» FEHLER')
  				    .setDescription('» Du besitzt schon einen **' + name +'**!')
            	    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] CARBUY : : ALREADYOWNCAR : ' + name)
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Create Buttons
        let row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('YES')
                    .setCustomId('CAR-BUY-YES-' + car + '-' + interaction.user.id)
                    .setEmoji('1017050442431209543')
					.setStyle(ButtonStyle.Success)
                    .setDisabled(true),

                new ButtonBuilder()
					.setLabel('NO')
                    .setCustomId('CAR-BUY-NO-' + car + '-' + interaction.user.id)
                    .setEmoji('1017050508252418068')
					.setStyle(ButtonStyle.Danger)
                    .setDisabled(true),
			);
        if (lang.toString() == "de") {
            row = new ActionRowBuilder()
			    .addComponents(
			    	new ButtonBuilder()
			    		.setLabel('JA')
                        .setCustomId('CAR-BUY-YES-' + car + '-' + interaction.user.id)
                        .setEmoji('1017050442431209543')
			    		.setStyle(ButtonStyle.Success)
                        .setDisabled(false),

                    new ButtonBuilder()
			    		.setLabel('NEIN')
                        .setCustomId('CAR-BUY-NO-' + car + '-' + interaction.user.id)
                        .setEmoji('1017050508252418068')
			    		.setStyle(ButtonStyle.Danger)
                        .setDisabled(false),
			    );
        }

        // Create Embed
        let message = new EmbedBuilder()
            .setTitle('» BUY CAR')
            .setDescription('» Do you want to buy a **' + name + '** for **$' + cost + '**?')
            .setFooter({ text: '» ' + vote + ' » ' + version });

        if (lang.toString() == 'de') {
            message = new EmbedBuilder()
                .setTitle('» AUTO KAUFEN')
                .setDescription('» Willst du einen **' + name + '** für **' + cost + '€** kaufen?')
                .setFooter({ text: '» ' + vote + ' » ' + version });
        }

        // Send Message
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] CARBUY : ' + name.toUpperCase() + ' : ' + cost + '€')
        return interaction.reply({ embeds: [message.toJSON()], components: [row] })
    },
};