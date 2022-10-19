const { EmbedBuilder } = require('@discordjs/builders')

// Percentage Function
const pcalc = async (nval, oval) => {
    let res = ((nval - oval)/oval) * 100
    res = Math.round(res * 10) / 10
    return (res<0?"":"+") + res
}

module.exports = {
    data: {
        name: 'stocknext'
    },
    async execute(interaction, client, lang, vote, stock) {
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
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] STOCKNEXT : ' + stock.toUpperCase() + ' : ' + stocks[stock] + '€')
        } else {
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] STOCKINFO : ALL : ' + stocks.green + '€ : ' + stocks.blue + '€ : ' + stocks.yellow + '€ : ' + stocks.blue + '€ : ' + stocks.white + '€ : ' + stocks.black + '€')
        }
        return interaction.update({ embeds: [message] }).catch((error) => {})
    }
}