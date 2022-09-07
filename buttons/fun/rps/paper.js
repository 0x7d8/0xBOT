const { EmbedBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { version } = require('../../../config.json');

module.exports = {
    data: {
        name: 'rps-paper'
    },
    async execute(interaction, client, bet) {
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
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [BTN] RPS : NOTPLAYING')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Set Variable
        eval('global.i' + interaction.user.id.replace(/\D/g, '') + ' = "SCISSORS"')

        // Check if Game is Done
        let done
        try {
            eval('i' + sender.toString().replace(/\D/g, ''))
            eval('i' + reciever.toString().replace(/\D/g, ''))

            done = true
        } catch (e) {
            done = false
        }
        if (done) {
            // Calculate Winner
            const psc = eval('i' + sender.toString().replace(/\D/g, ''))
            const prc = eval('i' + reciever.toString().replace(/\D/g, ''))
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

            // Create Embed
            let send
            let reci
            if (eval('i' + sender.toString().replace(/\D/g, '')) == 'SCISSORS') { send = '✂️ SCISSORS' }
            if (eval('i' + sender.toString().replace(/\D/g, '')) == 'PAPER') { send = '📝 PAPER' }
            if (eval('i' + sender.toString().replace(/\D/g, '')) == 'ROCK') { send = '🪨 ROCK' }
            if (eval('i' + reciever.toString().replace(/\D/g, '')) == 'ROCK') { reci = '🪨 ROCK' }
            if (eval('i' + reciever.toString().replace(/\D/g, '')) == 'PAPER') { reci = '📝 PAPER' }
            if (eval('i' + reciever.toString().replace(/\D/g, '')) == 'SCISSORS') { reci = '✂️ SCISSORS' }

            let message = new EmbedBuilder()
                .setTitle('» ROCK PAPER SCISSORS')
                .setDescription('» <@' + sender.toString().replace(/\D/g, '') + '> selected **' + eval('i' + sender.toString().replace(/\D/g, '')) + '**\n» <@' + reciever.toString().replace(/\D/g, '') + '> selected **' + eval('i' + reciever.toString().replace(/\D/g, '')) + '**\n\n» ' + winner + ' hat gewonnen.')
                .setFooter({ text: '» ' + version });

            if (interaction.guildLocale == "de") {
                if (eval('i' + sender.toString().replace(/\D/g, '')) == 'SCISSORS') { send = '✂️ SCHERE' }
                if (eval('i' + sender.toString().replace(/\D/g, '')) == 'PAPER') { send = '📝 PAPIER' }
                if (eval('i' + sender.toString().replace(/\D/g, '')) == 'ROCK') { send = '🪨 STEIN' }
                if (eval('i' + reciever.toString().replace(/\D/g, '')) == 'ROCK') { reci = '🪨 STEIN' }
                if (eval('i' + reciever.toString().replace(/\D/g, '')) == 'PAPER') { reci = '📝 PAPIER' }
                if (eval('i' + reciever.toString().replace(/\D/g, '')) == 'SCISSORS') { reci = '✂️ SCHERE' }

                message = new EmbedBuilder()
                    .setTitle('» SCHERE STEIN PAPIER')
                    .setDescription('» <@' + sender.toString().replace(/\D/g, '') + '> wählte **' + send + '**\n» <@' + reciever.toString().replace(/\D/g, '') + '> wählte **' + reci + '**\n\n» ' + winner + ' hat gewonnen.')
                    .setFooter({ text: '» ' + version });
            }

            // Delete Variables
            eval('delete i' + sender.toString().replace(/\D/g, ''))
            eval('delete i' + reciever.toString().replace(/\D/g, ''))

            // Create Buttons to Replace
            let rock = new ActionRowBuilder()
		    	.addComponents(
				    new ButtonBuilder()
	    			    .setLabel('🪨 ROCK')
                        .setCustomId('RPS-1-' + bet)
					    .setStyle(ButtonStyle.Secondary)
                        .setDisabled(true),
		        );
            if (interaction.guildLocale == "de") {
                rock = new ActionRowBuilder()
		    	    .addComponents(
		    	    	new ButtonBuilder()
		    	    		.setLabel('🪨 STEIN')
                            .setCustomId('RPS-1-' + bet)
		    	    		.setStyle(ButtonStyle.Secondary)
                            .setDisabled(true),
		    	    );
            }

            let paper = new ActionRowBuilder()
		    	.addComponents(
		    		new ButtonBuilder()
		    			.setLabel('📝 PAPER')
                        .setCustomId('RPS-2-' + bet)
		    			.setStyle(ButtonStyle.Secondary)
                        .setDisabled(true),
		    	);
            if (interaction.guildLocale == "de") {
                paper = new ActionRowBuilder()
		    	    .addComponents(
		    	    	new ButtonBuilder()
		    	    		.setLabel('📝 PAPIER')
                            .setCustomId('RPS-2-' + bet)
		    	    		.setStyle(ButtonStyle.Secondary)
                            .setDisabled(true),
		    	    );
            }

            let scissors = new ActionRowBuilder()
		    	.addComponents(
		    		new ButtonBuilder()
		    			.setLabel('✂️ SCISSOR')
                        .setCustomId('RPS-3-' + bet)
		    			.setStyle(ButtonStyle.Secondary)
                        .setDisabled(true),
		    	);
            if (interaction.guildLocale == "de") {
                scissors = new ActionRowBuilder()
		    	    .addComponents(
		    	    	new ButtonBuilder()
		    	    		.setLabel('✂️ SCHERE')
                            .setCustomId('RPS-3-' + bet)
		    	    		.setStyle(ButtonStyle.Secondary)
                            .setDisabled(true),
		    	    );
            }

            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [BTN] RPS : DONE')
            return interaction.update({ embeds: [message.toJSON()], components: [rock, paper, scissors], ephemeral: true })
        }

        // Create Embed
        let message = new EmbedBuilder()
        .setTitle('» ROCK PAPER SCISSORS')
        .setDescription('» You selected **PAPER**!')
        .setFooter({ text: '» ' + version });

        if (interaction.guildLocale == "de") {
            message = new EmbedBuilder()
                .setTitle('» SCHERE STEIN PAPIER')
                .setDescription('» Du hast **PAPIER** ausgewählt!')
                .setFooter({ text: '» ' + version });
        }

        // Send Message
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [BTN] RPS : PAPER')
        return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
    }
}