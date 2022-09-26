const { EmbedBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { version } = require('../../config.json');

const fetch = require("node-fetch");

// Percentage Function
const pcalc = async (nval, oval) => {
    let res = ((nval - oval)/oval) * 100
    res = Math.round(res * 10) / 10
    return (res<0?"":"+") + res
}

module.exports = {
    data: {
        name: 'stock-next'
    },
    async execute(interaction, client, lang, vote, stock) {
        // Set Emoji
        let emoji
        if (stock == 'green') { emoji = '🟢' }
        if (stock == 'blue') { emoji = '🔵' }
        if (stock == 'yellow') { emoji = '🟡' }
        if (stock == 'red') { emoji = '🔴' }
        if (stock == 'white') { emoji = '⚪' }
        if (stock == 'black') { emoji = '⚫' }

        // Get Stocks
        let green, blue, yellow, red, white, black
        let greeno, blueo, yellowo, redo, whiteo, blacko
        let greenp, bluep, yellowp, redp, whitep, blackp
        let refresh, price, priceText, lastpriceText
        if (stock == "all") {
            // Calculate Refresh
            unix = await stkp.get('unix')
            unixtime = parseInt(unix[0]) + 60
            refresh = "<t:" + unixtime + ":R>"

            // Get Stocks
            cache = await stkp.get('green')
            green = cache[0]
            greeno = cache[1]

            cache = await stkp.get('blue')
            blue = cache[0]
            blueo = cache[1]

            cache = await stkp.get('yellow')
            yellow = cache[0]
            yellowo = cache[1]

            cache = await stkp.get('red')
            red = cache[0]
            redo = cache[1]

            cache = await stkp.get('white')
            white = cache[0]
            whiteo = cache[1]

            cache = await stkp.get('black')
            black = cache[0]
            blacko = cache[1]

            // Calculate Stock Percentage
            if (greeno > green) {
                greenp = '<:DOWN:1009502386320056330>'
            }
            if (green > greeno) {
                greenp = '<:UP:1009502422990860350>'
            }
            if (green == greeno) {
                greenp = '🧐'
            }
            if (blueo > blue) {
                bluep = '<:DOWN:1009502386320056330>'
            }
            if (blue > blueo) {
                bluep = '<:UP:1009502422990860350>'
            }
            if (blue == blueo) {
                bluep = '🧐'
            }
            if (yellowo > yellow) {
                yellowp = '<:DOWN:1009502386320056330>'
            }
            if (yellow > yellowo) {
                yellowp = '<:UP:1009502422990860350>'
            }
            if (yellow == yellowo) {
                yellowp = '🧐'
            }
            if (redo > red) {
                redp = '<:DOWN:1009502386320056330>'
            }
            if (red > redo) {
                redp = '<:UP:1009502422990860350>'
            }
            if (red == redo) {
                redp = '🧐'
            }
            if (whiteo > white) {
                whitep = '<:DOWN:1009502386320056330>'
            }
            if (white > whiteo) {
                whitep = '<:UP:1009502422990860350>'
            }
            if (white == whiteo) {
                whitep = '🧐'
            }
            if (blacko > black) {
                blackp = '<:DOWN:1009502386320056330>'
            }
            if (black > blacko) {
                blackp = '<:UP:1009502422990860350>'
            }
            if (black == blacko) {
                blackp = '🧐'
            }
        } else {
            // Calculate Refresh
            unix = await stkp.get('unix')
            unixtime = parseInt(unix[0]) + 60
            refresh = "<t:" + unixtime + ":R>"

            // Get Stock
            cache = await stkp.get(stock)
            price = cache[0]
            priceText = cache[0]
            lastpriceText = cache[1]
        }

        // Create Embed
        let message
        if (stock != 'all') {
            if (lastpriceText > priceText) {
                message = new EmbedBuilder()
                    .setTitle('» ' + emoji + ' STOCK INFO')
                    .setDescription('» NEXT PRICES\n' + refresh + '\n\n» PRICE\n**<:DOWN:1009502386320056330> `$' + priceText + '` (' + await pcalc(priceText, lastpriceText) + '%)**')
                    .setFooter({ text: '» ' + vote + ' » ' + version });

                if (lang == "de") {
                    message = new EmbedBuilder()
                        .setTitle('» ' + emoji + ' AKTIEN INFO')
                        .setDescription('» NÄCHSTE PREISE\n' + refresh + '\n\n» PREIS\n**<:DOWN:1009502386320056330> `' + priceText + '€` (' + await pcalc(priceText, lastpriceText) + '%)**')
                        .setFooter({ text: '» ' + vote + ' » ' + version });
                }
            } else if (priceText > lastpriceText) {
                message = new EmbedBuilder()
                    .setTitle('» ' + emoji + ' STOCK INFO')
                    .setDescription('» NEXT PRICES\n' + refresh + '\n\n» PRICE\n**<:UP:1009502422990860350> `$' + priceText + '` (' + await pcalc(priceText, lastpriceText) + '%)**')
                    .setFooter({ text: '» ' + vote + ' » ' + version });
                
                if (lang == "de") {
                    message = new EmbedBuilder()
                        .setTitle('» ' + emoji + ' AKTIEN INFO')
                        .setDescription('» NÄCHSTE PREISE\n' + refresh + '\n\n» PREIS\n**<:UP:1009502422990860350> `' + priceText + '€` (' + await pcalc(priceText, lastpriceText) + '%)**')
                        .setFooter({ text: '» ' + vote + ' » ' + version });
                }
            } else {
                message = new EmbedBuilder()
                    .setTitle('» ' + emoji + ' STOCK INFO')
                    .setDescription('» NEXT PRICES\n' + refresh + '\n\n» PRICE\n**🧐 `$' + priceText + '` (' + await pcalc(priceText, lastpriceText) + '%)**')
                    .setFooter({ text: '» ' + vote + ' » ' + version });

                if (lang == "de") {
                    message = new EmbedBuilder()
                        .setTitle('» ' + emoji + ' AKTIEN INFO')
                        .setDescription('» NÄCHSTE PREISE\n' + refresh + '\n\n» PREIS\n**🧐 `' + priceText + '€` (' + await pcalc(priceText, lastpriceText) + '%)**')
                        .setFooter({ text: '» ' + vote + ' » ' + version });
                }
            }
        } else {
            message = new EmbedBuilder()
                .setTitle('» FULL STOCK INFO')
                .setDescription('» NEXT PRICES\n' + refresh + '\n\n» 🟢 GREEN STOCK\n**' + greenp + ' `$' + green + '` (' + await pcalc(green, greeno) + '%)**\n\n» 🔵 BLUE STOCK\n**' + bluep + ' `$' + blue + '` (' + await pcalc(blue, blueo) + '%)**\n\n» 🟡 YELLOW STOCK\n**' + yellowp + ' `$' + yellow + '` (' + await pcalc(yellow, yellowo) + '%)**\n\n» 🔴 RED STOCK\n**' + redp + ' `$' + red + '` (' + await pcalc(red, redo) + '%)**\n\n» ⚪ WHITE STOCK\n**' + whitep + ' `$' + white + '` (' + await pcalc(white, whiteo) + '%)**\n\n» ⚫ BLACK STOCK\n**' + blackp + ' `$' + black + '` (' + await pcalc(black, blacko) + '%)**')
                .setFooter({ text: '» ' + vote + ' » ' + version });
            
            if (lang == "de") {
                message = new EmbedBuilder()
                    .setTitle('» VOLLE AKTIEN INFOS')
                    .setDescription('» NÄCHSTE PREISE\n' + refresh + '\n\n» 🟢 GRÜNE AKTIE\n**' + greenp + ' `' + green + '€` (' + await pcalc(green, greeno) + '%)**\n\n» 🔵 BLAUE AKTIE\n**' + bluep + ' `' + blue + '€` (' + await pcalc(blue, blueo) + '%)**\n\n» 🟡 GELBE AKTIE\n**' + yellowp + ' `' + yellow + '€` (' + await pcalc(yellow, yellowo) + '%)**\n\n» 🔴 ROTE AKTIE\n**' + redp + ' `' + red + '€` (' + await pcalc(red, redo) + '%)**\n\n» ⚪ WEISSE AKTIE\n**' + whitep + ' `' + white + '€` (' + await pcalc(white, whiteo) + '%)**\n\n» ⚫ SCHWARZE AKTIE\n**' + blackp + ' `' + black + '€` (' + await pcalc(black, blacko) + '%)**')
                    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
        }

        // Send Message
        if (stock != 'all') {
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] STOCKNEXT : ' + stock.toUpperCase() + ' : ' + priceText + '€')
        } else {
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] STOCKINFO : ALL : ' + green + '€ : ' + blue + '€ : ' + yellow + '€ : ' + red + '€ : ' + white + '€ : ' + black + '€')
        }
        return interaction.update({ embeds: [message.toJSON()] }).catch((error) => {})
    }
}