const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
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
    async execute(interaction, client, lang, vote) {
        // Set Variables
        let anzahl = interaction.options.getInteger("amount")
        let heads = 0; let tails = 0; let tries = 0
        if (anzahl === null) { anzahl = 1 }
        
        // Check if Number is negative
        if (anzahl < 1) {
            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» You need to throw atleast **1** Coin!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Du musst schon mindestens **1** Münze werfen!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] COINFLIP : NOTENOUGHCOINS : ' + anzahl)
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Check if Number is too Big
        if (anzahl > 1000) {
            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» You cant throw more than **1000** Coins!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Du darfst nicht mehr als **1000** Münzen werfen!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] COINFLIP : TOOMANYCOINS : ' + anzahl)
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Loop
        let coin
        while (anzahl !== tries) {
            const random = Math.floor(Math.random() * (2 - 1 + 1)) + 1;

            if (random === 1) { coin = 'HEAD'; heads = heads + 1 }
            if (random === 2) { coin = 'TAIL'; tails = tails + 1 }

            tries = tries + 1
        }

        // Add Zeros
        if (heads < 10) { heads = '0' + heads}
        if (heads < 100) { heads = '0' + heads}
        if (tails < 10) { tails = '0' + tails}
        if (tails < 100) { tails = '0' + tails}
        
        // Create Embed
        let message
        if (anzahl == 1) {
            message = new EmbedBuilder().setColor(0x37009B)
        	    .setTitle('<:COINS:1024392690776944803> » COINFLIP')
  			    .setDescription('» The Coin Landed on **' + coin + '**!')
        	    .setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang === 'de') {
                if (coin == "HEAD") { coin = "KOPF" }
                if (coin == "TAIL") { coin = "ZAHL" }

                message = new EmbedBuilder().setColor(0x37009B)
        	        .setTitle('<:COINS:1024392690776944803> » COINFLIP')
  			        .setDescription('» Die Münze ist auf **' + coin + '** gelandet!')
        	        .setFooter({ text: '» ' + vote + ' » ' + version });
            }
        } else {
            message = new EmbedBuilder().setColor(0x37009B)
        	    .setTitle('<:COINS:1024392690776944803> » COINFLIP')
  			    .setDescription('» HEADS\n`' + heads + '`\n\n» TAILS\n`' + tails + '`')
        	    .setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
        	        .setTitle('<:COINS:1024392690776944803> » COINFLIP')
  			        .setDescription('» KÖPFE\n`' + heads + '`\n\n» ZAHLEN\n`' + tails + '`')
        	        .setFooter({ text: '» ' + vote + ' » ' + version });
            }
        }

        
        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] COINFLIP : H[' + heads + '] : T[' + tails + ']')
        return interaction.reply({ embeds: [message] })
    },
};