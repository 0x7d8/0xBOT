const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stocks')
    	.setDMPermission(false)
        .setDescription('DEINE AKTIEN'),
    async execute(interaction) {
        // Count to Global Commands
        addcmd('t-all', 1)
        
        // Count Guild Commands and User
        addcmd('g-' + interaction.guild.id, 1)
        addcmd('u-' + interaction.user.id, 1)
        
        // Set Variables
        const blue = await getblu('<@' + interaction.user.id + '>');
        const yellow = await getyll('<@' + interaction.user.id + '>');
        const red = await getred('<@' + interaction.user.id + '>');

        // Create Embed
        const message = new EmbedBuilder()
            .setTitle('» DEINE AKTIEN')
            .setDescription('» BLAUE\n`' + blue + '`\n\n» GELBE\n`' + yellow + '`\n\n» ROTE\n`' + red + '`')
            .setFooter({ text: '» ' + version });

        // Send Message
        console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] STOCKS : ' + blue + ' : ' + yellow + ' : ' + red)
        return interaction.reply({ embeds: [message.toJSON()] })
    },
};