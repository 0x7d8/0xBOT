const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../config.json');

module.exports = {
    data: {
        name: 'count'
    },
    async execute(interaction, client) {
        // Get Count
        const cache = msg.channel.messages.fetch(interaction.message.id).toString()
        const number = parseInt(cache.match(/\d+/g).toString()) + 1

        // Create Embeds
        let message = new EmbedBuilder()
        .setTitle('» COUNTING')
          .setDescription('» Lets Count! Current Number: **' + number + '**')
        .setFooter({ text: '» ' + version });

        if (interaction.guildLocale == "de") {
            message = new EmbedBuilder()
                .setTitle('» ZÄHLEN')
                .setDescription('» Komm Zählen! Aktuelle Nummer: **' + number + '**')
                .setFooter({ text: '» ' + version });
        }

        // Send Message
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] COUNT : ' + number)
        return interaction.message.edit({ embeds: [message.toJSON()] })
    }
}