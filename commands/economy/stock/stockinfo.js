const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders')
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

// Percentage Function
const pcalc = async (nval, oval) => {
    let res = ((nval - oval)/oval) * 100
    res = Math.round(res * 10) / 10
    return (res<0?"":"+") + res
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stockinfo')
    	.setDMPermission(false)
        .setDescription('SEE STOCK PRICES')
        .setDescriptionLocalizations({
            de: 'SEHE AKTIEN PREISE'
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
                    { name: '👀 ALLE AKTIEN', value: 'all' },
                    { name: '🟢 GRÜNE AKTIE', value: 'green' },
            		{ name: '🔵 BLAUE AKTIE', value: 'blue' },
                    { name: '🟡 GELBE AKTIE', value: 'yellow' },
                    { name: '🔴 ROTE AKTIE', value: 'red' },
                    { name: '⚪ WEISSE AKTIE', value: 'white' },
                    { name: '⚫ SCHWARZE AKTIE', value: 'black' },
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
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] STOCKINFO : DISABLED')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Set Variables
        const stock = interaction.options.getString("stock")

        // Set Emoji
        let emoji
        if (stock === 'green') { emoji = '🟢' }
        if (stock === 'blue') { emoji = '🔵' }
        if (stock === 'yellow') { emoji = '🟡' }
        if (stock === 'red') { emoji = '🔴' }
        if (stock === 'white') { emoji = '⚪' }
        if (stock === 'black') { emoji = '⚫' }

        // Calculate Stock Percentage
        let stockEmojis = {}
        let stocklist = [
            'green',
            'blue',
            'yellow',
            'red',
            'white',
            'black'
        ]; for (const stock of stocklist) {
            if (stocks[stock] > stocks['old' + stock]) {
                stockEmojis[stock] = '<:UP:1009502422990860350>'
            } else if (stocks[stock] < stocks['old' + stock]) {
                stockEmojis[stock] = '<:DOWN:1009502386320056330>'
            } else {
                stockEmojis[stock] = '🧐'
            }
        }

        // Create Button
        let row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('UPDATE')
                    .setEmoji('1024382926923776020')
                    .setCustomId('STOCKNEXT-' + stock)
					.setStyle(ButtonStyle.Secondary),
			);
        if (lang === 'de') {
            row = new ActionRowBuilder()
			    .addComponents(
			    	new ButtonBuilder()
			    		.setLabel('AKTUALISIEREN')
                        .setEmoji('1024382926923776020')
                        .setCustomId('STOCKNEXT-' + stock)
			    		.setStyle(ButtonStyle.Secondary),
			    );
        }

        // Create Embed
        let message
        if (stock !== 'all') {
            message = new EmbedBuilder().setColor(0x37009B)
                .setTitle('<:CHART:1024398298204876941> » ' + emoji + ' STOCK INFO')
                .setDescription(`» NEXT PRICES
                    <t:${stocks.refresh}:R>

                    » PRICE
                    **${stockEmojis[stock]} \`$${stocks[stock]}\` (${await pcalc(stocks[stock], stocks['old' + stock])}%)
                `)
                .setFooter({ text: '» ' + vote + ' » ' + config.version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:CHART:1024398298204876941> » ' + emoji + ' AKTIEN INFO')
                    .setDescription(`» NÄCHSTEN PREISE
                        <t:${stocks.refresh}:R>

                        » PREIS
                        **${stockEmojis[stock]} \`${stocks[stock]}€\` (${await pcalc(stocks[stock], stocks['old' + stock])}%)
                    `)
                    .setFooter({ text: '» ' + vote + ' » ' + config.version });
            }
        } else {
            message = new EmbedBuilder().setColor(0x37009B)
                .setTitle('<:CHART:1024398298204876941> » FULL STOCK INFO')
                .setDescription(`» NEXT PRICES
                    <t:${stocks.refresh}:R>

                    » 🟢 GREEN STOCK
                    **${stockEmojis.green} \`$${stocks.green}\` (${await pcalc(stocks.green, stocks.oldgreen)}%)**

                    » 🔵 BLUE STOCK
                    **${stockEmojis.blue} \`$${stocks.blue}\` (${await pcalc(stocks.blue, stocks.oldblue)}%)**

                    » 🟡 YELLOW STOCK
                    **${stockEmojis.yellow} \`$${stocks.yellow}\` (${await pcalc(stocks.yellow, stocks.oldyellow)}%)**

                    » 🔴 RED STOCK
                    **${stockEmojis.red} \`$${stocks.red}\` (${await pcalc(stocks.red, stocks.oldred)}%)**

                    » ⚪ WHITE STOCK
                    **${stockEmojis.white} \`$${stocks.white}\` (${await pcalc(stocks.white, stocks.oldwhite)}%)**

                    » ⚫ BLACK STOCK
                    **${stockEmojis.black} \`$${stocks.black}\` (${await pcalc(stocks.black, stocks.oldblack)}%)**
                `)
                .setFooter({ text: '» ' + vote + ' » ' + config.version });
            
            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:CHART:1024398298204876941> » VOLLE AKTIEN INFOS')
                    .setDescription(`» NÄCHSTEN PREISE
                        <t:${stocks.refresh}:R>

                        » 🟢 GRÜNE AKTIE
                        **${stockEmojis.green} \`${stocks.green}€\` (${await pcalc(stocks.green, stocks.oldgreen)}%)**

                        » 🔵 BLAUE AKTIE
                        **${stockEmojis.blue} \`${stocks.blue}€\` (${await pcalc(stocks.blue, stocks.oldblue)}%)**

                        » 🟡 GELBE AKTIE
                        **${stockEmojis.yellow} \`${stocks.yellow}€\` (${await pcalc(stocks.yellow, stocks.oldyellow)}%)**

                        » 🔴 ROTE AKTIE
                        **${stockEmojis.red} \`${stocks.red}€\` (${await pcalc(stocks.red, stocks.oldred)}%)**

                        » ⚪ WEIßE AKTIE
                        **${stockEmojis.white} \`${stocks.white}€\` (${await pcalc(stocks.white, stocks.oldwhite)}%)**

                        » ⚫ SCHWARZE AKTIE
                        **${stockEmojis.black} \`${stocks.black}€\` (${await pcalc(stocks.black, stocks.oldblack)}%)**
                    `)
                    .setFooter({ text: '» ' + vote + ' » ' + config.version });
            }
        }

        // Send Message
        if (stock != 'all') {
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] STOCKINFO : ' + stock.toUpperCase() + ' : ' + stocks[stock] + '€')
        } else {
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] STOCKINFO : ALL : ' + stocks.green + '€ : ' + stocks.blue + '€ : ' + stocks.yellow + '€ : ' + stocks.red + '€ : ' + stocks.white + '€ : ' + stocks.black + '€')
        }
        return interaction.reply({ embeds: [message], components: [row] })
    }
}