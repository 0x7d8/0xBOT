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
        if (interaction.user.id != reciever.toString().replace(/\D/g, '') && interaction.user.id != sender.toString().replace(/\D/g, '')) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('» ERROR')
        		.setDescription('» <@' + reciever.toString().replace(/\D/g, '') + '> or <@' + sender.toString().replace(/\D/g, '') + '> has to decide this!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang == "de") {
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
        bot.memory.delete('TIMEOUT-' + sender + '-' + interaction.message.id)

        // Edit Buttons
        interaction.message.components[0].components[0].data.disabled = true
        interaction.message.components[0].components[1].data.disabled = true

        // Create Embed
        let message = new EmbedBuilder()
        .setTitle('» MEMORY')
        .setDescription('» <@' + interaction.user.id + '> said **NO**.')
        .setFooter({ text: '» ' + vote + ' » ' + version });

        if (lang == "de") {
            message = new EmbedBuilder()
                .setTitle('» MEMORY')
                .setDescription('» <@' + interaction.user.id + '> hat **NEIN** gesagt.')
                .setFooter({ text: '» ' + vote + ' » ' + version });
        }

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] MEMORY : ' + sender.toString().replace(/\D/g, '') + ' : DENY')
        return interaction.update({ embeds: [message.toJSON()], components: interaction.message.components })
    }
}