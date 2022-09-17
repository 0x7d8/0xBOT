const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
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
    async execute(interaction, client, lang, vote) {
        // Check if Stocks are Enabled in Server
        const ses = await gopt.get(interaction.guild.id + '-STOCKS')
        if (parseInt(ses) == 1) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('» ERROR')
        		.setDescription('» Stocks are disabled on this Server!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang.toString() == "de") {
                message = new EmbedBuilder()
        		    .setTitle('» FEHLER')
        		    .setDescription('» Aktien sind auf diesem Server deaktiviert!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] STOCKINFO : DISABLED')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Set Variables
        const stock = interaction.options.getString("stock")

        // Set Emoji
        let emoji
        if (stock == 'green') { emoji = '🟢' }
        if (stock == 'blue') { emoji = '🔵' }
        if (stock == 'yellow') { emoji = '🟡' }
        if (stock == 'red') { emoji = '🔴' }

        // Fetch Stock
        let green, greenp
        let blue, bluep
        let yellow, yellowp
        let red, redp
        let unix, serverunix, unixtime
        let refresh, refreshtransformed

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

        // Create Button
        let row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('🧭 UPDATE')
                    .setCustomId('stock-next-' + stock)
					.setStyle(ButtonStyle.Secondary),
			);
        if (lang.toString() == "de") {
            row = new ActionRowBuilder()
			    .addComponents(
			    	new ButtonBuilder()
			    		.setLabel('🧭 AKTUALISIEREN')
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
                    .setFooter({ text: '» ' + vote + ' » ' + version });

                if (lang.toString() == "de") {
                    message = new EmbedBuilder()
                        .setTitle('» ' + emoji + ' AKTIEN INFO')
                        .setDescription('» NÄCHSTE PREISE\n' + refresh + '\n\n» PREIS\n**<:DOWN:1009502386320056330> `' + priceText + '€`**')
                        .setFooter({ text: '» ' + vote + ' » ' + version });
                }
            } else if (priceText > lastpriceText) {
                message = new EmbedBuilder()
                    .setTitle('» ' + emoji + ' STOCK INFO')
                    .setDescription('» NEXT PRICES\n' + refresh + '\n\n» PRICE\n**<:UP:1009502422990860350> `$' + priceText + '`**')
                    .setFooter({ text: '» ' + vote + ' » ' + version });
                
                if (lang.toString() == "de") {
                    message = new EmbedBuilder()
                        .setTitle('» ' + emoji + ' AKTIEN INFO')
                        .setDescription('» NÄCHSTE PREISE\n' + refresh + '\n\n» PREIS\n**<:UP:1009502422990860350> `' + priceText + '€`**')
                        .setFooter({ text: '» ' + vote + ' » ' + version });
                }
            } else {
                message = new EmbedBuilder()
                    .setTitle('» ' + emoji + ' STOCK INFO')
                    .setDescription('» NEXT PRICES\n' + refresh + '\n\n» PRICE\n**🧐 `$' + priceText + '`**')
                    .setFooter({ text: '» ' + vote + ' » ' + version });

                if (lang.toString() == "de") {
                    message = new EmbedBuilder()
                        .setTitle('» ' + emoji + ' AKTIEN INFO')
                        .setDescription('» NÄCHSTE PREISE\n' + refresh + '\n\n» PREIS\n**🧐 `' + priceText + '€`**')
                        .setFooter({ text: '» ' + vote + ' » ' + version });
                }
            }
        } else {
            message = new EmbedBuilder()
                .setTitle('» FULL STOCK INFO')
                .setDescription('» NEXT PRICES\n' + refresh + '\n\n» 🟢 GREEN STOCK\n**' + greenp + ' `$' + green + '`**\n\n» 🔵 BLUE STOCK\n**' + bluep + ' `$' + blue + '`**\n\n» 🟡 YELLOW STOCK\n**' + yellowp + ' `$' + yellow + '`**\n\n» 🔴 RED STOCK\n**' + redp + ' `$' + red + '`**')
                .setFooter({ text: '» ' + vote + ' » ' + version });
            
            if (lang.toString() == "de") {
                message = new EmbedBuilder()
                    .setTitle('» VOLLE AKTIEN INFOS')
                    .setDescription('» NÄCHSTE PREISE\n' + refresh + '\n\n» 🟢 GRÜNE AKTIE\n**' + greenp + ' `' + green + '€`**\n\n» 🔵 BLAUE AKTIE\n**' + bluep + ' `' + blue + '€`**\n\n» 🟡 GELBE AKTIE\n**' + yellowp + ' `' + yellow + '€`**\n\n» 🔴 ROTE AKTIE\n**' + redp + ' `' + red + '€`**')
                    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
        }

        // Send Message
        if (stock != 'all') {
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] STOCKINFO : ' + stock.toUpperCase() + ' : ' + priceText + '€')
        } else {
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] STOCKINFO : ALL : ' + green + '€ : ' + red + '€ : ' + yellow + '€ : ' + blue + '€')
        }
        return interaction.reply({ embeds: [message.toJSON()], components: [row] })
    },
};