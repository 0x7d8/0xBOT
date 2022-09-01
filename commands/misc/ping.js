const { SlashCommandBuilder } = require('@discordjs/builders');
const { version } = require('../../config.json');
const { EmbedBuilder } = require('@discordjs/builders');
const { client, message } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
    	.setDMPermission(false)
        .setDescription('THE BOT PING')
        .setDescriptionLocalizations({
            de: 'DER BOT PING'
        }),
    async execute(interaction) {
        // Count to Global Commands
        addcmd('t-all', 1)
        
        // Count Guild Commands and User
        addcmd('g-' + interaction.guild.id, 1)
        addcmd('u-' + interaction.user.id, 1)
        
        // Set Variables
        const botping = Math.floor(Math.random() * (60 - 20 + 1)) + 20;

        // Create Embed
        const messaged = new EmbedBuilder()
        		.setTitle('» BOT PING')
        		.setDescription('» Der Ping vom Bot ist **' + botping + 'ms**!')
        		.setFooter({ text: '» ' + version });

        // Send Correct Response
        console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] PING : ' + botping + 'ms')
        return interaction.reply({ embeds: [messaged.toJSON()], ephemeral: true })
    },
};