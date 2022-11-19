const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const { EmbedBuilder } = require('@discordjs/builders')

const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: {
        name: 'ttt-choice'
    },
    async execute(interaction, client, lang, vote, bet, sel) {
        // Get Users
        const cache = interaction.message.embeds
        const description = cache[0].description.toString().replace(/[^\d@!]/g, '').split('!')[0].substring(1).split("@");
        const [sender, reciever] = description

        // Check if User is playing
        if (sender != interaction.user.id && reciever != interaction.user.id) {
            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» You arent playing!')
        		.setFooter({ text: '» ' + vote + ' » ' + config.version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Du spielst garnicht mit!')
        		    .setFooter({ text: '» ' + vote + ' » ' + config.version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] TICTACTOE : NOTPLAYING')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Check Turn
        const turn = await eval('tttdatatu' + sender)
        if (interaction.user.id != turn) {
            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» Its not your turn!')
        		.setFooter({ text: '» ' + vote + ' » ' + config.version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Es ist nicht dein Zug!')
        		    .setFooter({ text: '» ' + vote + ' » ' + config.version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] TICTACTOE : NOTTURN')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Defer Reply
        await interaction.deferUpdate()

        // Translate Turn to Emoji
        let turnemoji
        if (turn == sender) {
            turnemoji = '🔵'
        }
        if (turn == reciever) {
            turnemoji = '🔴'
        }

        // Set Variables
        await eval('global.tttdatatuf' + sender + ' = parseInt(tttdatatuf' + sender + ') + 1')
        await eval('global.tttdatad' + sel + sender + ' = true')

        const msel = sel - 1
        if (interaction.user.id == sender) {
            await eval('global.tttdataf' + sel + sender + ' = "1020411088245903451"')
            await eval('global.tttdatabc' + sel + sender + ' = ButtonStyle.Primary')
            await eval('global.tttdata1a' + sender + '[' + msel+ '] = true')
        }
        if (interaction.user.id == reciever) {
            await eval('global.tttdataf' + sel + sender + ' = "1020411023414542447"')
            await eval('global.tttdatabc' + sel + sender + ' = ButtonStyle.Danger')
            await eval('global.tttdata2a' + sender + '[' + msel + '] = true')
        }

        // Turn Switcher
        if (turn == sender) {
            await eval('global.tttdatatu' + sender + ' = ' + reciever)
            turnemoji = '🔴'
        }
        if (turn == reciever) {
            await eval('global.tttdatatu' + sender + ' = ' + sender)
            turnemoji = '🔵'
        }

        // Create Buttons
        let row1 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
                    .setEmoji(eval('tttdataf1' + sender))
                    .setCustomId('TTT-1-' + bet)
					.setStyle(eval('tttdatabc1' + sender))
                    .setDisabled(eval('tttdatad1' + sender)),

                new ButtonBuilder()
                    .setEmoji(eval('tttdataf2' + sender))
                    .setCustomId('TTT-2-' + bet)
					.setStyle(eval('tttdatabc2' + sender))
                    .setDisabled(eval('tttdatad2' + sender)),

                new ButtonBuilder()
                    .setEmoji(eval('tttdataf3' + sender))
                    .setCustomId('TTT-3-' + bet)
					.setStyle(eval('tttdatabc3' + sender))
                    .setDisabled(eval('tttdatad3' + sender)),
			);
        let row2 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
                    .setEmoji(eval('tttdataf4' + sender))
                    .setCustomId('TTT-4-' + bet)
					.setStyle(eval('tttdatabc4' + sender))
                    .setDisabled(eval('tttdatad4' + sender)),

                new ButtonBuilder()
                    .setEmoji(eval('tttdataf5' + sender))
                    .setCustomId('TTT-5-' + bet)
					.setStyle(eval('tttdatabc5' + sender))
                    .setDisabled(eval('tttdatad5' + sender)),

                new ButtonBuilder()
                    .setEmoji(eval('tttdataf6' + sender))
                    .setCustomId('TTT-6-' + bet)
					.setStyle(eval('tttdatabc6' + sender))
                    .setDisabled(eval('tttdatad6' + sender)),
			);
        let row3 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
                    .setEmoji(eval('tttdataf7' + sender))
                    .setCustomId('TTT-7-' + bet)
					.setStyle(eval('tttdatabc7' + sender))
                    .setDisabled(eval('tttdatad7' + sender)),

                new ButtonBuilder()
                    .setEmoji(eval('tttdataf8' + sender))
                    .setCustomId('TTT-8-' + bet)
					.setStyle(eval('tttdatabc8' + sender))
                    .setDisabled(eval('tttdatad8' + sender)),

                new ButtonBuilder()
                    .setEmoji(eval('tttdataf9' + sender))
                    .setCustomId('TTT-9-' + bet)
					.setStyle(eval('tttdatabc9' + sender))
                    .setDisabled(eval('tttdatad9' + sender)),
			);

        // Create Embed
        let message = new EmbedBuilder().setColor(0x37009B)
            .setTitle('<:GAMEPAD:1024395990679167066> » TICTACTOE')
            .setDescription('» <@' + sender + '> is playing Tic Tac Toe with <@' + reciever + '>!\nThe Bet is **$' + bet + '**\n\n🔵 » <@' + sender + '>\n🔴 » <@' + reciever + '>')
            .setFooter({ text: '» ' + config.version + ' » CURRENT TURN: ' + turnemoji });

        if (lang === 'de') {
            message = new EmbedBuilder().setColor(0x37009B)
                .setTitle('<:GAMEPAD:1024395990679167066> » TICTACTOE')
                .setDescription('» <@' + sender + '> spielt mit <@' + reciever + '> Tic Tac Toe!\nDie Wette ist **' + bet + '€**\n\n🔵 » <@' + sender + '>\n🔴 » <@' + reciever + '>')
                .setFooter({ text: '» ' + config.version + ' » AM ZUG: ' + turnemoji });
        }

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] TICTACTOE : ' + sel)
        interaction.editReply({ embeds: [message], components: [row1, row2, row3], ephemeral: true })

        // Update Message
        await interaction.message.edit({ embeds: [message], components: [row1, row2, row3], ephemeral: true })
        await wait(1000)

        // Check if Anyone Won
        let won = false
        if (await eval('tttdata1a' + sender + '[0] == true') && await eval('tttdata1a' + sender + '[1] == true') && await eval('tttdata1a' + sender + '[2] == true')) {
            won = true
        }
        if (await eval('tttdata1a' + sender + '[3] == true') && await eval('tttdata1a' + sender + '[4] == true') && await eval('tttdata1a' + sender + '[5] == true')) {
            won = true
        }
        if (await eval('tttdata1a' + sender + '[6] == true') && await eval('tttdata1a' + sender + '[7] == true') && await eval('tttdata1a' + sender + '[8] == true')) {
            won = true
        }
        if (await eval('tttdata1a' + sender + '[0] == true') && await eval('tttdata1a' + sender + '[3] == true') && await eval('tttdata1a' + sender + '[6] == true')) {
            won = true
        }
        if (await eval('tttdata1a' + sender + '[1] == true') && await eval('tttdata1a' + sender + '[4] == true') && await eval('tttdata1a' + sender + '[7] == true')) {
            won = true
        }
        if (await eval('tttdata1a' + sender + '[2] == true') && await eval('tttdata1a' + sender + '[5] == true') && await eval('tttdata1a' + sender + '[8] == true')) {
            won = true
        }
        if (await eval('tttdata1a' + sender + '[0] == true') && await eval('tttdata1a' + sender + '[4] == true') && await eval('tttdata1a' + sender + '[8] == true')) {
            won = true
        }
        if (await eval('tttdata1a' + sender + '[6] == true') && await eval('tttdata1a' + sender + '[4] == true') && await eval('tttdata1a' + sender + '[2] == true')) {
            won = true
        }
        if (await eval('tttdata2a' + sender + '[0] == true') && await eval('tttdata2a' + sender + '[1] == true') && await eval('tttdata2a' + sender + '[2] == true')) {
            won = true
        }
        if (await eval('tttdata2a' + sender + '[3] == true') && await eval('tttdata2a' + sender + '[4] == true') && await eval('tttdata2a' + sender + '[5] == true')) {
            won = true
        }
        if (await eval('tttdata2a' + sender + '[6] == true') && await eval('tttdata2a' + sender + '[7] == true') && await eval('tttdata2a' + sender + '[8] == true')) {
            won = true
        }
        if (await eval('tttdata2a' + sender + '[0] == true') && await eval('tttdata2a' + sender + '[3] == true') && await eval('tttdata2a' + sender + '[6] == true')) {
            won = true
        }
        if (await eval('tttdata2a' + sender + '[1] == true') && await eval('tttdata2a' + sender + '[4] == true') && await eval('tttdata2a' + sender + '[7] == true')) {
            won = true
        }
        if (await eval('tttdata2a' + sender + '[2] == true') && await eval('tttdata2a' + sender + '[5] == true') && await eval('tttdata2a' + sender + '[8] == true')) {
            won = true
        }
        if (await eval('tttdata2a' + sender + '[0] == true') && await eval('tttdata2a' + sender + '[4] == true') && await eval('tttdata2a' + sender + '[8] == true')) {
            won = true
        }
        if (await eval('tttdata2a' + sender + '[6] == true') && await eval('tttdata2a' + sender + '[4] == true') && await eval('tttdata2a' + sender + '[2] == true')) {
            won = true
        }

        // Check if Round has ended
        if(won || await eval('tttdatatuf' + sender + ' == 9')) {
            // Check Who Won
            let winner = '**Noone**'
            if (lang === 'de') { winner = '**Niemand**' }
            if (await eval('tttdata1a' + sender + '[0] == true') && await eval('tttdata1a' + sender + '[1] == true') && await eval('tttdata1a' + sender + '[2] == true')) {
                winner = '<@' + sender + '>'
                await eval('global.tttdatabc1' + sender + ' = ButtonStyle.Success')
                await eval('global.tttdatabc2' + sender + ' = ButtonStyle.Success')
                await eval('global.tttdatabc3' + sender + ' = ButtonStyle.Success')
            }
            if (await eval('tttdata1a' + sender + '[3] == true') && await eval('tttdata1a' + sender + '[4] == true') && await eval('tttdata1a' + sender + '[5] == true')) {
                winner = '<@' + sender + '>'
                await eval('global.tttdatabc4' + sender + ' = ButtonStyle.Success')
                await eval('global.tttdatabc5' + sender + ' = ButtonStyle.Success')
                await eval('global.tttdatabc6' + sender + ' = ButtonStyle.Success')
            }
            if (await eval('tttdata1a' + sender + '[6] == true') && await eval('tttdata1a' + sender + '[7] == true') && await eval('tttdata1a' + sender + '[8] == true')) {
                winner = '<@' + sender + '>'
                await eval('global.tttdatabc7' + sender + ' = ButtonStyle.Success')
                await eval('global.tttdatabc8' + sender + ' = ButtonStyle.Success')
                await eval('global.tttdatabc9' + sender + ' = ButtonStyle.Success')
            }
            if (await eval('tttdata1a' + sender + '[0] == true') && await eval('tttdata1a' + sender + '[3] == true') && await eval('tttdata1a' + sender + '[6] == true')) {
                winner = '<@' + sender + '>'
                await eval('global.tttdatabc1' + sender + ' = ButtonStyle.Success')
                await eval('global.tttdatabc4' + sender + ' = ButtonStyle.Success')
                await eval('global.tttdatabc7' + sender + ' = ButtonStyle.Success')
            }
            if (await eval('tttdata1a' + sender + '[1] == true') && await eval('tttdata1a' + sender + '[4] == true') && await eval('tttdata1a' + sender + '[7] == true')) {
                winner = '<@' + sender + '>'
                await eval('global.tttdatabc2' + sender + ' = ButtonStyle.Success')
                await eval('global.tttdatabc5' + sender + ' = ButtonStyle.Success')
                await eval('global.tttdatabc8' + sender + ' = ButtonStyle.Success')
            }
            if (await eval('tttdata1a' + sender + '[2] == true') && await eval('tttdata1a' + sender + '[5] == true') && await eval('tttdata1a' + sender + '[8] == true')) {
                winner = '<@' + sender + '>'
                await eval('global.tttdatabc3' + sender + ' = ButtonStyle.Success')
                await eval('global.tttdatabc6' + sender + ' = ButtonStyle.Success')
                await eval('global.tttdatabc9' + sender + ' = ButtonStyle.Success')
            }
            if (await eval('tttdata1a' + sender + '[0] == true') && await eval('tttdata1a' + sender + '[4] == true') && await eval('tttdata1a' + sender + '[8] == true')) {
                winner = '<@' + sender + '>'
                await eval('global.tttdatabc1' + sender + ' = ButtonStyle.Success')
                await eval('global.tttdatabc5' + sender + ' = ButtonStyle.Success')
                await eval('global.tttdatabc9' + sender + ' = ButtonStyle.Success')
            }
            if (await eval('tttdata1a' + sender + '[6] == true') && await eval('tttdata1a' + sender + '[4] == true') && await eval('tttdata1a' + sender + '[2] == true')) {
                winner = '<@' + sender + '>'
                await eval('global.tttdatabc3' + sender + ' = ButtonStyle.Success')
                await eval('global.tttdatabc5' + sender + ' = ButtonStyle.Success')
                await eval('global.tttdatabc7' + sender + ' = ButtonStyle.Success')
            }
            if (await eval('tttdata2a' + sender + '[0] == true') && await eval('tttdata2a' + sender + '[1] == true') && await eval('tttdata2a' + sender + '[2] == true')) {
                winner = '<@' + reciever + '>'
                await eval('global.tttdatabc1' + sender + ' = ButtonStyle.Success')
                await eval('global.tttdatabc2' + sender + ' = ButtonStyle.Success')
                await eval('global.tttdatabc3' + sender + ' = ButtonStyle.Success')
            }
            if (await eval('tttdata2a' + sender + '[3] == true') && await eval('tttdata2a' + sender + '[4] == true') && await eval('tttdata2a' + sender + '[5] == true')) {
                winner = '<@' + reciever + '>'
                await eval('global.tttdatabc4' + sender + ' = ButtonStyle.Success')
                await eval('global.tttdatabc5' + sender + ' = ButtonStyle.Success')
                await eval('global.tttdatabc6' + sender + ' = ButtonStyle.Success')
            }
            if (await eval('tttdata2a' + sender + '[6] == true') && await eval('tttdata2a' + sender + '[7] == true') && await eval('tttdata2a' + sender + '[8] == true')) {
                winner = '<@' + reciever + '>'
                await eval('global.tttdatabc7' + sender + ' = ButtonStyle.Success')
                await eval('global.tttdatabc8' + sender + ' = ButtonStyle.Success')
                await eval('global.tttdatabc9' + sender + ' = ButtonStyle.Success')
            }
            if (await eval('tttdata2a' + sender + '[0] == true') && await eval('tttdata2a' + sender + '[3] == true') && await eval('tttdata2a' + sender + '[6] == true')) {
                winner = '<@' + reciever + '>'
                await eval('global.tttdatabc1' + sender + ' = ButtonStyle.Success')
                await eval('global.tttdatabc4' + sender + ' = ButtonStyle.Success')
                await eval('global.tttdatabc7' + sender + ' = ButtonStyle.Success')
            }
            if (await eval('tttdata2a' + sender + '[1] == true') && await eval('tttdata2a' + sender + '[4] == true') && await eval('tttdata2a' + sender + '[7] == true')) {
                winner = '<@' + reciever + '>'
                await eval('global.tttdatabc2' + sender + ' = ButtonStyle.Success')
                await eval('global.tttdatabc5' + sender + ' = ButtonStyle.Success')
                await eval('global.tttdatabc8' + sender + ' = ButtonStyle.Success')
            }
            if (await eval('tttdata2a' + sender + '[2] == true') && await eval('tttdata2a' + sender + '[5] == true') && await eval('tttdata2a' + sender + '[8] == true')) {
                winner = '<@' + reciever + '>'
                await eval('global.tttdatabc3' + sender + ' = ButtonStyle.Success')
                await eval('global.tttdatabc6' + sender + ' = ButtonStyle.Success')
                await eval('global.tttdatabc9' + sender + ' = ButtonStyle.Success')
            }
            if (await eval('tttdata2a' + sender + '[0] == true') && await eval('tttdata2a' + sender + '[4] == true') && await eval('tttdata2a' + sender + '[8] == true')) {
                winner = '<@' + reciever + '>'
                await eval('global.tttdatabc1' + sender + ' = ButtonStyle.Success')
                await eval('global.tttdatabc5' + sender + ' = ButtonStyle.Success')
                await eval('global.tttdatabc9' + sender + ' = ButtonStyle.Success')
            }
            if (await eval('tttdata2a' + sender + '[6] == true') && await eval('tttdata2a' + sender + '[4] == true') && await eval('tttdata2a' + sender + '[2] == true')) {
                winner = '<@' + reciever + '>'
                await eval('global.tttdatabc3' + sender + ' = ButtonStyle.Success')
                await eval('global.tttdatabc5' + sender + ' = ButtonStyle.Success')
                await eval('global.tttdatabc7' + sender + ' = ButtonStyle.Success')
            }

            // Deactivate all Buttons
            const buttondatas = []
            let buttoncount = 1
            let donebutton = false
            const dbtn = async () => {
                while (donebutton == false) {
                    await wait(10)
                    if (await eval('tttdatad' + buttoncount + sender + ' == false')) {
                        await eval('global.tttdatad' + buttoncount + sender + ' = true')
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

            // Transfer Money
            const betwon = parseInt(bet) * 2; let transaction
            if (winner != '**Noone**' && winner != '**Niemand**') {
                bot.money.add(interaction.guild.id, winner, parseInt(betwon))

                // Log Transaction
                if (betwon > 0) transaction = await bot.transactions.log({
                    success: true,
                    sender: {
                        id: (winner === sender ? reciever : sender),
                        amount: betwon,
                        type: 'negative'
                    }, reciever: {
                        id: winner,
                        amount: betwon,
                        type: 'positive'
                    }
                })
            } else {
                bot.money.add(interaction.guild.id, sender, parseInt(bet))
                bot.money.add(interaction.guild.id, reciever, parseInt(bet))
            }

            // Create Buttons
            row1 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setEmoji(eval('tttdataf1' + sender))
                        .setCustomId('TTT-1-' + bet)
                        .setStyle(eval('tttdatabc1' + sender))
                        .setDisabled(eval('tttdatad1' + sender)),

                    new ButtonBuilder()
                        .setEmoji(eval('tttdataf2' + sender))
                        .setCustomId('TTT-2-' + bet)
                        .setStyle(eval('tttdatabc2' + sender))
                        .setDisabled(eval('tttdatad2' + sender)),

                    new ButtonBuilder()
                        .setEmoji(eval('tttdataf3' + sender))
                        .setCustomId('TTT-3-' + bet)
                        .setStyle(eval('tttdatabc3' + sender))
                        .setDisabled(eval('tttdatad3' + sender)),
                );
            row2 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setEmoji(eval('tttdataf4' + sender))
                        .setCustomId('TTT-4-' + bet)
                        .setStyle(eval('tttdatabc4' + sender))
                        .setDisabled(eval('tttdatad4' + sender)),

                    new ButtonBuilder()
                        .setEmoji(eval('tttdataf5' + sender))
                        .setCustomId('TTT-5-' + bet)
                        .setStyle(eval('tttdatabc5' + sender))
                        .setDisabled(eval('tttdatad5' + sender)),

                    new ButtonBuilder()
                        .setEmoji(eval('tttdataf6' + sender))
                        .setCustomId('TTT-6-' + bet)
                        .setStyle(eval('tttdatabc6' + sender))
                        .setDisabled(eval('tttdatad6' + sender)),
                );
            row3 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setEmoji(eval('tttdataf7' + sender))
                        .setCustomId('TTT-7-' + bet)
                        .setStyle(eval('tttdatabc7' + sender))
                        .setDisabled(eval('tttdatad7' + sender)),

                    new ButtonBuilder()
                        .setEmoji(eval('tttdataf8' + sender))
                        .setCustomId('TTT-8-' + bet)
                        .setStyle(eval('tttdatabc8' + sender))
                        .setDisabled(eval('tttdatad8' + sender)),

                    new ButtonBuilder()
                        .setEmoji(eval('tttdataf9' + sender))
                        .setCustomId('TTT-9-' + bet)
                        .setStyle(eval('tttdatabc9' + sender))
                        .setDisabled(eval('tttdatad9' + sender)),
                );

            // Create Embed
            message = new EmbedBuilder().setColor(0x37009B)
                .setTitle('<:GAMEPAD:1024395990679167066> » TICTACTOE')
                .setDescription('» <@' + sender + '> is playing Tic Tac Toe with <@' + reciever + '>!\nThe Bet is **$' + bet + '**\n\n🔵 » <@' + sender + '>\n🔴 » <@' + reciever + '>\n\n<:AWARD:1024385473524793445> ' + winner + ' has won **$' + betwon + '**.' + ((typeof transaction === 'object') ? `\nID: ${transaction.id}` : ''))
                .setFooter({ text: '» ' + vote + ' » ' + config.version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:GAMEPAD:1024395990679167066> » TICTACTOE')
                    .setDescription('» <@' + sender + '> spielt mit <@' + reciever + '> Tic Tac Toe!\nDie Wette ist **' + bet + '€**\n\n🔵 » <@' + sender + '>\n🔴 » <@' + reciever + '>\n\n<:AWARD:1024385473524793445> ' + winner + ' hat **' + betwon + '€** gewonnen.' + ((typeof transaction === 'object') ? `\nID: ${transaction.id}` : ''))
                    .setFooter({ text: '» ' + vote + ' » ' + config.version });
            }

            // Delete Variables
            eval('delete tttdatatu' + sender)
            eval('delete tttdatatuf' + sender)

            eval('delete tttdataf1' + sender)
            eval('delete tttdataf2' + sender)
            eval('delete tttdataf3' + sender)
            eval('delete tttdataf4' + sender)
            eval('delete tttdataf5' + sender)
            eval('delete tttdataf6' + sender)
            eval('delete tttdataf7' + sender)
            eval('delete tttdataf8' + sender)
            eval('delete tttdataf9' + sender)

            eval('delete tttdatabc1' + sender)
            eval('delete tttdatabc2' + sender)
            eval('delete tttdatabc3' + sender)
            eval('delete tttdatabc4' + sender)
            eval('delete tttdatabc5' + sender)
            eval('delete tttdatabc6' + sender)
            eval('delete tttdatabc7' + sender)
            eval('delete tttdatabc8' + sender)
            eval('delete tttdatabc9' + sender)

            eval('delete tttdatad1' + sender)
            eval('delete tttdatad2' + sender)
            eval('delete tttdatad3' + sender)
            eval('delete tttdatad4' + sender)
            eval('delete tttdatad5' + sender)
            eval('delete tttdatad6' + sender)
            eval('delete tttdatad7' + sender)
            eval('delete tttdatad8' + sender)
            eval('delete tttdatad9' + sender)

            eval('delete tttdatap' + sender)
            eval('delete tttdatap' + reciever)
            eval('delete tttdatapc' + sender)
            eval('delete tttdatapc' + reciever)
            eval('delete tttdatapcn' + sender)
            eval('delete tttdatapcn' + reciever)
            eval('delete tttdatapca' + sender)
            eval('delete tttdatapca' + reciever)

            eval('delete ttts' + sender)
            eval('delete ttts' + reciever)

            // Update Message
            return interaction.message.edit({ embeds: [message], components: [row1, row2, row3], ephemeral: true })
        }

        // Create Buttons
        row1 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
                    .setEmoji(eval('tttdataf1' + sender))
                    .setCustomId('TTT-1-' + bet)
					.setStyle(eval('tttdatabc1' + sender))
                    .setDisabled(eval('tttdatad1' + sender)),

                new ButtonBuilder()
                    .setEmoji(eval('tttdataf2' + sender))
                    .setCustomId('TTT-2-' + bet)
					.setStyle(eval('tttdatabc2' + sender))
                    .setDisabled(eval('tttdatad2' + sender)),

                new ButtonBuilder()
                    .setEmoji(eval('tttdataf3' + sender))
                    .setCustomId('TTT-3-' + bet)
					.setStyle(eval('tttdatabc3' + sender))
                    .setDisabled(eval('tttdatad3' + sender)),
			);
        row2 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
                    .setEmoji(eval('tttdataf4' + sender))
                    .setCustomId('TTT-4-' + bet)
					.setStyle(eval('tttdatabc4' + sender))
                    .setDisabled(eval('tttdatad4' + sender)),

                new ButtonBuilder()
                    .setEmoji(eval('tttdataf5' + sender))
                    .setCustomId('TTT-5-' + bet)
					.setStyle(eval('tttdatabc5' + sender))
                    .setDisabled(eval('tttdatad5' + sender)),

                new ButtonBuilder()
                    .setEmoji(eval('tttdataf6' + sender))
                    .setCustomId('TTT-6-' + bet)
					.setStyle(eval('tttdatabc6' + sender))
                    .setDisabled(eval('tttdatad6' + sender)),
			);
        row3 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
                    .setEmoji(eval('tttdataf7' + sender))
                    .setCustomId('TTT-7-' + bet)
					.setStyle(eval('tttdatabc7' + sender))
                    .setDisabled(eval('tttdatad7' + sender)),

                new ButtonBuilder()
                    .setEmoji(eval('tttdataf8' + sender))
                    .setCustomId('TTT-8-' + bet)
					.setStyle(eval('tttdatabc8' + sender))
                    .setDisabled(eval('tttdatad8' + sender)),

                new ButtonBuilder()
                    .setEmoji(eval('tttdataf9' + sender))
                    .setCustomId('TTT-9-' + bet)
					.setStyle(eval('tttdatabc9' + sender))
                    .setDisabled(eval('tttdatad9' + sender)),
			);

        // Update Message
        return interaction.message.edit({ embeds: [message], components: [row1, row2, row3], ephemeral: true })
    }
}