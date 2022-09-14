const { EmbedBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { version } = require('../../../config.json');

module.exports = {
    data: {
        name: 'rps-yes'
    },
    async execute(interaction, client, vote, bet) {
        // Get Users
        const cache = interaction.message.embeds
        const description = cache[0].description.toString().replace(/[^\d@!]/g, '').split('!')[0].substring(1).split("@");
        const [sender, reciever] = description

        // Set Variables
        const balance = await bals.get(reciever.toString().replace(/\D/g, ''))
        const otherbalance = await bals.get(sender.toString().replace(/\D/g, ''))

        // Check if User is Authorized
        if (interaction.user.id.replace(/\D/g, '') != reciever.toString().replace(/\D/g, '')) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('» ERROR')
        		.setDescription('» <@' + reciever.toString().replace(/\D/g, '') + '> has to decide this!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
        		    .setTitle('» FEHLER')
        		    .setDescription('» <@' + reciever.toString().replace(/\D/g, '') + '> muss das entscheiden!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [BTN] RPS : YES : NOTALLOWED')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Check if Person is already in a Lobby
        let lobby
        try {
            eval('rpss' + interaction.user.id.toString().replace(/\D/g, ''))
            lobby = true
        } catch (e) {
            lobby = false
        }
        if (lobby) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('» ERROR')
        		.setDescription('» You are already in a Lobby!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
        		    .setTitle('» FEHLER')
        		    .setDescription('» Du bist schon in einer Lobby!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [BTN] RPS : ' + reciever.toString().replace(/\D/g, '') + ' : ALREADYLOBBY')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Check if Reciever is already in a Lobby
        try {
            eval('rpss' + reciever.toString().replace(/\D/g, ''))
            lobby = true
        } catch (e) {
            lobby = false
        }
        if (lobby) {
            // Check if Reciever is Person
            if (interaction.user.id.replace(/\D/g, '') == reciever.toString().replace(/\D/g, '')) return

            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('» ERROR')
        		.setDescription('» <@' + reciever.toString().replace(/\D/g, '') + '> is already in a Lobby!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
        		    .setTitle('» FEHLER')
        		    .setDescription('» <@' + reciever.toString().replace(/\D/g, '') + '> ist schon in einer Lobby!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [BTN] RPS : ' + sender.toString().replace(/\D/g, '') + ' : ALREADYLOBBY')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Check if Sender is already in a Lobby
        try {
            eval('rpss' + sender.toString().replace(/\D/g, ''))
            lobby = true
        } catch (e) {
            lobby = false
        }
        if (lobby) {
            // Check if Sender is Person
            if (interaction.user.id.replace(/\D/g, '') == sender.toString().replace(/\D/g, '')) return

            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('» ERROR')
        		.setDescription('» <@' + sender.toString().replace(/\D/g, '') + '> is already in a Lobby!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
        		    .setTitle('» FEHLER')
        		    .setDescription('» <@' + sender.toString().replace(/\D/g, '') + '> ist schon in einer Lobby!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [BTN] RPS : ' + reciever.toString().replace(/\D/g, '') + ' : ALREADYLOBBY')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Check for enough Money
        if (balance < bet) {
            const missing = bet - balance
            
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
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [BTN] RPS : ' + reciever.toString().replace(/\D/g, '') + ' : ' + bet + '€ : NOTENOUGHMONEY')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }
        if (otherbalance < bet) {
            const missing = bet - otherbalance
            
            // Create Embed
            let message = new EmbedBuilder()
            	.setTitle('» ERROR')
  				.setDescription('» <@' + sender.toString().replace(/\D/g, '') + '> doesnt have enough Money, he is Missing **$' + missing + '**!')
            	.setFooter({ text: '» ' + vote + ' » ' + version });

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
            	    .setTitle('» FEHLER')
  				    .setDescription('» <@' + sender.toString().replace(/\D/g, '') + '> hat nicht genug Geld, im fehlen **' + missing + '€**!')
            	    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [BTN] RPS : ' + reciever.toString().replace(/\D/g, '') + ' : ' + bet + '€ : NOTENOUGHMONEY')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Create Buttons
        let row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('🪨 ROCK')
                    .setCustomId('RPS-1-' + bet)
					.setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
					.setLabel('📝 PAPER')
                    .setCustomId('RPS-2-' + bet)
					.setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
					.setLabel('✂️ SCISSORS')
                    .setCustomId('RPS-3-' + bet)
					.setStyle(ButtonStyle.Secondary),
			);

        if (interaction.guildLocale == "de") {
            row = new ActionRowBuilder()
			    .addComponents(
                    new ButtonBuilder()
				    	.setLabel('✂️ SCHERE')
                        .setCustomId('RPS-3-' + bet)
					    .setStyle(ButtonStyle.Secondary),

			    	new ButtonBuilder()
			    		.setLabel('🪨 STEIN')
                        .setCustomId('RPS-1-' + bet)
			    		.setStyle(ButtonStyle.Secondary),

                    new ButtonBuilder()
			    		.setLabel('📝 PAPIER')
                        .setCustomId('RPS-2-' + bet)
		    		    .setStyle(ButtonStyle.Secondary),
			);
        }

        // Set Variables
        eval('global.rpss' + sender.toString().replace(/\D/g, '') + ' = true')
        eval('global.rpss' + reciever.toString().replace(/\D/g, '') + ' = true')
        eval('delete rpslc' + sender.replace(/\D/g, ''))

        // Check if User Pressed Yes while Expiring
        try {
            await eval('rpslc' + sender.toString().replace(/\D/g, ''))
        } catch (e) {return}

        // Transfer Money
        bals.rem(sender.toString().replace(/\D/g, ''), bet)
        bals.rem(reciever.toString().replace(/\D/g, ''), bet)

        // Create Embed
        let message = new EmbedBuilder()
        .setTitle('» ROCK PAPER SCISSORS')
        .setDescription('» <@' + sender.toString().replace(/\D/g, '') + '> is playing Rock Paper Scissors with <@' + reciever.toString().replace(/\D/g, '') + '>!\nThe Bet is **$' + bet + '**')
        .setFooter({ text: '» ' + version });

        if (interaction.guildLocale == "de") {
            message = new EmbedBuilder()
                .setTitle('» SCHERE STEIN PAPIER')
                .setDescription('» <@' + sender.toString().replace(/\D/g, '') + '> spielt mit <@' + reciever.toString().replace(/\D/g, '') + '> Schere Stein Papier!\nDie Wette ist **' + bet + '€**')
                .setFooter({ text: '» ' + version });
        }

        // Send Message
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [BTN] RPS : ' + sender.toString().replace(/\D/g, '') + ' : ACCEPT')
        return interaction.update({ embeds: [message.toJSON()], components: [row] })
    }
}