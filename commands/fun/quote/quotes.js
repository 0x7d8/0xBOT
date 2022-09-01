const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quotes')
    	.setDMPermission(false)
        .setDescription('SEE THE QUOTES')
        .setDescriptionLocalizations({
            de: 'SEHE DIE ZITATE'
        })
        .addUserOption(option =>
            option.setName('user')
                .setNameLocalizations({
                    de: 'nutzer'
                })
                .setDescription('THE USER')
                .setDescriptionLocalizations({
                    de: 'DER NUTZER'
                })
                .setRequired(false)),
    async execute(interaction) {
        // Count to Global Commands
        addcmd('t-all', 1)
        
        // Count Guild Commands and User
        addcmd('g-' + interaction.guild.id, 1)
        addcmd('u-' + interaction.user.id, 1)
        
        // Set Variables
        const user = interaction.options.getUser("user")

        // Set User ID
        let money
        if (user == null) {
            money = await getqut('<@' + interaction.user.id + '>');
            console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] QUOTES : ' + money);
        } else {
            money = await getqut('<@' + user + '>');
            console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] QUOTES : ' + user + ' : ' + money);
        }
        
        // Check if Plural or not
        let word
        if (money > 1) {
            word = "Quotes";
        } else {
            word = "Quote";
        }
        
        // Create Embed
        let message
        if (user == null) {
        	message = new EmbedBuilder()
            	.setTitle('» DEINE QUOTES')
  				.setDescription('» Du hast **' + money + '** ' + word + '!')
            	.setFooter({ text: '» ' + version });
        } else {
            message = new EmbedBuilder()
            	.setTitle('» DIE QUOTES')
  				.setDescription('» <@' + user + '> hat **' + money + '** ' + word + '!')
            	.setFooter({ text: '» ' + version });
        }

        // Send Message
        return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
    },
};