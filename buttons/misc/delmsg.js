const { EmbedBuilder } = require('@discordjs/builders')

module.exports = {
    data: {
        name: 'rem-levelmsg'
    },
    async execute(interaction, client, lang, vote) {
        // Set Variables
        const [ mention ] = interaction.message.mentions.parsedUsers.values()

        // Check if User is Authorized
        if (interaction.user.id !== mention.id) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» <@' + mention.id + '> has to decide this!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang === 'de') {
                message = new EmbedBuilder()
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» <@' + mention.id + '> muss das entscheiden!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] REM-LEVELMSG : NOTALLOWED')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Delete Message
        return interaction.message.delete()
    }
}