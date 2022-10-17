const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stockupgrade')
    	.setDMPermission(false)
        .setDescription('BUY STOCK SLOTS')
        .setDescriptionLocalizations({
            de: 'KAUFE AKTIEN SLOTS'
        })
        .addStringOption(option =>
            option.setName('slots')
                .setDescription('THE SLOTS')
                .setDescriptionLocalizations({
                    de: 'DIE SLOTS'
                })
                .setRequired(true)
    			.addChoices(
                    // Setup Choices
                    { name: '💰 [01] 75000€', value: '1' },
                    { name: '💰 [02] 150000€', value: '2' },
                    { name: '💰 [03] 225000€', value: '3' },
            		{ name: '💰 [04] 300000€', value: '4' },
            		{ name: '💰 [05] 375000€', value: '5' },
				)),
    async execute(interaction, client, lang, vote) {
        // Check if Stocks are Enabled in Server
        const ses = await gopt.get(interaction.guild.id + '-STOCKS')
        if (parseInt(ses) == 1) {
            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» Stocks are disabled on this Server!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Aktien sind auf diesem Server deaktiviert!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] STOCKUPGRADE : DISABLED')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Set Variables
        const slots = interaction.options.getString("slots")

        const balance = await bot.money.get(interaction.user.id);

        green = await sgrn.get(interaction.user.id);
        greenmax = await sgrnx.get(interaction.user.id);
        blue = await sblu.get(interaction.user.id);
        bluemax = await sblux.get(interaction.user.id);
        yellow = await syll.get(interaction.user.id);
        yellowmax = await syllx.get(interaction.user.id);
        red = await sred.get(interaction.user.id);
        redmax = await sredx.get(interaction.user.id);

        // Convert Max Stocks
        if (greenmax == 0) { greenmax = 10; sgrnx.add(interaction.user.id, 10) }
        if (bluemax == 0) { bluemax = 10; sblux.add(interaction.user.id, 10) }
        if (yellowmax == 0) { yellowmax = 10; syllx.add(interaction.user.id, 10) }
        if (redmax == 0) { redmax = 10; sredx.add(interaction.user.id, 10) }

        // Calculate Cost
        const cost = parseInt(slots) * 75000

        // Check for enough Money
        if (balance < cost) {
            const missing = cost - balance
            
            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
            	.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  				.setDescription('» You dont have enough Money for that, you are missing **$' + missing + '**!')
            	.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
            	    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				    .setDescription('» Du hast dafür nicht genug Geld, dir fehlen **' + missing + '€**!')
            	    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] STOCKUPGRADE  : ' + slots + ' : ' + cost + '€ : NOTENOUGHMONEY')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Add Stock Amount
        sgrnx.add(interaction.user.id, parseInt(slots))
        sblux.add(interaction.user.id, parseInt(slots))
        syllx.add(interaction.user.id, parseInt(slots))
        sredx.add(interaction.user.id, parseInt(slots))

        // Remove Money
        bot.money.rem(interaction, interaction.user.id, cost)

        // Create Embed
        let message
        if (slots == 1) {
            message = new EmbedBuilder().setColor(0x37009B)
                .setTitle('<:CHART:1024398298204876941> » BUY STOCK SLOTS')
                .setDescription('» You successfully bought **' + slots + '** extra Stock Slot for **$' + cost + '**!')
                .setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:CHART:1024398298204876941> » AKTIEN SLOTS KAUFEN')
                    .setDescription('» Du hast erfolgreich **' + slots + '** extra Aktien Slot für **' + cost + '€** gekauft!')
                    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
        } else {
            message = new EmbedBuilder().setColor(0x37009B)
                .setTitle('<:CHART:1024398298204876941> » BUY STOCK SLOTS')
                .setDescription('» You successfully bought **' + slots + '** extra Stock Slots for **$' + cost + '**!')
                .setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:CHART:1024398298204876941> » AKTIEN SLOTS KAUFEN')
                    .setDescription('» Du hast erfolgreich **' + slots + '** extra Aktien Slots für **' + cost + '€** gekauft!')
                    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
        }

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] STOCKUPGRADE : ' + slots + ' : ' + cost + '€')
        return interaction.reply({ embeds: [message] })
    },
};