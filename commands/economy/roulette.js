const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../config.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roulette')
    	.setDMPermission(false)
        .setDescription('PLAY ROULETTE')
        .setDescriptionLocalizations({
            de: 'SPIELE ROULETTE'
        })
        .addStringOption(option =>
            option.setName('color')
                .setNameLocalizations({
                    de: 'farbe'
                })
                .setDescription('THE COLOR')
                .setDescriptionLocalizations({
                    de: 'DIE FARBE'
                })
                .setRequired(true)
    			.addChoices(
                    // Setup Choices
                    { name: '🟢 [x4] GRÜN', value: 'grün' },
            		{ name: '⚫ [x2] SCHWARZ', value: 'schwarz' },
                    { name: '🔴 [x2] ROT', value: 'rot' },
				))
        .addIntegerOption(option =>
            option.setName('bet')
                .setNameLocalizations({
                    de: 'wette'
                })
                .setDescription('THE BET')
                .setDescriptionLocalizations({
                    de: 'DIE WETTE'
                })
                .setRequired(true)),
    async execute(interaction, client, lang, vote) {
        // Check if RNG Games are Enabled in Server
        const res = await gopt.get(interaction.guild.id + '-ROULETTE')
        if (parseInt(res) == 1) {
            // Create Embed
            let message = new EmbedBuilder().setColor('#37009B')
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» Luck Games are disabled on this Server!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor('#37009B')
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Glücksspiele sind auf diesem Server deaktiviert!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ROULETTE : DISABLED')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Set Variables
        const farbe = interaction.options.getString("color")
        const wette = interaction.options.getInteger("bet")
        
        const money = await bot.money.get(interaction.user.id);
        const random = Math.floor(Math.random() * (21 - 1 + 1)) + 1;

        // Check if Balance is Minus
        if (wette < 0) {
            // Create Embed
            let message = new EmbedBuilder().setColor('#37009B')
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» You cant play with negative Money!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor('#37009B')
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Du kannst keine negativen Einsätze spielen!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ROULETTE : NEGATIVEMONEY : ' + wette + '€')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }
        
        // Calculate Color
        let color
        if (random == 1) { color = 'grün' }
        if (random >= 2) { color = 'schwarz' }
        if (random >= 11) { color = 'rot' }
        
        // Calculate Status
        let status
        if (color == farbe) { status = 'WON' }
        if (color != farbe) { status = 'LOST' }

        if (lang === 'de') {
            if (color == farbe) { status = 'GEWONNEN' }
            if (color != farbe) { status = 'VERLOREN' }
        }
        
        // Check for enough Money
        if (money >= wette) {
            // Check for Max Amount
            if (wette > 15000) {
                // Create Embed
                let message = new EmbedBuilder().setColor('#37009B')
            		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  					.setDescription('» You cant bet that much! **$15000** is the Maximum.')
            		.setFooter({ text: '» ' + vote + ' » ' + version });

                if (lang === 'de') {
                    message = new EmbedBuilder().setColor('#37009B')
            		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  					    .setDescription('» Du kannst nicht soviel Wetten! **15000€** ist das Maximum.')
            		    .setFooter({ text: '» ' + vote + ' » ' + version });
                }
                
                // Send Message
            	bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ROULETTE : TOOMUCHMONEY : ' + wette + '€')
        		return interaction.reply({ embeds: [message], ephemeral: true })
            }
            
        	// Set Money
            let resultmul
            if (color == farbe && color == 'grün') { resultmul = 4 }
            if (color == farbe && color != 'grün') { resultmul = 2 }
            if (color != farbe) { resultmul = 0 }

            const result = wette * resultmul
            const resultadd = result - wette

            let resultdis
            if (result == 0) {
                resultdis = wette
            } else {
                resultdis = result
            }

            let colordis
            if (farbe == 'grün') { colordis = 'green' }
            if (farbe == 'rot') { colordis = 'red' }
            if (farbe == 'schwarz') { colordis = 'black' }
        
        	// Create Embed
      		let message = new EmbedBuilder().setColor('#37009B')
            	.setTitle('<:CLOVER:1024388649418235925> » ROULETTE')
  				.setDescription('» You bet **$' + wette + '** on **' + colordis.toUpperCase() + '** and **' + status + '** **$' + resultdis + '**!')
            	.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor('#37009B')
            	    .setTitle('<:CLOVER:1024388649418235925> » ROULETTE')
  				    .setDescription('» Du hast **' + wette + '€** auf **' + farbe.toUpperCase() + '** gesetzt und **' + resultdis + '€** **' + status + '**!')
            	    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Set Money
            if (color != farbe) {
            	bot.money.rem(interaction, interaction.user.id, wette);
            }
			if (color == farbe) {
            	bot.money.add(interaction, interaction.user.id, resultadd);
            }
            
            // Send Message
        	bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ROULETTE : ' + farbe.toUpperCase() + '[W:' + color.toUpperCase() + '] : ' + status + ' : ' + resultdis + '€')
        	return interaction.reply({ embeds: [message] })
        } else {
            const missing = wette - money
            
            // Create Embed
            let message = new EmbedBuilder().setColor('#37009B')
            	.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  				.setDescription('» You dont have enough Money for that, you are missing **$' + missing + '**!')
            	.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor('#37009B')
            	    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				    .setDescription('» Du hast dafür nicht genug Geld, dir fehlen **' + missing + '€**!')
            	    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ROULETTE : NOTENOUGHMONEY : ' + missing + '€')
        	return interaction.reply({ embeds: [message], ephemeral: true })
        }
    },
};