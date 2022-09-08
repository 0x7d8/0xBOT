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
    async execute(interaction, client) {
        // Create Button
        let button = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('ANSCHAUEN')
					.setURL('https://github.com/rotvproHD/0xBOT')
					.setStyle(ButtonStyle.Link),
			);
        
        if (interaction.guildLocale == "de") {
            button = new ActionRowBuilder()
			    .addComponents(
				    new ButtonBuilder()
				    	.setLabel('VIEW')
				    	.setURL('https://github.com/rotvproHD/0xBOT')
				    	.setStyle(ButtonStyle.Link),
			    );
        }
        
        // Create Embed
       	let message = new EmbedBuilder()
            .setTitle('» GITHUB')
  			.setDescription('» CLick below to go to the **GITHUB** Page of the Bot!')
        	.setFooter({ text: '» ' + version });

        if (interaction.guildLocale == "de") {
            message = new EmbedBuilder()
                .setTitle('» GITHUB')
  			    .setDescription('» Klicke unten um auf die **GITHUB** Seite zu kommen!')
        	    .setFooter({ text: '» ' + version });
        }
        
        // Send Message
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] GITHUB')
        interaction.reply({ embeds: [message.toJSON()], components: [button], ephemeral: true })
    },
};