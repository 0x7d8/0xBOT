const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quoteremove')
    	.setDMPermission(false)
        .setDescription('REMOVE QUOTES')
        .setDescriptionLocalizations({
            de: 'ENTFERNE ZITATE'
        })
        .addStringOption(option =>
            option.setName('amount')
                .setNameLocalizations({
                    de: 'anzahl'
                })
                .setDescription('THE AMOUNT')
                .setDescriptionLocalizations({
                    de: 'DIE ANZAHL'
                })
                .setRequired(true)
    			.addChoices(
                    // Setup Choices
            		{ name: '💰 [01] 1000€', value: '1' },
                    { name: '💰 [02] 2000€', value: '2' },
                    { name: '💰 [03] 3000€', value: '3' },
            		{ name: '💰 [04] 4000€', value: '4' },
            		{ name: '💰 [05] 5000€', value: '5' },
				)),
    async execute(interaction, client, lang, vote) {
        // Check if Quotes are Enabled in Server
        const qes = await gopt.get(interaction.guild.id + '-QUOTES')
        if (parseInt(qes) == 1) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» Quotes are disabled on this Server!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang == "de") {
                message = new EmbedBuilder()
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Zitate sind auf diesem Server deaktiviert!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] QUOTEREMOVE : DISABLED')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Set Variables
        const anzahl = interaction.options.getString("amount")
        
        const cost = anzahl * 1000

        // Get User Balances
        const quotes = await quts.get(interaction.user.id);
        const money = await bals.get(interaction.user.id);
        
        // Check if not in Minus Quotes
        if (quotes - anzahl < 0) {
            // Create Embed
            let message = new EmbedBuilder()
            	.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  				.setDescription('» You dont have that many Quotes, you only have **' + quotes + '**!')
            	.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang == "de") {
                message = new EmbedBuilder()
            	    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				    .setDescription('» Du hast garnicht so viele Zitate, du hast nur **' + quotes + '**!')
            	    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] QUOTEREMOVE : ' + anzahl + ' : NOTENOUGHQUOTES');
        	return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }
        
        // Check for enough Money
        if (money < cost) {
            const missing = cost - money
            
            // Create Embed
            let message = new EmbedBuilder()
            	.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  				.setDescription('» You dont have enough Money for that, you are Missing **$' + missing + '**!')
            	.setFooter({ text: '» ' + version + ' » QUOTES: ' + quotes});

            if (lang == "de") {
                message = new EmbedBuilder()
            	    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				    .setDescription('» Du hast nicht genug Geld dafür, dir fehlen **' + missing + '€**!')
            	    .setFooter({ text: '» ' + version + ' » QUOTES: ' + quotes});
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] QUOTEREMOVE : ' + anzahl + ' : NOTENOUGHMONEY');
        	return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }
        
        // Check if Plural or not
        let word
        if (anzahl == 1) {
            word = "Quote";
        } else {
            word = "Quotes";
        }

        if (lang == "de") {
            if (anzahl == 1) {
                word = "Zitat";
            } else {
                word = "Zitate";
            }
        }
        
        // Create Embed
        const newquotes = quotes - 1
        let message = new EmbedBuilder()
            .setTitle('<:QUOTES:1024406448127623228> » ZITATE ENTFERNEN')
  			.setDescription('» You successfully removed **' + anzahl + '** ' + word + ' for **$' + cost + '**!')
            .setFooter({ text: '» ' + version + ' » QUOTES: ' + newquotes});

        if (lang == "de") {
            message = new EmbedBuilder()
                .setTitle('<:QUOTES:1024406448127623228> » ZITATE ENTFERNEN')
  			    .setDescription('» Du hast erfolgreich **' + anzahl + '** ' + word + ' für **' + cost + '€** entfernt!')
                .setFooter({ text: '» ' + version + ' » QUOTES: ' + newquotes});
        }

        // Set Money and Quotes
        bals.rem(interaction.user.id, cost);
        quts.rem(interaction.user.id, anzahl);
        
        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] QUOTEREMOVE : ' + anzahl + ' : ' + cost + '€');
        return interaction.reply({ embeds: [message.toJSON()] })
    },
};