const { SlashCommandBuilder } = require('@discordjs/builders');
const { version } = require('../../config.json');
const { EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('donate')
    	.setDMPermission(false)
        .setDescription('SPENDE DEM BOT'),
    async execute(interaction) {
        // Count to Global Commands
        addcmd('t-all', 1)
        
        // Count Guild Commands and User
        addcmd('g-' + interaction.guild.id, 1)
        addcmd('u-' + interaction.user.id, 1)

        // Create Embed
        const message = new EmbedBuilder()
        		.setTitle('» SPENDEN')
        		.setDescription('**»» SPENDEN**\n» LINK\nhttps://donate.rjansen.de\n» QR CODE')
        		.setImage("https://img.rjansen.de/bot/donate.png")
        		.setFooter({ text: '» ' + version });

        // Send Correct Response
        console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] DONATE <3')
        return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
    },
};