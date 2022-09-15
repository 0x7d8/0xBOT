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
    async execute(interaction, client, lang, vote) {
        // Set Variables
        const totalcmd = await cmds.get('t-all');
        const guildcmd = await cmds.get('g-' + interaction.guild.id);
        const usercmd = await cmds.get('u-' + interaction.user.id.replace(/\D/g, ''))
        const totalbtn = await btns.get('t-all');
        const guildbtn = await btns.get('g-' + interaction.guild.id);
        const userbtn = await btns.get('u-' + interaction.user.id.replace(/\D/g, ''))

        // Create Embed
        let message = new EmbedBuilder()
        		.setTitle('» BOT STATISTICS')
        		.setDescription('**»» COMMAND STATS**\n» GLOBAL\n`' + totalcmd + '`\n\n» THIS SERVER\n`' + guildcmd + '`\n\n» YOU IN TOTAL\n`' + usercmd + '`\n\n**»» BUTTON STATS**\n» GLOBAL\n`' + totalbtn + '`\n\n» THIS SERVER\n`' + guildbtn + '`\n\n» YOU IN TOTAL\n`' + userbtn + '`')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

        if (lang.toString() == "de") {
            message = new EmbedBuilder()
        		.setTitle('» BOT STATISTIKEN')
        		.setDescription('**»» BEFEHL STATS**\n» GLOBAL\n`' + totalcmd + '`\n\n» DIESER SERVER\n`' + guildcmd + '`\n\n» DU INSGESAMT\n`' + usercmd + '`\n\n**»» BUTTON STATS**\n» GLOBAL\n`' + totalbtn + '`\n\n» DIESER SERVER\n`' + guildbtn + '`\n\n» DU INSGESAMT\n`' + userbtn + '`')
        		.setFooter({ text: '» ' + vote + ' » ' + version });
        }

        // Send Correct Response
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] STATS')
        return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
    },
};