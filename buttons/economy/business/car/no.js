const { EmbedBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { version } = require('../../../../config.json');

module.exports = {
    data: {
        name: 'car-no'
    },
    async execute(interaction, client, lang, vote, car, userid, type) {
        // Translate to Car Names
        let name
        if (car == 'jeep') { name = '2016 JEEP PATRIOT SPORT' }
        if (car == 'kia') { name = '2022 KIA SORENTO' }
        if (car == 'tesla') { name = 'TESLA MODEL Y' }
        if (car == 'porsche') { name = '2019 PORSCHE 911 GT2RS' }

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
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] CARBUY : NOTSENDER')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }    

        // Create Buttons
        let row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('YES')
                    .setCustomId('CAR-YES-' + car + '-' + interaction.user.id)
                    .setEmoji('1017050442431209543')
					.setStyle(ButtonStyle.Success)
                    .setDisabled(true),

                new ButtonBuilder()
					.setLabel('NO')
                    .setCustomId('CAR-NO-' + car + '-' + interaction.user.id)
                    .setEmoji('1017050508252418068')
					.setStyle(ButtonStyle.Danger)
                    .setDisabled(true),
			);
        if (lang.toString() == "de") {
            row = new ActionRowBuilder()
			    .addComponents(
			    	new ButtonBuilder()
			    		.setLabel('JA')
                        .setCustomId('CAR-YES-' + car + '-' + interaction.user.id)
                        .setEmoji('1017050442431209543')
			    		.setStyle(ButtonStyle.Success)
                        .setDisabled(true),

                    new ButtonBuilder()
			    		.setLabel('NEIN')
                        .setCustomId('CAR-NO-' + car + '-' + interaction.user.id)
                        .setEmoji('1017050508252418068')
			    		.setStyle(ButtonStyle.Danger)
                        .setDisabled(true),
			    );
        }

        // Split Button with type
        if (type === 'buy') {
            // Create Embed
            let message = new EmbedBuilder()
                .setTitle('» BUY CAR')
                .setDescription('» <@' + interaction.user.id.replace(/\D/g, '') + '> said **NO** to a **' + name + '**.')
                .setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang.toString() == "de") {
                message = new EmbedBuilder()
                    .setTitle('» AUTO KAUFEN')
                    .setDescription('» <@' + interaction.user.id.replace(/\D/g, '') + '> hat **NEIN** zu einem **' + name + '** gesagt.')
                    .setFooter({ text: '» ' + vote + ' » ' + version });
            }

            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] CARBUY : ' + name + ' : DENY')
            return interaction.update({ embeds: [message.toJSON()], components: [row] })
        } else if (type === 'sell') {
            // Create Embed
            let message = new EmbedBuilder()
                .setTitle('» SELL CAR')
                .setDescription('» <@' + interaction.user.id.replace(/\D/g, '') + '> said **NO** to selling his **' + name + '**.')
                .setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang.toString() == "de") {
                message = new EmbedBuilder()
                    .setTitle('» AUTO VERKAUFEN')
                    .setDescription('» <@' + interaction.user.id.replace(/\D/g, '') + '> hat **NEIN** zum verkaufen von seinem **' + name + '** gesagt.')
                    .setFooter({ text: '» ' + vote + ' » ' + version });
            }

            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] CARSELL : ' + name + ' : DENY')
            return interaction.update({ embeds: [message.toJSON()], components: [row] })
        }
    }
}