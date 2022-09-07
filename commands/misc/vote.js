const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { version } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('vote')
    	.setDMPermission(false)
        .setDescription('VOTE FOR THE BOT')
        .setDescriptionLocalizations({
            de: 'VOTE FÜR DEN BOT'
        }),
    async execute(interaction, client) {
        // Count to Global Commands
        cmds.add('t-all', 1)
        
        // Count Guild Commands and User
        cmds.add('g-' + interaction.guild.id, 1)
        cmds.add('u-' + interaction.user.id.replace(/\D/g, ''), 1)

        // Create Button
        let button = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('VOTEN')
					.setURL('https://top.gg/bot/1001944224545128588/vote')
					.setStyle(ButtonStyle.Link),
			);

        if (interaction.guildLocale = "de") {
            button = new ActionRowBuilder()
			    .addComponents(
			    	new ButtonBuilder()
			    		.setLabel('VOTEN')
			    		.setURL('https://top.gg/bot/1001944224545128588/vote')
			    		.setStyle(ButtonStyle.Link),
			    );
        }
        
        // Create Embed
       	let message = new EmbedBuilder()
            .setTitle('» TOP.GG')
  			.setDescription('» Click below to go to Vote for the Bot!')
        	.setFooter({ text: '» ' + version });

        if (interaction.guildLocale == "de") {
            message = new EmbedBuilder()
                .setTitle('» TOP.GG')
  			    .setDescription('» Klicke unten um für den Bot zu voten!')
        	    .setFooter({ text: '» ' + version });
        }
        
        // Send Message
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] VOTE')
        interaction.reply({ embeds: [message.toJSON()], components: [button], ephemeral: true })
    },
};