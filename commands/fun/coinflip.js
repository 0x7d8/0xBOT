const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('coinflip')
    	.setDMPermission(false)
        .setDescription('WIRF EINE MÜNZE')
        .addIntegerOption(option =>
            option.setName('anzahl')
                .setDescription('DIE ANZAHL')
                .setRequired(false)),
    async execute(interaction) {
        // Count to Global Commands
        addcmd('t-all', 1)
        
        // Count Guild Commands and User
        addcmd('g-' + interaction.guild.id, 1)
        addcmd('u-' + interaction.user.id, 1)
        
        // Set Variables
        var anzahl = interaction.options.getInteger("anzahl")
        var heads = 0
        var tails = 0
        var tries = 0
        
        // Check Maintenance
        const { maintenance } = require('../../config.json');
        if (maintenance == 'yes' && interaction.user.id != '745619551865012274') {
            // Create Embed
            var err = new EmbedBuilder()
        		.setTitle('» FEHLER')
        		.setDescription('» Der Bot ist aktuell unter Wartungsarbeiten!')
        		.setFooter({ text: '» ' + version });
            
            return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
        }

        // Check if Number is empty
        if (anzahl == null) {
            var anzahl = 1
        }
        
        // Check if Number is negative
        if (anzahl < 1) {
            // Create Embed
            var err = new EmbedBuilder()
        		.setTitle('» FEHLER')
        		.setDescription('» Du musst schon mindestens eine Münze werfen!')
        		.setFooter({ text: '» ' + version });
            
            return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
        }

        // Check if Number is too Big
        if (anzahl > 1000) {
            // Create Embed
            var err = new EmbedBuilder()
        		.setTitle('» FEHLER')
        		.setDescription('» Du darfst nicht mehr als **1000** Münzen werfen!')
        		.setFooter({ text: '» ' + version });
            
            return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
        }

        // Loop
        loop:
        while (anzahl != tries) {
            var random = Math.floor(Math.random() * (2 - 1 + 1)) + 1;

            if (random == 1) { var coin = 'KOPF'; var heads = heads + 1 }
            if (random == 2) { var coin = 'ZAHL'; var tails = tails + 1 }

            var tries = tries + 1
            continue loop;
        }

        // Add Zeros
        if (heads < 10) { var heads = '0' + heads}
        if (heads < 100) { var heads = '0' + heads}
        if (tails < 10) { var tails = '0' + tails}
        if (tails < 100) { var tails = '0' + tails}
        
        // Create Embed
        if (anzahl == 1) {
            var message = new EmbedBuilder()
        	    .setTitle('» COINFLIP')
  			    .setDescription('» Die Münze ist auf **' + coin + '** gelandet!')
        	    .setFooter({ text: '» ' + version });
        } else {
            var message = new EmbedBuilder()
        	    .setTitle('» COINFLIP')
  			    .setDescription('» KÖPFE\n`' + heads + '`\n\n» ZAHLEN\n`' + tails + '`')
        	    .setFooter({ text: '» ' + version });
        }

        
        // Send Message
        console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] COINFLIP : H[' + heads + '] : T[' + tails + ']')
        return interaction.reply({ embeds: [message.toJSON()] })
    },
};