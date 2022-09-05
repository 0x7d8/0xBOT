const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mcver')
    	.setDMPermission(false)
        .setDescription('GENERATE A MINECRAFT VERSION')
        .setDescriptionLocalizations({
            de: 'GENERIERE EINE MINECRAFT VERSION'
        }),
    async execute(interaction) {
        // Count to Global Commands
        cmds.add('t-all', 1)
        
        // Count Guild Commands and User
        cmds.add('g-' + interaction.guild.id, 1)
        cmds.add('u-' + interaction.user.id.replace(/\D/g, ''), 1)
        
        // Set Variables
        const res = Math.floor(Math.random() * (19 - 0 + 1)) + 0;

        // Create Embed
        const message = new EmbedBuilder()
        	.setTitle('» ZUFÄLLIGE MINECRAFT VERSION')
  			.setDescription('» Ich würde **1.' + res + '** nehmen!')
        	.setFooter({ text: '» ' + version });

        // Send Message
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] MCVER : 1.' + res)
        return interaction.reply({ embeds: [message.toJSON()] })
    },
};