const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('guess')
    	.setDMPermission(false)
        .setDescription('RATE ZAHLEN')
        .addStringOption(option =>
            option.setName('bereich')
                .setDescription('DER BEREICH')
                .setRequired(true)
    			.addChoices(
                    // Setup Choices
            		{ name: '🟢 [x2] 1-10', value: '10' },
                    { name: '🟡 [x4] 1-100', value: '100' },
                    { name: '🔴 [x6] 1-1000', value: '1000' },
				))
        .addIntegerOption(option =>
            option.setName('wette')
                .setDescription('DIE WETTE')
                .setRequired(true))
    	.addIntegerOption(option =>
            option.setName('nummer')
                .setDescription('DIE NUMMER')
                .setRequired(true)),
    async execute(interaction) {
        // Count to Global Commands
        addcmd('t-all', 1)
        
        // Count Guild Commands and User
        addcmd('g-' + interaction.guild.id, 1)
        addcmd('u-' + interaction.user.id, 1)
        
        // Set Variables
        const bereich = interaction.options.getString("bereich")
        const wette = interaction.options.getInteger("wette")
        const nummer = interaction.options.getInteger("nummer")
        const money = await getbal('<@' + interaction.user.id + '>');
        const random10 = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
        const random100 = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
        const random1000 = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;

        // Check if Balance is Minus
        if (wette < 0) {
            // Create Embed
            var err = new EmbedBuilder()
        		.setTitle('» FEHLER')
        		.setDescription('» Du kannst keine negativen Einsätze spielen!')
        		.setFooter({ text: '» ' + version });
            
            // Send Message
            console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] GUESS : NEGATIVEMONEY : ' + wette + '€')
            return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
        }
        
       	// Check for enough Money
        if (money >= wette) {
            // Check for Max Amount
            if (wette > 5000) {
                // Create Embed
                var err = new EmbedBuilder()
            		.setTitle('» RATEN')
  					.setDescription('» Du kannst nicht soviel Wetten! **5000€** ist das Maximum.')
            		.setFooter({ text: '» ' + version });
                
                // Send Message
            	console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] GUESS : TOOMUCHMONEY : ' + wette + '€')
        		return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
            }
            
            // Calculate Winnings
            if (bereich == 10) { if (nummer == random10) { var status = 'GEWONNEN'; var result = wette * 2 } else { 
                var status = 'VERLOREN'; var result = wette } }
            if (bereich == 100) { if (nummer == random100) { var status = 'GEWONNEN'; var result = wette * 4 } else { 
                var status = 'VERLOREN'; var result = wette } }
            if (bereich == 1000) { if (nummer == random1000) { var status = 'GEWONNEN'; var result = wette * 6 } else { 
                var status = 'VERLOREN'; var result = wette } }
        } else {
            var missing = wette - money
            var notenoughmoney = new EmbedBuilder()
            	.setTitle('» RATEN')
  				.setDescription('» Du hast dafür nicht genug Geld, dir fehlen **' + missing + '€**!')
            	.setFooter({ text: '» ' + version });

            // Send Message
            console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] GUESS : NOTENOUGHMONEY : ' + missing + '€')
            return interaction.reply({ embeds: [notenoughmoney.toJSON()], ephemeral: true })
        }
        
        // Create Embed
      	const message = new EmbedBuilder()
            .setTitle('» RATEN')
  			.setDescription('» Du hast **' + wette + '€** auf **' + nummer + '** gesetzt und **' + result + '€** **' + status + '**!')
        	.setFooter({ text: '» ' + version });
        
        // Set Money
        rembal('<@' + interaction.user.id + '>', result)
        if (status == 'GEWONNEN') {
        	addbal('<@' + interaction.user.id + '>', result)
        }

        // Send Message
       	console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] GUESS : ' + nummer + ' : ' + status + ' : ' + result + '€')
        return interaction.reply({ embeds: [message.toJSON()] })
    },
};