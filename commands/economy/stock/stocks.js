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
        cmds.add('t-all', 1)
        
        // Count Guild Commands and User
        cmds.add('g-' + interaction.guild.id, 1)
        cmds.add('u-' + interaction.user.id.replace(/\D/g, ''), 1)
        
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
            green = await sgrn.get(interaction.user.id.replace(/\D/g, ''));
            greenmax = await sgrnx.get(interaction.user.id.replace(/\D/g, ''));
            blue = await sblu.get(interaction.user.id.replace(/\D/g, ''));
            bluemax = await sblux.get(interaction.user.id.replace(/\D/g, ''));
            yellow = await syll.get(interaction.user.id.replace(/\D/g, ''));
            yellowmax = await syllx.get(interaction.user.id.replace(/\D/g, ''));
            red = await sred.get(interaction.user.id.replace(/\D/g, ''));
            redmax = await sredx.get(interaction.user.id.replace(/\D/g, ''));

            // Convert Max Stocks
            if (greenmax == 0) { greenmax = 10; sgrnx.add(interaction.user.id.replace(/\D/g, ''), 10) }
            if (bluemax == 0) { bluemax = 10; sblux.add(interaction.user.id.replace(/\D/g, ''), 10) }
            if (yellowmax == 0) { yellowmax = 10; syllx.add(interaction.user.id.replace(/\D/g, ''), 10) }
            if (redmax == 0) { redmax = 10; sredx.add(interaction.user.id.replace(/\D/g, ''), 10) }
        } else {
            green = await sgrn.get(user.toString().replace(/\D/g, ''));
            greenmax = await sgrnx.get(user.toString().replace(/\D/g, ''));
            blue = await sblu.get(user.toString().replace(/\D/g, ''));
            bluemax = await sblux.get(user.toString().replace(/\D/g, ''));
            yellow = await syll.get(user.toString().replace(/\D/g, ''));
            yellowmax = await syllx.get(user.toString().replace(/\D/g, ''));
            red = await sred.get(user.toString().replace(/\D/g, ''));
            redmax = await sredx.get(user.toString().replace(/\D/g, ''));

            // Convert Max Stocks
            if (greenmax == 0) { greenmax = 10; sgrnx.add(user.toString().replace(/\D/g, ''), 10) }
            if (bluemax == 0) { bluemax = 10; sblux.add(user.toString().replace(/\D/g, ''), 10) }
            if (yellowmax == 0) { yellowmax = 10; syllx.add(user.toString().replace(/\D/g, ''), 10) }
            if (redmax == 0) { redmax = 10; sredx.add(user.toString().replace(/\D/g, ''), 10) }
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
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] STOCKS : ' + green + ' : ' + blue + ' : ' + yellow + ' : ' + red)
        return interaction.reply({ embeds: [message.toJSON()] })
    },
};