const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
    	.setDMPermission(false)
        .setDescription('THE BOT PING')
        .setDescriptionLocalizations({
            de: 'DER BOT PING'
        }),
    async execute(interaction, client, lang, vote) {
        // Set Variables
        const botping = Math.round(client.ws.ping)-50

        // Create Embed
        let message = new EmbedBuilder().setColor(0x37009B)
        		.setTitle('<:GLOBE:1024403680503529583> » BOT PING')
        		.setDescription('» The Bot Ping is **' + botping + 'ms**!')
        		.setFooter({ text: '» ' + vote + ' » ' + config.version });

        if (lang === 'de') {
            message = new EmbedBuilder().setColor(0x37009B)
        		.setTitle('<:GLOBE:1024403680503529583> » BOT PING')
        		.setDescription('» Der Ping vom Bot ist **' + botping + 'ms**!')
        		.setFooter({ text: '» ' + vote + ' » ' + config.version });
        }

        // Send Correct Response
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] PING : ' + botping + 'ms')
        return interaction.reply({ embeds: [message], ephemeral: true })
    },
};