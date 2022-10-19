const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mcver')
    	.setDMPermission(false)
        .setDescription('GENERATE A MINECRAFT config.version')
        .setDescriptionLocalizations({
            de: 'GENERIERE EINE MINECRAFT config.version'
        }),
    async execute(interaction, client, lang, vote) {
        // Set Variables
        const res = bot.random(1, 20)

        // Create Embed
        let message = new EmbedBuilder().setColor(0x37009B)
        	.setTitle('<:CUBE:1024404832452350032> » RANDOM MINECRAFT config.version')
  			.setDescription('» I would choose **1.' + res + '**!')
        	.setFooter({ text: '» ' + vote + ' » ' + config.version });

        if (lang === 'de') {
            message = new EmbedBuilder().setColor(0x37009B)
        	    .setTitle('<:CUBE:1024404832452350032> » ZUFÄLLIGE MINECRAFT config.version')
  			    .setDescription('» Ich würde **1.' + res + '** nehmen!')
        	    .setFooter({ text: '» ' + vote + ' » ' + config.version });
        }

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] MCVER : 1.' + res)
        return interaction.reply({ embeds: [message] })
    },
};