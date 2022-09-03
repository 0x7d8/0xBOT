const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('coinflip')
    	.setDMPermission(false)
        .setDescription('FLIP A COIN')
        .setDescriptionLocalizations({
            de: 'WIRF EINE MÜNZE'
        })
        .addIntegerOption(option =>
            option.setName('amount')
                .setNameLocalizations({
                    de: 'anzahl'
                })
                .setDescription('THE AMOUNT')
                .setDescriptionLocalizations({
                    de: 'DIE ANZAHL'
                })
                .setRequired(false)),
    async execute(interaction) {

        // Count to Global Commands
        cmds.add('t-all', 1)
        
        // Count Guild Commands and User
        cmds.add('g-' + interaction.guild.id, 1)
        cmds.add('u-' + interaction.user.id, 1)
        
        // Set Variables
        let anzahl = interaction.options.getInteger("amount")
        let heads = 0
        let tails = 0
        let tries = 0

        // Check if Number is empty
        if (anzahl == null) {
            anzahl = 1
        }
        
        // Check if Number is negative
        if (anzahl < 1) {
            // Create Embed
            const err = new EmbedBuilder()
        		.setTitle('» FEHLER')
        		.setDescription('» Du musst schon mindestens eine Münze werfen!')
        		.setFooter({ text: '» ' + version });
            
            // Send Message
            console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] COINFLIP : NOTENOUGHCOINS : ' + anzahl)
            return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
        }

        // Check if Number is too Big
        if (anzahl > 1000) {
            // Create Embed
            const err = new EmbedBuilder()
        		.setTitle('» FEHLER')
        		.setDescription('» Du darfst nicht mehr als **1000** Münzen werfen!')
        		.setFooter({ text: '» ' + version });
            
            // Send Message
            console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] COINFLIP : TOOMANYCOINS : ' + anzahl)
            return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
        }

        // Loop
        let coin
        loop:
        while (anzahl != tries) {
            const random = Math.floor(Math.random() * (2 - 1 + 1)) + 1;

            if (random == 1) { coin = 'KOPF'; heads = heads + 1 }
            if (random == 2) { coin = 'ZAHL'; tails = tails + 1 }

            tries = tries + 1
            continue loop;
        }

        // Add Zeros
        if (heads < 10) { heads = '0' + heads}
        if (heads < 100) { heads = '0' + heads}
        if (tails < 10) { tails = '0' + tails}
        if (tails < 100) { tails = '0' + tails}
        
        // Create Embed
        let message
        if (anzahl == 1) {
            message = new EmbedBuilder()
        	    .setTitle('» COINFLIP')
  			    .setDescription('» Die Münze ist auf **' + coin + '** gelandet!')
        	    .setFooter({ text: '» ' + version });
        } else {
            message = new EmbedBuilder()
        	    .setTitle('» COINFLIP')
  			    .setDescription('» KÖPFE\n`' + heads + '`\n\n» ZAHLEN\n`' + tails + '`')
        	    .setFooter({ text: '» ' + version });
        }

        
        // Send Message
        console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] COINFLIP : H[' + heads + '] : T[' + tails + ']')
        return interaction.reply({ embeds: [message.toJSON()] })
    },
};