const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { version } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('github')
    	.setDMPermission(false)
        .setDescription('THE BOT ON GITHUB')
        .setDescriptionLocalizations({
            de: 'DER BOT AUF GITHUB'
        }),
    async execute(interaction) {
        // Count to Global Commands
        addcmd('t-all', 1)
        
        // Count Guild Commands and User
        addcmd('g-' + interaction.guild.id, 1)
        addcmd('u-' + interaction.user.id, 1)

        // Create Button
        const github = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('ANSCHAUEN')
					.setURL('https://github.com/rotvproHD/0xBOT')
					.setStyle(ButtonStyle.Link),
			);
        
        // Create Embed
       	const message = new EmbedBuilder()
            .setTitle('» GITHUB')
  			.setDescription('» Klicke unten um auf die **GITHUB** Seite zu kommen!')
        	.setFooter({ text: '» ' + version });
        
        // Send Message
        console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] GITHUB')
        interaction.reply({ embeds: [message.toJSON()], components: [github], ephemeral: true })
    },
};