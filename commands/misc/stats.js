const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
    	.setDMPermission(false)
        .setDescription('SEE STATS')
        .setDescriptionLocalizations({
            de: 'SEHE STATISTIKEN'
        }),
    async execute(interaction) {
        // Set Variables
        const totalcmd = await getcmd('t-all');
        const guildcmd = await getcmd('g-' + interaction.guild.id);
        const usercmd = await getcmd('u-' + interaction.user.id);

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