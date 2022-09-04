const { SlashCommandBuilder } = require('@discordjs/builders');
const { version, token } = require('../../config.json');
const { EmbedBuilder } = require('@discordjs/builders');

// Register Client
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.login(token)

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
        cmds.add('t-all', 1)
        
        // Count Guild Commands and User
        cmds.add('g-' + interaction.guild.id, 1)
        cmds.add('u-' + interaction.user.id, 1)

        // Set Variables
        const botping = Math.round(client.ws.ping)

        // Create Embed
        const messaged = new EmbedBuilder()
        		.setTitle('» BOT PING')
        		.setDescription('» Der Ping vom Bot ist **' + botping + 'ms**!')
        		.setFooter({ text: '» ' + version });

        // Send Correct Response
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString() + '] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] PING : ' + botping + 'ms')
        return interaction.reply({ embeds: [messaged.toJSON()], ephemeral: true })
    },
};