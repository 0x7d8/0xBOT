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
        .setDescription('SEE STOCKS')
        .setDescriptionLocalizations({
            de: 'SEHE AKTIEN'
        })
        .addUserOption(option =>
            option.setName('user')
                .setNameLocalizations({
                    de: 'nutzer'
                })
                .setDescription('THE USER')
                .setDescriptionLocalizations({
                    de: 'DER NUTZER'
                })
                .setRequired(false)),
    async execute(interaction) {
        // Count to Global Commands
        addcmd('t-all', 1)
        
        // Count Guild Commands and User
        addcmd('g-' + interaction.guild.id, 1)
        addcmd('u-' + interaction.user.id, 1)
        
        // Set Variables
        const user = interaction.options.getUser("user")
        let green
        let greenmax
        let blue
        let bluemax
        let yellow
        let yellowmax
        let red
        let redmax

        if (user == null) {
            green = await getgrn('<@' + interaction.user.id + '>');
            greenmax = await getgrnx('<@' + interaction.user.id + '>');
            blue = await getblu('<@' + interaction.user.id + '>');
            bluemax = await getblux('<@' + interaction.user.id + '>');
            yellow = await getyll('<@' + interaction.user.id + '>');
            yellowmax = await getyllx('<@' + interaction.user.id + '>');
            red = await getred('<@' + interaction.user.id + '>');
            redmax = await getredx('<@' + interaction.user.id + '>');

            // Convert Max Stocks
            if (greenmax == 0) { greenmax = 10; addgrnx('<@' + interaction.user.id + '>', 10) }
            if (bluemax == 0) { bluemax = 10; addblux('<@' + interaction.user.id + '>', 10) }
            if (yellowmax == 0) { yellowmax = 10; addyllx('<@' + interaction.user.id + '>', 10) }
            if (redmax == 0) { redmax = 10; addredx('<@' + interaction.user.id + '>', 10) }
        } else {
            green = await getgrn('<@' + user + '>');
            greenmax = await getgrnx('<@' + user + '>');
            blue = await getblu('<@' + user + '>');
            bluemax = await getblux('<@' + user + '>');
            yellow = await getyll('<@' + user + '>');
            yellowmax = await getyllx('<@' + user + '>');
            red = await getred('<@' + user + '>');
            redmax = await getredx('<@' + user + '>');

            // Convert Max Stocks
            if (greenmax == 0) { greenmax = 10; addgrnx('<@' + user + '>', 10) }
            if (bluemax == 0) { bluemax = 10; addblux('<@' + user + '>', 10) }
            if (yellowmax == 0) { yellowmax = 10; addyllx('<@' + user + '>', 10) }
            if (redmax == 0) { redmax = 10; addredx('<@' + user + '>', 10) }
        }

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
                .setDescription('» 🟢 GRÜNE AKTIEN\n`' + green + '/' + greenmax + '`\n\n» 🔵 BLAUE AKTIEN\n`' + blue + '/' + bluemax + '`\n\n» 🟡 GELBE AKTIEN\n`' + yellow + '/' + yellowmax + '`\n\n» 🔴 ROTE AKTIEN\n`' + red + '/' + redmax + '`')
                .setFooter({ text: '» ' + version });
        } else {
            message = new EmbedBuilder()
                .setTitle('» DIE AKTIEN VON ' + username.username.toUpperCase() + '#' + username.discriminator)
                .setDescription('» 🟢 GRÜNE AKTIEN\n`' + green + '/' + greenmax + '`\n\n» 🔵 BLAUE AKTIEN\n`' + blue + '/' + bluemax + '`\n\n» 🟡 GELBE AKTIEN\n`' + yellow + '/' + yellowmax + '`\n\n» 🔴 ROTE AKTIEN\n`' + red + '/' + redmax + '`')
                .setFooter({ text: '» ' + version });
        }

        // Send Message
        console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] STOCKS : ' + green + ' : ' + blue + ' : ' + yellow + ' : ' + red)
        return interaction.reply({ embeds: [message.toJSON()] })
    },
};