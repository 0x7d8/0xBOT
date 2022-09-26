const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../../config.json');

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
                    { name: '⚪ WEISSE AKTIE', value: 'white' },
                    { name: '⚫ SCHWARZE AKTIE', value: 'black' },
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
    async execute(interaction, client, lang, vote) {
        // Check if Stocks are Enabled in Server
        const ses = await gopt.get(interaction.guild.id + '-STOCKS')
        if (parseInt(ses) == 1) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('» ERROR')
        		.setDescription('» Stocks are disabled on this Server!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang == "de") {
                message = new EmbedBuilder()
        		    .setTitle('» FEHLER')
        		    .setDescription('» Aktien sind auf diesem Server deaktiviert!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] STOCKSELL : DISABLED')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Set Variables
        const stock = interaction.options.getString("stock")
        const amount = interaction.options.getInteger("amount")

        // Check if Amount is Negative
        if (amount < 0) {
            // Create Embed
            const err = new EmbedBuilder()
        		.setTitle('» FEHLER')
        		.setDescription('» Du kannst keine negativen Einsätze verkaufen!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] STOCKSELL : NEGATIVEMONEY : ' + amount + '€')
            return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
        }

        // Fetch Stock
        const price = await stkp.get(stock)
        const priceText = price[0]

        // Calculate Cost
        const cash = amount * priceText

        // Get Stocks Available
        let stocks

        if (stock == 'green') {
            stocks = await sgrn.get(interaction.user.id)
        }
        if (stock == 'blue') {
            stocks = await sblu.get(interaction.user.id)
        }
        if (stock == 'yellow') { 
            stocks = await syll.get(interaction.user.id)
        }
        if (stock == 'red') {
            stocks = await sred.get(interaction.user.id)
        }
        if (stock == 'white') { 
            stocks = await swhi.get(interaction.user.id)
        }
        if (stock == 'black') {
            stocks = await sblk.get(interaction.user.id)
        }

        // Set Emoji
        let emoji
        if (stock == 'green') { emoji = '🟢' }
        if (stock == 'blue') { emoji = '🔵' }
        if (stock == 'yellow') { emoji = '🟡' }
        if (stock == 'red') { emoji = '🔴' }
        if (stock == 'white') { emoji = '⚪' }
        if (stock == 'black') { emoji = '⚫' }

        // Check for enough Stocks
        if (stocks < amount) {
            const missing = amount - stocks
            
            // Create Embed
            let message = new EmbedBuilder()
            	.setTitle('» ERROR')
  				.setDescription('» You dont have enough Stocks for that, you are missing **' + missing + '** ' + emoji + ' !')
            	.setFooter({ text: '» ' + vote + ' » ' + version });

            if (interaction.guildLocale) {
                message = new EmbedBuilder()
            	    .setTitle('» FEHLER')
  				    .setDescription('» Du hast dafür nicht genug Aktien, dir fehlen **' + missing + '** ' + emoji + ' !')
            	    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] STOCKSELL : ' + stock.toUpperCase() + ' : ' + amount + ' : ' + cash + '€ : NOTENOUGHSTOCKS')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Add Money
        bals.add(interaction.user.id, cash)

        // Remove Stock Amount
        if (stock == 'green') {
            sgrn.rem(interaction.user.id, amount)
        }
        if (stock == 'blue') {
            sblu.rem(interaction.user.id, amount)
        }
        if (stock == 'yellow') { 
            syll.rem(interaction.user.id, amount)
        }
        if (stock == 'red') {
            sred.rem(interaction.user.id, amount)
        }
        if (stock == 'white') { 
            swhi.rem(interaction.user.id, amount)
        }
        if (stock == 'black') {
            sblk.rem(interaction.user.id, amount)
        }

        // Create Embed
        let message = new EmbedBuilder()
            .setTitle('» ' + emoji + ' STOCK SELL')
            .setDescription('» You successfully sold **' + amount + '** ' + emoji + ' for **$' + cash + '**! (**$' + priceText + '** per Stock)')
            .setFooter({ text: '» ' + vote + ' » ' + version });

        if (lang == "de") {
            message = new EmbedBuilder()
                .setTitle('» ' + emoji + ' AKTIE VERKAUFEN')
                .setDescription('» Du hast erfolgreich **' + amount + '** ' + emoji + ' für **' + cash + '€** verkauft! (**' + priceText + '€** pro Aktie)')
                .setFooter({ text: '» ' + vote + ' » ' + version });
        }

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] STOCKSELL : ' + stock.toUpperCase() + ' : ' + amount + ' : ' + cash + '€')
        return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
    },
};