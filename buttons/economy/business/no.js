const { EmbedBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { version } = require('../../../config.json');

module.exports = {
    data: {
        name: 'business-no'
    },
    async execute(interaction, client, lang, vote, business, userid, type) {
        // Translate to Business ID
        let businessid
        if (business == 'market') { businessid = '1' }
        if (business == 'parking garage') { businessid = '2' }
        if (business == 'car dealership') { businessid = '3' }

        // Calculate Cost
        let cost
        if (business == 'market') { cost = 150000 }
        if (business == 'parking garage') { cost = 390000 }
        if (business == 'car dealership') { cost = 520000 }

        // Translate to Business Names
        let name
        if (business == 'market') { name = 'MARKET' }
        if (business == 'parking garage') { name = 'PARKING GARAGE' }
        if (business == 'car dealership') { name = 'CAR DEALERSHIP' }
        if (lang.toString() == 'de') {
            if (business == 'market') { name = 'SUPERMARKT' }
            if (business == 'parking garage') { name = 'PARKHAUS' }
            if (business == 'car dealership') { name = 'AUTOHAUS' }
        }

        // Check if User is Authorized
        if (interaction.user.id !== userid) {
            // Create Embed
            let message = new EmbedBuilder()
            	.setTitle('» ERROR')
  				.setDescription('» This choice is up to <@' + userid + '>!')
            	.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang.toString() == "de") {
                message = new EmbedBuilder()
            	    .setTitle('» FEHLER')
  				    .setDescription('» Diese Frage ist für <@' + userid + '>!')
            	    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] BUSINESSBUY : NOTSENDER')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }    

        // Create Buttons
        let row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('YES')
                    .setCustomId('BUSINESS-YES-' + business + '-' + interaction.user.id)
                    .setEmoji('1017050442431209543')
					.setStyle(ButtonStyle.Success)
                    .setDisabled(true),

                new ButtonBuilder()
					.setLabel('NO')
                    .setCustomId('BUSINESS-NO-' + business + '-' + interaction.user.id)
                    .setEmoji('1017050508252418068')
					.setStyle(ButtonStyle.Danger)
                    .setDisabled(true),
			);
        if (lang.toString() == "de") {
            row = new ActionRowBuilder()
			    .addComponents(
			    	new ButtonBuilder()
			    		.setLabel('JA')
                        .setCustomId('BUSINESS-YES-' + business + '-' + interaction.user.id)
                        .setEmoji('1017050442431209543')
			    		.setStyle(ButtonStyle.Success)
                        .setDisabled(true),

                    new ButtonBuilder()
			    		.setLabel('NEIN')
                        .setCustomId('BUSINESS-NO-' + business + '-' + interaction.user.id)
                        .setEmoji('1017050508252418068')
			    		.setStyle(ButtonStyle.Danger)
                        .setDisabled(true),
			    );
        }

        // Split Button with type
        if (type === 'buy') {
            // Create Embed
            let message = new EmbedBuilder()
                .setTitle('» BUY BUSINESS')
                .setDescription('» <@' + interaction.user.id.replace(/\D/g, '') + '> said **NO** to a **' + name + '**.')
                .setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang.toString() == "de") {
                message = new EmbedBuilder()
                    .setTitle('» GESCHÄFT KAUFEN')
                    .setDescription('» <@' + interaction.user.id.replace(/\D/g, '') + '> hat **NEIN** zu einem **' + name + '** gesagt.')
                    .setFooter({ text: '» ' + vote + ' » ' + version });
            }

            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] BUSINESSBUY : ' + name + ' : DENY')
            return interaction.update({ embeds: [message.toJSON()], components: [row] })
        } else if (type === 'sell') {
            // Create Embed
            let message = new EmbedBuilder()
                .setTitle('» SELL BUSINESS')
                .setDescription('» <@' + interaction.user.id.replace(/\D/g, '') + '> said **NO** to selling his **' + name + '**.')
                .setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang.toString() == "de") {
                message = new EmbedBuilder()
                    .setTitle('» GESCHÄFT VERKAUFEN')
                    .setDescription('» <@' + interaction.user.id.replace(/\D/g, '') + '> hat **NEIN** zum verkaufen von seinem **' + name + '** gesagt.')
                    .setFooter({ text: '» ' + vote + ' » ' + version });
            }

            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] BUSINESSSELL : ' + name + ' : DENY')
            return interaction.update({ embeds: [message.toJSON()], components: [row] })
        }
    }
}