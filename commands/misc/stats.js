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

        // Create Embed
        const message = new EmbedBuilder()
        		.setTitle('» BOT STATISTIKEN')
        		.setDescription('**»» BEFEHL STATS**\n» GLOBAL\n`' + totalcmd + '`\n\n» DIESER SERVER\n`' + guildcmd + '`\n\n» DU INSGESAMT\n`' + usercmd + '`')
        		.setFooter({ text: '» ' + version });

        // Send Correct Response
        console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] STATS')
        return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
    },
};