const { EmbedBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { version } = require('../../config.json');

const fetch = require("node-fetch");

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

        // Get Stocks
        let green, blue, yellow, red
        let greeno, blueo, yellowo, redo
        let greenp, bluep, yellowp, redp
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
        }

        // Create Button
        let row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('UPDATE')
                    .setCustomId('stock-next-' + stock)
					.setStyle(ButtonStyle.Secondary),
			);
        if (lang.toString() == "de") {
            row = new ActionRowBuilder()
			    .addComponents(
			    	new ButtonBuilder()
			    		.setLabel('AKTUALISIEREN')
                        .setCustomId('stock-next-' + stock)
			    		.setStyle(ButtonStyle.Secondary),
			    );
        }

        // Create Embed
        let message
        if (stock != 'all') {
            if (lastpriceText > priceText) {
                message = new EmbedBuilder()
                    .setTitle('» ' + emoji + ' STOCK INFO')
                    .setDescription('» NEXT PRICES\n' + refresh + '\n\n» PRICE\n**<:DOWN:1009502386320056330> `$' + priceText + '`**')
                    .setFooter({ text: '» ' + version });

                if (lang.toString() == "de") {
                    message = new EmbedBuilder()
                        .setTitle('» ' + emoji + ' AKTIEN INFO')
                        .setDescription('» NÄCHSTE PREISE\n' + refresh + '\n\n» PREIS\n**<:DOWN:1009502386320056330> `' + priceText + '€`**')
                        .setFooter({ text: '» ' + version });
                }
            } else if (priceText > lastpriceText) {
                message = new EmbedBuilder()
                    .setTitle('» ' + emoji + ' STOCK INFO')
                    .setDescription('» NEXT PRICES\n' + refresh + '\n\n» PRICE\n**<:UP:1009502422990860350> `$' + priceText + '`**')
                    .setFooter({ text: '» ' + version });
                
                if (lang.toString() == "de") {
                    message = new EmbedBuilder()
                        .setTitle('» ' + emoji + ' AKTIEN INFO')
                        .setDescription('» NÄCHSTE PREISE\n' + refresh + '\n\n» PREIS\n**<:UP:1009502422990860350> `' + priceText + '€`**')
                        .setFooter({ text: '» ' + version });
                }
            } else {
                message = new EmbedBuilder()
                    .setTitle('» ' + emoji + ' STOCK INFO')
                    .setDescription('» NEXT PRICES\n' + refresh + '\n\n» PRICE\n**🧐 `$' + priceText + '`**')
                    .setFooter({ text: '» ' + version });

                if (lang.toString() == "de") {
                    message = new EmbedBuilder()
                        .setTitle('» ' + emoji + ' AKTIEN INFO')
                        .setDescription('» NÄCHSTE PREISE\n' + refresh + '\n\n» PREIS\n**🧐 `' + priceText + '€`**')
                        .setFooter({ text: '» ' + version });
                }
            }
        } else {
            message = new EmbedBuilder()
                .setTitle('» FULL STOCK INFO')
                .setDescription('» NEXT PRICES\n' + refresh + '\n\n» 🟢 GREEN STOCK\n**' + greenp + ' `$' + green + '`**\n\n» 🔵 BLUE STOCK\n**' + bluep + ' `$' + blue + '`**\n\n» 🟡 YELLOW STOCK\n**' + yellowp + ' `$' + yellow + '`**\n\n» 🔴 RED STOCK\n**' + redp + ' `$' + red + '`**')
                .setFooter({ text: '» ' + version });
            
            if (lang.toString() == "de") {
                message = new EmbedBuilder()
                    .setTitle('» VOLLE AKTIEN INFOS')
                    .setDescription('» NÄCHSTE PREISE\n' + refresh + '\n\n» 🟢 GRÜNE AKTIE\n**' + greenp + ' `' + green + '€`**\n\n» 🔵 BLAUE AKTIE\n**' + bluep + ' `' + blue + '€`**\n\n» 🟡 GELBE AKTIE\n**' + yellowp + ' `' + yellow + '€`**\n\n» 🔴 ROTE AKTIE\n**' + redp + ' `' + red + '€`**')
                    .setFooter({ text: '» ' + version });
            }
        }

        // Send Message
        if (stock != 'all') {
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [BTN] STOCKNEXT : ' + stock.toUpperCase() + ' : ' + priceText + '€')
        } else {
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [BTN] STOCKNEXT : ALL : ' + green + '€ : ' + red + '€ : ' + yellow + '€ : ' + blue + '€')
        }
        return interaction.update({ embeds: [message.toJSON()], components: [row] }).catch((error) => {})
    }
}