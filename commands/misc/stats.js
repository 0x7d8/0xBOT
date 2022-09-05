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
        const totalcmd = await cmds.get('t-all');
        const guildcmd = await cmds.get('g-' + interaction.guild.id);
        const usercmd = await cmds.get('u-' + interaction.user.id.replace(/\D/g, ''));

        // Create Embed
        const message = new EmbedBuilder()
        		.setTitle('» BOT STATISTIKEN')
        		.setDescription('**»» BEFEHL STATS**\n» GLOBAL\n`' + totalcmd + '`\n\n» DIESER SERVER\n`' + guildcmd + '`\n\n» DU INSGESAMT\n`' + usercmd + '`')
        		.setFooter({ text: '» ' + version });

        // Send Correct Response
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] STATS')
        return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
    },
};