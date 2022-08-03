const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('number')
    	.setDMPermission(false)
        .setDescription('GENERIERE EINE NUMMER')
        .addIntegerOption(option =>
            option.setName('min')
                .setDescription('DAS MINIMUM')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('max')
                .setDescription('DAS MAXIMUM')
                .setRequired(true)),
    async execute(interaction) {
        // Count to Global Commands
        addcmd('t-all', 1)
        
        // Count Guild Commands and User
        addcmd('g-' + interaction.guild.id, 1)
        addcmd('u-' + interaction.user.id, 1)
        
        // Set Variables
        const min = interaction.options.getInteger("min")
        const max = interaction.options.getInteger("max")
        const res = Math.floor(Math.random() * (max - min + 1)) + min;
        
        // Check Maintenance
        const { maintenance } = require('../../config.json');
        if (maintenance == 'yes' && interaction.user.id != '745619551865012274') {
            // Create Embed
            var err = new EmbedBuilder()
        		.setTitle('» FEHLER')
        		.setDescription('» Der Bot ist aktuell unter Wartungsarbeiten!')
        		.setFooter({ text: '» ' + version });
            
            return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
        }
        
        // Create Embed
        const message = new EmbedBuilder()
        	.setTitle('» ZUFÄLLIGE NUMMER')
  			.setDescription('» Zwischen **' + min + '** und **' + max + '** wähle ich **' + res + '**!')
        	.setFooter({ text: '» ' + version });

        // Send Message
        console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] NUMBER : ' + min + ' : ' + max + ' : ' + res)
        return interaction.reply({ embeds: [message.toJSON()] })
    },
};