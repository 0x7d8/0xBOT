const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mcver')
    	.setDMPermission(false)
        .setDescription('GENERATE A MINECRAFT VERSION')
        .setDescriptionLocalizations({
            de: 'GENERIERE EINE MINECRAFT VERSION'
        }),
    async execute(interaction, client, lang, vote) {
        // Set Variables
        const res = Math.floor(Math.random() * (19 - 0 + 1)) + 0;

        // Create Embed
        let message = new EmbedBuilder().setColor('#37009B')
        	.setTitle('<:CUBE:1024404832452350032> » RANDOM MINECRAFT VERSION')
  			.setDescription('» I would choose **1.' + res + '**!')
        	.setFooter({ text: '» ' + vote + ' » ' + version });

        if (lang === 'de') {
            message = new EmbedBuilder().setColor('#37009B')
        	    .setTitle('<:CUBE:1024404832452350032> » ZUFÄLLIGE MINECRAFT VERSION')
  			    .setDescription('» Ich würde **1.' + res + '** nehmen!')
        	    .setFooter({ text: '» ' + vote + ' » ' + version });
        }

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] MCVER : 1.' + res)
        return interaction.reply({ embeds: [message] })
    },
};