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
            		{ name: '💰 [01] 100€', value: '1' },
                    { name: '💰 [02] 200€', value: '2' },
                    { name: '💰 [03] 300€', value: '3' },
            		{ name: '💰 [04] 400€', value: '4' },
            		{ name: '💰 [05] 500€', value: '5' },
				)),
    async execute(interaction, client) {
        // Set Variables
        const anzahl = interaction.options.getString("amount")
        
        const cost = anzahl * 100

        // Get User Balances
        const quotes = await quts.get(interaction.user.id.replace(/\D/g, ''));
        const money = await bals.get(interaction.user.id.replace(/\D/g, ''));
        
        // Check if not in Minus Quotes
        if (quotes - anzahl < 0) {
            // Create Embed
            let message = new EmbedBuilder()
            	.setTitle('» ERROR')
  				.setDescription('» You dont have that many Quotes, you only have **' + quotes + '**!')
            	.setFooter({ text: '» ' + version });

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
            	    .setTitle('» FEHLER')
  				    .setDescription('» Du hast garnicht so viele Zitate, du hast nur **' + quotes + '**!')
            	    .setFooter({ text: '» ' + version });
            }
            
            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] QUOTEREMOVE : ' + anzahl + ' : NOTENOUGHQUOTES');
        	return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }
        
        // Check for enough Money
        if (money < cost) {
            const missing = cost - money
            
            // Create Embed
            let message = new EmbedBuilder()
            	.setTitle('» ERROR')
  				.setDescription('» You dont have enough Money for that, you are Missing **$' + missing + '**!')
            	.setFooter({ text: '» ' + version + ' » QUOTES: ' + quotes});

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
            	    .setTitle('» FEHLER')
  				    .setDescription('» Du hast nicht genug Geld dafür, dir fehlen **' + missing + '€**!')
            	    .setFooter({ text: '» ' + version + ' » QUOTES: ' + quotes});
            }
            
            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] QUOTEREMOVE : ' + anzahl + ' : NOTENOUGHMONEY');
        	return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }
        
        // Check if Plural or not
        let word
        if (anzahl == 1) {
            word = "Quote";
        } else {
            word = "Quotes";
        }

        if (interaction.guildLocale == "de") {
            if (anzahl == 1) {
                word = "Zitat";
            } else {
                word = "Zitate";
            }
        }
        
        // Create Embed
        const newquotes = quotes - 1
        let message = new EmbedBuilder()
            .setTitle('» ZITATE ENTFERNEN')
  			.setDescription('» You successfully removed **' + anzahl + '** ' + word + ' for **$' + cost + '**!')
            .setFooter({ text: '» ' + version + ' » QUOTES: ' + newquotes});

        if (interaction.guildLocale == "de") {
            message = new EmbedBuilder()
                .setTitle('» ZITATE ENTFERNEN')
  			    .setDescription('» Du hast erfolgreich **' + anzahl + '** ' + word + ' für **' + cost + '€** entfernt!')
                .setFooter({ text: '» ' + version + ' » QUOTES: ' + newquotes});
        }

        // Set Money and Quotes
        bals.rem(interaction.user.id.replace(/\D/g, ''), cost);
        quts.rem(interaction.user.id.replace(/\D/g, ''), anzahl);
        
        // Send Message
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] QUOTEREMOVE : ' + anzahl + ' : ' + cost + '€');
        return interaction.reply({ embeds: [message.toJSON()] })
    },
};