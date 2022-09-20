const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../config.json');

module.exports = {
    data: {
        name: 'count'
    },
    async execute(interaction, client, lang, vote) {
        // Get Count
        const cache = interaction.message.embeds
        const number = parseInt(cache[0].description.toString().match(/\d+/g)) + 1

        // Create Embeds
        let message = new EmbedBuilder()
        .setTitle('» COUNTING')
          .setDescription('» Lets Count! Current Number: **' + number + '**')
        .setFooter({ text: '» ' + version });

        if (lang == "de") {
            message = new EmbedBuilder()
                .setTitle('» ZÄHLEN')
                .setDescription('» Komm Zählen! Aktuelle Nummer: **' + number + '**')
                .setFooter({ text: '» ' + version });
        }

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] COUNT : ' + number)
        await interaction.update({ embeds: [message.toJSON()] })
    }
}