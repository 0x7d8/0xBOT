const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { version } = require('../../../config.json');

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
        const ses = await gopt.get(interaction.guild.id + '-STOCKS')
        if (parseInt(ses) == 1) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» Stocks are disabled on this Server!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang == "de") {
                message = new EmbedBuilder()
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Aktien sind auf diesem Server deaktiviert!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] STOCKINFO : DISABLED')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Set Variables
        const stock = interaction.options.getString("stock")

        // Set Emoji
        let emoji
        if (stock == 'green') { emoji = '🟢' }
        if (stock == 'blue') { emoji = '🔵' }
        if (stock == 'yellow') { emoji = '🟡' }
        if (stock == 'red') { emoji = '🔴' }
        if (stock == 'white') { emoji = '⚪' }
        if (stock == 'black') { emoji = '⚫' }

        // Fetch Stock
        let green, blue, yellow, red, white, black
        let greeno, blueo, yellowo, redo, whiteo, blacko
        let greenp, bluep, yellowp, redp, whitep, blackp
        let unix, serverunix, unixtime
        let refresh, refreshtransformed

        let priceText
        let lastpriceText

        if (stock != 'all') {
            // Calculate Refresh
            unix = await stkp.get('unix')
            unixtime = parseInt(unix[0]) + 60
            refresh = "<t:" + unixtime + ":R>"

            // Get Stock
            cache = await stkp.get(stock)
            price = cache[0]
            priceText = cache[0]
            lastpriceText = cache[1]
        } else {
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
        }

        // Create Button
        let row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('UPDATE')
                    .setEmoji('1024382926923776020')
                    .setCustomId('stock-next-' + stock)
					.setStyle(ButtonStyle.Secondary),
			);
        if (lang == "de") {
            row = new ActionRowBuilder()
			    .addComponents(
			    	new ButtonBuilder()
			    		.setLabel('AKTUALISIEREN')
                        .setEmoji('1024382926923776020')
                        .setCustomId('stock-next-' + stock)
			    		.setStyle(ButtonStyle.Secondary),
			    );
        }

        // Create Embed
        let message
        if (stock != 'all') {
            if (lastpriceText > priceText) {
                message = new EmbedBuilder()
                    .setTitle('<:CHART:1024398298204876941> » ' + emoji + ' STOCK INFO')
                    .setDescription('» NEXT PRICES\n' + refresh + '\n\n» PRICE\n**<:DOWN:1009502386320056330> `$' + priceText + '` (' + await pcalc(priceText, lastpriceText) + '%)**')
                    .setFooter({ text: '» ' + vote + ' » ' + version });

                if (lang == "de") {
                    message = new EmbedBuilder()
                        .setTitle('<:CHART:1024398298204876941> » ' + emoji + ' AKTIEN INFO')
                        .setDescription('» NÄCHSTE PREISE\n' + refresh + '\n\n» PREIS\n**<:DOWN:1009502386320056330> `' + priceText + '€` (' + await pcalc(priceText, lastpriceText) + '%)**')
                        .setFooter({ text: '» ' + vote + ' » ' + version });
                }
            } else if (priceText > lastpriceText) {
                message = new EmbedBuilder()
                    .setTitle('<:CHART:1024398298204876941> » ' + emoji + ' STOCK INFO')
                    .setDescription('» NEXT PRICES\n' + refresh + '\n\n» PRICE\n**<:UP:1009502422990860350> `$' + priceText + '` (' + await pcalc(priceText, lastpriceText) + '%)**')
                    .setFooter({ text: '» ' + vote + ' » ' + version });
                
                if (lang == "de") {
                    message = new EmbedBuilder()
                        .setTitle('<:CHART:1024398298204876941> » ' + emoji + ' AKTIEN INFO')
                        .setDescription('» NÄCHSTE PREISE\n' + refresh + '\n\n» PREIS\n**<:UP:1009502422990860350> `' + priceText + '€` (' + await pcalc(priceText, lastpriceText) + '%)**')
                        .setFooter({ text: '» ' + vote + ' » ' + version });
                }
            } else {
                message = new EmbedBuilder()
                    .setTitle('<:CHART:1024398298204876941> » ' + emoji + ' STOCK INFO')
                    .setDescription('» NEXT PRICES\n' + refresh + '\n\n» PRICE\n**🧐 `$' + priceText + '` (' + await pcalc(priceText, lastpriceText) + '%)**')
                    .setFooter({ text: '» ' + vote + ' » ' + version });

                if (lang == "de") {
                    message = new EmbedBuilder()
                        .setTitle('<:CHART:1024398298204876941> » ' + emoji + ' AKTIEN INFO')
                        .setDescription('» NÄCHSTE PREISE\n' + refresh + '\n\n» PREIS\n**🧐 `' + priceText + '€` (' + await pcalc(priceText, lastpriceText) + '%)**')
                        .setFooter({ text: '» ' + vote + ' » ' + version });
                }
            }
        } else {
            message = new EmbedBuilder()
                .setTitle('<:CHART:1024398298204876941> » FULL STOCK INFO')
                .setDescription('» NEXT PRICES\n' + refresh + '\n\n» 🟢 GREEN STOCK\n**' + greenp + ' `$' + green + '` (' + await pcalc(green, greeno) + '%)**\n\n» 🔵 BLUE STOCK\n**' + bluep + ' `$' + blue + '` (' + await pcalc(blue, blueo) + '%)**\n\n» 🟡 YELLOW STOCK\n**' + yellowp + ' `$' + yellow + '` (' + await pcalc(yellow, yellowo) + '%)**\n\n» 🔴 RED STOCK\n**' + redp + ' `$' + red + '` (' + await pcalc(red, redo) + '%)**\n\n» ⚪ WHITE STOCK\n**' + whitep + ' `$' + white + '` (' + await pcalc(white, whiteo) + '%)**\n\n» ⚫ BLACK STOCK\n**' + blackp + ' `$' + black + '` (' + await pcalc(black, blacko) + '%)**')
                .setFooter({ text: '» ' + vote + ' » ' + version });
            
            if (lang == "de") {
                message = new EmbedBuilder()
                    .setTitle('<:CHART:1024398298204876941> » VOLLE AKTIEN INFOS')
                    .setDescription('» NÄCHSTE PREISE\n' + refresh + '\n\n» 🟢 GRÜNE AKTIE\n**' + greenp + ' `' + green + '€` (' + await pcalc(green, greeno) + '%)**\n\n» 🔵 BLAUE AKTIE\n**' + bluep + ' `' + blue + '€` (' + await pcalc(blue, blueo) + '%)**\n\n» 🟡 GELBE AKTIE\n**' + yellowp + ' `' + yellow + '€` (' + await pcalc(yellow, yellowo) + '%)**\n\n» 🔴 ROTE AKTIE\n**' + redp + ' `' + red + '€` (' + await pcalc(red, redo) + '%)**\n\n» ⚪ WEISSE AKTIE\n**' + whitep + ' `' + white + '€` (' + await pcalc(white, whiteo) + '%)**\n\n» ⚫ SCHWARZE AKTIE\n**' + blackp + ' `' + black + '€` (' + await pcalc(black, blacko) + '%)**')
                    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
        }

        // Send Message
        if (stock != 'all') {
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] STOCKINFO : ' + stock.toUpperCase() + ' : ' + priceText + '€')
        } else {
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] STOCKINFO : ALL : ' + green + '€ : ' + blue + '€ : ' + yellow + '€ : ' + red + '€ : ' + white + '€ : ' + black + '€')
        }
        return interaction.reply({ embeds: [message], components: [row] })
    },
};