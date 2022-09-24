const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../../config.json');

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
    async execute(interaction, client, lang, vote) {
        // Check if Stocks are Enabled in Server
        const ses = await gopt.get(interaction.guild.id + '-STOCKS')
        if (parseInt(ses) == 1) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('» ERROR')
        		.setDescription('» Stocks are disabled on this Server!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang == "de") {
                message = new EmbedBuilder()
        		    .setTitle('» FEHLER')
        		    .setDescription('» Aktien sind auf diesem Server deaktiviert!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] STOCKS : DISABLED')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }
        
        // Set Variables
        const user = interaction.options.getUser("user")
        
        let green, greenmax
        let blue, bluemax
        let yellow, yellowmax
        let red, redmax
        let white, whitemax
        let black, blackmax

        if (user == null) {
            green = await sgrn.get(interaction.user.id);
            greenmax = await sgrnx.get(interaction.user.id);
            blue = await sblu.get(interaction.user.id);
            bluemax = await sblux.get(interaction.user.id);
            yellow = await syll.get(interaction.user.id);
            yellowmax = await syllx.get(interaction.user.id);
            red = await sred.get(interaction.user.id);
            redmax = await sredx.get(interaction.user.id);
            white = await swhi.get(interaction.user.id);
            whitemax = await sredx.get(interaction.user.id);
            black = await sblk.get(interaction.user.id);
            blackmax = await sredx.get(interaction.user.id);

            // Convert Max Stocks
            if (greenmax == 0) { greenmax = 10; sgrnx.add(interaction.user.id, 10) }
            if (bluemax == 0) { bluemax = 10; sblux.add(interaction.user.id, 10) }
            if (yellowmax == 0) { yellowmax = 10; syllx.add(interaction.user.id, 10) }
            if (redmax == 0) { redmax = 10; sredx.add(interaction.user.id, 10) }
            if (whitemax == 0) { whitemax = 10 }
            if (blackmax == 0) { blackmax = 10 }
        } else {
            green = await sgrn.get(user.id);
            greenmax = await sgrnx.get(user.id);
            blue = await sblu.get(user.id);
            bluemax = await sblux.get(user.id);
            yellow = await syll.get(user.id);
            yellowmax = await syllx.get(user.id);
            red = await sred.get(user.id);
            redmax = await sredx.get(user.id);
            white = await swhi.get(user.id);
            whitemax = await sredx.get(user.id);
            black = await sblk.get(user.id);
            blackmax = await sredx.get(user.id);

            // Convert Max Stocks
            if (greenmax == 0) { greenmax = 10; sgrnx.add(user.id, 10) }
            if (bluemax == 0) { bluemax = 10; sblux.add(user.id, 10) }
            if (yellowmax == 0) { yellowmax = 10; syllx.add(user.id, 10) }
            if (redmax == 0) { redmax = 10; sredx.add(user.id, 10) }
            if (whitemax == 0) { whitemax = 10 }
            if (blackmax == 0) { blackmax = 10 }
        }

        // Get Userinfo
        let username
        if (user != null) {
            username = await client.users.fetch(user);
        }

        // Create Embed
        let message
        if (user == null) {
            message = new EmbedBuilder()
                .setTitle('» YOUR STOCKS')
                .setDescription('» 🟢 GREEN STOCKS\n`' + green + '/' + greenmax + '`\n\n» 🔵 BLUE STOCKS\n`' + blue + '/' + bluemax + '`\n\n» 🟡 YELLOW STOCKS\n`' + yellow + '/' + yellowmax + '`\n\n» 🔴 RED STOCKS\n`' + red + '/' + redmax + '`\n\n» ⚪ WHITE STOCKS\n`' + white + '/' + whitemax + '`\n\n» ⚫ BLACK STOCKS\n`' + black + '/' + blackmax + '`')
                .setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang == "de") {
                message = new EmbedBuilder()
                    .setTitle('» DEINE AKTIEN')
                    .setDescription('» 🟢 GRÜNE AKTIEN\n`' + green + '/' + greenmax + '`\n\n» 🔵 BLAUE AKTIEN\n`' + blue + '/' + bluemax + '`\n\n» 🟡 GELBE AKTIEN\n`' + yellow + '/' + yellowmax + '`\n\n» 🔴 ROTE AKTIEN\n`' + red + '/' + redmax + '`\n\n» ⚪ WEISSE AKTIEN\n`' + white + '/' + whitemax + '`\n\n» ⚫ SCHWARZE AKTIEN\n`' + black + '/' + blackmax + '`')
                    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
        } else {
            message = new EmbedBuilder()
                .setTitle('» THE STOCKS OF ' + username.username.toUpperCase() + '#' + username.discriminator)
                .setDescription('» 🟢 GREEN STOCKS\n`' + green + '/' + greenmax + '`\n\n» 🔵 BLUE STOCKS\n`' + blue + '/' + bluemax + '`\n\n» 🟡 YELLOW STOCKS\n`' + yellow + '/' + yellowmax + '`\n\n» 🔴 RED STOCKS\n`' + red + '/' + redmax + '`\n\n» ⚪ WHITE STOCKS\n`' + white + '/' + whitemax + '`\n\n» ⚫ BLACK STOCKS\n`' + black + '/' + blackmax + '`')
                .setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang == "de") {
                message = new EmbedBuilder()
                    .setTitle('» DIE AKTIEN VON ' + username.username.toUpperCase() + '#' + username.discriminator)
                    .setDescription('» 🟢 GRÜNE AKTIEN\n`' + green + '/' + greenmax + '`\n\n» 🔵 BLAUE AKTIEN\n`' + blue + '/' + bluemax + '`\n\n» 🟡 GELBE AKTIEN\n`' + yellow + '/' + yellowmax + '`\n\n» 🔴 ROTE AKTIEN\n`' + red + '/' + redmax + '`\n\n» ⚪ WEISSE AKTIEN\n`' + white + '/' + whitemax + '`\n\n» ⚫ SCHWARZE AKTIEN\n`' + black + '/' + blackmax + '`')
                    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
        }

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] STOCKS : ' + green + ' : ' + blue + ' : ' + yellow + ' : ' + red + ' : ' + white + ' : ' + black)
        return interaction.reply({ embeds: [message.toJSON()] })
    },
};