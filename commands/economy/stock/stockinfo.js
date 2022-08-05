const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../../config.json');
const fetch = require("node-fetch");

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
            		{ name: '🔵 [250-0500] BLAUE AKTIE', value: 'blue' },
                    { name: '🟡 [200-0750] GELBE AKTIE', value: 'yellow' },
                    { name: '🔴 [150-1000] ROTE AKTIE', value: 'red' },
				)),
    async execute(interaction) {
        // Count to Global Commands
        addcmd('t-all', 1)
        
        // Count Guild Commands and User
        addcmd('g-' + interaction.guild.id, 1)
        addcmd('u-' + interaction.user.id, 1)
        
        // Set Variables
        const stock = interaction.options.getString("aktie")
        
        // Check Maintenance
        const { maintenance } = require('../../../config.json');
        if (maintenance == 'yes' && interaction.user.id != '745619551865012274') {
            // Create Embed
            var err = new EmbedBuilder()
        		.setTitle('» FEHLER')
        		.setDescription('» Der Bot ist aktuell unter Wartungsarbeiten!')
        		.setFooter({ text: '» ' + version });
            
            return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
        }

        // Set Emoji
        if (stock == 'blue') { var emoji = '🔵' }
        if (stock == 'yellow') { var emoji = '🟡' }
        if (stock == 'red') { var emoji = '🔴' }

        // Fetch Stock
        const price = await fetch("https://api.paperstudios.de/bot/stocks/" + stock);

        // Calculate Refresh
        const serverunix = await fetch("https://api.paperstudios.de/time/unix");
        let unix = await serverunix.text();
        var unixtime = parseInt(unix) + 60
        const refreshtransformed = "<t:" + unixtime + ":R>"
        var refresh = refreshtransformed.replace(/(\r\n|\n|\r)/gm, "");
        const pricetransformed = await price.text();
        var priceText = pricetransformed.replace(/(\r\n|\n|\r)/gm, "");

        // Create Embed
        const message = new EmbedBuilder()
            .setTitle('» ' + emoji + ' AKTIEN INFO')
            .setDescription('» NÄCHSTER PREIS\n' + refresh + '\n\n» PREIS\n`' + priceText + '€`')
            .setFooter({ text: '» ' + version });

        // Send Message
        return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
    },
};