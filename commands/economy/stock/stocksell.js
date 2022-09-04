const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../../config.json');
const fetch = require("node-fetch");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stocksell')
    	.setDMPermission(false)
        .setDescription('SELL STOCKS')
        .setDescriptionLocalizations({
            de: 'VERKAUFE AKTIEN'
        })
        .addStringOption(option =>
            option.setName('stock')
                .setNameLocalizations({
                    de: 'aktie'
                })
                .setDescription('THE STOCK')
                .setDescriptionLocalizations({
                    de: 'DIE AKTIE'
                })
                .setRequired(true)
    			.addChoices(
                    // Setup Choices
                    { name: '🟢 GRÜNE AKTIE', value: 'green' },
            		{ name: '🔵 BLAUE AKTIE', value: 'blue' },
                    { name: '🟡 GELBE AKTIE', value: 'yellow' },
                    { name: '🔴 ROTE AKTIE', value: 'red' },
				))
        .addIntegerOption(option =>
            option.setName('amount')
                .setNameLocalizations({
                    de: 'anzahl'
                })
                .setDescription('THE AMOUNT')
                .setDescriptionLocalizations({
                    de: 'DIE ANZAHL'
                })
                .setRequired(true)),
    async execute(interaction) {
        // Count to Global Commands
        cmds.add('t-all', 1)
        
        // Count Guild Commands and User
        cmds.add('g-' + interaction.guild.id, 1)
        cmds.add('u-' + interaction.user.id.replace(/\D/g, ''), 1)
        
        // Set Variables
        const stock = interaction.options.getString("stock")
        const amount = interaction.options.getInteger("amount")

        // Check if Amount is Negative
        if (amount < 0) {
            // Create Embed
            const err = new EmbedBuilder()
        		.setTitle('» FEHLER')
        		.setDescription('» Du kannst keine negativen Einsätze verkaufen!')
        		.setFooter({ text: '» ' + version });
            
            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] STOCKSELL : NEGATIVEMONEY : ' + amount + '€')
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
            stocks = await sgrn.get(interaction.user.id.replace(/\D/g, ''))
        }
        if (stock == 'blue') {
            stocks = await sblu.get(interaction.user.id.replace(/\D/g, ''))
        }
        if (stock == 'yellow') { 
            stocks = await syll.get(interaction.user.id.replace(/\D/g, ''))
        }
        if (stock == 'red') {
            stocks = await sred.get(interaction.user.id.replace(/\D/g, ''))
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
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] STOCKSELL : ' + stock.toUpperCase() + ' : ' + amount + ' : ' + cash + '€ : NOTENOUGHMONEY')
            return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
        }

        // Add Money
        bals.add(interaction.user.id.replace(/\D/g, ''), cash)

        // Remove Stock Amount
        if (stock == 'green') {
            sgrn.rem(interaction.user.id.replace(/\D/g, ''), amount)
        }
        if (stock == 'blue') {
            sblu.rem(interaction.user.id.replace(/\D/g, ''), amount)
        }
        if (stock == 'yellow') { 
            syll.rem(interaction.user.id.replace(/\D/g, ''), amount)
        }
        if (stock == 'red') {
            sred.rem(interaction.user.id.replace(/\D/g, ''), amount)
        }

        // Create Embed
        const message = new EmbedBuilder()
            .setTitle('» ' + emoji + ' AKTIE VERKAUFEN')
            .setDescription('» Du hast erfolgreich **' + amount + '** ' + emoji + ' für **' + cash + '€** verkauft!')
            .setFooter({ text: '» ' + version });

        // Send Message
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] STOCKSELL : ' + stock.toUpperCase() + ' : ' + amount + ' : ' + cash + '€')
        return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
    },
};