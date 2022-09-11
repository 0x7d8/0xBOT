const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stockupgrade')
    	.setDMPermission(false)
        .setDescription('BUY STOCK SLOTS')
        .setDescriptionLocalizations({
            de: 'KAUFE AKTIEN SLOTS'
        })
        .addStringOption(option =>
            option.setName('slots')
                .setDescription('THE SLOTS')
                .setDescriptionLocalizations({
                    de: 'DIE SLOTS'
                })
                .setRequired(true)
    			.addChoices(
                    // Setup Choices
                    { name: '💰 [01] 75000€', value: '1' },
                    { name: '💰 [02] 150000€', value: '2' },
                    { name: '💰 [03] 225000€', value: '3' },
            		{ name: '💰 [04] 300000€', value: '4' },
            		{ name: '💰 [05] 375000€', value: '5' },
				)),
    async execute(interaction, client, vote) {
        // Set Variables
        const slots = interaction.options.getString("slots")

        const balance = await bals.get(interaction.user.id.replace(/\D/g, ''));

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

        // Calculate Cost
        const cost = parseInt(slots) * 75000

        // Check for enough Money
        if (balance < cost) {
            const missing = cost - balance
            
            // Create Embed
            let message = new EmbedBuilder()
            	.setTitle('» ERROR')
  				.setDescription('» You dont have enough Money for that, you are missing **$' + missing + '**!')
            	.setFooter({ text: '» ' + vote + ' » ' + version });

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
            	    .setTitle('» FEHLER')
  				    .setDescription('» Du hast dafür nicht genug Geld, dir fehlen **' + missing + '€**!')
            	    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] STOCKUPGRADE  : ' + slots + ' : ' + cost + '€ : NOTENOUGHMONEY')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Add Stock Amount
        sgrnx.add(interaction.user.id.replace(/\D/g, ''), parseInt(slots))
        sblux.add(interaction.user.id.replace(/\D/g, ''), parseInt(slots))
        syllx.add(interaction.user.id.replace(/\D/g, ''), parseInt(slots))
        sredx.add(interaction.user.id.replace(/\D/g, ''), parseInt(slots))

        // Remove Money
        bals.rem(interaction.user.id.replace(/\D/g, ''), cost)

        // Create Embed
        let message
        if (slots == 1) {
            message = new EmbedBuilder()
                .setTitle('» BUY STOCK SLOTS')
                .setDescription('» You successfully bought **' + slots + '** extra Stock Slot for **$' + cost + '**!')
                .setFooter({ text: '» ' + vote + ' » ' + version });

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
                    .setTitle('» AKTIEN SLOTS KAUFEN')
                    .setDescription('» Du hast erfolgreich **' + slots + '** extra Aktien Slot für **' + cost + '€** gekauft!')
                    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
        } else {
            message = new EmbedBuilder()
                .setTitle('» BUY STOCK SLOTS')
                .setDescription('» You successfully bought **' + slots + '** extra Stock Slots for **$' + cost + '**!')
                .setFooter({ text: '» ' + vote + ' » ' + version });

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
                    .setTitle('» AKTIEN SLOTS KAUFEN')
                    .setDescription('» Du hast erfolgreich **' + slots + '** extra Aktien Slots für **' + cost + '€** gekauft!')
                    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
        }

        // Send Message
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] STOCKUPGRADE : ' + slots + ' : ' + cost + '€')
        return interaction.reply({ embeds: [message.toJSON()] })
    },
};