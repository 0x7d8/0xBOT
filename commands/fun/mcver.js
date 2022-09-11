const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mcver')
    	.setDMPermission(false)
        .setDescription('GENERATE A MINECRAFT VERSION')
        .setDescriptionLocalizations({
            de: 'GENERIERE EINE MINECRAFT VERSION'
        }),
    async execute(interaction, client) {
        // Set Variables
        const res = Math.floor(Math.random() * (19 - 0 + 1)) + 0;

        // Create Embed
        let message = new EmbedBuilder()
        	.setTitle('» RANDOM MINECRAFT VERSION')
  			.setDescription('» I would choose **1.' + res + '**!')
        	.setFooter({ text: '» ' + version });

        if (interaction.guildLocale == "de") {
            message = new EmbedBuilder()
        	    .setTitle('» ZUFÄLLIGE MINECRAFT VERSION')
  			    .setDescription('» Ich würde **1.' + res + '** nehmen!')
        	    .setFooter({ text: '» ' + version });
        }

        // Send Message
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] MCVER : 1.' + res)
        return await interaction.reply({ embeds: [message.toJSON()] })
    },
};