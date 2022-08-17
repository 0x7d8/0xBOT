const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version, token } = require('../../../config.json');

// Register Client
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.login(token)

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
            bluemax = await getblux('<@' + interaction.user.id + '>');
            yellow = await getyll('<@' + interaction.user.id + '>');
            yellowmax = await getyllx('<@' + interaction.user.id + '>');
            red = await getred('<@' + interaction.user.id + '>');
            redmax = await getredx('<@' + interaction.user.id + '>');
        } else {
            blue = await getblu('<@' + user + '>');
            bluemax = await getblux('<@' + user + '>');
            yellow = await getyll('<@' + user + '>');
            yellowmax = await getyllx('<@' + user + '>');
            red = await getred('<@' + user + '>');
            redmax = await getredx('<@' + user + '>');
        }

        // Convert Max Stocks
        if (bluemax == 0) { bluemax = 10; addblux('<@' + interaction.user.id + '>', 10) }
        if (yellowmax == 0) { yellowmax = 10; addyllx('<@' + interaction.user.id + '>', 10) }
        if (redmax == 0) { redmax = 10; addredx('<@' + interaction.user.id + '>', 10) }

        // Get Username
        let username
        if (user != null) {
            username = await client.users.fetch(user);
        }

        // Create Embed
        let message
        if (user == null) {
            message = new EmbedBuilder()
                .setTitle('» DEINE AKTIEN')
                .setDescription('» 🔵 BLAUE AKTIEN\n`' + blue + '/' + bluemax + '`\n\n» 🟡 GELBE AKTIEN\n`' + yellow + '/' + yellowmax + '`\n\n» 🔴 ROTE AKTIEN\n`' + red + '/' + redmax + '`')
                .setFooter({ text: '» ' + version });
        } else {
            message = new EmbedBuilder()
                .setTitle('» DIE AKTIEN VON ' + username.username.toUpperCase() + '#' + username.discriminator)
                .setDescription('» 🔵 BLAUE AKTIEN\n`' + blue + '`\n\n» 🟡 GELBE AKTIEN\n`' + yellow + '`\n\n» 🔴 ROTE AKTIEN\n`' + red + '`')
                .setFooter({ text: '» ' + version });
        }

        // Send Message
        console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] STOCKS : ' + blue + ' : ' + yellow + ' : ' + red)
        return interaction.reply({ embeds: [message.toJSON()] })
    },
};