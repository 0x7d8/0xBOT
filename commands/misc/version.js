const { SlashCommandBuilder } = require('@discordjs/builders');
const { version } = require('../../config.json');
const { EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('version')
    	.setDMPermission(false)
        .setDescription('DIE BOT VERSION'),
    async execute(interaction) {
        // Count to Global Commands
        addcmd('t-all', 1)
        
        // Count Guild Commands and User
        addcmd('g-' + interaction.guild.id, 1)
        addcmd('u-' + interaction.user.id, 1)
        
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
        		.setTitle('» BOT VERSION')
        		.setDescription('» VERSION\n`' + version + '`\n\n» AUTOR\n`0x4096#7678`')
        		.setFooter({ text: '» ' + version });

        // Send Correct Response
        console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] VERSION')
        return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
    },
};