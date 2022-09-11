const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('number')
    	.setDMPermission(false)
        .setDescription('GENERATE A NUMBER')
        .setDescriptionLocalizations({
            de: 'GENERIERE EINE NUMMER'
        })
        .addIntegerOption(option =>
            option.setName('min')
                .setDescription('THE MIN AMOUNT')
                .setDescriptionLocalizations({
                    de: 'DAS MINIMUM'
                })
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('max')
                .setDescription('THE MAX AMOUNT')
                .setDescriptionLocalizations({
                    de: 'DAS MAXIMUM'
                })
                .setRequired(true)),
    async execute(interaction, client) {
        // Set Variables
        const min = interaction.options.getInteger("min")
        const max = interaction.options.getInteger("max")
        const res = Math.floor(Math.random() * (max - min + 1)) + min;

        // Create Embed
        let message = new EmbedBuilder()
        	.setTitle('» RANDOM NUMBER')
  			.setDescription('» Between **' + min + '** and **' + max + '** I choose **' + res + '**!')
        	.setFooter({ text: '» ' + version });

        if (interaction.guildLocale == "de") {
            message = new EmbedBuilder()
        	    .setTitle('» ZUFÄLLIGE NUMMER')
  			    .setDescription('» Zwischen **' + min + '** und **' + max + '** wähle ich **' + res + '**!')
        	    .setFooter({ text: '» ' + version });
        }

        // Send Message
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] NUMBER : ' + min + ' : ' + max + ' : ' + res)
        return await interaction.reply({ embeds: [message.toJSON()] })
    },
};