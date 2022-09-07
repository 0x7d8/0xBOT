const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../../config.json');

module.exports = {
    data: {
        name: 'rps-scissor'
    },
    async execute(interaction, client, bet) {
        // Get Users
        const cache = interaction.message.embeds
        const sender = cache[0].description.toString().replace(/^\D+|\D.*$/g, "")
        const reciever = cache[0].description.toString().replace(/.*\D(?=\d)|\D+$/g, "")

        // Check if User is playing
        if (sender.toString().replace(/\D/g, '') == interaction.user.id.replace(/\D/g, '') || reciever.toString().replace(/\D/g, '') == interaction.user.id.replace(/\D/g, '')) {
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
            let win = none
            if (psc == 'ROCK' && prc == 'PAPER') { win = 'pr' }
            if (psc == 'ROCK' && prc == 'SCISSORS') { win = 'ps' }
            if (psc == 'PAPER' && prc == 'ROCK') { win = 'ps' }
            if (psc == 'SCISSORS' && prc == 'ROCK') { win = 'pr' }
            let winner
            if (win == 'ps') { winner = '<@' + sender.toString().replace(/\D/g, '') + '>' }
            if (win == 'pr') { winner = '<@' + reciever.toString().replace(/\D/g, '') + '>' }
            if (win == 'none') { winner = '**Noone**' }
            if (win == 'none' && interaction.guildLocale == "de") { winner = '**Niemand**' }

            // Create Embed
            let message = new EmbedBuilder()
                .setTitle('» ROCK PAPER SCISSORS')
                .setDescription('» <@' + sender.toString().replace(/\D/g, '') + '> selected **' + eval('i' + sender.toString().replace(/\D/g, '')) + '**\n» <@' + reciever.toString().replace(/\D/g, '') + '> selected **' + eval('i' + reciever.toString().replace(/\D/g, '')) + '\n\n» ' + winner + ' hat gewonnen.')
                .setFooter({ text: '» ' + version });

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
                    .setTitle('» SCHERE STEIN PAPIER')
                    .setDescription('» <@' + sender.toString().replace(/\D/g, '') + '> selected **' + eval('i' + sender.toString().replace(/\D/g, '')) + '**\n» <@' + reciever.toString().replace(/\D/g, '') + '> wählte **' + eval('i' + reciever.toString().replace(/\D/g, '')) + '\n\n» ' + winner + ' hat gewonnen.')
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
        .setDescription('» You selected **SCISSORS**!')
        .setFooter({ text: '» ' + version });

        if (interaction.guildLocale == "de") {
            message = new EmbedBuilder()
                .setTitle('» SCHERE STEIN PAPIER')
                .setDescription('» Du hast **SCHERE** ausgewählt!')
                .setFooter({ text: '» ' + version });
        }

        // Send Message
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [BTN] RPS : SCISSOR')
        return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
    }
}