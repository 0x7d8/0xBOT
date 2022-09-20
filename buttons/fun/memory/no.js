const { EmbedBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { version } = require('../../../config.json');

module.exports = {
    data: {
        name: 'memory-no'
    },
    async execute(interaction, client, lang, vote, bet, sel) {
        // Get Users
        const cache = interaction.message.embeds
        const description = cache[0].description.toString().replace(/[^\d@!]/g, '').split('!')[0].substring(1).split("@");
        const [sender, reciever] = description

        // Check if User is Authorized
        if (interaction.user.id.replace(/\D/g, '') != reciever.toString().replace(/\D/g, '') && interaction.user.id.replace(/\D/g, '') != sender.toString().replace(/\D/g, '')) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('» ERROR')
        		.setDescription('» <@' + reciever.toString().replace(/\D/g, '') + '> or <@' + sender.toString().replace(/\D/g, '') + '> has to decide this!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang.toString() == "de") {
                message = new EmbedBuilder()
        		    .setTitle('» FEHLER')
        		    .setDescription('» <@' + reciever.toString().replace(/\D/g, '') + '> oder <@' + sender.toString().replace(/\D/g, '') + '> muss das entscheiden!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] MEMORY : NO : NOTALLOWED')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Answer Timeout Function
        eval('global.memorytf' + sender.toString().replace(/\D/g, '') + ' = true')
        eval('delete memorylc' + sender.replace(/\D/g, ''))        

        // Create Buttons
        let row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('YES')
                    .setCustomId('MEMORY-YES-' + bet)
                    .setEmoji('1017050442431209543')
					.setStyle(ButtonStyle.Success)
                    .setDisabled(true),

                new ButtonBuilder()
					.setLabel('NO')
                    .setCustomId('MEMORY-NO-' + bet)
                    .setEmoji('1017050508252418068')
					.setStyle(ButtonStyle.Danger)
                    .setDisabled(true),
			);
        if (lang.toString() == "de") {
            row = new ActionRowBuilder()
			    .addComponents(
			    	new ButtonBuilder()
			    		.setLabel('JA')
                        .setCustomId('MEMORY-YES-' + bet)
                        .setEmoji('1017050442431209543')
			    		.setStyle(ButtonStyle.Success)
                        .setDisabled(true),

                    new ButtonBuilder()
			    		.setLabel('NEIN')
                        .setCustomId('MEMORY-NO-' + bet)
                        .setEmoji('1017050508252418068')
			    		.setStyle(ButtonStyle.Danger)
                        .setDisabled(true),
			    );
        }

        // Create Embed
        let message = new EmbedBuilder()
        .setTitle('» MEMORY')
        .setDescription('» <@' + interaction.user.id.replace(/\D/g, '') + '> said **NO**.')
        .setFooter({ text: '» ' + vote + ' » ' + version });

        if (lang.toString() == "de") {
            message = new EmbedBuilder()
                .setTitle('» MEMORY')
                .setDescription('» <@' + interaction.user.id.replace(/\D/g, '') + '> hat **NEIN** gesagt.')
                .setFooter({ text: '» ' + vote + ' » ' + version });
        }

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] MEMORY : ' + sender.toString().replace(/\D/g, '') + ' : DENY')
        return interaction.update({ embeds: [message.toJSON()], components: [row] })
    }
}