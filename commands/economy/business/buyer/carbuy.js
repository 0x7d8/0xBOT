const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

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
                    { name: '🟢 2016 JEEP PATRIOT SPORT', value: 'jeep' },
            		{ name: '🔵 2022 KIA SORENTO', value: 'kia' },
                    { name: '🟡 AUDI R8 COUPE V10', value: 'audi' },
                    { name: '🟠 TESLA MODEL Y', value: 'tesla' },
                    { name: '🔴 2019 PORSCHE 911 GT2RS', value: 'porsche' },
				)),
    async execute(interaction, client, lang, vote) {
        // Check if Cars are Enabled in Server
        if (!await bot.settings.get(interaction.guild.id, 'cars')) {
            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» Cars are disabled on this Server!')
        		.setFooter({ text: '» ' + vote + ' » ' + config.version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Autos sind auf diesem Server deaktiviert!')
        		    .setFooter({ text: '» ' + vote + ' » ' + config.version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] CAR : DISABLED')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Set Variables
        const car = interaction.options.getString("car")
        const balance = await bot.money.get(interaction.user.id)

        // Calculate Cost
        let cost
        if (await bot.businesses.get('g-' + interaction.guild.id + '-3-PRICE-' + car.toUpperCase()) === '0' || await bot.businesses.get('g-' + interaction.guild.id + '-3-PRICE-' + car.toUpperCase()) === 0) {
            if (car == 'jeep') cost = 15000
            if (car == 'kia') cost = 75000
            if (car == 'audi') cost = 160000
            if (car == 'tesla') cost = 240000
            if (car == 'porsche') cost = 490000
        } else {
            cost = await bot.businesses.get('g-' + interaction.guild.id + '-3-PRICE-' + car.toUpperCase())
        }

        // Translate to Car Names
        let name
        if (car == 'jeep') { name = '2016 JEEP PATRIOT SPORT' }
        if (car == 'kia') { name = '2022 KIA SORENTO' }
        if (car == 'audi') { name = 'AUDI R8 COUPE V10' }
        if (car == 'tesla') { name = 'TESLA MODEL Y' }
        if (car == 'porsche') { name = '2019 PORSCHE 911 GT2RS' }

        // Check if User has enough Money
        if (balance < cost) {
            const missing = cost - balance
            
            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
            	.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  				.setDescription('» You dont have enough Money for that, you are missing **$' + missing + '**!')
            	.setFooter({ text: '» ' + vote + ' » ' + config.version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
            	    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				    .setDescription('» Du hast dafür nicht genug Geld, dir fehlen **' + missing + '€**!')
            	    .setFooter({ text: '» ' + vote + ' » ' + config.version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] CARBUY : ' + name.toUpperCase() + ' : NOTENOUGHMONEY : ' + cost + '€')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Check if User already has a Car
        if (await bot.items.get(interaction.user.id + '-CAR-' + interaction.guild.id, 'amount') !== 0) {
            // Translate to Car Names
            const dbcar = await bot.items.get(interaction.user.id + '-CAR-' + interaction.guild.id, 'value')
            if (dbcar == 'jeep') { name = '2016 JEEP PATRIOT SPORT' }
            if (dbcar == 'kia') { name = '2022 KIA SORENTO' }
            if (dbcar == 'audi') { name = 'AUDI R8 COUPE V10' }
            if (dbcar == 'tesla') { name = 'TESLA MODEL Y' }
            if (dbcar == 'porsche') { name = '2019 PORSCHE 911 GT2RS' }

            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
            	.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  				.setDescription('» You already own a **' + name + '**!')
            	.setFooter({ text: '» ' + vote + ' » ' + config.version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
            	    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				    .setDescription('» Du besitzt schon einen **' + name +'**!')
            	    .setFooter({ text: '» ' + vote + ' » ' + config.version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] CARBUY : ALREADYOWNCAR : ' + name)
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Create Buttons
        let row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('YES')
                    .setCustomId('CAR-BUY-YES-' + car + '-' + interaction.user.id)
                    .setEmoji('1024382935618572299')
					.setStyle(ButtonStyle.Success)
                    .setDisabled(false),

                new ButtonBuilder()
					.setLabel('NO')
                    .setCustomId('CAR-BUY-NO-' + car + '-' + interaction.user.id)
                    .setEmoji('1024382939020152982')
					.setStyle(ButtonStyle.Danger)
                    .setDisabled(false),
			);
        if (lang === 'de') {
            row = new ActionRowBuilder()
			    .addComponents(
			    	new ButtonBuilder()
			    		.setLabel('JA')
                        .setCustomId('CAR-BUY-YES-' + car + '-' + interaction.user.id)
                        .setEmoji('1024382935618572299')
			    		.setStyle(ButtonStyle.Success)
                        .setDisabled(false),

                    new ButtonBuilder()
			    		.setLabel('NEIN')
                        .setCustomId('CAR-BUY-NO-' + car + '-' + interaction.user.id)
                        .setEmoji('1024382939020152982')
			    		.setStyle(ButtonStyle.Danger)
                        .setDisabled(false),
			    );
        }

        // Create Embed
        let message = new EmbedBuilder().setColor(0x37009B)
            .setTitle('<:BOXCHECK:1024401101589590156> » BUY CAR')
            .setDescription('» Do you want to buy a **' + name + '** for **$' + cost + '**?')
            .setFooter({ text: '» ' + vote + ' » ' + config.version });

        if (lang == 'de') {
            message = new EmbedBuilder().setColor(0x37009B)
                .setTitle('<:BOXCHECK:1024401101589590156> » AUTO KAUFEN')
                .setDescription('» Willst du einen **' + name + '** für **' + cost + '€** kaufen?')
                .setFooter({ text: '» ' + vote + ' » ' + config.version });
        }

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] CARBUY : ' + name.toUpperCase() + ' : ' + cost + '€')
        return interaction.reply({ embeds: [message], components: [row] })
    }
}