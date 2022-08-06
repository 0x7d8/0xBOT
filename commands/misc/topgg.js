const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { version } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('topgg')
    	.setDMPermission(false)
        .setDescription('DER BOT AUF TOP.GG'),
    async execute(interaction) {
        // Count to Global Commands
        addcmd('t-all', 1)
        
        // Count Guild Commands and User
        addcmd('g-' + interaction.guild.id, 1)
        addcmd('u-' + interaction.user.id, 1)

        // Create Button
        const topgg = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('ANSCHAUEN')
					.setURL('https://top.gg/bot/1001944224545128588')
					.setStyle(ButtonStyle.Link),
			);
        
        // Create Embed
       	const message = new EmbedBuilder()
            .setTitle('» TOP.GG')
  			.setDescription('» Klicke unten um auf die **TOP.GG** Seite zu kommen!')
        	.setFooter({ text: '» ' + version });
        
        // Send Message
        console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] TOPGG')
        interaction.reply({ embeds: [message.toJSON()], components: [topgg], ephemeral: true })
    },
};