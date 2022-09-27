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
    	.setDMPermission(false)
        .addStringOption(option =>
            option.setName('mode')
                .setNameLocalizations({
                    de: 'modus'
                })
                .setDescription('THE MODE')
                .setDescriptionLocalizations({
                    de: 'DER MODUS'
                })
                .setRequired(true)
    			.addChoices(
            		// Setup Choices
					{ name: '🟢 PLUS', value: 'plus' },
            		{ name: '🟡 PLUS & MINUS', value: 'minus' },
				)),
    async execute(interaction, client, lang, vote) {
        // Set Variables
        const mode = interaction.options.getString("mode")

        // Create Button
        let row
        if (mode === 'plus') {
            row = new ActionRowBuilder()
		    	.addComponents(
		    		new ButtonBuilder()
		    			.setEmoji('1024358756940775504')
                        .setCustomId('COUNT-PLUS')
		    			.setStyle(ButtonStyle.Secondary),
		    	);
        } else {
            row = new ActionRowBuilder()
		    	.addComponents(
		    		new ButtonBuilder()
		    			.setEmoji('1024358756940775504')
                        .setCustomId('COUNT-PLUS')
		    			.setStyle(ButtonStyle.Secondary),

                    new ButtonBuilder()
		    			.setEmoji('1024358810418151494')
                        .setCustomId('COUNT-MINUS')
		    			.setStyle(ButtonStyle.Secondary)
                        .setDisabled(true),
		    	);
        }
        
        // Create Embed
      	let message = new EmbedBuilder()
                .setTitle('<:INFINITE:1024406060380979300> » COUNTING')
  			    .setDescription('» Lets Count! Current Number: **0**')
        	    .setFooter({ text: '» ' + version });

        if (lang == "de") {
            message = new EmbedBuilder()
                .setTitle('<:INFINITE:1024406060380979300> » ZÄHLEN')
  		        .setDescription('» Komm Zählen! Aktuelle Nummer: **0**')
                .setFooter({ text: '» ' + version });
        }

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] COUNT : ' + mode.toUpperCase())
        return interaction.reply({ embeds: [message.toJSON()], components: [row] })
    },
};