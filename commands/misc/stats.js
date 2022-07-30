const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
    	.setDMPermission(false)
        .setDescription('SEHE STATISTIKEN'),
    async execute(interaction) {
        // Set Variables
        var totalcmd = await getcmd('t-all');
        var guildcmd = await getcmd('g-' + interaction.guild.id);
        var usercmd = await getcmd('u-' + interaction.user.id);
        
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
        
        // Create Embed
        const message = new EmbedBuilder()
        		.setTitle('» BOT STATISTIKEN')
        		.setDescription('**»» BEFEHL STATS**\n» GLOBAL\n' + totalcmd + '\n» DIESER SERVER\n' + guildcmd + '\n» DU INSGESAMT\n' + usercmd)
        		.setFooter({ text: '» ' + version });

        // Send Correct Response
        console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] STATS')
        return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
    },
};