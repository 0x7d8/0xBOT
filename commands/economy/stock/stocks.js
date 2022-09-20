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

            if (lang.toString() == "de") {
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
                .setDescription('» 🟢 GREEN STOCKS\n`' + green + '/' + greenmax + '`\n\n» 🔵 BLUE STOCKS\n`' + blue + '/' + bluemax + '`\n\n» 🟡 YELLOW STOCKS\n`' + yellow + '/' + yellowmax + '`\n\n» 🔴 RED STOCKS\n`' + red + '/' + redmax + '`')
                .setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang.toString() == "de") {
                message = new EmbedBuilder()
                    .setTitle('» DEINE AKTIEN')
                    .setDescription('» 🟢 GRÜNE AKTIEN\n`' + green + '/' + greenmax + '`\n\n» 🔵 BLAUE AKTIEN\n`' + blue + '/' + bluemax + '`\n\n» 🟡 GELBE AKTIEN\n`' + yellow + '/' + yellowmax + '`\n\n» 🔴 ROTE AKTIEN\n`' + red + '/' + redmax + '`')
                    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
        } else {
            message = new EmbedBuilder()
                .setTitle('» THE STOCKS OF ' + username.username.toUpperCase() + '#' + username.discriminator)
                .setDescription('» 🟢 GREEN STOCKS\n`' + green + '/' + greenmax + '`\n\n» 🔵 BLUE STOCKS\n`' + blue + '/' + bluemax + '`\n\n» 🟡 YELLOW STOCKS\n`' + yellow + '/' + yellowmax + '`\n\n» 🔴 RED STOCKS\n`' + red + '/' + redmax + '`')
                .setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang.toString() == "de") {
                message = new EmbedBuilder()
                    .setTitle('» DIE AKTIEN VON ' + username.username.toUpperCase() + '#' + username.discriminator)
                    .setDescription('» 🟢 GRÜNE AKTIEN\n`' + green + '/' + greenmax + '`\n\n» 🔵 BLAUE AKTIEN\n`' + blue + '/' + bluemax + '`\n\n» 🟡 GELBE AKTIEN\n`' + yellow + '/' + yellowmax + '`\n\n» 🔴 ROTE AKTIEN\n`' + red + '/' + redmax + '`')
                    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
        }

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] STOCKS : ' + green + ' : ' + blue + ' : ' + yellow + ' : ' + red)
        return interaction.reply({ embeds: [message.toJSON()] })
    },
};