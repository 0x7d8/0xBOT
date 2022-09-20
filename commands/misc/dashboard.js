const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { version } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dashboard')
    	.setDMPermission(false)
        .setDescription('GO TO THE DASHBOARD')
        .setDescriptionLocalizations({
            de: 'GEHE ZUM DASHBOARD'
        }),
    async execute(interaction, client, lang, vote) {
        // Create Button
        let button = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('GO')
					.setURL('https://dsh.0xBOT.de')
					.setStyle(ButtonStyle.Link),
			);

        if (interaction.guildLocale = "de") {
            button = new ActionRowBuilder()
			    .addComponents(
			    	new ButtonBuilder()
			    		.setLabel('LOS')
			    		.setURL('https://dsh.0xBOT.de')
			    		.setStyle(ButtonStyle.Link),
			    );
        }
        
        // Create Embed
       	let message = new EmbedBuilder()
            .setTitle('» DASHBOARD')
  			.setDescription('» Click below to go to the Dashboard!')
        	.setFooter({ text: '» ' + vote + ' » ' + version });

        if (lang.toString() == "de") {
            message = new EmbedBuilder()
                .setTitle('» DASHBOARD')
  			    .setDescription('» Klicke unten um zum Dashboard zu gelangen!')
        	    .setFooter({ text: '» ' + vote + ' » ' + version });
        }
        
        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] DASHBOARD')
        await interaction.reply({ embeds: [message.toJSON()], components: [button], ephemeral: true })
    },
};