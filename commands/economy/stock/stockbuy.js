const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../../config.json');
const fetch = require("node-fetch");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stockbuy')
    	.setDMPermission(false)
        .setDescription('KAUFE AKTIEN')
        .addStringOption(option =>
            option.setName('aktie')
                .setDescription('DIE AKTIE')
                .setRequired(true)
    			.addChoices(
                    // Setup Choices
            		{ name: '🔵 [250-0500] BLAUE AKTIE', value: 'blue' },
                    { name: '🟡 [200-0750] GELBE AKTIE', value: 'yellow' },
                    { name: '🔴 [150-1000] ROTE AKTIE', value: 'red' },
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

        const balance = await getbal('<@' + interaction.user.id + '>');
        
        // Check Maintenance
        const { maintenance } = require('../../../config.json');
        if (maintenance == 'yes' && interaction.user.id != '745619551865012274') {
            // Create Embed
            var err = new EmbedBuilder()
        		.setTitle('» FEHLER')
        		.setDescription('» Der Bot ist aktuell unter Wartungsarbeiten!')
        		.setFooter({ text: '» ' + version });
            
            return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
        }

        // Check if Amount is Minus
        if (amount < 0) {
            // Create Embed
            var err = new EmbedBuilder()
        		.setTitle('» FEHLER')
        		.setDescription('» Du kannst keine negativen Einsätze kaufen!')
        		.setFooter({ text: '» ' + version });
            
            // Send Message
            console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] STOCKBUY : NEGATIVEMONEY : ' + amount + '€')
            return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
        }

        // Fetch Stock
        const price = await fetch("https://api.paperstudios.de/bot/stocks/" + stock);
        const pricetransformed = await price.text();
        const priceText = pricetransformed.replace(/(\r\n|\n|\r)/gm, "");

        // Calculate Cost
        const cost = amount * priceText

        // Check for enough Money
        if (balance < cost) {
            var missing = cost - money
            
            // Create Embed
            var err = new EmbedBuilder()
            	.setTitle('» FEHLER')
  				.setDescription('» Du hast dafür nicht genug Geld, dir fehlen **' + missing + '€**!')
            	.setFooter({ text: '» ' + version });
            
            // Send Message
            console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] STOCKBUY : ' + stock.toUpperCase() + ' : ' + amount + ' : ' + cost + '€ : NOTENOUGHMONEY')
            return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
        }

        // Set Emoji
        if (stock == 'blue') { var emoji = '🔵' }
        if (stock == 'yellow') { var emoji = '🟡' }
        if (stock == 'red') { var emoji = '🔴' }

        // Transform Stock to Short
        if (stock == 'blue') { var short = 'blu' }
        if (stock == 'yellow') { var short = 'yll' }
        if (stock == 'red') { var short = 'red' }

        // Add Stock Amount
        const stockadd = 'add' + short + '(' + interaction.user.id + ', ' + amount + ')'
        eval(stockadd)

        // Create Embed
        const message = new EmbedBuilder()
            .setTitle('» ' + emoji + ' AKTIE KAUFEN')
            .setDescription('» Du hast erfolgreich **' + amount + '** ' + emoji + ' für **' + cost + '€** gekauft!')
            .setFooter({ text: '» ' + version });

        // Send Message
        console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] STOCKBUY : ' + stock.toUpperCase() + ' : ' + amount + ' : ' + cost + '€')
        return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
    },
};