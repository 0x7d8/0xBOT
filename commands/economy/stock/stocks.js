const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../../config.json');

// Register Client
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stocks')
    	.setDMPermission(false)
        .setDescription('SEHE AKTIEN')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('DER NUTZER')
                .setRequired(false)),
    async execute(interaction) {
        // Count to Global Commands
        addcmd('t-all', 1)
        
        // Count Guild Commands and User
        addcmd('g-' + interaction.guild.id, 1)
        addcmd('u-' + interaction.user.id, 1)
        
        // Set Variables
        const user = interaction.options.getUser("user")
        let blue
        let yellow
        let red
        if (user == null) {
            blue = await getblu('<@' + interaction.user.id + '>');
            yellow = await getyll('<@' + interaction.user.id + '>');
            red = await getred('<@' + interaction.user.id + '>');
        } else {
            blue = await getblu('<@' + user + '>');
            yellow = await getyll('<@' + user + '>');
            red = await getred('<@' + user + '>');
        }

        // Get Username
        let username
        if (user != null) {
            username = await client.users.fetch(user);
            console.log(username)
        }

        // Create Embed
        let message
        if (user == null) {
            message = new EmbedBuilder()
                .setTitle('» DEINE AKTIEN')
                .setDescription('» BLAUE\n`' + blue + '`\n\n» GELBE\n`' + yellow + '`\n\n» ROTE\n`' + red + '`')
                .setFooter({ text: '» ' + version });
        } else {
            message = new EmbedBuilder()
                .setTitle('» DIE AKTIEN VON <@' + username.username + '>')
                .setDescription('» BLAUE\n`' + blue + '`\n\n» GELBE\n`' + yellow + '`\n\n» ROTE\n`' + red + '`')
                .setFooter({ text: '» ' + version });
        }

        // Send Message
        console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] STOCKS : ' + blue + ' : ' + yellow + ' : ' + red)
        return interaction.reply({ embeds: [message.toJSON()] })
    },
};