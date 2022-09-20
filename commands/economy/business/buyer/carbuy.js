const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../../../config.json');

const fetch = require("node-fetch");
const items = require('../../../../schema/items');

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

        // Check if User already has that Car
        if (await item.get(interaction.user.id.replace(/\D/g, '') + '-CAR', 'value') !== 0) {
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
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] CARBUY : ' + name.toUpperCase() + ' : ALREADYOWNCAR : ' + name)
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Set Car Value
        let carvalue
        if (car == 'jeep') { carvalue = 25 }
        if (car == 'kia') { carvalue = 50 }
        if (car == 'tesla') { carvalue = 100 }
        if (car == 'porsche') { carvalue = 200 }

        // Remove Money
        bals.rem(interaction.user.id.replace(/\D/g, ''), cost)

        // Own Car
        item.set(interaction.user.id.replace(/\D/g, '') + '-CAR', car, carvalue)

        // Create Embed
        let message = new EmbedBuilder()
            .setTitle('» BUY BUSINESS')
            .setDescription('» You successfully bought a **' + name + '** for **$' + cost + '**!')
            .setFooter({ text: '» ' + vote + ' » ' + version });

        if (lang.toString() == 'de') {
            message = new EmbedBuilder()
                .setTitle('» GESCHÄFT KAUFEN')
                .setDescription('» Du hast erfolgreich ein **' + name + '** für **' + cost + '€** gekauft!')
                .setFooter({ text: '» ' + vote + ' » ' + version });
        }

        // Send Message
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] CARBUY : ' + name.toUpperCase() + ' : ' + cost + '€')
        return interaction.reply({ embeds: [message.toJSON()] })
    },
};