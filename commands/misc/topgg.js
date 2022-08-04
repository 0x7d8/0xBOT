const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');
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
        
        // Check Maintenance
        const { maintenance } = require('../../config.json');
        if (maintenance == 'yes' && interaction.user.id != '745619551865012274') {
            // Create Embed
            var err = new EmbedBuilder()
        		.setTitle('» FEHLER')
        		.setDescription('» Der Bot ist aktuell unter Wartungsarbeiten!')
        		.setFooter({ text: '» ' + version });
            
            return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
        }
        
        // Create Button
		const topgg = new MessageActionRow()
			.addComponents(
				new MessageButton()
    				.setLabel('ANSCHAUEN')
    				.setURL("https://top.gg/bot/1001944224545128588")
    				.setStyle('LINK'),
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