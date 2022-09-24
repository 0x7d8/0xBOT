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
            const serverunix = await fetch("https://api.paperstudios.de/bot/stocks/unix");
            const unix = await serverunix.text();
            const unixtime = parseInt(unix) + 60
            const refreshtransformed = "<t:" + unixtime + ":R>"
            refresh = refreshtransformed.replace(/(\r\n|\n|\r)/gm, "");

            // Get Stocks
            const cache = await fetch("https://api.paperstudios.de/bot/stocks/json");
            const json = await cache.json();

            green = json.green
            greeno = json.green_last

            blue = json.blue
            blueo = json.blue_last

            yellow = json.yellow
            yellowo = json.yellow_last

            red = json.red
            redo = json.red_last

            white = json.white
            whiteo = json.white_last

            black = json.black
            blacko = json.black_last

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
            const serverunix = await fetch("https://api.paperstudios.de/bot/stocks/unix");
            const unix = await serverunix.text();
            const unixtime = parseInt(unix) + 60
            const refreshtransformed = "<t:" + unixtime + ":R>"
            refresh = refreshtransformed.replace(/(\r\n|\n|\r)/gm, "");

            // Get Stocks
            const cache = await fetch("https://api.paperstudios.de/bot/stocks/json");
            const json = await cache.json();

            // Set Variables
            if (stock == 'green') {
                price = json.green
                priceText = json.green

                lastpriceText = json.green_last
            }
            if (stock == 'blue') {
                price = json.blue
                priceText = json.blue

                lastpriceText = json.blue_last
            }
            if (stock == 'yellow') {
                price = json.yellow
                priceText = json.yellow

                lastpriceText = json.yellow_last
            }
            if (stock == 'red') {
                price = json.red
                priceText = json.red

                lastpriceText = json.red_last
            }
            if (stock == 'white') {
                price = json.white
                priceText = json.white

                lastpriceText = json.white_last
            }
            if (stock == 'black') {
                price = json.black
                priceText = json.black

                lastpriceText = json.black_last
            }
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