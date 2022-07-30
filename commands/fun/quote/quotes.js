const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quotes')
    	.setDMPermission(false)
        .setDescription('SEHE DIE QUOTES')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('DER NUTZER')
                .setRequired(false)),
    async execute(interaction) {
        // Count to Global Commands
        addcmd('t-all', 1)
        
        // Count Guild Commands and User
        addcmd('g-' + interaction.guild.id, 1)
        addcmd('u-' + interaction.user.id, 1)
        
        // Set Variables
        const user = interaction.options.getUser("user")
        
        // Check Maintenance
        const { maintenance } = require('../../../config.json');
        if (maintenance == 'yes' && interaction.user.id != '745619551865012274') {
            // Create Embed
            var mterr = new EmbedBuilder()
        		.setTitle('» FEHLER')
        		.setDescription('» Der Bot ist aktuell unter Wartungsarbeiten!')
        		.setFooter({ text: '» ' + version });
            
            return interaction.reply({ embeds: [mterr.toJSON()], ephemeral: true })
        }
        
        // Set User ID
        if (user == null) {
            var money = await getqut('<@' + interaction.user.id + '>');
            console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] QUOTES : ' + money);
        } else {
            var money = await getqut('<@' + user + '>');
            console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] QUOTES : ' + user + ' : ' + money);
        }
        
        // Check if Plural or not
        if (money > 1) {
            var word = "Quotes";
        } else {
            var word = "Quote";
        }
        
        // Create Embed
        if (user == null) {
        	var message = new EmbedBuilder()
            	.setTitle('» DEINE QUOTES')
  				.setDescription('» Du hast **' + money + '** ' + word + '!')
            	.setFooter({ text: '» ' + version });
        } else {
            var message = new EmbedBuilder()
            	.setTitle('» DIE QUOTES')
  				.setDescription('» <@' + user + '> hat **' + money + '** ' + word + '!')
            	.setFooter({ text: '» ' + version });
        }

        // Send Message
        return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
    },
};