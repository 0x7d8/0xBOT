const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../../config.json');
const fetch = require("node-fetch");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stocksell')
    	.setDMPermission(false)
        .setDescription('KAUFE AKTIEN')
        .addStringOption(option =>
            option.setName('aktie')
                .setDescription('DIE AKTIE')
                .setRequired(true)
    			.addChoices(
                    // Setup Choices
                    { name: '🟢 GRÜNE AKTIE', value: 'green' },
            		{ name: '🔵 BLAUE AKTIE', value: 'blue' },
                    { name: '🟡 GELBE AKTIE', value: 'yellow' },
                    { name: '🔴 ROTE AKTIE', value: 'red' },
				))
        .addIntegerOption(option =>
            option.setName('anzahl')
                .setDescription('DIE ANZAHL')
                .setRequired(true)),
    async execute(interaction) {
        // Count to Global Commands
        addcmd('t-all', 1)
        
        // Count Guild Commands and User
        addcmd('g-' + interaction.guild.id, 1)
        addcmd('u-' + interaction.user.id, 1)
        
        // Set Variables
        const stock = interaction.options.getString("aktie")
        const amount = interaction.options.getInteger("anzahl")

        // Check if Amount is Negative
        if (amount < 0) {
            // Create Embed
            const err = new EmbedBuilder()
        		.setTitle('» FEHLER')
        		.setDescription('» Du kannst keine negativen Einsätze verkaufen!')
        		.setFooter({ text: '» ' + version });
            
            // Send Message
            console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] STOCKSELL : NEGATIVEMONEY : ' + amount + '€')
            return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
        }

        // Fetch Stock
        const price = await fetch("https://api.paperstudios.de/bot/stocks/" + stock);
        const pricetransformed = await price.text();
        const priceText = pricetransformed.replace(/(\r\n|\n|\r)/gm, "");

        // Calculate Cost
        const cash = amount * priceText

        // Get Stocks Available
        let stocks

        if (stock == 'green') {
            stocks = await getgrn('<@' + interaction.user.id + '>')
        }
        if (stock == 'blue') {
            stocks = await getblu('<@' + interaction.user.id + '>')
        }
        if (stock == 'yellow') { 
            stocks = await getyll('<@' + interaction.user.id + '>')
        }
        if (stock == 'red') {
            stocks = await getred('<@' + interaction.user.id + '>')
        }

        // Set Emoji
        let emoji
        if (stock == 'green') { emoji = '🟢' }
        if (stock == 'blue') { emoji = '🔵' }
        if (stock == 'yellow') { emoji = '🟡' }
        if (stock == 'red') { emoji = '🔴' }

        // Check for enough Stocks
        if (stocks < amount) {
            const missing = amount - stocks
            
            // Create Embed
            const err = new EmbedBuilder()
            	.setTitle('» FEHLER')
  				.setDescription('» Du hast dafür nicht genug Aktien, dir fehlen **' + missing + '** ' + emoji + ' !')
            	.setFooter({ text: '» ' + version });
            
            // Send Message
            console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] STOCKSELL : ' + stock.toUpperCase() + ' : ' + amount + ' : ' + cash + '€ : NOTENOUGHMONEY')
            return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
        }

        // Add Money
        addbal('<@' + interaction.user.id + '>', cash)

        // Remove Stock Amount
        if (stock == 'green') {
            remgrn('<@' + interaction.user.id + '>', amount)
        }
        if (stock == 'blue') {
            remblu('<@' + interaction.user.id + '>', amount)
        }
        if (stock == 'yellow') { 
            remyll('<@' + interaction.user.id + '>', amount)
        }
        if (stock == 'red') {
            remred('<@' + interaction.user.id + '>', amount)
        }

        // Create Embed
        const message = new EmbedBuilder()
            .setTitle('» ' + emoji + ' AKTIE VERKAUFEN')
            .setDescription('» Du hast erfolgreich **' + amount + '** ' + emoji + ' für **' + cash + '€** verkauft!')
            .setFooter({ text: '» ' + version });

        // Send Message
        console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] STOCKSELL : ' + stock.toUpperCase() + ' : ' + amount + ' : ' + cash + '€')
        return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
    },
};