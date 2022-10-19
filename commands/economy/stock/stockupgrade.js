const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stockupgrade')
    	.setDMPermission(false)
        .setDescription('BUY STOCK SLOTS')
        .setDescriptionLocalizations({
            de: 'KAUFE AKTIEN SLOTS'
        })
        .addStringOption(option =>
            option.setName('stock')
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
        .addStringOption(option =>
            option.setName('slots')
                .setDescription('THE SLOTS')
                .setDescriptionLocalizations({
                    de: 'DIE SLOTS'
                })
                .setRequired(true)
    			.addChoices(
                    // Setup Choices
                    { name: '💰 [01] 25000€', value: '1' },
                    { name: '💰 [02] 50000€', value: '2' },
                    { name: '💰 [03] 75000€', value: '3' },
            		{ name: '💰 [04] 100000€', value: '4' },
            		{ name: '💰 [05] 125000€', value: '5' },
				)),
    async execute(interaction, client, lang, vote) {
        // Check if Stocks are Enabled in Server
        if (!await bot.settings.get(interaction.guild.id, 'stocks')) {
            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» Stocks are disabled on this Server!')
        		.setFooter({ text: '» ' + vote + ' » ' + config.version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Aktien sind auf diesem Server deaktiviert!')
        		    .setFooter({ text: '» ' + vote + ' » ' + config.version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] STOCKUPGRADE : DISABLED')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Set Variables
        const stock = interaction.options.getString("stock")
        const slots = interaction.options.getString("slots")
        const balance = await bot.money.get(interaction.user.id)

        // Calculate Cost
        const cost = parseInt(slots) * 25000

        // Set Emoji
        let emoji
        if (stock === 'green') { emoji = '🟢' }
        if (stock === 'blue') { emoji = '🔵' }
        if (stock === 'yellow') { emoji = '🟡' }
        if (stock === 'red') { emoji = '🔴' }
        if (stock === 'white') { emoji = '⚪' }
        if (stock === 'black') { emoji = '⚫' }

        // Check for enough Money
        if (balance < cost) {
            const missing = cost - balance
            
            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
            	.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  				.setDescription('» You dont have enough Money for that, you are missing **$' + missing + '**!')
            	.setFooter({ text: '» ' + vote + ' » ' + config.version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
            	    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				    .setDescription('» Du hast dafür nicht genug Geld, dir fehlen **' + missing + '€**!')
            	    .setFooter({ text: '» ' + vote + ' » ' + config.version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] STOCKUPGRADE  : ' + slots + ' : ' + cost + '€ : NOTENOUGHMONEY')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Add Stock Amount
        bot.stocks.add(interaction.user.id, stock, 'max', parseInt(slots))

        // Remove Money
        bot.money.rem(interaction, interaction.user.id, cost)

        // Create Embed
        let message
        if (slots === 1) {
            message = new EmbedBuilder().setColor(0x37009B)
                .setTitle('<:CHART:1024398298204876941> » BUY STOCK SLOTS')
                .setDescription('» You successfully bought **' + slots + '** extra ' + emoji + ' Stock Slot for **$' + cost + '**!')
                .setFooter({ text: '» ' + vote + ' » ' + config.version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:CHART:1024398298204876941> » AKTIEN SLOTS KAUFEN')
                    .setDescription('» Du hast erfolgreich **' + slots + '** extra ' + emoji + ' Aktien Slot für **' + cost + '€** gekauft!')
                    .setFooter({ text: '» ' + vote + ' » ' + config.version });
            }
        } else {
            message = new EmbedBuilder().setColor(0x37009B)
                .setTitle('<:CHART:1024398298204876941> » BUY STOCK SLOTS')
                .setDescription('» You successfully bought **' + slots + '** extra ' + emoji + ' Stock Slots for **$' + cost + '**!')
                .setFooter({ text: '» ' + vote + ' » ' + config.version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:CHART:1024398298204876941> » AKTIEN SLOTS KAUFEN')
                    .setDescription('» Du hast erfolgreich **' + slots + '** extra ' + emoji + ' Aktien Slots für **' + cost + '€** gekauft!')
                    .setFooter({ text: '» ' + vote + ' » ' + config.version });
            }
        }

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] STOCKUPGRADE : ' + slots + ' : ' + cost + '€')
        return interaction.reply({ embeds: [message] })
    },
};