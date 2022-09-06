const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../config.json');

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
                    { name: '🟢 [x4] GRÜN', value: 'gruen' },
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
    async execute(interaction, client) {
        // Count to Global Commands
        cmds.add('t-all', 1)
        
        // Count Guild Commands and User
        cmds.add('g-' + interaction.guild.id, 1)
        cmds.add('u-' + interaction.user.id.replace(/\D/g, ''), 1)
        
        // Set Variables
        const farbe = interaction.options.getString("color")
        const wette = interaction.options.getInteger("bet")
        
        const money = await bals.get(interaction.user.id.replace(/\D/g, ''));
        const random = Math.floor(Math.random() * (21 - 1 + 1)) + 1;

        // Check if Balance is Minus
        if (wette < 0) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('» ERROR')
        		.setDescription('» You cant play with negative Money!')
        		.setFooter({ text: '» ' + version });

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
        		    .setTitle('» FEHLER')
        		    .setDescription('» Du kannst keine negativen Einsätze spielen!')
        		    .setFooter({ text: '» ' + version });
            }
            
            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] ROULETTE : NEGATIVEMONEY : ' + wette + '€')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }
        
        // Calculate Color
        let color
        if (random == 1) { color = 'gruen' }
        if (random >= 2) { color = 'schwarz' }
        if (random >= 11) { color = 'rot' }
        
        // Calculate Status
        let status
        if (color == farbe) { status = 'WON' }
        if (color != farbe) { status = 'LOST' }

        if (interaction.guildLocale == "de") {
            if (color == farbe) { status = 'GEWONNEN' }
            if (color != farbe) { status = 'VERLOREN' }
        }
        
        // Check for enough Money
        if (money >= wette) {
            // Check for Max Amount
            if (wette > 15000) {
                // Create Embed
                let message = new EmbedBuilder()
            		.setTitle('» ERROR')
  					.setDescription('» You cant bet that much! **$15000** is the Maximum.')
            		.setFooter({ text: '» ' + version });

                if (interaction.guildLocale == "de") {
                    message = new EmbedBuilder()
            		    .setTitle('» FEHLER')
  					    .setDescription('» Du kannst nicht soviel Wetten! **15000€** ist das Maximum.')
            		    .setFooter({ text: '» ' + version });
                }
                
                // Send Message
            	console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] ROULETTE : TOOMUCHMONEY : ' + wette + '€')
        		return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
            }
            
        	// Set Money
            let resultmul
            if (color == farbe && color == 'gruen') {
                resultmul = 4
            }
            if (color == farbe && color != 'gruen') {
                resultmul = 2
            }
            if (color != farbe) {
                resultmul = 0
            }

            const result = wette * resultmul
            const resultadd = result - wette

            let resultdis
            if (result == 0) {
                resultdis = wette
            } else {
                resultdis = result
            }

            let colordis
            if (color == 'gruen') { colordis = 'green' };
            if (color == 'rot') { colordis = 'red' };
            if (color == 'schwarz') { colordis = 'black' };
        
        	// Create Embed
      		let message = new EmbedBuilder()
            	.setTitle('» ROULETTE')
  				.setDescription('» You bet **$' + wette + '** on **' + colordis.toUpperCase() + '** and **' + status + '** **$' + resultdis + '**!')
            	.setFooter({ text: '» ' + version });

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
            	    .setTitle('» ROULETTE')
  				    .setDescription('» Du hast **' + wette + '€** auf **' + farbe.toUpperCase() + '** gesetzt und **' + resultdis + '€** **' + status + '**!')
            	    .setFooter({ text: '» ' + version });
            }
            
            // Set Money
            if (color != farbe) {
            	bals.rem(interaction.user.id.replace(/\D/g, ''), wette);
            }
			if (color == farbe) {
            	bals.add(interaction.user.id.replace(/\D/g, ''), resultadd);
            }
            
            // Send Message
        	console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] ROULETTE : ' + farbe.toUpperCase() + '[W:' + color.toUpperCase() + '] : ' + status + ' : ' + resultdis + '€')
        	return interaction.reply({ embeds: [message.toJSON()] })
        } else {
            const missing = wette - money
            
            // Create Embed
            let message = new EmbedBuilder()
            	.setTitle('» ERROR')
  				.setDescription('» You dont have enough Money for that, you are missing **$' + missing + '**!')
            	.setFooter({ text: '» ' + version });

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
            	    .setTitle('» FEHLER')
  				    .setDescription('» Du hast dafür nicht genug Geld, dir fehlen **' + missing + '€**!')
            	    .setFooter({ text: '» ' + version });
            }
            
            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] ROULETTE : NOTENOUGHMONEY : ' + missing + '€')
        	return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }
    },
};