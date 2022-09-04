const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../../config.json');

const fetch = require("node-fetch");
const wait = require('node:timers/promises').setTimeout;

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
				)),
    async execute(interaction) {
        // Count to Global Commands
        cmds.add('t-all', 1)
        
        // Count Guild Commands and User
        cmds.add('g-' + interaction.guild.id, 1)
        cmds.add('u-' + interaction.user.id, 1)
        
        // Set Variables
        const stock = interaction.options.getString("stock")

        // Set Emoji
        let emoji
        if (stock == 'green') { emoji = '🟢' }
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
        let redp
        let bluep
        let yellowp

        let priceText
        let lastpriceText

        if (stock != 'all') {
            // Calculate Refresh
            serverunix = await fetch("https://api.paperstudios.de/bot/stocks/unix");
            unix = await serverunix.text();
            unixtime = parseInt(unix) + 60
            refreshtransformed = "<t:" + unixtime + ":R>"
            refresh = refreshtransformed.replace(/(\r\n|\n|\r)/gm, "");

            // Get Stocks
            cache = await fetch("https://api.paperstudios.de/bot/stocks/json");
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
        } else {
            // Calculate Refresh
            serverunix = await fetch("https://api.paperstudios.de/bot/stocks/unix");
            unix = await serverunix.text();
            unixtime = parseInt(unix) + 60
            refreshtransformed = "<t:" + unixtime + ":R>"
            refresh = refreshtransformed.replace(/(\r\n|\n|\r)/gm, "");

            // Get Stocks
            cache = await fetch("https://api.paperstudios.de/bot/stocks/json");
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
        }

        // Create Embed
        let message
        if (stock != 'all') {
            if (lastpriceText > priceText) {
                message = new EmbedBuilder()
                    .setTitle('» ' + emoji + ' AKTIEN INFO')
                    .setDescription('» NÄCHSTER PREIS\n' + refresh + '\n\n» PREIS\n**<:DOWN:1009502386320056330> `' + priceText + '€`**')
                    .setFooter({ text: '» ' + version });
            } else if (priceText > lastpriceText) {
                message = new EmbedBuilder()
                    .setTitle('» ' + emoji + ' AKTIEN INFO')
                    .setDescription('» NÄCHSTER PREIS\n' + refresh + '\n\n» PREIS\n**<:UP:1009502422990860350> `' + priceText + '€`**')
                    .setFooter({ text: '» ' + version });
            } else {
                message = new EmbedBuilder()
                    .setTitle('» ' + emoji + ' AKTIEN INFO')
                    .setDescription('» NÄCHSTER PREIS\n' + refresh + '\n\n» PREIS\n**🧐 `' + priceText + '€`**')
                    .setFooter({ text: '» ' + version });
            }
        } else {
            message = new EmbedBuilder()
                .setTitle('» ALLE AKTIEN INFOS')
                .setDescription('» NÄCHSTER PREIS\n' + refresh + '\n\n» 🟢 GRÜNE AKTIE\n**' + greenp + ' `' + green + '€`**\n\n» 🔵 BLAUE AKTIE\n**' + bluep + ' `' + blue + '€`**\n\n» 🟡 GELBE AKTIE\n**' + yellowp + ' `' + yellow + '€`**\n\n» 🔴 ROTE AKTIE\n**' + redp + ' `' + red + '€`**')
                .setFooter({ text: '» ' + version });
        }

        // Send Message
        if (stock != 'all') {
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] STOCKINFO : ' + stock.toUpperCase() + ' : ' + priceText + '€')
        } else {
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] STOCKINFO : ALL : ' + green + '€ : ' + red + '€ : ' + yellow + '€ : ' + blue + '€')
        }
        return interaction.reply({ embeds: [message.toJSON()] })
    },
};