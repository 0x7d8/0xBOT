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
                    { name: '💰 [01] 100000€', value: '1' },
                    { name: '💰 [02] 200000€', value: '2' },
                    { name: '💰 [03] 300000€', value: '3' },
            		{ name: '💰 [04] 400000€', value: '4' },
            		{ name: '💰 [05] 500000€', value: '5' },
				)),
    async execute(interaction) {
        // Count to Global Commands
        cmds.add('t-all', 1)
        
        // Count Guild Commands and User
        cmds.add('g-' + interaction.guild.id, 1)
        cmds.add('u-' + interaction.user.id, 1)
        
        // Set Variables
        const slots = interaction.options.getString("slots")

        const balance = await bals.get('<@' + interaction.user.id + '>');

        green = await sgrn.get('<@' + interaction.user.id + '>');
        greenmax = await sgrnx.get('<@' + interaction.user.id + '>');
        blue = await sblu.get('<@' + interaction.user.id + '>');
        bluemax = await sblux.get('<@' + interaction.user.id + '>');
        yellow = await syll.get('<@' + interaction.user.id + '>');
        yellowmax = await syllx.get('<@' + interaction.user.id + '>');
        red = await sred.get('<@' + interaction.user.id + '>');
        redmax = await sredx.get('<@' + interaction.user.id + '>');

        // Convert Max Stocks
        if (greenmax == 0) { greenmax = 10; sgrnx.add('<@' + interaction.user.id + '>', 10) }
        if (bluemax == 0) { bluemax = 10; sblux.add('<@' + interaction.user.id + '>', 10) }
        if (yellowmax == 0) { yellowmax = 10; syllx.add('<@' + interaction.user.id + '>', 10) }
        if (redmax == 0) { redmax = 10; sredx.add('<@' + interaction.user.id + '>', 10) }

        // Calculate Cost
        const cost = parseInt(slots) * 100000

        // Check for enough Money
        if (balance < cost) {
            const missing = cost - balance
            
            // Create Embed
            const err = new EmbedBuilder()
            	.setTitle('» FEHLER')
  				.setDescription('» Du hast dafür nicht genug Geld, dir fehlen **' + missing + '€**!')
            	.setFooter({ text: '» ' + version });
            
            // Send Message
            console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] STOCKUPGRADE  : ' + slots + ' : ' + cost + '€ : NOTENOUGHMONEY')
            return interaction.reply({ embeds: [err.toJSON()], ephemeral: true })
        }

        // Add Stock Amount
        sgrnx.add('<@' + interaction.user.id + '>', parseInt(slots))
        sblux.add('<@' + interaction.user.id + '>', parseInt(slots))
        syllx.add('<@' + interaction.user.id + '>', parseInt(slots))
        sredx.add('<@' + interaction.user.id + '>', parseInt(slots))

        // Remove Money
        bals.rem('<@' + interaction.user.id + '>', cost)

        // Create Embed
        let message
        if (slots == 1) {
            message = new EmbedBuilder()
                .setTitle('» AKTIEN SLOTS KAUFEN')
                .setDescription('» Du hast erfolgreich **' + slots + '** extra Aktien Slot für **' + cost + '€** gekauft!')
                .setFooter({ text: '» ' + version });
        } else {
            message = new EmbedBuilder()
                .setTitle('» AKTIEN SLOTS KAUFEN')
                .setDescription('» Du hast erfolgreich **' + slots + '** extra Aktien Slots für **' + cost + '€** gekauft!')
                .setFooter({ text: '» ' + version });
        }

        // Send Message
        console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] STOCKUPGRADE : ' + slots + ' : ' + cost + '€')
        return interaction.reply({ embeds: [message.toJSON()] })
    },
};