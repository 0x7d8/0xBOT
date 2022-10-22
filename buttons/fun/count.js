const { EmbedBuilder } = require('@discordjs/builders')

module.exports = {
    data: {
        name: 'count'
    },
    async execute(interaction, client, lang, vote, type) {
        // Get Count
        const cache = interaction.message.embeds
        let number = parseInt(cache[0].description.toString().match(/\d+/g))

        // Check if Number is Negative
        if (typeof interaction.message.components[0].components[1] !== 'undefined') {
            if (number === 1) {
                interaction.message.components[0].components[1].data.disabled = true
                await interaction.message.edit({ components: interaction.message.components })
            } else {
                interaction.message.components[0].components[1].data.disabled = false
                await interaction.message.edit({ components: interaction.message.components })
            }
        }

        // Count Number
        if (type === 'plus') {
            number = parseInt(cache[0].description.toString().match(/\d+/g)) + 1
        } else {
            number = parseInt(cache[0].description.toString().match(/\d+/g)) - 1
        }

        // Create Embeds
        let message = new EmbedBuilder().setColor(0x37009B)
            .setTitle('<:INFINITE:1024406060380979300> » COUNTING')
            .setDescription('» Lets Count! Current Number: **' + number + '**')
            .setFooter({ text: '» ' + config.version });

        if (lang === 'de') {
            message = new EmbedBuilder().setColor(0x37009B)
                .setTitle('<:INFINITE:1024406060380979300> » ZÄHLEN')
                .setDescription('» Komm Zählen! Aktuelle Nummer: **' + number + '**')
                .setFooter({ text: '» ' + config.version });
        }

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] COUNT : ' + number)
        return interaction.update({ embeds: [message] })
    }
}