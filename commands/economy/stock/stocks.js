const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../../config.json');
const fetch = require("node-fetch");

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
        const blue = await getblu(interaction.user.id );
        const yellow = await getyll(interaction.user.id);
        const red = await getred(interaction.user.id);
        
        // Check Maintenance
        const { maintenance } = require('../../../config.json');
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
            .setTitle('» DEINE AKTIEN')
            .setDescription('» BLAUE\n`' + blue + '`\n\n» GELBE\n`' + yellow + '`\n\n» ROTE\n`' + red + '`')
            .setFooter({ text: '» ' + version });

        // Send Message
        console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] STOCKS : ' + blue + ' : ' + yellow + ' : ' + red)
        return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
    },
};