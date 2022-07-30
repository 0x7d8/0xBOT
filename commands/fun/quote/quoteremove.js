const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quoteremove')
    	.setDMPermission(false)
        .setDescription('ENTFERNE QUOTES')
        .addStringOption(option =>
            option.setName('anzahl')
                .setDescription('DIE ANZAHL')
                .setRequired(true)
    			.addChoices(
                    // Setup Choices
            		{ name: '💰 [01] 100€', value: '1' },
                    { name: '💰 [02] 200€', value: '2' },
                    { name: '💰 [03] 300€', value: '3' },
            		{ name: '💰 [04] 400€', value: '4' },
            		{ name: '💰 [05] 500€', value: '5' },
				)),
    async execute(interaction) {
        // Count to Global Commands
        addcmd('t-all', 1)
        
        // Count Guild Commands and User
        addcmd('g-' + interaction.guild.id, 1)
        addcmd('u-' + interaction.user.id, 1)
        
        // Set Variables
        const anzahl = interaction.options.getString("anzahl")
        
        var cost = anzahl * 100
        
        // Check Maintenance
        const { maintenance } = require('../../../config.json');
        if (maintenance == 'yes' && interaction.user.id != '745619551865012274') {
            // Create Embed
            var mterr = new EmbedBuilder()
        		.setTitle('» FEHLER')
        		.setDescription('» Der Bot ist aktuell unter Wartungsarbeiten!')
        		.setFooter({ text: '» ' + version });
            
            return interaction.reply({ embeds: [mterr.toJSON()], ephemeral: true })
        }
        
        // Get User Balances
        var quotes = await getqut('<@' + interaction.user.id + '>');
        var money = await getbal('<@' + interaction.user.id + '>');
        
        // Check if not in Minus Quotes
        if (quotes - anzahl < 0) {
            // Create Embed
            var err = new EmbedBuilder()
            	.setTitle('» QUOTES ENTFERNEN')
  				.setDescription('» Du hast garnicht so viele Quotes, du hast nur **' + quotes + '**!')
            	.setFooter({ text: '» ' + version });
            
            // Send Message
            console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] REMQUOTES : ' + anzahl + ' : NOTENOUGHQUOTES');
        	return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
        }
        
        // Check for enough Money
        if (money < cost) {
            var missing = cost - money
            
            // Create Embed
            var err = new EmbedBuilder()
            	.setTitle('» QUOTES ENTFERNEN')
  				.setDescription('» Du hast nicht genug Geld dafür, dir fehlen **' + missing + '€**!')
            	.setFooter({ text: '» ' + version + ' » QUOTES: ' + quotes});
            
            // Send Message
            console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] REMQUOTES : ' + anzahl + ' : NOTENOUGHMONEY');
        	return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
        }
        
        // Check if Plural or not
        if (anzahl > 1) {
            var word = "Quotes";
        } else {
            var word = "Quote";
        }
        
        // Create Embed
        var newquotes = quotes - 1
        var message = new EmbedBuilder()
            .setTitle('» QUOTES ENTFERNEN')
  			.setDescription('» Du hast erfolgreich **' + anzahl + '** ' + word + ' für **' + cost + '€** entfernt!')
            .setFooter({ text: '» ' + version + ' » QUOTES: ' + newquotes});

        // Set Money and Quotes
        rembal('<@' + interaction.user.id + '>', cost);
        remqut('<@' + interaction.user.id + '>', anzahl);
        
        // Send Message
        console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] REMQUOTES : ' + anzahl + ' : ' + cost + '€');
        return interaction.reply({ embeds: [message.toJSON()] })
    },
};