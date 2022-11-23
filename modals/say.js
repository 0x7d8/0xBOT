const { EmbedBuilder } = require('@discordjs/builders')

module.exports = {
    data: {
        name: 'say'
    },
    async execute(interaction, client, lang, vote) {
        // Set Variables
        const title = interaction.fields.getTextInputValue('say-title')
        const content = interaction.fields.getTextInputValue('say-content')

        // Create Embed
        let message
        if (interaction.user.id != '745619551865012274') {
            message = new EmbedBuilder().setColor(0x37009B)
                .setTitle(title)
  			    .setDescription(content)
        	    .setFooter({ text: '» ' + config.version + ' » NOT OFFICIAL' });
            
            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
                    .setTitle(title)
  			        .setDescription(content)
        	        .setFooter({ text: '» ' + config.version + ' » NICHT OFFIZIELL' });
            }
        } else {
            message = new EmbedBuilder().setColor(0x37009B)
                .setTitle(title)
  			    .setDescription(content)
        	    .setFooter({ text: '» ' + config.version });
        }

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[MOD] SAY : ' + title.toUpperCase() + ' : "' + content.toUpperCase() + '"')
        return interaction.reply({ embeds: [message] })
    }
}