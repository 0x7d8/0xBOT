const { SlashCommandBuilder } = require('@discordjs/builders');
const { version } = require('../../config.json');
const { EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('version')
    	.setDMPermission(false)
        .setDescription('THE BOT VERSION')
        .setDescriptionLocalizations({
            de: 'DIE BOT VERSION'
        }),
    async execute(interaction) {
        // Count to Global Commands
        cmds.add('t-all', 1)
        
        // Count Guild Commands and User
        cmds.add('g-' + interaction.guild.id, 1)
        cmds.add('u-' + interaction.user.id.replace(/\D/g, ''), 1)

        // Create Embed
        const message = new EmbedBuilder()
        		.setTitle('» BOT VERSION')
        		.setDescription('» VERSION\n`' + version + '`\n\n» FRAMEWORK\n`discord.js v14 (14.3.0)`\n\n» AUTOR\n`0x4096#7678`')
        		.setFooter({ text: '» ' + version });

        // Send Correct Response
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] VERSION')
        return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
    },
};