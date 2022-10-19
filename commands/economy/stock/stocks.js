const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders')

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
        if (!await bot.settings.get(interaction.guild.id, 'stocks')) {
            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» Stocks are disabled on this Server!')
        		.setFooter({ text: '» ' + vote + ' » ' + config.version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Aktien sind auf diesem Server deaktiviert!')
        		    .setFooter({ text: '» ' + vote + ' » ' + config.version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] STOCKS : DISABLED')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }
        
        // Set Variables
        const user = interaction.options.getUser("user")
        
        // Set User Object
        let userobj = interaction.user
        if (user !== null) userobj = user

        // Fetch Stocks
        const green = await bot.stocks.get(userobj.id, 'green', 'used')
        const greenMax = await bot.stocks.get(userobj.id, 'green', 'max')
        const blue = await bot.stocks.get(userobj.id, 'blue', 'used')
        const blueMax = await bot.stocks.get(userobj.id, 'blue', 'max')
        const yellow = await bot.stocks.get(userobj.id, 'yellow', 'used')
        const yellowMax = await bot.stocks.get(userobj.id, 'yellow', 'max')
        const red = await bot.stocks.get(userobj.id, 'red', 'used')
        const redMax = await bot.stocks.get(userobj.id, 'red', 'max')
        const white = await bot.stocks.get(userobj.id, 'white', 'used')
        const whiteMax = await bot.stocks.get(userobj.id, 'white', 'max')
        const black = await bot.stocks.get(userobj.id, 'black', 'used')
        const blackMax = await bot.stocks.get(userobj.id, 'black', 'max')

        // Create Embed
        let message
        if (user == null) {
            message = new EmbedBuilder().setColor(0x37009B)
                .setTitle('<:CHART:1024398298204876941> » YOUR STOCKS')
                .setDescription('» 🟢 GREEN STOCKS\n`' + green + '/' + greenMax + '`\n\n» 🔵 BLUE STOCKS\n`' + blue + '/' + blueMax + '`\n\n» 🟡 YELLOW STOCKS\n`' + yellow + '/' + yellowMax + '`\n\n» 🔴 RED STOCKS\n`' + red + '/' + redMax + '`\n\n» ⚪ WHITE STOCKS\n`' + white + '/' + whiteMax + '`\n\n» ⚫ BLACK STOCKS\n`' + black + '/' + blackMax + '`')
                .setFooter({ text: '» ' + vote + ' » ' + config.version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:CHART:1024398298204876941> » DEINE AKTIEN')
                    .setDescription('» 🟢 GRÜNE AKTIEN\n`' + green + '/' + greenMax + '`\n\n» 🔵 BLAUE AKTIEN\n`' + blue + '/' + blueMax + '`\n\n» 🟡 GELBE AKTIEN\n`' + yellow + '/' + yellowMax + '`\n\n» 🔴 ROTE AKTIEN\n`' + red + '/' + redMax + '`\n\n» ⚪ WEISSE AKTIEN\n`' + white + '/' + whiteMax + '`\n\n» ⚫ SCHWARZE AKTIEN\n`' + black + '/' + blackMax + '`')
                    .setFooter({ text: '» ' + vote + ' » ' + config.version });
            }
        } else {
            message = new EmbedBuilder().setColor(0x37009B)
                .setTitle('<:CHART:1024398298204876941> » THE STOCKS OF ' + user.username.toUpperCase())
                .setDescription('» 🟢 GREEN STOCKS\n`' + green + '/' + greenMax + '`\n\n» 🔵 BLUE STOCKS\n`' + blue + '/' + blueMax + '`\n\n» 🟡 YELLOW STOCKS\n`' + yellow + '/' + yellowMax + '`\n\n» 🔴 RED STOCKS\n`' + red + '/' + redMax + '`\n\n» ⚪ WHITE STOCKS\n`' + white + '/' + whiteMax + '`\n\n» ⚫ BLACK STOCKS\n`' + black + '/' + blackMax + '`')
                .setFooter({ text: '» ' + vote + ' » ' + config.version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:CHART:1024398298204876941> » DIE AKTIEN VON ' + user.username.toUpperCase())
                    .setDescription('» 🟢 GRÜNE AKTIEN\n`' + green + '/' + greenMax + '`\n\n» 🔵 BLAUE AKTIEN\n`' + blue + '/' + blueMax + '`\n\n» 🟡 GELBE AKTIEN\n`' + yellow + '/' + yellowMax + '`\n\n» 🔴 ROTE AKTIEN\n`' + red + '/' + redMax + '`\n\n» ⚪ WEISSE AKTIEN\n`' + white + '/' + whiteMax + '`\n\n» ⚫ SCHWARZE AKTIEN\n`' + black + '/' + blackMax + '`')
                    .setFooter({ text: '» ' + vote + ' » ' + config.version });
            }
        }

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] STOCKS : ' + green + ' : ' + blue + ' : ' + yellow + ' : ' + red + ' : ' + white + ' : ' + black)
        return interaction.reply({ embeds: [message] })
    },
};