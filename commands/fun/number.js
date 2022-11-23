const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders')

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
    async execute(interaction, client, lang, vote) {
        // Set Variables
        const min = interaction.options.getInteger("min")
        const max = interaction.options.getInteger("max")
        const res = bot.random(min, max)

        // Create Embed
        let message = new EmbedBuilder().setColor(0x37009B)
        	.setTitle('<:GEAR:1024404241701417011> » RANDOM NUMBER')
  			.setDescription('» Between **' + min + '** and **' + max + '** I choose **' + res + '**!')
        	.setFooter({ text: '» ' + vote + ' » ' + config.version });

        if (lang === 'de') {
            message = new EmbedBuilder().setColor(0x37009B)
        	    .setTitle('<:GEAR:1024404241701417011> » ZUFÄLLIGE NUMMER')
  			    .setDescription('» Zwischen **' + min + '** und **' + max + '** wähle ich **' + res + '**!')
        	    .setFooter({ text: '» ' + vote + ' » ' + config.version });
        }

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] NUMBER : ' + min + ' : ' + max + ' : ' + res)
        return interaction.reply({ embeds: [message] })
    }
}