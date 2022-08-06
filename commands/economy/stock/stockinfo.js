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

        // Fetch Data
        const stockpath = '/paper-api/bot/stocks/' + stock
        const price = fs.readFileSync(stockpath, "utf8");
        const unixpath = '/paper-api/time/unix'
        const serverunix = fs.readFileSync(unixpath, "utf8");

        // Calculate Refresh
        const unixtime = parseInt(serverunix) + 60
        const refreshtransformed = "<t:" + unixtime + ":R>"
        const refresh = refreshtransformed.replace(/(\r\n|\n|\r)/gm, "");
        const pricetransformed = await price.text();
        const priceText = pricetransformed.replace(/(\r\n|\n|\r)/gm, "");

        // Create Embed
        const message = new EmbedBuilder()
            .setTitle('» ' + emoji + ' AKTIEN INFO')
            .setDescription('» NÄCHSTER PREIS\n' + refresh + '\n\n» PREIS\n`' + priceText + '€`')
            .setFooter({ text: '» ' + version });

        // Send Message
        console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] STOCKINFO : ' + stock.toUpperCase() + ' : ' + priceText + '€')
        return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
    },
};