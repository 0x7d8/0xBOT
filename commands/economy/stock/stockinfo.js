const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../../config.json');
const fetch = require("node-fetch");
const fs = require('file-system');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stockinfo')
    	.setDMPermission(false)
        .setDescription('DEN STAND EINER AKTIE')
        .addStringOption(option =>
            option.setName('aktie')
                .setDescription('DIE AKTIE')
                .setRequired(true)
    			.addChoices(
                    // Setup Choices
            		{ name: '🔵 BLAUE AKTIE', value: 'blue' },
                    { name: '🟡 GELBE AKTIE', value: 'yellow' },
                    { name: '🔴 ROTE AKTIE', value: 'red' },
                    { name: '👀 ALLE', value: 'all' },
				)),
    async execute(interaction) {
        // Count to Global Commands
        addcmd('t-all', 1)
        
        // Count Guild Commands and User
        addcmd('g-' + interaction.guild.id, 1)
        addcmd('u-' + interaction.user.id, 1)
        
        // Set Variables
        const stock = interaction.options.getString("aktie")

        // Set Emoji
        let emoji
        if (stock == 'blue') { emoji = '🔵' }
        if (stock == 'yellow') { emoji = '🟡' }
        if (stock == 'red') { emoji = '🔴' }

        // Fetch Stock
        let red
        let yellow
        let blue
        let price
        let serverunix
        let unix
        let unixtime
        let refreshtransformed
        let refresh
        let pricetransformed
        let priceText
        let per
        let redp
        let bluep
        let yellowp
        let redc
        let yellowc
        let bluec

        if (stock != 'all') {
            price = await fetch("https://api.paperstudios.de/bot/stocks/" + stock);

            // Calculate Refresh
            serverunix = await fetch("https://api.paperstudios.de/time/unix");
            unix = await serverunix.text();
            unixtime = parseInt(unix) + 60
            refreshtransformed = "<t:" + unixtime + ":R>"
            refresh = refreshtransformed.replace(/(\r\n|\n|\r)/gm, "");

            // Get Stock
            pricetransformed = await price.text();
            priceText = pricetransformed.replace(/(\r\n|\n|\r)/gm, "");

            // Get Last Stock
            lastprice = await fetch("https://api.paperstudios.de/bot/stocks/" + stock + '-last');
            cache = await lastprice.text();
            lastpriceText = pricetransformed.replace(/(\r\n|\n|\r)/gm, "");
        } else {
            // Calculate Refresh
            serverunix = await fetch("https://api.paperstudios.de/time/unix");
            unix = await serverunix.text();
            unixtime = parseInt(unix) + 60
            refreshtransformed = "<t:" + unixtime + ":R>"
            refresh = refreshtransformed.replace(/(\r\n|\n|\r)/gm, "");

            // Get Stocks
            cache = await fetch("https://api.paperstudios.de/bot/stocks/red")
            redc = await cache.text();
            red = redc.replace(/(\r\n|\n|\r)/gm, "");
            cache = await fetch("https://api.paperstudios.de/bot/stocks/yellow")
            yellowc = await cache.text();
            yellow = yellowc.replace(/(\r\n|\n|\r)/gm, "");
            cache = await fetch("https://api.paperstudios.de/bot/stocks/blue")
            bluec = await cache.text();
            blue = bluec.replace(/(\r\n|\n|\r)/gm, "");

            cache = await fetch("https://api.paperstudios.de/bot/stocks/red-last")
            redc = await cache.text();
            redo = redc.replace(/(\r\n|\n|\r)/gm, "");
            cache = await fetch("https://api.paperstudios.de/bot/stocks/yellow-last")
            yellowc = await cache.text();
            yellowo = yellowc.replace(/(\r\n|\n|\r)/gm, "");
            cache = await fetch("https://api.paperstudios.de/bot/stocks/blue-last")
            bluec = await cache.text();
            blueo = bluec.replace(/(\r\n|\n|\r)/gm, "");

            // Calculate Stock Percentage
            if (redo > red) {
                redp = '<:DOWN:1009502386320056330>'
            }
            if (red > redo) {
                redp = '<:UP:1009502422990860350>'
            }
            if (blueo > blue) {
                bluep = '<:DOWN:1009502386320056330>'
            }
            if (blue > blueo) {
                bluep = '<:UP:1009502422990860350>'
            }
            if (yellowo > yellow) {
                yellowp = '<:DOWN:1009502386320056330>'
            }
            if (yellow > yellowo) {
                yellowp = '<:UP:1009502422990860350>'
            }
        }

        // Create Embed
        let message
        let percent
        if (stock != 'all') {
            // Set Percent
            if (lastpriceText > priceText) {
                percent = '<:DOWN:1009502386320056330>'
            }
            if (lastpriceText < priceText) {
                percent = '<:UP:1009502422990860350>'
            }

            message = new EmbedBuilder()
                .setTitle('» ' + emoji + ' AKTIEN INFO')
                .setDescription('» NÄCHSTER PREIS\n' + refresh + '\n\n» PREIS\n**' + percent + ' `' + priceText + '€`**')
                .setFooter({ text: '» ' + version });
        } else {
            message = new EmbedBuilder()
                .setTitle('» ALLE AKTIEN INFOS')
                .setDescription('» NÄCHSTER PREIS\n' + refresh + '\n\n» 🔵 PREIS\n**' + bluep + ' `' + blue + '€`**\n\n» 🟡 PREIS\n**' + yellowp + ' `' + yellow + '€`**\n\n» 🔴 PREIS\n**' + redp + ' `' + red + '€`**')
                .setFooter({ text: '» ' + version });
        }

        // Send Message
        if (stock != 'all') {
            console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] STOCKINFO : ' + stock.toUpperCase() + ' : ' + priceText + '€')
        } else {
            console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] STOCKINFO : ALL : ' + red + '€ : ' + yellow + '€ : ' + blue + '€')
        }
        return interaction.reply({ embeds: [message.toJSON()] })
    },
};