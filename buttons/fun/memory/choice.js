const { EmbedBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, BaseClient } = require('discord.js');
const { version } = require('../../../config.json');

module.exports = {
    data: {
        name: 'memory-choice'
    },
    async execute(interaction, client, bet, sel) {
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
        		.setFooter({ text: '» ' + version });

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
        		    .setTitle('» FEHLER')
        		    .setDescription('» Du spielst garnicht mit!')
        		    .setFooter({ text: '» ' + version });
            }
            
            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [BTN] MEMORY : NOTPLAYING')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Set Variable
        const fc = 1017050442431209543
        eval('global.memorydataf' + sel + sender.toString().replace(/\D/g, '') + ' = "' + fc + '"')

        /* Check if Game is Done
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
            const betwon = bet * 2
            if (winner != '**Noone**' && winner != '**Niemand**') {
                bals.add(winner.toString().replace(/\D/g, ''), betwon)
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
                .setFooter({ text: '» ' + version });

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
                    .setFooter({ text: '» ' + version });
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
        } */

        // Create Buttons
        let row1 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
                    .setEmoji('"' + eval('memorydataf1' + sender.toString().replace(/\D/g, '')) + '"')
                    .setCustomId('MEMORY-1-' + bet)
					.setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setEmoji('"' + eval('memorydataf2' + sender.toString().replace(/\D/g, '')) + '"')
                    .setCustomId('MEMORY-2-' + bet)
					.setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setEmoji('"' + eval('memorydataf3' + sender.toString().replace(/\D/g, '')) + '"')
                    .setCustomId('MEMORY-3-' + bet)
					.setStyle(ButtonStyle.Secondary),
                
                new ButtonBuilder()
                    .setEmoji('"' + eval('memorydataf4' + sender.toString().replace(/\D/g, '')) + '"')
                    .setCustomId('MEMORY-4-' + bet)
					.setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setEmoji('"' + eval('memorydataf5' + sender.toString().replace(/\D/g, '')) + '"')
                    .setCustomId('MEMORY-5-' + bet)
					.setStyle(ButtonStyle.Secondary),
			);
        let row2 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
                    .setEmoji('"' + eval('memorydataf6' + sender.toString().replace(/\D/g, '')) + '"')
                    .setCustomId('MEMORY-6-' + bet)
					.setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setEmoji('"' + eval('memorydataf7' + sender.toString().replace(/\D/g, '')) + '"')
                    .setCustomId('MEMORY-7-' + bet)
					.setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setEmoji('"' + eval('memorydataf8' + sender.toString().replace(/\D/g, '')) + '"')
                    .setCustomId('MEMORY-8-' + bet)
					.setStyle(ButtonStyle.Secondary),
                
                new ButtonBuilder()
                    .setEmoji('"' + eval('memorydataf9' + sender.toString().replace(/\D/g, '')) + '"')
                    .setCustomId('MEMORY-9-' + bet)
					.setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setEmoji('"' + eval('memorydataf10' + sender.toString().replace(/\D/g, '')) + '"')
                    .setCustomId('MEMORY-10-' + bet)
					.setStyle(ButtonStyle.Secondary),
			);
        let row3 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
                    .setEmoji('"' + eval('memorydataf11' + sender.toString().replace(/\D/g, '')) + '"')
                    .setCustomId('MEMORY-11-' + bet)
					.setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setEmoji('"' + eval('memorydataf12' + sender.toString().replace(/\D/g, '')) + '"')
                    .setCustomId('MEMORY-12-' + bet)
					.setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setEmoji('"' + eval('memorydataf13' + sender.toString().replace(/\D/g, '')) + '"')
                    .setCustomId('MEMORY-13-' + bet)
					.setStyle(ButtonStyle.Secondary),
                
                new ButtonBuilder()
                    .setEmoji('"' + eval('memorydataf14' + sender.toString().replace(/\D/g, '')) + '"')
                    .setCustomId('MEMORY-14-' + bet)
					.setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setEmoji('"' + eval('memorydataf15' + sender.toString().replace(/\D/g, '')) + '"')
                    .setCustomId('MEMORY-15-' + bet)
					.setStyle(ButtonStyle.Secondary),
			);
        let row4 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
                    .setEmoji('"' + eval('memorydataf16' + sender.toString().replace(/\D/g, '')) + '"')
                    .setCustomId('MEMORY-16-' + bet)
					.setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setEmoji('"' + eval('memorydataf17' + sender.toString().replace(/\D/g, '')) + '"')
                    .setCustomId('MEMORY-17-' + bet)
					.setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setEmoji('"' + eval('memorydataf18' + sender.toString().replace(/\D/g, '')) + '"')
                    .setCustomId('MEMORY-18-' + bet)
					.setStyle(ButtonStyle.Secondary),
                
                new ButtonBuilder()
                    .setEmoji('"' + eval('memorydataf19' + sender.toString().replace(/\D/g, '')) + '"')
                    .setCustomId('MEMORY-19-' + bet)
					.setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setEmoji('"' + eval('memorydataf20' + sender.toString().replace(/\D/g, '')) + '"')
                    .setCustomId('MEMORY-20-' + bet)
					.setStyle(ButtonStyle.Secondary),
			);

        // Create Embed
        let message = new EmbedBuilder()
        .setTitle('» MEMORY')
        .setDescription('» <@' + sender.toString().replace(/\D/g, '') + '> is playing Memory with <@' + reciever.toString().replace(/\D/g, '') + '>!\nThe Bet is **$' + bet + '**\n\n» Points of <@' + sender.toString().replace(/\D/g, '') + '> are **' + eval('memorydatap' + sender.toString().replace(/\D/g, '')) + '**\n» Points of <@' + reciever.toString().replace(/\D/g, '') + '> are **' + eval('memorydatap' + reciever.toString().replace(/\D/g, '')) + '**')
        .setFooter({ text: '» ' + version });

        if (interaction.guildLocale == "de") {
            message = new EmbedBuilder()
                .setTitle('» MEMORY')
                .setDescription('» <@' + sender.toString().replace(/\D/g, '') + '> spielt mit <@' + reciever.toString().replace(/\D/g, '') + '> Memory!\nDie Wette ist **' + bet + '€**\n\n» Punkte von <@' + sender.toString().replace(/\D/g, '') + '> sind **' + eval('memorydatap' + sender.toString().replace(/\D/g, '')) + '**\n» Punkte von <@' + reciever.toString().replace(/\D/g, '') + '> sind **' + eval('memorydatap' + reciever.toString().replace(/\D/g, '')) +'**')
                .setFooter({ text: '» ' + version });
        }

        // Send Message
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [BTN] MEMORY : ' + sel)
        return interaction.update({ embeds: [message.toJSON()], components: [row1, row2, row3, row4], ephemeral: true })
    }
}