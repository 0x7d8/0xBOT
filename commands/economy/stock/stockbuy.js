const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../../config.json');
const fetch = require("node-fetch");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stockbuy')
    	.setDMPermission(false)
        .setDescription('BUY STOCKS')
        .setDescriptionLocalizations({
            de: 'KAUFE AKTIEN'
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
    async execute(interaction, client, vote) {
        // Set Variables
        const stock = interaction.options.getString("stock")
        const amount = interaction.options.getInteger("amount")

        const green = await sgrn.get(interaction.user.id.replace(/\D/g, ''));
        const blue = await sblu.get(interaction.user.id.replace(/\D/g, ''));
        const yellow = await syll.get(interaction.user.id.replace(/\D/g, ''));
        const red = await sred.get(interaction.user.id.replace(/\D/g, ''));
        const greens = green + amount
        const blues = blue + amount
        const yellows = yellow + amount
        const reds = red + amount

        let greenmax = await sgrnx.get(interaction.user.id.replace(/\D/g, ''));
        let bluemax = await sblux.get(interaction.user.id.replace(/\D/g, ''));
        let yellowmax = await syllx.get(interaction.user.id.replace(/\D/g, ''));
        let redmax = await sredx.get(interaction.user.id.replace(/\D/g, ''));

        const balance = await bals.get(interaction.user.id.replace(/\D/g, ''));

        // Convert Max Stocks
        if (greenmax == 0) { greenmax = 10; sgrnx.add(interaction.user.id.replace(/\D/g, ''), 10) }
        if (bluemax == 0) { bluemax = 10; sblux.add(interaction.user.id.replace(/\D/g, ''), 10) }
        if (yellowmax == 0) { yellowmax = 10; syllx.add(interaction.user.id.replace(/\D/g, ''), 10) }
        if (redmax == 0) { redmax = 10; sredx.add(interaction.user.id.replace(/\D/g, ''), 10) }

        // Check if Amount is Negative
        if (amount < 0) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('» ERROR')
        		.setDescription('» You cant buy a negative amount of Stocks!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
        		    .setTitle('» FEHLER')
        		    .setDescription('» Du kannst keine negativen Anzahlen kaufen!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] STOCKBUY : NEGATIVEMONEY : ' + amount + '€')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Check if Max Stocks are reached
        if (stock == 'green' && greens > greenmax) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('» ERROR')
        		.setDescription('» You cant buy more than **' + greenmax + '** 🟢!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
        		    .setTitle('» FEHLER')
        		    .setDescription('» Du kannst nicht mehr als **' + greenmax + '** 🟢 Kaufen!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] STOCKBUY : MAXGREEN : ' + amount + '€')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }
        if (stock == 'blue' && blues > bluemax) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('» ERROR')
        		.setDescription('» You cant buy more than **' + bluemax + '** 🔵!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
        		    .setTitle('» FEHLER')
        		    .setDescription('» Du kannst nicht mehr als **' + bluemax + '** 🔵 Kaufen!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] STOCKBUY : MAXBLUE : ' + amount + '€')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }
        if (stock == 'yellow' && yellows > yellowmax) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('» ERROR')
        		.setDescription('» You cant buy more than **' + yellowmax + '** 🟡!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
        		    .setTitle('» FEHLER')
        		    .setDescription('» Du kannst nicht mehr als **' + yellowmax + '** 🟡 Kaufen!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] STOCKBUY : MAXYELLOW : ' + amount + '€')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }
        if (stock == 'red' && reds > redmax) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('» ERROR')
        		.setDescription('» You cant buy more than **' + redmax + '** 🔴!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
        		    .setTitle('» FEHLER')
        		    .setDescription('» Du kannst nicht mehr als **' + redmax + '** 🔴 Kaufen!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] STOCKBUY : MAXRED : ' + amount + '€')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Fetch Stock
        const price = await fetch("https://api.paperstudios.de/bot/stocks/" + stock);
        const pricetransformed = await price.text();
        const priceText = pricetransformed.replace(/(\r\n|\n|\r)/gm, "");

        // Calculate Cost
        const cost = amount * priceText

        // Check for enough Money
        if (balance < cost) {
            const missing = cost - balance
            
            // Create Embed
            let message = new EmbedBuilder()
            	.setTitle('» ERROR')
  				.setDescription('» You dont have enough Money for that, you are missing **$' + missing + '**!')
            	.setFooter({ text: '» ' + vote + ' » ' + version });

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
            	    .setTitle('» FEHLER')
  				    .setDescription('» Du hast dafür nicht genug Geld, dir fehlen **' + missing + '€**!')
            	    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] STOCKBUY : ' + stock.toUpperCase() + ' : ' + amount + ' : ' + cost + '€ : NOTENOUGHMONEY')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Set Emoji
        let emoji

        if (stock == 'green') { emoji = '🟢' }
        if (stock == 'blue') { emoji = '🔵' }
        if (stock == 'yellow') { emoji = '🟡' }
        if (stock == 'red') { emoji = '🔴' }

        // Add Stock Amount
        if (stock == 'green') {
            sgrn.add(interaction.user.id.replace(/\D/g, ''), amount)
        }
        if (stock == 'blue') {
            sblu.add(interaction.user.id.replace(/\D/g, ''), amount)
        }
        if (stock == 'yellow') { 
            syll.add(interaction.user.id.replace(/\D/g, ''), amount)
        }
        if (stock == 'red') {
            sred.add(interaction.user.id.replace(/\D/g, ''), amount)
        }

        // Remove Money
        bals.rem(interaction.user.id.replace(/\D/g, ''), cost)

        // Create Embed
        let message = new EmbedBuilder()
            .setTitle('» ' + emoji + ' BUY STOCKS')
            .setDescription('» You successfully bought **' + amount + '** ' + emoji + ' for **$' + cost + '**! (**$' + priceText + '** per Stock)')
            .setFooter({ text: '» ' + vote + ' » ' + version });

        if (interaction.guildLocale == "de") {
            message = new EmbedBuilder()
                .setTitle('» ' + emoji + ' AKTIE KAUFEN')
                .setDescription('» Du hast erfolgreich **' + amount + '** ' + emoji + ' für **' + cost + '€** gekauft! (**' + priceText + '€** pro Aktie)')
                .setFooter({ text: '» ' + vote + ' » ' + version });
        }

        // Send Message
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] STOCKBUY : ' + stock.toUpperCase() + ' : ' + amount + ' : ' + cost + '€')
        return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
    },
};