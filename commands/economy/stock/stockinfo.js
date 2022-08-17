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
                    { name: '👀 ALLE AKTIEN', value: 'all' },
            		{ name: '🔵 BLAUE AKTIE', value: 'blue' },
                    { name: '🟡 GELBE AKTIE', value: 'yellow' },
                    { name: '🔴 ROTE AKTIE', value: 'red' },
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
        let redp
        let bluep
        let yellowp

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
            cache = await fetch("https://api.paperstudios.de/bot/stocks/json");
            const json = await cache.json();

            blue = json.blue
            blueo = json.blue_last

            yellow = json.yellow
            yellowo = json.yellow_last

            red = json.red
            redo = json.red_last

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
        if (stock != 'all') {
            if (lastpriceText > priceText) {
                message = new EmbedBuilder()
                    .setTitle('» ' + emoji + ' AKTIEN INFO')
                    .setDescription('» NÄCHSTER PREIS\n' + refresh + '\n\n» PREIS\n**<:DOWN:1009502386320056330> `' + priceText + '€`**')
                    .setFooter({ text: '» ' + version });
            } else {
                message = new EmbedBuilder()
                    .setTitle('» ' + emoji + ' AKTIEN INFO')
                    .setDescription('» NÄCHSTER PREIS\n' + refresh + '\n\n» PREIS\n**<:UP:1009502422990860350> `' + priceText + '€`**')
                    .setFooter({ text: '» ' + version });
            }
        } else {
            message = new EmbedBuilder()
                .setTitle('» ALLE AKTIEN INFOS')
                .setDescription('» NÄCHSTER PREIS\n' + refresh + '\n\n» 🔵 BLAUE AKTIE\n**' + bluep + ' `' + blue + '€`**\n\n» 🟡 GELBE AKTIE\n**' + yellowp + ' `' + yellow + '€`**\n\n» 🔴 ROTE AKTIE\n**' + redp + ' `' + red + '€`**')
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