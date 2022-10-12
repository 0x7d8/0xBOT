const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { version } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('status')
    	.setDMPermission(false)
        .setDescription('GO TO THE STATUS PAGE')
        .setDescriptionLocalizations({
            de: 'GEHE ZUR STATUS SEITE'
        }),
    async execute(interaction, client, lang, vote) {
        // Create Button
        let button = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('GO')
					.setURL('https://status.0xbot.de')
					.setStyle(ButtonStyle.Link),
			);

        if (lang === 'de') {
            button = new ActionRowBuilder()
			    .addComponents(
			    	new ButtonBuilder()
			    		.setLabel('LOS')
			    		.setURL('https://status.0xbot.de')
			    		.setStyle(ButtonStyle.Link),
			    );
        }
        
        // Create Embed
       	let message = new EmbedBuilder()
            .setTitle('<:GLOBE:1024403680503529583> » STATUS')
  			.setDescription('» Click below to go to the Status Page!')
        	.setFooter({ text: '» ' + vote + ' » ' + version });

        if (lang === 'de') {
            message = new EmbedBuilder()
                .setTitle('<:GLOBE:1024403680503529583> » STATUS')
  			    .setDescription('» Klicke unten um zur Status Seite zu gelangen!')
        	    .setFooter({ text: '» ' + vote + ' » ' + version });
        }
        
        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] STATUS')
        await interaction.reply({ embeds: [message], components: [button], ephemeral: true })
    },
};