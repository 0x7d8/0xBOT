const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../../config.json');

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
                    { name: '⚪ WEISSE AKTIE', value: 'white' },
                    { name: '⚫ SCHWARZE AKTIE', value: 'black' }
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
            let message = new EmbedBuilder().setColor('#37009B')
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» Stocks are disabled on this Server!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor('#37009B')
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Aktien sind auf diesem Server deaktiviert!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] STOCKBUY : DISABLED')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Set Variables
        const stock = interaction.options.getString("stock")
        const amount = interaction.options.getInteger("amount")

        const green = await sgrn.get(interaction.user.id);
        const blue = await sblu.get(interaction.user.id);
        const yellow = await syll.get(interaction.user.id);
        const red = await sred.get(interaction.user.id);
        const white = await swhi.get(interaction.user.id);
        const black = await sblk.get(interaction.user.id);
        const greens = green + amount
        const blues = blue + amount
        const yellows = yellow + amount
        const reds = red + amount
        const whites = white + amount
        const blacks = black + amount

        let greenmax = await sgrnx.get(interaction.user.id);
        let bluemax = await sblux.get(interaction.user.id);
        let yellowmax = await syllx.get(interaction.user.id);
        let redmax = await sredx.get(interaction.user.id);
        let whitemax = await sredx.get(interaction.user.id);
        let blackmax = await sredx.get(interaction.user.id);

        const balance = await bot.money.get(interaction.user.id);

        // Convert Max Stocks
        if (greenmax == 0) { greenmax = 10; sgrnx.add(interaction.user.id, 10) }
        if (bluemax == 0) { bluemax = 10; sblux.add(interaction.user.id, 10) }
        if (yellowmax == 0) { yellowmax = 10; syllx.add(interaction.user.id, 10) }
        if (redmax == 0) { redmax = 10; sredx.add(interaction.user.id, 10) }
        if (whitemax == 0) { whitemax = 10 }
        if (blackmax == 0) { blackmax = 10 }

        // Check if Amount is Negative
        if (amount < 0) {
            // Create Embed
            let message = new EmbedBuilder().setColor('#37009B')
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» You cant buy a negative amount of Stocks!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor('#37009B')
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Du kannst keine negativen Anzahlen kaufen!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] STOCKBUY : NEGATIVEMONEY : ' + amount + '€')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Check if Max Stocks are reached
        if (stock == 'green' && greens > greenmax) {
            // Create Embed
            let message = new EmbedBuilder().setColor('#37009B')
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» You cant buy more than **' + greenmax + '** 🟢!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor('#37009B')
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Du kannst nicht mehr als **' + greenmax + '** 🟢 Kaufen!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] STOCKBUY : MAXGREEN : ' + amount + '€')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }
        if (stock == 'blue' && blues > bluemax) {
            // Create Embed
            let message = new EmbedBuilder().setColor('#37009B')
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» You cant buy more than **' + bluemax + '** 🔵!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor('#37009B')
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Du kannst nicht mehr als **' + bluemax + '** 🔵 Kaufen!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] STOCKBUY : MAXBLUE : ' + amount + '€')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }
        if (stock == 'yellow' && yellows > yellowmax) {
            // Create Embed
            let message = new EmbedBuilder().setColor('#37009B')
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» You cant buy more than **' + yellowmax + '** 🟡!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor('#37009B')
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Du kannst nicht mehr als **' + yellowmax + '** 🟡 Kaufen!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] STOCKBUY : MAXYELLOW : ' + amount + '€')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }
        if (stock == 'red' && reds > redmax) {
            // Create Embed
            let message = new EmbedBuilder().setColor('#37009B')
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» You cant buy more than **' + redmax + '** 🔴!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor('#37009B')
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Du kannst nicht mehr als **' + redmax + '** 🔴 Kaufen!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] STOCKBUY : MAXRED : ' + amount + '€')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }
        if (stock == 'white' && whites > whitemax) {
            // Create Embed
            let message = new EmbedBuilder().setColor('#37009B')
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» You cant buy more than **' + redmax + '** ⚪!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor('#37009B')
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Du kannst nicht mehr als **' + redmax + '** ⚪ Kaufen!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] STOCKBUY : MAXWHITE : ' + amount + '€')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }
        if (stock == 'black' && blacks > blackmax) {
            // Create Embed
            let message = new EmbedBuilder().setColor('#37009B')
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» You cant buy more than **' + redmax + '** ⚫!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor('#37009B')
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Du kannst nicht mehr als **' + redmax + '** ⚫ Kaufen!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] STOCKBUY : MAXBLACK : ' + amount + '€')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Fetch Stock
        const price = await stkp.get(stock)
        const priceText = price[0]

        // Calculate Cost
        const cost = amount * priceText

        // Check for enough Money
        if (balance < cost) {
            const missing = cost - balance
            
            // Create Embed
            let message = new EmbedBuilder().setColor('#37009B')
            	.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  				.setDescription('» You dont have enough Money for that, you are missing **$' + missing + '**!')
            	.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor('#37009B')
            	    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				    .setDescription('» Du hast dafür nicht genug Geld, dir fehlen **' + missing + '€**!')
            	    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] STOCKBUY : ' + stock.toUpperCase() + ' : ' + amount + ' : ' + cost + '€ : NOTENOUGHMONEY')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Set Emoji
        let emoji

        if (stock == 'green') { emoji = '🟢' }
        if (stock == 'blue') { emoji = '🔵' }
        if (stock == 'yellow') { emoji = '🟡' }
        if (stock == 'red') { emoji = '🔴' }
        if (stock == 'white') { emoji = '⚪' }
        if (stock == 'black') { emoji = '⚫' }

        // Add Stock Amount
        if (stock == 'green') {
            sgrn.add(interaction.user.id, amount)
        }
        if (stock == 'blue') {
            sblu.add(interaction.user.id, amount)
        }
        if (stock == 'yellow') { 
            syll.add(interaction.user.id, amount)
        }
        if (stock == 'red') {
            sred.add(interaction.user.id, amount)
        }
        if (stock == 'white') {
            swhi.add(interaction.user.id, amount)
        }
        if (stock == 'black') {
            sblk.add(interaction.user.id, amount)
        }

        // Remove Money
        bot.money.rem(interaction, interaction.user.id, cost)

        // Create Embed
        let message = new EmbedBuilder().setColor('#37009B')
            .setTitle('<:CHART:1024398298204876941> » BUY STOCKS')
            .setDescription('» You successfully bought **' + amount + '** ' + emoji + ' for **$' + cost + '**! (**$' + priceText + '** per Stock)')
            .setFooter({ text: '» ' + vote + ' » ' + version });

        if (lang === 'de') {
            message = new EmbedBuilder().setColor('#37009B')
                .setTitle('<:CHART:1024398298204876941> » AKTIEN KAUFEN')
                .setDescription('» Du hast erfolgreich **' + amount + '** ' + emoji + ' für **' + cost + '€** gekauft! (**' + priceText + '€** pro Aktie)')
                .setFooter({ text: '» ' + vote + ' » ' + version });
        }

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] STOCKBUY : ' + stock.toUpperCase() + ' : ' + amount + ' : ' + cost + '€')
        return interaction.reply({ embeds: [message], ephemeral: true })
    },
};