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
    async execute(interaction, client, lang, vote) {
        // Create Embed
        let message = new EmbedBuilder()
        	.setTitle('» DONATE')
        	.setDescription('**»» DONATE**\n» LINK\nhttps://donate.rjansen.de\n» QR CODE')
    		.setImage("https://img.rjansen.de/bot/donate.png")
    		.setFooter({ text: '» ' + vote + ' » ' + version });

        if (lang.toString() == "de") {
            message = new EmbedBuilder()
        		.setTitle('» SPENDEN')
        		.setDescription('**»» SPENDEN**\n» LINK\nhttps://donate.rjansen.de\n» QR CODE')
        		.setImage("https://img.rjansen.de/bot/donate.png")
        		.setFooter({ text: '» ' + vote + ' » ' + version });
        }

        // Send Correct Response
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] DONATE <3')
        return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
    },
};