const { EmbedBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, BaseClient } = require('discord.js');
const { version } = require('../../../config.json');

module.exports = {
    data: {
        name: 'rps-paper'
    },
    async execute(interaction, client, vote, bet) {
        // Get Users
        const cache = interaction.message.embeds
        const description = cache[0].description.toString().replace(/[^\d@!]/g, '').split('!')[0].substring(1).split("@");
        const [sender, reciever] = description

        // Check if User is playing
        if (sender.toString().replace(/\D/g, '') != interaction.user.id.replace(/\D/g, '') && reciever.toString().replace(/\D/g, '') != interaction.user.id.replace(/\D/g, '')) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('» ERROR')
        		.setDescription('» You arent playing!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
        		    .setTitle('» FEHLER')
        		    .setDescription('» Du spielst garnicht mit!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [BTN] RPS : NOTPLAYING')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Set Variable
        eval('global.rps' + interaction.user.id.replace(/\D/g, '') + ' = "PAPER"')

        // Check if Game is Done
        let done
        try {
            eval('rps' + sender.toString().replace(/\D/g, ''))
            eval('rps' + reciever.toString().replace(/\D/g, ''))

            done = true
        } catch (e) {
            done = false
        }
        if (done) {
            // Calculate Winner
            const psc = eval('rps' + sender.toString().replace(/\D/g, ''))
            const prc = eval('rps' + reciever.toString().replace(/\D/g, ''))
            let win = 'none'
            if (psc == 'ROCK' && prc == 'PAPER') { win = 'pr' }
            if (psc == 'ROCK' && prc == 'SCISSORS') { win = 'ps' }
            if (psc == 'SCISSORS' && prc == 'ROCK') { win = 'pr' }
            if (psc == 'SCISSORS' && prc == 'PAPER') { win = 'ps' }
            if (psc == 'PAPER' && prc == 'ROCK') { win = 'ps' }
            if (psc == 'PAPER' && prc == 'SCISSORS') { win = 'pr' }
            let winner
            if (win == 'ps') { winner = '<@' + sender.toString().replace(/\D/g, '') + '>' }
            if (win == 'pr') { winner = '<@' + reciever.toString().replace(/\D/g, '') + '>' }
            if (win == 'none') { winner = '**Noone**' }
            if (win == 'none' && interaction.guildLocale == "de") { winner = '**Niemand**' }

            // Transfer Money
            const betwon = parseInt(bet) * 2
            if (winner != '**Noone**' && winner != '**Niemand**') {
                bals.add(winner.toString().replace(/\D/g, ''), parseInt(betwon))
            } else {
                bals.add(sender.toString().replace(/\D/g, ''), parseInt(bet))
                bals.add(reciever.toString().replace(/\D/g, ''), parseInt(bet))
            }

            // Create Embed
            let send
            let reci
            if (eval('rps' + sender.toString().replace(/\D/g, '')) == 'SCISSORS') { send = '✂️ SCISSORS' }
            if (eval('rps' + sender.toString().replace(/\D/g, '')) == 'PAPER') { send = '📝 PAPER' }
            if (eval('rps' + sender.toString().replace(/\D/g, '')) == 'ROCK') { send = '🪨 ROCK' }
            if (eval('rps' + reciever.toString().replace(/\D/g, '')) == 'ROCK') { reci = '🪨 ROCK' }
            if (eval('rps' + reciever.toString().replace(/\D/g, '')) == 'PAPER') { reci = '📝 PAPER' }
            if (eval('rps' + reciever.toString().replace(/\D/g, '')) == 'SCISSORS') { reci = '✂️ SCISSORS' }

            let message = new EmbedBuilder()
                .setTitle('» ROCK PAPER SCISSORS')
                .setDescription('» <@' + sender.toString().replace(/\D/g, '') + '> selected **' + eval('rps' + sender.toString().replace(/\D/g, '')) + '**\n» <@' + reciever.toString().replace(/\D/g, '') + '> selected **' + eval('rps' + reciever.toString().replace(/\D/g, '')) + '**\n\n» ' + winner + ' won **$' + betwon + '**.')
                .setFooter({ text: '» ' + vote + ' » ' + version });

            if (interaction.guildLocale == "de") {
                if (eval('rps' + sender.toString().replace(/\D/g, '')) == 'SCISSORS') { send = '✂️ SCHERE' }
                if (eval('rps' + sender.toString().replace(/\D/g, '')) == 'PAPER') { send = '📝 PAPIER' }
                if (eval('rps' + sender.toString().replace(/\D/g, '')) == 'ROCK') { send = '🪨 STEIN' }
                if (eval('rps' + reciever.toString().replace(/\D/g, '')) == 'ROCK') { reci = '🪨 STEIN' }
                if (eval('rps' + reciever.toString().replace(/\D/g, '')) == 'PAPER') { reci = '📝 PAPIER' }
                if (eval('rps' + reciever.toString().replace(/\D/g, '')) == 'SCISSORS') { reci = '✂️ SCHERE' }

                message = new EmbedBuilder()
                    .setTitle('» SCHERE STEIN PAPIER')
                    .setDescription('» <@' + sender.toString().replace(/\D/g, '') + '> wählte **' + send + '**\n» <@' + reciever.toString().replace(/\D/g, '') + '> wählte **' + reci + '**\n\n» ' + winner + ' hat **' + betwon + '€** gewonnen.')
                    .setFooter({ text: '» ' + vote + ' » ' + version });
            }

            // Delete Variables
            eval('delete rps' + sender.toString().replace(/\D/g, ''))
            eval('delete rps' + reciever.toString().replace(/\D/g, ''))

            eval('delete rpss' + sender.toString().replace(/\D/g, ''))
            eval('delete rpss' + reciever.toString().replace(/\D/g, ''))

            // Create Buttons to Replace
            let row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('🪨 ROCK')
                    .setCustomId('RPS-1-' + bet)
					.setStyle(ButtonStyle.Secondary)
                    .setDisabled(true),

                new ButtonBuilder()
					.setLabel('📝 PAPER')
                    .setCustomId('RPS-2-' + bet)
					.setStyle(ButtonStyle.Secondary)
                    .setDisabled(true),

                new ButtonBuilder()
					.setLabel('✂️ SCISSORS')
                    .setCustomId('RPS-3-' + bet)
					.setStyle(ButtonStyle.Secondary)
                    .setDisabled(true),
			);

            if (interaction.guildLocale == "de") {
                row = new ActionRowBuilder()
		    	    .addComponents(
                         new ButtonBuilder()
		    		    	.setLabel('✂️ SCHERE')
                            .setCustomId('RPS-3-' + bet)
		    			    .setStyle(ButtonStyle.Secondary)
                            .setDisabled(true),

		    	    	new ButtonBuilder()
		    	    		.setLabel('🪨 STEIN')
                            .setCustomId('RPS-1-' + bet)
		    	    		.setStyle(ButtonStyle.Secondary)
                            .setDisabled(true),

                        new ButtonBuilder()
		    	    		.setLabel('📝 PAPIER')
                            .setCustomId('RPS-2-' + bet)
		        		    .setStyle(ButtonStyle.Secondary)
                            .setDisabled(true),
		    	);
            }

            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [BTN] RPS : DONE')
            return interaction.update({ embeds: [message.toJSON()], components: [row], ephemeral: true })
        }

        // Create Embed
        let message = new EmbedBuilder()
        .setTitle('» ROCK PAPER SCISSORS')
        .setDescription('» You selected **PAPER**!')
        .setFooter({ text: '» ' + vote + ' » ' + version });

        if (interaction.guildLocale == "de") {
            message = new EmbedBuilder()
                .setTitle('» SCHERE STEIN PAPIER')
                .setDescription('» Du hast **PAPIER** ausgewählt!')
                .setFooter({ text: '» ' + vote + ' » ' + version });
        }

        // Send Message
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [BTN] RPS : PAPER')
        return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
    }
}