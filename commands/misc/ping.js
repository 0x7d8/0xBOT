const { SlashCommandBuilder } = require('@discordjs/builders');
const { version } = require('../../config.json');
const { EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
    	.setDMPermission(false)
        .setDescription('THE BOT PING')
        .setDescriptionLocalizations({
            de: 'DER BOT PING'
        }),
    async execute(interaction, client) {
        // Set Variables
        const botping = Math.round(client.ws.ping)

        // Create Embed
        let message = new EmbedBuilder()
        		.setTitle('» BOT PING')
        		.setDescription('» The Bot Ping is **' + botping + 'ms**!')
        		.setFooter({ text: '» ' + version });

        if (interaction.guildLocale == "de") {
            message = new EmbedBuilder()
        		.setTitle('» BOT PING')
        		.setDescription('» Der Ping vom Bot ist **' + botping + 'ms**!')
        		.setFooter({ text: '» ' + version });
        }

        // Send Correct Response
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] PING : ' + botping + 'ms')
        return interaction.edit.message({ embeds: [message.toJSON()], ephemeral: true })
    },
};