const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { version } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('count')
        .setDescription('PRESS A BUTTON')
        .setDescriptionLocalizations({
            de: 'DRÜCKE EINEN KNOPF'
        })
    	.setDMPermission(false),
    async execute(interaction, client, vote) {
        // Create Button
        let button = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('+1')
                    .setCustomId('count')
					.setStyle(ButtonStyle.Secondary),
			);
        
        // Create Embed
      	let message = new EmbedBuilder()
                .setTitle('» COUNTING')
  			    .setDescription('» Lets Count! Current Number: **0**')
        	    .setFooter({ text: '» ' + vote + ' » ' + version });

        if (interaction.guildLocale == "de") {
            message = new EmbedBuilder()
                .setTitle('» ZÄHLEN')
  		        .setDescription('» Komm Zählen! Aktuelle Nummer: **0**')
                .setFooter({ text: '» ' + vote + ' » ' + version });
        }

        // Send Message
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] COUNT')
        return interaction.reply({ embeds: [message.toJSON()], components: [button] })
    },
};