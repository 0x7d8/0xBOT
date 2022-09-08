const { EmbedBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { version } = require('../../../config.json');

module.exports = {
    data: {
        name: 'memory-yes'
    },
    async execute(interaction, client, bet, sel) {
        // Get Users
        const cache = interaction.message.embeds
        const description = cache[0].description.toString().replace(/[^\d@!]/g, '').split('!')[0].substring(1).split("@");
        const [sender, reciever] = description

        // Set Variables
        const balance = await bals.get(reciever.toString().replace(/\D/g, ''))
        const otherbalance = await bals.get(sender.toString().replace(/\D/g, ''))

        /* // Check if User is Authorized
        if (interaction.user.id.replace(/\D/g, '') != reciever.toString().replace(/\D/g, '')) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('» ERROR')
        		.setDescription('» <@' + reciever.toString().replace(/\D/g, '') + '> has to decide this!')
        		.setFooter({ text: '» ' + version });

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
        		    .setTitle('» FEHLER')
        		    .setDescription('» <@' + reciever.toString().replace(/\D/g, '') + '> muss das entscheiden!')
        		    .setFooter({ text: '» ' + version });
            }
            
            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [BTN] MEMORY : YES : NOTALLOWED')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        } */

        // Check if Person is already in a Lobby
        let lobby
        try {
            eval('memorys' + interaction.user.id.toString().replace(/\D/g, ''))
            lobby = true
        } catch (e) {
            lobby = false
        }
        if (lobby) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('» ERROR')
        		.setDescription('» You are already in a Lobby!')
        		.setFooter({ text: '» ' + version });

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
        		    .setTitle('» FEHLER')
        		    .setDescription('» Du bist schon in einer Lobby!')
        		    .setFooter({ text: '» ' + version });
            }
            
            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [BTN] MEMORY : ' + reciever.toString().replace(/\D/g, '') + ' : ALREADYLOBBY')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Check if Reciever is already in a Lobby
        try {
            eval('memorys' + reciever.toString().replace(/\D/g, ''))
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
        		.setFooter({ text: '» ' + version });

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
        		    .setTitle('» FEHLER')
        		    .setDescription('» <@' + reciever.toString().replace(/\D/g, '') + '> ist schon in einer Lobby!')
        		    .setFooter({ text: '» ' + version });
            }
            
            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [BTN] MEMORY : ' + sender.toString().replace(/\D/g, '') + ' : ALREADYLOBBY')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Check if Sender is already in a Lobby
        try {
            eval('memorys' + sender.toString().replace(/\D/g, ''))
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
        		.setFooter({ text: '» ' + version });

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
        		    .setTitle('» FEHLER')
        		    .setDescription('» <@' + sender.toString().replace(/\D/g, '') + '> ist schon in einer Lobby!')
        		    .setFooter({ text: '» ' + version });
            }
            
            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [BTN] MEMORY : ' + reciever.toString().replace(/\D/g, '') + ' : ALREADYLOBBY')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Check for enough Money
        if (balance < bet) {
            const missing = bet - balance
            
            // Create Embed
            let message = new EmbedBuilder()
            	.setTitle('» ERROR')
  				.setDescription('» You dont have enough Money for that, you are missing **$' + missing + '**!')
            	.setFooter({ text: '» ' + version });

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
            	    .setTitle('» FEHLER')
  				    .setDescription('» Du hast dafür nicht genug Geld, dir fehlen **' + missing + '€**!')
            	    .setFooter({ text: '» ' + version });
            }
            
            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [BTN] MEMORY : ' + reciever.toString().replace(/\D/g, '') + ' : ' + bet + '€ : NOTENOUGHMONEY')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }
        if (otherbalance < bet) {
            const missing = bet - otherbalance
            
            // Create Embed
            let message = new EmbedBuilder()
            	.setTitle('» ERROR')
  				.setDescription('» <@' + sender.toString().replace(/\D/g, '') + '> doesnt have enough Money, he is Missing **$' + missing + '**!')
            	.setFooter({ text: '» ' + version });

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
            	    .setTitle('» FEHLER')
  				    .setDescription('» <@' + sender.toString().replace(/\D/g, '') + '> hat nicht genug Geld, im fehlen **' + missing + '€**!')
            	    .setFooter({ text: '» ' + version });
            }
            
            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [BTN] MEMORY : ' + reciever.toString().replace(/\D/g, '') + ' : ' + bet + '€ : NOTENOUGHMONEY')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Create Buttons
        let row1 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
                    .setEmoji('1017050508252418068')
                    .setCustomId('MEMORY-1-' + bet)
					.setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setEmoji('1017050508252418068')
                    .setCustomId('MEMORY-2-' + bet)
					.setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setEmoji('1017050508252418068')
                    .setCustomId('MEMORY-3-' + bet)
					.setStyle(ButtonStyle.Secondary),
                
                new ButtonBuilder()
                    .setEmoji('1017050508252418068')
                    .setCustomId('MEMORY-4-' + bet)
					.setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setEmoji('1017050508252418068')
                    .setCustomId('MEMORY-5-' + bet)
					.setStyle(ButtonStyle.Secondary),
			);
        let row2 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
                    .setEmoji('1017050508252418068')
                    .setCustomId('MEMORY-6-' + bet)
					.setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setEmoji('1017050508252418068')
                    .setCustomId('MEMORY-7-' + bet)
					.setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setEmoji('1017050508252418068')
                    .setCustomId('MEMORY-8-' + bet)
					.setStyle(ButtonStyle.Secondary),
                
                new ButtonBuilder()
                    .setEmoji('1017050508252418068')
                    .setCustomId('MEMORY-9-' + bet)
					.setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setEmoji('1017050508252418068')
                    .setCustomId('MEMORY-10-' + bet)
					.setStyle(ButtonStyle.Secondary),
			);
        let row3 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
                    .setEmoji('1017050508252418068')
                    .setCustomId('MEMORY-11-' + bet)
					.setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setEmoji('1017050508252418068')
                    .setCustomId('MEMORY-12-' + bet)
					.setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setEmoji('1017050508252418068')
                    .setCustomId('MEMORY-13-' + bet)
					.setStyle(ButtonStyle.Secondary),
                
                new ButtonBuilder()
                    .setEmoji('1017050508252418068')
                    .setCustomId('MEMORY-14-' + bet)
					.setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setEmoji('1017050508252418068')
                    .setCustomId('MEMORY-15-' + bet)
					.setStyle(ButtonStyle.Secondary),
			);
        let row4 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
                    .setEmoji('1017050508252418068')
                    .setCustomId('MEMORY-16-' + bet)
					.setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setEmoji('1017050508252418068')
                    .setCustomId('MEMORY-17-' + bet)
					.setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setEmoji('1017050508252418068')
                    .setCustomId('MEMORY-18-' + bet)
					.setStyle(ButtonStyle.Secondary),
                
                new ButtonBuilder()
                    .setEmoji('1017050508252418068')
                    .setCustomId('MEMORY-19-' + bet)
					.setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setEmoji('1017050508252418068')
                    .setCustomId('MEMORY-20-' + bet)
					.setStyle(ButtonStyle.Secondary),
			);

        // Set Variable
        eval('global.memorys' + sender.toString().replace(/\D/g, '') + ' = true')
        eval('global.memorys' + reciever.toString().replace(/\D/g, '') + ' = true')

        eval('global.memorydatap' + sender.toString().replace(/\D/g, '') + ' = 0')
        eval('global.memorydatap' + reciever.toString().replace(/\D/g, '') + ' = 0')

        eval('global.memorydataf1' + sender.toString().replace(/\D/g, '') + ' = "1017050508252418068"')
        eval('global.memorydataf2' + sender.toString().replace(/\D/g, '') + ' = "1017050508252418068"')
        eval('global.memorydataf3' + sender.toString().replace(/\D/g, '') + ' = "1017050508252418068"')
        eval('global.memorydataf4' + sender.toString().replace(/\D/g, '') + ' = "1017050508252418068"')
        eval('global.memorydataf5' + sender.toString().replace(/\D/g, '') + ' = "1017050508252418068"')
        eval('global.memorydataf6' + sender.toString().replace(/\D/g, '') + ' = "1017050508252418068"')
        eval('global.memorydataf7' + sender.toString().replace(/\D/g, '') + ' = "1017050508252418068"')
        eval('global.memorydataf8' + sender.toString().replace(/\D/g, '') + ' = "1017050508252418068"')
        eval('global.memorydataf9' + sender.toString().replace(/\D/g, '') + ' = "1017050508252418068"')
        eval('global.memorydataf10' + sender.toString().replace(/\D/g, '') + ' = "1017050508252418068"')
        eval('global.memorydataf11' + sender.toString().replace(/\D/g, '') + ' = "1017050508252418068"')
        eval('global.memorydataf12' + sender.toString().replace(/\D/g, '') + ' = "1017050508252418068"')
        eval('global.memorydataf13' + sender.toString().replace(/\D/g, '') + ' = "1017050508252418068"')
        eval('global.memorydataf14' + sender.toString().replace(/\D/g, '') + ' = "1017050508252418068"')
        eval('global.memorydataf15' + sender.toString().replace(/\D/g, '') + ' = "1017050508252418068"')
        eval('global.memorydataf16' + sender.toString().replace(/\D/g, '') + ' = "1017050508252418068"')
        eval('global.memorydataf17' + sender.toString().replace(/\D/g, '') + ' = "1017050508252418068"')
        eval('global.memorydataf18' + sender.toString().replace(/\D/g, '') + ' = "1017050508252418068"')
        eval('global.memorydataf19' + sender.toString().replace(/\D/g, '') + ' = "1017050508252418068"')
        eval('global.memorydataf20' + sender.toString().replace(/\D/g, '') + ' = "1017050508252418068"')

        const emojis = []
        const buttons = []
        let emojistate = false
        let emojinumber = 1
        while (emojistate == false) {
            const emojilist = ["1017444934904729611", "1017445104685961236", "1017444736610619453", "1017445667347636294", "1017445007910772766", "1017445430310752336", "1017444320569196615", "1017445761291669604", "1017444619006517429", "1017445557842739221", "1017444837257134100", "1017444467353063474", "1017445246516334653", "1017445352078590093"]
            const emojirandom = Math.floor(Math.random() * (17 - 1 + 1)) + 1;
            const emoji = emojilist[emojirandom - 1]
            console.log(emojinumber)
            if (!emojis.includes(emoji) || !buttons.includes(emojinumber)) {
                emojis[emojinumber - 1] = emoji
                eval('global.memorydatag' + emojinumber + sender.toString().replace(/\D/g, '') + ' = "' + emoji + '"')
                emojinumber = emojinumber + 1
                if (emojinumber == 11) {
                    emojistate = true
                    return
                }
            }
        }

        // Transfer Money
        bals.rem(sender.toString().replace(/\D/g, ''), bet)
        bals.rem(reciever.toString().replace(/\D/g, ''), bet)

        // Create Embed
        let message = new EmbedBuilder()
        .setTitle('» MEMORY')
        .setDescription('» <@' + sender.toString().replace(/\D/g, '') + '> is playing Memory with <@' + reciever.toString().replace(/\D/g, '') + '>!\nThe Bet is **$' + bet + '**\n\n» Points of <@' + sender.toString().replace(/\D/g, '') + '> are **0**\n» Points of <@' + reciever.toString().replace(/\D/g, '') + '> are **0**')
        .setFooter({ text: '» ' + version });

        if (interaction.guildLocale == "de") {
            message = new EmbedBuilder()
                .setTitle('» MEMORY')
                .setDescription('» <@' + sender.toString().replace(/\D/g, '') + '> spielt mit <@' + reciever.toString().replace(/\D/g, '') + '> Memory!\nDie Wette ist **' + bet + '€**\n\n» Punkte von <@' + sender.toString().replace(/\D/g, '') + '> sind **0**\n» Punkte von <@' + reciever.toString().replace(/\D/g, '') + '> sind **0**')
                .setFooter({ text: '» ' + version });
        }

        // Send Message
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [BTN] MEMORY : ' + sender.toString().replace(/\D/g, '') + ' : ACCEPT')
        return interaction.update({ embeds: [message.toJSON()], components: [row1, row2, row3, row4] })
    }
}