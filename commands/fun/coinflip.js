const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('coinflip')
    	.setDMPermission(false)
        .setDescription('WIRF EINE MÜNZE'),
    async execute(interaction) {
        // Count to Global Commands
        addcmd('t-all', 1)
        
        // Count Guild Commands and User
        addcmd('g-' + interaction.guild.id, 1)
        addcmd('u-' + interaction.user.id, 1)
        
        // Set Variables
        const random = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
        
        // Check Maintenance
        const { maintenance } = require('../../config.json');
        if (maintenance == 'yes' && interaction.user.id != '745619551865012274') {
            // Create Embed
            var mterr = new EmbedBuilder()
        		.setTitle('» FEHLER')
        		.setDescription('» Der Bot ist aktuell unter Wartungsarbeiten!')
        		.setFooter({ text: '» ' + version });
            
            return interaction.reply({ embeds: [mterr.toJSON()], ephemeral: true })
        }
        
        // Translate to Word
        if (random == '1') {
            var coin = 'KOPF'
        } else {
            var coin = 'ZAHL'
        }
        
        // Create Embed
        const message = new EmbedBuilder()
        	.setTitle('» COINFLIP')
  			.setDescription('» Die Münze ist auf **' + coin + '** gelandet!')
        	.setFooter({ text: '» ' + version });
        
        // Send Message
        console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] COINFLIP : ' + coin)
        return interaction.reply({ embeds: [message.toJSON()] })
    },
};