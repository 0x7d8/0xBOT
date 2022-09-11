const { SlashCommandBuilder } = require('@discordjs/builders');
const { version } = require('../../config.json');
const { EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('donate')
    	.setDMPermission(false)
        .setDescription('DONATE THE BOT')
        .setDescriptionLocalizations({
            de: 'SPENDE DEM BOT'
        }),
    async execute(interaction, client) {
        // Create Embed
        let message = new EmbedBuilder()
        	.setTitle('» DONATE')
        	.setDescription('**»» DONATE**\n» LINK\nhttps://donate.rjansen.de\n» QR CODE')
    		.setImage("https://img.rjansen.de/bot/donate.png")
    		.setFooter({ text: '» ' + version });

        if (interaction.guildLocale == "de") {
            message = new EmbedBuilder()
        		.setTitle('» SPENDEN')
        		.setDescription('**»» SPENDEN**\n» LINK\nhttps://donate.rjansen.de\n» QR CODE')
        		.setImage("https://img.rjansen.de/bot/donate.png")
        		.setFooter({ text: '» ' + version });
        }

        // Send Correct Response
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] DONATE <3')
        return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
    },
};