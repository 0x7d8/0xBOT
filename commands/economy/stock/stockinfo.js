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
        } else {
            // Calculate Refresh
            serverunix = await fetch("https://api.paperstudios.de/time/unix");
            unix = await serverunix.text();
            unixtime = parseInt(unix) + 60
            unixtime = parseInt(unix) + 60
            refreshtransformed = "<t:" + unixtime + ":R>"
            refresh = refreshtransformed.replace(/(\r\n|\n|\r)/gm, "");

            // Get Stocks
            cache = await fetch("https://api.paperstudios.de/bot/stocks/red")
            const redc = await cache.text();
            red = redc.replace(/(\r\n|\n|\r)/gm, "");
            cache = await fetch("https://api.paperstudios.de/bot/stocks/yellow")
            const yellowc = await cache.text();
            yellow = yellowc.replace(/(\r\n|\n|\r)/gm, "");
            cache = await fetch("https://api.paperstudios.de/bot/stocks/blue")
            const bluec = await cache.text();
            blue = bluec.replace(/(\r\n|\n|\r)/gm, "");
        }

        // Create Embed
        let message
        if (stock != 'all') {
            message = new EmbedBuilder()
                .setTitle('» ' + emoji + ' AKTIEN INFO')
                .setDescription('» NÄCHSTER PREIS\n' + refresh + '\n\n» PREIS\n**`' + priceText + '€`**')
                .setFooter({ text: '» ' + version });
        } else {
            message = new EmbedBuilder()
                .setTitle('» VOLLE AKTIEN INFO')
                .setDescription('» NÄCHSTER PREIS\n' + refresh + '\n\n» 🔵 PREIS\n**`' + blue + '€`**\n\n» 🟡 PREIS\n**`' + yellow + '€`**\n\n» 🔴 PREIS\n**`' + red + '€`**')
                .setFooter({ text: '» ' + version });
        }

        // Send Message
        console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] STOCKINFO : ' + stock.toUpperCase() + ' : ' + priceText + '€')
        return interaction.reply({ embeds: [message.toJSON()] })
    },
};