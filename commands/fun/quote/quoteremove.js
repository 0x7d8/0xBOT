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
    async execute(interaction) {
        // Count to Global Commands
        cmds.add('t-all', 1)
        
        // Count Guild Commands and User
        cmds.add('g-' + interaction.guild.id, 1)
        cmds.add('u-' + interaction.user.id, 1)
        
        // Set Variables
        const anzahl = interaction.options.getString("amount")
        
        const cost = anzahl * 100

        // Get User Balances
        const quotes = await quts.get('<@' + interaction.user.id + '>');
        const money = await bals.get('<@' + interaction.user.id + '>');
        
        // Check if not in Minus Quotes
        if (quotes - anzahl < 0) {
            // Create Embed
            const err = new EmbedBuilder()
            	.setTitle('» ZITATE ENTFERNEN')
  				.setDescription('» Du hast garnicht so viele Zitate, du hast nur **' + quotes + '**!')
            	.setFooter({ text: '» ' + version });
            
            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] REMQUOTES : ' + anzahl + ' : NOTENOUGHQUOTES');
        	return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
        }
        
        // Check for enough Money
        if (money < cost) {
            const missing = cost - money
            
            // Create Embed
            const err = new EmbedBuilder()
            	.setTitle('» ZITATE ENTFERNEN')
  				.setDescription('» Du hast nicht genug Geld dafür, dir fehlen **' + missing + '€**!')
            	.setFooter({ text: '» ' + version + ' » QUOTES: ' + quotes});
            
            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] REMQUOTES : ' + anzahl + ' : NOTENOUGHMONEY');
        	return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
        }
        
        // Check if Plural or not
        let word
        if (anzahl = 1) {
            word = "Zitat";
        } else {
            word = "Zitate";
        }
        
        // Create Embed
        const newquotes = quotes - 1
        const message = new EmbedBuilder()
            .setTitle('» ZITATE ENTFERNEN')
  			.setDescription('» Du hast erfolgreich **' + anzahl + '** ' + word + ' für **' + cost + '€** entfernt!')
            .setFooter({ text: '» ' + version + ' » QUOTES: ' + newquotes});

        // Set Money and Quotes
        bals.rem('<@' + interaction.user.id + '>', cost);
        quts.rem('<@' + interaction.user.id + '>', anzahl);
        
        // Send Message
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] REMQUOTES : ' + anzahl + ' : ' + cost + '€');
        return interaction.reply({ embeds: [message.toJSON()] })
    },
};