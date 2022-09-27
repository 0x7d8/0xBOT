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
    async execute(interaction, client, lang, vote) {
        // Create Button
        let button = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('VOTE')
					.setURL('https://top.gg/bot/1001944224545128588/vote')
					.setStyle(ButtonStyle.Link),
			);

        if (lang == "de") {
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
            .setTitle('<:GLOBE:1024403680503529583> » VOTE')
  			.setDescription('» Click below to go to Vote for the Bot!')
        	.setFooter({ text: '» ' + vote + ' » ' + version });

        if (lang == "de") {
            message = new EmbedBuilder()
                .setTitle('<:GLOBE:1024403680503529583> » VOTEN')
  			    .setDescription('» Klicke unten um für den Bot zu voten!')
        	    .setFooter({ text: '» ' + vote + ' » ' + version });
        }
        
        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] VOTE')
        await interaction.reply({ embeds: [message.toJSON()], components: [button], ephemeral: true })
    },
};