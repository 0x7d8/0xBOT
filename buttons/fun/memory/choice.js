const { EmbedBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { version } = require('../../../config.json');

const wait = require('node:timers/promises').setTimeout;

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

        // Check Turn
        const turn = await eval('memorydatatu' + sender.toString().replace(/\D/g, ''))
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
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [BTN] MEMORY : NOTTURN')
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
        await eval('global.memorydataf' + sel + sender.toString().replace(/\D/g, '') + ' = memorydatag' + sel + sender.toString().replace(/\D/g, ''))
        await eval('global.memorydatad' + sel + sender.toString().replace(/\D/g, '') + ' = true')
        await eval('global.memorydatapca' + interaction.user.id.replace(/\D/g, '') + ' = memorydatapca' + interaction.user.id.replace(/\D/g, '') + ' + 1')
        let se = false
        let sno = false
        let nums = []
        if (await eval('memorydatapca' + interaction.user.id.replace(/\D/g, '')) + ' < 2') {
            if (await eval('memorydatapc' + interaction.user.id.replace(/\D/g, '') + '.includes("' + await eval('memorydataf' + sel + sender.toString().replace(/\D/g, '')) + '")')) {
                await eval('global.memorydatap' + interaction.user.id.replace(/\D/g, '') + ' = memorydatap' + interaction.user.id.replace(/\D/g, '') + ' + 1')
                await eval('global.memorydatapca' + interaction.user.id.replace(/\D/g, '') + ' = 0')

                if (interaction.user.id.replace(/\D/g, '') == sender.toString().replace(/\D/g, '')) {
                    eval('global.memorydatabc' + await eval('memorydatapcn' + interaction.user.id.replace(/\D/g, '') + '[0]') + sender.replace(/\D/g, '') + ' = ButtonStyle.Primary')
                    eval('global.memorydatabc' + sel + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Primary')
                }
                if (interaction.user.id.replace(/\D/g, '') == reciever.toString().replace(/\D/g, '')) {
                    eval('global.memorydatabc' + await eval('memorydatapcn' + interaction.user.id.replace(/\D/g, '') + '[0]') + sender.replace(/\D/g, '') + ' = ButtonStyle.Danger')
                    eval('global.memorydatabc' + sel + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Danger')
                }
                await eval('global.memorydatapc' + interaction.user.id.replace(/\D/g, '') + ' = []')
                await eval('global.memorydatapcn' + interaction.user.id.replace(/\D/g, '') + ' = []')
                sno = true
                se = true
            }
        }
        if (await eval('memorydatapca' + interaction.user.id.replace(/\D/g, '')) + ' < 2' && !sno) {
            if (!await eval('memorydatapc' + interaction.user.id.replace(/\D/g, '') + '.includes("' + await eval('memorydataf' + sel + sender.toString().replace(/\D/g, '')) + '")')) {
                await eval('memorydatapc' + interaction.user.id.replace(/\D/g, '') + '.push("' + await eval('memorydataf' + sel + sender.toString().replace(/\D/g, '')) + '")')
                await eval('memorydatapcn' + interaction.user.id.replace(/\D/g, '') + '.push("' + sel + '")')
                await eval('global.memorydatad' + sel + sender.toString().replace(/\D/g, '') + ' = true')
                se = false
            }
        }
        if (await eval('memorydatapca' + interaction.user.id.replace(/\D/g, '') + ' > 1')) {
            nums = []
            nums[0] = (await eval('memorydatapcn' + interaction.user.id.replace(/\D/g, '') + '[0]'))
            nums[1] = (await eval('memorydatapcn' + interaction.user.id.replace(/\D/g, '') + '[1]'))


            // Turn Switcher
            if (turn == sender.toString().replace(/\D/g, '')) {
                await eval('global.memorydatatu' + sender.toString().replace(/\D/g, '') + ' = ' + reciever.toString().replace(/\D/g, ''))
                turnemoji = '🔴'
            }
            if (turn == reciever.toString().replace(/\D/g, '')) {
                await eval('global.memorydatatu' + sender.toString().replace(/\D/g, '') + ' = ' + sender.toString().replace(/\D/g, ''))
                turnemoji = '🔵'
            }


            await eval('global.memorydatapca' + interaction.user.id.replace(/\D/g, '') + ' = 0')
            await eval('global.memorydatapc' + interaction.user.id.replace(/\D/g, '') + ' = []')
            await eval('global.memorydatapcn' + interaction.user.id.replace(/\D/g, '') + ' = []')
            se = true
        }

        // Deactivate all Buttons
        const buttondatas = []
        let buttoncount = 1
        let donebutton = false
        const dbtn = async () => {
            while (donebutton == false) {
                await wait(25)
                if (await eval('memorydatad' + buttoncount + sender.toString().replace(/\D/g, '') + ' == false')) {
                    await eval('global.memorydatad' + buttoncount + sender.toString().replace(/\D/g, '') + ' = true')
                    buttondatas.push(buttoncount.toString())
                }
                buttoncount = buttoncount + 1
                if (buttoncount == 21) {
                    donebutton = true
                    return
                }
            }
        }
        if (se == true) {
            await dbtn()
        }

        // Create Buttons
        let row1 = new ActionRowBuilder()
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
        let row2 = new ActionRowBuilder()
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
        let row3 = new ActionRowBuilder()
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
        let row4 = new ActionRowBuilder()
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

        // Create Embed
        let message = new EmbedBuilder()
            .setTitle('» MEMORY')
            .setDescription('» <@' + sender.toString().replace(/\D/g, '') + '> is playing Memory with <@' + reciever.toString().replace(/\D/g, '') + '>!\nThe Bet is **$' + bet + '**\n\n🔵 » Points of <@' + sender.toString().replace(/\D/g, '') + '> are **' + eval('memorydatap' + sender.toString().replace(/\D/g, '')) + '**\n🔴 » Points of <@' + reciever.toString().replace(/\D/g, '') + '> are **' + eval('memorydatap' + reciever.toString().replace(/\D/g, '')) + '**')
            .setFooter({ text: '» ' + version + ' » CURRENT TURN: ' + turnemoji });

        if (interaction.guildLocale == "de") {
            message = new EmbedBuilder()
                .setTitle('» MEMORY')
                .setDescription('» <@' + sender.toString().replace(/\D/g, '') + '> spielt mit <@' + reciever.toString().replace(/\D/g, '') + '> Memory!\nDie Wette ist **' + bet + '€**\n\n🔵 » Punkte von <@' + sender.toString().replace(/\D/g, '') + '> sind **' + eval('memorydatap' + sender.toString().replace(/\D/g, '')) + '**\n🔴 » Punkte von <@' + reciever.toString().replace(/\D/g, '') + '> sind **' + eval('memorydatap' + reciever.toString().replace(/\D/g, '')) +'**')
                .setFooter({ text: '» ' + version + ' » AM ZUG: ' + turnemoji });
        }

        // Send Message
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [BTN] MEMORY : ' + sel + ' : ' + eval('memorydataf' + sel + sender.toString().replace(/\D/g, '')))
        interaction.update({ embeds: [message.toJSON()], components: [row1, row2, row3, row4], ephemeral: true })

        // Update Message
        interaction.message.edit({ embeds: [message.toJSON()], components: [row1, row2, row3, row4], ephemeral: true })

        // Check for Special Conditions
        if (se == false) return
        await wait(2500)

        // Activate all Deactivated Buttons
        buttoncount = 0
        donebutton = false
        const abtn = async () => {
            while (donebutton == false) {
                await wait(25)
                if (buttondatas.includes(buttoncount.toString())) {
                    await eval('global.memorydatad' + buttoncount + sender.toString().replace(/\D/g, '') + ' = false')
                }
                buttoncount = buttoncount + 1
                if (buttoncount == 21) {
                    donebutton = true
                    return
                }
            }
        }
        await abtn()

        // Remove Emojis
        await eval('global.memorydataf' + nums[0] + sender.toString().replace(/\D/g, '') + ' = "1017050508252418068"')
        await eval('global.memorydataf' + nums[1] + sender.toString().replace(/\D/g, '') + ' = "1017050508252418068"')
        await wait(50)
        await eval('global.memorydatad' + nums[0] + sender.toString().replace(/\D/g, '') + ' = false')
        await eval('global.memorydatad' + nums[1] + sender.toString().replace(/\D/g, '') + ' = false')

        // Check if Round has ended
        if(await eval('parseInt(memorydatap' + sender.toString().replace(/\D/g, '') + ') + parseInt(memorydatap' + reciever.toString().replace(/\D/g, '') + ') == 10')) {
            // Check Who Won
            const senderpoints = await eval('memorydatap' + sender.toString().replace(/\D/g, ''))
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
                .setTitle('» MEMORY')
                .setDescription('» <@' + sender.toString().replace(/\D/g, '') + '> is playing Memory with <@' + reciever.toString().replace(/\D/g, '') + '>!\nThe Bet is **$' + bet + '**\n\n🔵 » Points of <@' + sender.toString().replace(/\D/g, '') + '> are **' + eval('memorydatap' + sender.toString().replace(/\D/g, '')) + '**\n🔴 » Points of <@' + reciever.toString().replace(/\D/g, '') + '> are **' + eval('memorydatap' + reciever.toString().replace(/\D/g, '')) + '**\n\n' + winner + ' has won **$' + betwon + '**!')
                .setFooter({ text: '» ' + version });

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
                    .setTitle('» MEMORY')
                    .setDescription('» <@' + sender.toString().replace(/\D/g, '') + '> spielt mit <@' + reciever.toString().replace(/\D/g, '') + '> Memory!\nDie Wette ist **' + bet + '€**\n\n🔵 » Punkte von <@' + sender.toString().replace(/\D/g, '') + '> sind **' + eval('memorydatap' + sender.toString().replace(/\D/g, '')) + '**\n🔴 » Punkte von <@' + reciever.toString().replace(/\D/g, '') + '> sind **' + eval('memorydatap' + reciever.toString().replace(/\D/g, '')) +'**\n\n' + winner + ' hat **' + betwon + '€** gewonnen!')
                    .setFooter({ text: '» ' + version });
            }

            // Delete Variables
            eval('delete memorydatatu' + sender.toString().replace(/\D/g, ''))

            eval('delete memorydataf1' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydataf2' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydataf3' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydataf4' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydataf5' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydataf6' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydataf7' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydataf8' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydataf9' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydataf10' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydataf11' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydataf12' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydataf13' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydataf14' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydataf15' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydataf16' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydataf17' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydataf18' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydataf19' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydataf20' + sender.toString().replace(/\D/g, ''))

            eval('delete memorydatag1' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatag2' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatag3' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatag4' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatag5' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatag6' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatag7' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatag8' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatag9' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatag10' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatag11' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatag12' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatag13' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatag14' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatag15' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatag16' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatag17' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatag18' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatag19' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatag20' + sender.toString().replace(/\D/g, ''))

            eval('delete memorydatabc1' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatabc2' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatabc3' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatabc4' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatabc5' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatabc6' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatabc7' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatabc8' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatabc9' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatabc10' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatabc11' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatabc12' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatabc13' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatabc14' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatabc15' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatabc16' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatabc17' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatabc18' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatabc19' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatabc20' + sender.toString().replace(/\D/g, ''))

            eval('delete memorydatad1' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatad2' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatad3' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatad4' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatad5' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatad6' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatad7' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatad8' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatad9' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatad10' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatad11' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatad12' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatad13' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatad14' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatad15' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatad16' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatad17' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatad18' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatad19' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatad20' + sender.toString().replace(/\D/g, ''))

            eval('delete memorydatap' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatap' + reciever.toString().replace(/\D/g, ''))
            eval('delete memorydatapc' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatapc' + reciever.toString().replace(/\D/g, ''))
            eval('delete memorydatapcn' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatapcn' + reciever.toString().replace(/\D/g, ''))
            eval('delete memorydatapca' + sender.toString().replace(/\D/g, ''))
            eval('delete memorydatapca' + reciever.toString().replace(/\D/g, ''))

            eval('delete memorys' + sender.toString().replace(/\D/g, ''))
            eval('delete memorys' + reciever.toString().replace(/\D/g, ''))

            // Update Message
            return interaction.message.edit({ embeds: [message.toJSON()], components: [row1, row2, row3, row4], ephemeral: true })
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