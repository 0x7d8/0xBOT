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

            if (lang == "de") {
                message = new EmbedBuilder()
            	    .setTitle('» FEHLER')
  				    .setDescription('» Diese Frage ist für <@' + userid + '>!')
            	    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] CARBUY : NOTSENDER')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }    

        // Edit Buttons
        interaction.message.components[0].components[0].data.disabled = true
        interaction.message.components[0].components[1].data.disabled = true

        // Split Button with type
        if (type === 'buy') {
            // Create Embed
            let message = new EmbedBuilder()
                .setTitle('» BUY CAR')
                .setDescription('» <@' + interaction.user.id + '> said **NO** to a **' + name + '**.')
                .setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang == "de") {
                message = new EmbedBuilder()
                    .setTitle('» AUTO KAUFEN')
                    .setDescription('» <@' + interaction.user.id + '> hat **NEIN** zu einem **' + name + '** gesagt.')
                    .setFooter({ text: '» ' + vote + ' » ' + version });
            }

            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] CARBUY : ' + name + ' : DENY')
            return interaction.update({ embeds: [message.toJSON()], components: interaction.message.components })
        } else if (type === 'sell') {
            // Create Embed
            let message = new EmbedBuilder()
                .setTitle('» SELL CAR')
                .setDescription('» <@' + interaction.user.id + '> said **NO** to selling his **' + name + '**.')
                .setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang == "de") {
                message = new EmbedBuilder()
                    .setTitle('» AUTO VERKAUFEN')
                    .setDescription('» <@' + interaction.user.id + '> hat **NEIN** zum verkaufen von seinem **' + name + '** gesagt.')
                    .setFooter({ text: '» ' + vote + ' » ' + version });
            }

            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] CARSELL : ' + name + ' : DENY')
            return interaction.update({ embeds: [message.toJSON()], components: interaction.message.components })
        }
    }
}