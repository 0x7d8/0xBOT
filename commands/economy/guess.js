const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
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
    async execute(interaction, client) {
        // Count to Global Commands
        cmds.add('t-all', 1)
        
        // Count Guild Commands and User
        cmds.add('g-' + interaction.guild.id, 1)
        cmds.add('u-' + interaction.user.id.replace(/\D/g, ''), 1)
        
        // Set Variables
        const bereich = interaction.options.getString("range")
        const wette = interaction.options.getInteger("bet")
        const nummer = interaction.options.getInteger("number")
        const money = await bals.get(interaction.user.id.replace(/\D/g, ''));
        const random10 = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
        const random100 = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
        const random1000 = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;

        // Check if Balance is Minus
        if (wette < 0) {
            // Create Embed
            const err = new EmbedBuilder()
        		.setTitle('» FEHLER')
        		.setDescription('» Du kannst keine negativen Einsätze spielen!')
        		.setFooter({ text: '» ' + version });
            
            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] GUESS : NEGATIVEMONEY : ' + wette + '€')
            return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
        }
        
       	// Check for enough Money
        let status
          let result
        if (money >= wette) {
            // Check for Max Amount
            if (wette > 15000) {
                // Create Embed
                const err = new EmbedBuilder()
            		.setTitle('» RATEN')
  					.setDescription('» Du kannst nicht soviel Wetten! **15000€** ist das Maximum.')
            		.setFooter({ text: '» ' + version });
                
                // Send Message
            	console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] GUESS : TOOMUCHMONEY : ' + wette + '€')
        		return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
            }
            
            // Calculate Winnings
            if (bereich == '10') { if (nummer == random10) { status = 'GEWONNEN'; result = wette * 2 } else { 
                status = 'VERLOREN'; result = wette } }
            if (bereich == '100') { if (nummer == random100) { status = 'GEWONNEN'; result = wette * 4 } else { 
                status = 'VERLOREN'; result = wette } }
            if (bereich == '1000') { if (nummer == random1000) { status = 'GEWONNEN'; result = wette * 6 } else { 
                status = 'VERLOREN'; result = wette } }
        } else {
            const missing = wette - money
            const err = new EmbedBuilder()
            	.setTitle('» RATEN')
  				.setDescription('» Du hast dafür nicht genug Geld, dir fehlen **' + missing + '€**!')
            	.setFooter({ text: '» ' + version });

            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] GUESS : NOTENOUGHMONEY : ' + missing + '€')
            return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
        }
        
        // Create Embed
      	const message = new EmbedBuilder()
            .setTitle('» RATEN')
  			.setDescription('» Du hast **' + wette + '€** auf **' + nummer + '** gesetzt und **' + result + '€** **' + status + '**!')
        	.setFooter({ text: '» ' + version });
        
        // Set Money
        bals.rem(interaction.user.id.replace(/\D/g, ''), result)
        if (status == 'GEWONNEN') {
        	bals.add(interaction.user.id.replace(/\D/g, ''), result)
        }

        // Send Message
       	console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] GUESS : ' + nummer + ' : ' + status + ' : ' + result + '€')
        return interaction.reply({ embeds: [message.toJSON()] })
    },
};