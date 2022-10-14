const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('guess')
    	.setDMPermission(false)
        .setDescription('GUESS NUMBERS')
        .setDescriptionLocalizations({
            de: 'RATE ZAHLEN'
        })
        .addStringOption(option =>
            option.setName('range')
                .setNameLocalizations({
                    de: 'bereich'
                })
                .setDescription('THE RANGE')
                .setDescriptionLocalizations({
                    de: 'DER BEREICH'
                })
                .setRequired(true)
    			.addChoices(
                    // Setup Choices
            		{ name: '🟢 [x2] 1-10', value: '10' },
                    { name: '🟡 [x4] 1-100', value: '100' },
                    { name: '🔴 [x6] 1-1000', value: '1000' },
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
                .setRequired(true))
    	.addIntegerOption(option =>
            option.setName('number')
                .setNameLocalizations({
                    de: 'nummer'
                })
                .setDescription('THE NUMBER')
                .setDescriptionLocalizations({
                    de: 'DIE NUMMER'
                })
                .setRequired(true)),
    async execute(interaction, client, lang, vote) {
        // Check if RNG Games are Enabled in Server
        const res = await gopt.get(interaction.guild.id + '-ROULETTE')
        if (parseInt(res) == 1) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» Luck Games are disabled on this Server!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang === 'de') {
                message = new EmbedBuilder()
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Glücksspiele sind auf diesem Server deaktiviert!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] ROULETTE : DISABLED')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }
        
        // Set Variables
        const bereich = interaction.options.getString("range")
        const wette = interaction.options.getInteger("bet")
        const nummer = interaction.options.getInteger("number")
        const money = await bot.money.get(interaction.user.id);
        const random10 = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
        const random100 = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
        const random1000 = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;

        // Check if Balance is Minus
        if (wette < 0) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» You cant play with negative Money!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang === 'de') {
                message = new EmbedBuilder()
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Du kannst keine negativen Einsätze spielen!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] GUESS : NEGATIVEMONEY : ' + wette + '€')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }
        
       	// Check for enough Money
        let status
        let result
        if (money >= wette) {
            // Check for Max Amount
            if (wette > 15000) {
                // Create Embed
                let message = new EmbedBuilder()
            		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  					.setDescription('» You cant bet that much! **$15000** is the Maximum.')
            		.setFooter({ text: '» ' + vote + ' » ' + version });

                if (lang === 'de') {
                    message = new EmbedBuilder()
            		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  					    .setDescription('» Du kannst nicht soviel Wetten! **15000€** ist das Maximum.')
            		    .setFooter({ text: '» ' + vote + ' » ' + version });
                }
                
                // Send Message
            	bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] GUESS : TOOMUCHMONEY : ' + wette + '€')
        		return interaction.reply({ embeds: [message], ephemeral: true })
            }
            
            // Calculate Winnings
            if (bereich == '10') { if (nummer == random10) { status = 'WON'; result = wette * 2 } else { 
                status = 'LOST'; result = wette } }
            if (bereich == '100') { if (nummer == random100) { status = 'WON'; result = wette * 4 } else { 
                status = 'LOST'; result = wette } }
            if (bereich == '1000') { if (nummer == random1000) { status = 'WON'; result = wette * 6 } else { 
                status = 'LOST'; result = wette } }

            if (lang === 'de') {
                if (bereich == '10') { if (nummer == random10) { status = 'GEWONNEN'; result = wette * 2 } else { 
                    status = 'VERLOREN'; result = wette } }
                if (bereich == '100') { if (nummer == random100) { status = 'GEWONNEN'; result = wette * 4 } else { 
                    status = 'VERLOREN'; result = wette } }
                if (bereich == '1000') { if (nummer == random1000) { status = 'GEWONNEN'; result = wette * 6 } else { 
                    status = 'VERLOREN'; result = wette } }
            }
        } else {
            const missing = wette - money

            // Create Embed
            let message = new EmbedBuilder()
            	.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  				.setDescription('» You dont have enough Money for that, you are missing **$' + missing + '**!')
            	.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang === 'de') {
                message = new EmbedBuilder()
            	    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				    .setDescription('» Du hast dafür nicht genug Geld, dir fehlen **' + missing + '€**!')
            	    .setFooter({ text: '» ' + vote + ' » ' + version });
            }

            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] GUESS : NOTENOUGHMONEY : ' + missing + '€')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }
        
        // Create Embed
      	let message = new EmbedBuilder()
            .setTitle('<:CLOVER:1024388649418235925> » GUESS')
  			.setDescription('» You set **$' + wette + '** on **' + nummer + '** and **' + status + '** **$' + result + '**!')
        	.setFooter({ text: '» ' + vote + ' » ' + version });

        if (lang === 'de') {
            message = new EmbedBuilder()
                .setTitle('<:CLOVER:1024388649418235925> » RATEN')
  			    .setDescription('» Du hast **' + wette + '€** auf **' + nummer + '** gesetzt und **' + result + '€** **' + status + '**!')
        	    .setFooter({ text: '» ' + vote + ' » ' + version });
        }
        
        // Set Money
        bot.money.rem(interaction, interaction.user.id, result)
        if (status == 'GEWONNEN' || status == 'WON') {
        	bot.money.add(interaction, interaction.user.id, result)
        }

        // Send Message
       	bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] GUESS : ' + nummer + ' : ' + status + ' : ' + result + '€')
        return interaction.reply({ embeds: [message] })
    },
};