const { EmbedBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { version } = require('../../../config.json');

const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: {
        name: 'ttt-choice'
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
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [BTN] TICTACTOE : NOTPLAYING')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Check Turn
        const turn = await eval('tttdatatu' + sender.toString().replace(/\D/g, ''))
        if (interaction.user.id.replace(/\D/g, '') != turn) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('» ERROR')
        		.setDescription('» Its not your turn!')
        		.setFooter({ text: '» ' + version });

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
        		    .setTitle('» FEHLER')
        		    .setDescription('» Es ist nicht dein Zug!')
        		    .setFooter({ text: '» ' + version });
            }
            
            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [BTN] TICTACTOE : NOTTURN')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Translate Turn to Emoji
        let turnemoji
        if (turn == sender.toString().replace(/\D/g, '')) {
            turnemoji = '🔵'
        }
        if (turn == reciever.toString().replace(/\D/g, '')) {
            turnemoji = '🔴'
        }

        // Set Variables
        await eval('global.tttdatatuf' + sender.toString().replace(/\D/g, '') + ' = parseInt(tttdatatuf' + sender.toString().replace(/\D/g, '') + ') + 1')
        await eval('global.tttdataf' + sel + sender.toString().replace(/\D/g, '') + ' = "1017050442431209543"')
        await eval('global.tttdatad' + sel + sender.toString().replace(/\D/g, '') + ' = true')

        if (interaction.user.id.replace(/\D/g, '') == sender.toString().replace(/\D/g, '')) {
            await eval('global.tttdatabc' + sel + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Primary')
        }
        if (interaction.user.id.replace(/\D/g, '') == reciever.toString().replace(/\D/g, '')) {
            await eval('global.tttdatabc' + sel + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Danger')
        }

        // Turn Switcher
        if (turn == sender.toString().replace(/\D/g, '')) {
            await eval('global.tttdatatu' + sender.toString().replace(/\D/g, '') + ' = ' + reciever.toString().replace(/\D/g, ''))
            turnemoji = '🔴'
        }
        if (turn == reciever.toString().replace(/\D/g, '')) {
            await eval('global.tttdatatu' + sender.toString().replace(/\D/g, '') + ' = ' + sender.toString().replace(/\D/g, ''))
            turnemoji = '🔵'
        }

        // Deactivate all Buttons
        const buttondatas = []
        let buttoncount = 1
        let donebutton = false
        const dbtn = async () => {
            while (donebutton == false) {
                await wait(10)
                if (await eval('tttdatad' + buttoncount + sender.toString().replace(/\D/g, '') + ' == false')) {
                    await eval('global.tttdatad' + buttoncount + sender.toString().replace(/\D/g, '') + ' = true')
                    buttondatas.push(buttoncount.toString())
                }
                buttoncount = buttoncount + 1
                if (buttoncount == 10) {
                    donebutton = true
                    return
                }
            }
        }
        await dbtn()

        // Create Buttons
        let row1 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
                    .setEmoji(eval('tttdataf1' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('TTT-1-' + bet)
					.setStyle(eval('tttdatabc1' + sender.toString().replace(/\D/g, '')))
                    .setDisabled(eval('tttdatad1' + sender.toString().replace(/\D/g, ''))),

                new ButtonBuilder()
                    .setEmoji(eval('tttdataf2' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('TTT-2-' + bet)
					.setStyle(eval('tttdatabc2' + sender.toString().replace(/\D/g, '')))
                    .setDisabled(eval('tttdatad2' + sender.toString().replace(/\D/g, ''))),

                new ButtonBuilder()
                    .setEmoji(eval('tttdataf3' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('TTT-3-' + bet)
					.setStyle(eval('tttdatabc3' + sender.toString().replace(/\D/g, '')))
                    .setDisabled(eval('tttdatad3' + sender.toString().replace(/\D/g, ''))),
			);
        let row2 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
                    .setEmoji(eval('tttdataf4' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('TTT-4-' + bet)
					.setStyle(eval('tttdatabc4' + sender.toString().replace(/\D/g, '')))
                    .setDisabled(eval('tttdatad4' + sender.toString().replace(/\D/g, ''))),

                new ButtonBuilder()
                    .setEmoji(eval('tttdataf5' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('TTT-5-' + bet)
					.setStyle(eval('tttdatabc5' + sender.toString().replace(/\D/g, '')))
                    .setDisabled(eval('tttdatad5' + sender.toString().replace(/\D/g, ''))),

                new ButtonBuilder()
                    .setEmoji(eval('tttdataf6' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('TTT-6-' + bet)
					.setStyle(eval('tttdatabc6' + sender.toString().replace(/\D/g, '')))
                    .setDisabled(eval('tttdatad6' + sender.toString().replace(/\D/g, ''))),
			);
        let row3 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
                    .setEmoji(eval('tttdataf7' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('TTT-7-' + bet)
					.setStyle(eval('tttdatabc7' + sender.toString().replace(/\D/g, '')))
                    .setDisabled(eval('tttdatad7' + sender.toString().replace(/\D/g, ''))),

                new ButtonBuilder()
                    .setEmoji(eval('tttdataf8' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('TTT-8-' + bet)
					.setStyle(eval('tttdatabc8' + sender.toString().replace(/\D/g, '')))
                    .setDisabled(eval('tttdatad8' + sender.toString().replace(/\D/g, ''))),

                new ButtonBuilder()
                    .setEmoji(eval('tttdataf9' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('TTT-9-' + bet)
					.setStyle(eval('tttdatabc9' + sender.toString().replace(/\D/g, '')))
                    .setDisabled(eval('tttdatad9' + sender.toString().replace(/\D/g, ''))),
			);

        // Create Embed
        let message = new EmbedBuilder()
            .setTitle('» TICTACTOE')
            .setDescription('» <@' + sender.toString().replace(/\D/g, '') + '> is playing Tic Tac Toe with <@' + reciever.toString().replace(/\D/g, '') + '>!\nThe Bet is **$' + bet + '**\n\n🔵 » <@' + sender.toString().replace(/\D/g, '') + '>\n🔴 » <@' + reciever.toString().replace(/\D/g, '') + '>')
            .setFooter({ text: '» ' + version + ' » CURRENT TURN: ' + turnemoji });

        if (interaction.guildLocale == "de") {
            message = new EmbedBuilder()
                .setTitle('» TICTACTOE')
                .setDescription('» <@' + sender.toString().replace(/\D/g, '') + '> spielt mit <@' + reciever.toString().replace(/\D/g, '') + '> Tic Tac Toe!\nDie Wette ist **' + bet + '€**\n\n🔵 » <@' + sender.toString().replace(/\D/g, '') + '>\n🔴 » <@' + reciever.toString().replace(/\D/g, '') + '>')
                .setFooter({ text: '» ' + version + ' » AM ZUG: ' + turnemoji });
        }

        // Send Message
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [BTN] MEMORY : ' + sel + ' : ' + eval('memorydataf' + sel + sender.toString().replace(/\D/g, '')))
        interaction.update({ embeds: [message.toJSON()], components: [row1, row2, row3], ephemeral: true })

        // Update Message
        interaction.message.edit({ embeds: [message.toJSON()], components: [row1, row2, row3], ephemeral: true })

        // Check for Special Conditions
        await wait(2500)

        // Activate all Deactivated Buttons
        buttoncount = 0
        donebutton = false
        const abtn = async () => {
            while (donebutton == false) {
                await wait(25)
                if (buttondatas.includes(buttoncount.toString())) {
                    await eval('global.tttdatad' + buttoncount + sender.toString().replace(/\D/g, '') + ' = false')
                }
                buttoncount = buttoncount + 1
                if (buttoncount == 21) {
                    donebutton = true
                    return
                }
            }
        }
        await abtn()

        // Check if Round has ended
        if(await eval('tttdatatuf' + sender.toString().replace(/\D/g, '') + ' == 9')) {
            // Check Who Won
            const senderpoints = await eval('memeorydatap' + sender.toString().replace(/\D/g, ''))
            const recieverpoints = await eval('memorydatap' + reciever.toString().replace(/\D/g, ''))
            let winner
            if (parseInt(senderpoints) > parseInt(recieverpoints)) {
                winner = '<@' + sender.toString().replace(/\D/g, '') + '>'
            } else if (parseInt(senderpoints) < parseInt(recieverpoints)) {
                winner = '<@' + reciever.toString().replace(/\D/g, '') + '>'
            } else {
                winner = '**Noone**'
                if (interaction.guildLocale == "de") {
                    winner = '**Niemand**'
                }
            }

            // Transfer Money
            const betwon = parseInt(bet) * 2
            if (winner != '**Noone**' && winner != '**Niemand**') {
                bals.add(winner.toString().replace(/\D/g, ''), parseInt(betwon))
            } else {
                bals.add(sender.toString().replace(/\D/g, ''), parseInt(bet))
                bals.add(reciever.toString().replace(/\D/g, ''), parseInt(bet))
            }

            // Create Embed
            message = new EmbedBuilder()
                .setTitle('» TICTACTOE')
                .setDescription('» <@' + sender.toString().replace(/\D/g, '') + '> is playing Memory with <@' + reciever.toString().replace(/\D/g, '') + '>!\nThe Bet is **$' + bet + '**\n\n🔵 » Points of <@' + sender.toString().replace(/\D/g, '') + '> are **' + eval('memorydatap' + sender.toString().replace(/\D/g, '')) + '**\n🔴 » Points of <@' + reciever.toString().replace(/\D/g, '') + '> are **' + eval('memorydatap' + reciever.toString().replace(/\D/g, '')) + '**\n\n' + winner + ' has won **$' + betwon + '**!')
                .setFooter({ text: '» ' + version });

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
                    .setTitle('» TICTACTOE')
                    .setDescription('» <@' + sender.toString().replace(/\D/g, '') + '> spielt mit <@' + reciever.toString().replace(/\D/g, '') + '> Memory!\nDie Wette ist **' + bet + '€**\n\n🔵 » Punkte von <@' + sender.toString().replace(/\D/g, '') + '> sind **' + eval('memorydatap' + sender.toString().replace(/\D/g, '')) + '**\n🔴 » Punkte von <@' + reciever.toString().replace(/\D/g, '') + '> sind **' + eval('memorydatap' + reciever.toString().replace(/\D/g, '')) +'**\n\n' + winner + ' hat **' + betwon + '€** gewonnen!')
                    .setFooter({ text: '» ' + version });
            }

            // Delete Variables
            eval('delete tttdatatu' + sender.toString().replace(/\D/g, ''))

            eval('delete tttdataf1' + sender.toString().replace(/\D/g, ''))
            eval('delete tttdataf2' + sender.toString().replace(/\D/g, ''))
            eval('delete tttdataf3' + sender.toString().replace(/\D/g, ''))
            eval('delete tttdataf4' + sender.toString().replace(/\D/g, ''))
            eval('delete tttdataf5' + sender.toString().replace(/\D/g, ''))
            eval('delete tttdataf6' + sender.toString().replace(/\D/g, ''))
            eval('delete tttdataf7' + sender.toString().replace(/\D/g, ''))
            eval('delete tttdataf8' + sender.toString().replace(/\D/g, ''))
            eval('delete tttdataf9' + sender.toString().replace(/\D/g, ''))

            eval('delete tttdatabc1' + sender.toString().replace(/\D/g, ''))
            eval('delete tttdatabc2' + sender.toString().replace(/\D/g, ''))
            eval('delete tttdatabc3' + sender.toString().replace(/\D/g, ''))
            eval('delete tttdatabc4' + sender.toString().replace(/\D/g, ''))
            eval('delete tttdatabc5' + sender.toString().replace(/\D/g, ''))
            eval('delete tttdatabc6' + sender.toString().replace(/\D/g, ''))
            eval('delete tttdatabc7' + sender.toString().replace(/\D/g, ''))
            eval('delete tttdatabc8' + sender.toString().replace(/\D/g, ''))
            eval('delete tttdatabc9' + sender.toString().replace(/\D/g, ''))

            eval('delete tttdatad1' + sender.toString().replace(/\D/g, ''))
            eval('delete tttdatad2' + sender.toString().replace(/\D/g, ''))
            eval('delete tttdatad3' + sender.toString().replace(/\D/g, ''))
            eval('delete tttdatad4' + sender.toString().replace(/\D/g, ''))
            eval('delete tttdatad5' + sender.toString().replace(/\D/g, ''))
            eval('delete tttdatad6' + sender.toString().replace(/\D/g, ''))
            eval('delete tttdatad7' + sender.toString().replace(/\D/g, ''))
            eval('delete tttdatad8' + sender.toString().replace(/\D/g, ''))
            eval('delete tttdatad9' + sender.toString().replace(/\D/g, ''))

            eval('delete tttdatap' + sender.toString().replace(/\D/g, ''))
            eval('delete tttdatap' + reciever.toString().replace(/\D/g, ''))
            eval('delete tttdatapc' + sender.toString().replace(/\D/g, ''))
            eval('delete tttdatapc' + reciever.toString().replace(/\D/g, ''))
            eval('delete tttdatapcn' + sender.toString().replace(/\D/g, ''))
            eval('delete tttdatapcn' + reciever.toString().replace(/\D/g, ''))
            eval('delete tttdatapca' + sender.toString().replace(/\D/g, ''))
            eval('delete tttdatapca' + reciever.toString().replace(/\D/g, ''))

            eval('delete ttts' + sender.toString().replace(/\D/g, ''))
            eval('delete ttts' + reciever.toString().replace(/\D/g, ''))

            // Update Message
            return interaction.message.edit({ embeds: [message.toJSON()], components: [row1, row2, row3], ephemeral: true })
        }

        // Create Buttons
        row1 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
                    .setEmoji(eval('memorydataf1' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-1-' + bet)
					.setStyle(eval('memorydatabc1' + sender.toString().replace(/\D/g, '')))
                    .setDisabled(eval('memorydatad1' + sender.toString().replace(/\D/g, ''))),

                new ButtonBuilder()
                    .setEmoji(eval('memorydataf2' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-2-' + bet)
					.setStyle(eval('memorydatabc2' + sender.toString().replace(/\D/g, '')))
                    .setDisabled(eval('memorydatad2' + sender.toString().replace(/\D/g, ''))),

                new ButtonBuilder()
                    .setEmoji(eval('memorydataf3' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-3-' + bet)
					.setStyle(eval('memorydatabc3' + sender.toString().replace(/\D/g, '')))
                    .setDisabled(eval('memorydatad3' + sender.toString().replace(/\D/g, ''))),
                
                new ButtonBuilder()
                    .setEmoji(eval('memorydataf4' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-4-' + bet)
					.setStyle(eval('memorydatabc4' + sender.toString().replace(/\D/g, '')))
                    .setDisabled(eval('memorydatad4' + sender.toString().replace(/\D/g, ''))),

                new ButtonBuilder()
                    .setEmoji(eval('memorydataf5' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-5-' + bet)
					.setStyle(eval('memorydatabc5' + sender.toString().replace(/\D/g, '')))
                    .setDisabled(eval('memorydatad5' + sender.toString().replace(/\D/g, ''))),
			);
        row2 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
                    .setEmoji(eval('memorydataf6' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-6-' + bet)
					.setStyle(eval('memorydatabc6' + sender.toString().replace(/\D/g, '')))
                    .setDisabled(eval('memorydatad6' + sender.toString().replace(/\D/g, ''))),

                new ButtonBuilder()
                    .setEmoji(eval('memorydataf7' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-7-' + bet)
					.setStyle(eval('memorydatabc7' + sender.toString().replace(/\D/g, '')))
                    .setDisabled(eval('memorydatad7' + sender.toString().replace(/\D/g, ''))),

                new ButtonBuilder()
                    .setEmoji(eval('memorydataf8' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-8-' + bet)
					.setStyle(eval('memorydatabc8' + sender.toString().replace(/\D/g, '')))
                    .setDisabled(eval('memorydatad8' + sender.toString().replace(/\D/g, ''))),
                
                new ButtonBuilder()
                    .setEmoji(eval('memorydataf9' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-9-' + bet)
					.setStyle(eval('memorydatabc9' + sender.toString().replace(/\D/g, '')))
                    .setDisabled(eval('memorydatad9' + sender.toString().replace(/\D/g, ''))),

                new ButtonBuilder()
                    .setEmoji(eval('memorydataf10' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-10-' + bet)
					.setStyle(eval('memorydatabc10' + sender.toString().replace(/\D/g, '')))
                    .setDisabled(eval('memorydatad10' + sender.toString().replace(/\D/g, ''))),
			);
        row3 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
                    .setEmoji(eval('memorydataf11' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-11-' + bet)
					.setStyle(eval('memorydatabc11' + sender.toString().replace(/\D/g, '')))
                    .setDisabled(eval('memorydatad11' + sender.toString().replace(/\D/g, ''))),

                new ButtonBuilder()
                    .setEmoji(eval('memorydataf12' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-12-' + bet)
					.setStyle(eval('memorydatabc12' + sender.toString().replace(/\D/g, '')))
                    .setDisabled(eval('memorydatad12' + sender.toString().replace(/\D/g, ''))),

                new ButtonBuilder()
                    .setEmoji(eval('memorydataf13' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-13-' + bet)
					.setStyle(eval('memorydatabc13' + sender.toString().replace(/\D/g, '')))
                    .setDisabled(eval('memorydatad13' + sender.toString().replace(/\D/g, ''))),
                
                new ButtonBuilder()
                    .setEmoji(eval('memorydataf14' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-14-' + bet)
					.setStyle(eval('memorydatabc14' + sender.toString().replace(/\D/g, '')))
                    .setDisabled(eval('memorydatad14' + sender.toString().replace(/\D/g, ''))),

                new ButtonBuilder()
                    .setEmoji(eval('memorydataf15' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-15-' + bet)
					.setStyle(eval('memorydatabc15' + sender.toString().replace(/\D/g, '')))
                    .setDisabled(eval('memorydatad15' + sender.toString().replace(/\D/g, ''))),
			);
        row4 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
                    .setEmoji(eval('memorydataf16' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-16-' + bet)
					.setStyle(eval('memorydatabc16' + sender.toString().replace(/\D/g, '')))
                    .setDisabled(eval('memorydatad16' + sender.toString().replace(/\D/g, ''))),

                new ButtonBuilder()
                    .setEmoji(eval('memorydataf17' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-17-' + bet)
					.setStyle(eval('memorydatabc17' + sender.toString().replace(/\D/g, '')))
                    .setDisabled(eval('memorydatad17' + sender.toString().replace(/\D/g, ''))),

                new ButtonBuilder()
                    .setEmoji(eval('memorydataf18' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-18-' + bet)
					.setStyle(eval('memorydatabc18' + sender.toString().replace(/\D/g, '')))
                    .setDisabled(eval('memorydatad18' + sender.toString().replace(/\D/g, ''))),
                
                new ButtonBuilder()
                    .setEmoji(eval('memorydataf19' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-19-' + bet)
					.setStyle(eval('memorydatabc19' + sender.toString().replace(/\D/g, '')))
                    .setDisabled(eval('memorydatad19' + sender.toString().replace(/\D/g, ''))),

                new ButtonBuilder()
                    .setEmoji(eval('memorydataf20' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-20-' + bet)
					.setStyle(eval('memorydatabc20' + sender.toString().replace(/\D/g, '')))
                    .setDisabled(eval('memorydatad20' + sender.toString().replace(/\D/g, ''))),
			);

        // Update Message
        return interaction.message.edit({ embeds: [message.toJSON()], components: [row1, row2, row3, row4], ephemeral: true })
    }
}