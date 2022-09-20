const { EmbedBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { version } = require('../../../config.json');

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
        if (sender.toString().replace(/\D/g, '') != interaction.user.id && reciever.toString().replace(/\D/g, '') != interaction.user.id) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('» ERROR')
        		.setDescription('» You arent playing!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang.toString() == "de") {
                message = new EmbedBuilder()
        		    .setTitle('» FEHLER')
        		    .setDescription('» Du spielst garnicht mit!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] TICTACTOE : NOTPLAYING')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Check Turn
        const turn = await eval('tttdatatu' + sender.toString().replace(/\D/g, ''))
        if (interaction.user.id != turn) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('» ERROR')
        		.setDescription('» Its not your turn!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang.toString() == "de") {
                message = new EmbedBuilder()
        		    .setTitle('» FEHLER')
        		    .setDescription('» Es ist nicht dein Zug!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] TICTACTOE : NOTTURN')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Defer Reply
        await interaction.deferUpdate()

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
        await eval('global.tttdatad' + sel + sender.toString().replace(/\D/g, '') + ' = true')

        const msel = sel - 1
        if (interaction.user.id == sender.toString().replace(/\D/g, '')) {
            await eval('global.tttdataf' + sel + sender.toString().replace(/\D/g, '') + ' = "1020411088245903451"')
            await eval('global.tttdatabc' + sel + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Primary')
            await eval('global.tttdata1a' + sender.toString().replace(/\D/g, '') + '[' + msel+ '] = true')
        }
        if (interaction.user.id == reciever.toString().replace(/\D/g, '')) {
            await eval('global.tttdataf' + sel + sender.toString().replace(/\D/g, '') + ' = "1020411023414542447"')
            await eval('global.tttdatabc' + sel + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Danger')
            await eval('global.tttdata2a' + sender.toString().replace(/\D/g, '') + '[' + msel + '] = true')
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

        if (lang.toString() == "de") {
            message = new EmbedBuilder()
                .setTitle('» TICTACTOE')
                .setDescription('» <@' + sender.toString().replace(/\D/g, '') + '> spielt mit <@' + reciever.toString().replace(/\D/g, '') + '> Tic Tac Toe!\nDie Wette ist **' + bet + '€**\n\n🔵 » <@' + sender.toString().replace(/\D/g, '') + '>\n🔴 » <@' + reciever.toString().replace(/\D/g, '') + '>')
                .setFooter({ text: '» ' + version + ' » AM ZUG: ' + turnemoji });
        }

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] TICTACTOE : ' + sel)
        interaction.editReply({ embeds: [message.toJSON()], components: [row1, row2, row3], ephemeral: true })

        // Update Message
        await interaction.message.edit({ embeds: [message.toJSON()], components: [row1, row2, row3], ephemeral: true })
        await wait(1000)

        // Check if Anyone Won
        let won = false
        if (await eval('tttdata1a' + sender.toString().replace(/\D/g, '') + '[0] == true') && await eval('tttdata1a' + sender.toString().replace(/\D/g, '') + '[1] == true') && await eval('tttdata1a' + sender.toString().replace(/\D/g, '') + '[2] == true')) {
            won = true
        }
        if (await eval('tttdata1a' + sender.toString().replace(/\D/g, '') + '[3] == true') && await eval('tttdata1a' + sender.toString().replace(/\D/g, '') + '[4] == true') && await eval('tttdata1a' + sender.toString().replace(/\D/g, '') + '[5] == true')) {
            won = true
        }
        if (await eval('tttdata1a' + sender.toString().replace(/\D/g, '') + '[6] == true') && await eval('tttdata1a' + sender.toString().replace(/\D/g, '') + '[7] == true') && await eval('tttdata1a' + sender.toString().replace(/\D/g, '') + '[8] == true')) {
            won = true
        }
        if (await eval('tttdata1a' + sender.toString().replace(/\D/g, '') + '[0] == true') && await eval('tttdata1a' + sender.toString().replace(/\D/g, '') + '[3] == true') && await eval('tttdata1a' + sender.toString().replace(/\D/g, '') + '[6] == true')) {
            won = true
        }
        if (await eval('tttdata1a' + sender.toString().replace(/\D/g, '') + '[1] == true') && await eval('tttdata1a' + sender.toString().replace(/\D/g, '') + '[4] == true') && await eval('tttdata1a' + sender.toString().replace(/\D/g, '') + '[7] == true')) {
            won = true
        }
        if (await eval('tttdata1a' + sender.toString().replace(/\D/g, '') + '[2] == true') && await eval('tttdata1a' + sender.toString().replace(/\D/g, '') + '[5] == true') && await eval('tttdata1a' + sender.toString().replace(/\D/g, '') + '[8] == true')) {
            won = true
        }
        if (await eval('tttdata1a' + sender.toString().replace(/\D/g, '') + '[0] == true') && await eval('tttdata1a' + sender.toString().replace(/\D/g, '') + '[4] == true') && await eval('tttdata1a' + sender.toString().replace(/\D/g, '') + '[8] == true')) {
            won = true
        }
        if (await eval('tttdata1a' + sender.toString().replace(/\D/g, '') + '[6] == true') && await eval('tttdata1a' + sender.toString().replace(/\D/g, '') + '[4] == true') && await eval('tttdata1a' + sender.toString().replace(/\D/g, '') + '[2] == true')) {
            won = true
        }
        if (await eval('tttdata2a' + sender.toString().replace(/\D/g, '') + '[0] == true') && await eval('tttdata2a' + sender.toString().replace(/\D/g, '') + '[1] == true') && await eval('tttdata2a' + sender.toString().replace(/\D/g, '') + '[2] == true')) {
            won = true
        }
        if (await eval('tttdata2a' + sender.toString().replace(/\D/g, '') + '[3] == true') && await eval('tttdata2a' + sender.toString().replace(/\D/g, '') + '[4] == true') && await eval('tttdata2a' + sender.toString().replace(/\D/g, '') + '[5] == true')) {
            won = true
        }
        if (await eval('tttdata2a' + sender.toString().replace(/\D/g, '') + '[6] == true') && await eval('tttdata2a' + sender.toString().replace(/\D/g, '') + '[7] == true') && await eval('tttdata2a' + sender.toString().replace(/\D/g, '') + '[8] == true')) {
            won = true
        }
        if (await eval('tttdata2a' + sender.toString().replace(/\D/g, '') + '[0] == true') && await eval('tttdata2a' + sender.toString().replace(/\D/g, '') + '[3] == true') && await eval('tttdata2a' + sender.toString().replace(/\D/g, '') + '[6] == true')) {
            won = true
        }
        if (await eval('tttdata2a' + sender.toString().replace(/\D/g, '') + '[1] == true') && await eval('tttdata2a' + sender.toString().replace(/\D/g, '') + '[4] == true') && await eval('tttdata2a' + sender.toString().replace(/\D/g, '') + '[7] == true')) {
            won = true
        }
        if (await eval('tttdata2a' + sender.toString().replace(/\D/g, '') + '[2] == true') && await eval('tttdata2a' + sender.toString().replace(/\D/g, '') + '[5] == true') && await eval('tttdata2a' + sender.toString().replace(/\D/g, '') + '[8] == true')) {
            won = true
        }
        if (await eval('tttdata2a' + sender.toString().replace(/\D/g, '') + '[0] == true') && await eval('tttdata2a' + sender.toString().replace(/\D/g, '') + '[4] == true') && await eval('tttdata2a' + sender.toString().replace(/\D/g, '') + '[8] == true')) {
            won = true
        }
        if (await eval('tttdata2a' + sender.toString().replace(/\D/g, '') + '[6] == true') && await eval('tttdata2a' + sender.toString().replace(/\D/g, '') + '[4] == true') && await eval('tttdata2a' + sender.toString().replace(/\D/g, '') + '[2] == true')) {
            won = true
        }

        // Check if Round has ended
        if(won || await eval('tttdatatuf' + sender.toString().replace(/\D/g, '') + ' == 9')) {
            // Check Who Won
            let winner = '**Noone**'
            if (lang.toString() == "de") { winner = '**Niemand**' }
            if (await eval('tttdata1a' + sender.toString().replace(/\D/g, '') + '[0] == true') && await eval('tttdata1a' + sender.toString().replace(/\D/g, '') + '[1] == true') && await eval('tttdata1a' + sender.toString().replace(/\D/g, '') + '[2] == true')) {
                winner = '<@' + sender.toString().replace(/\D/g, '') + '>'
                await eval('global.tttdatabc1' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Success')
                await eval('global.tttdatabc2' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Success')
                await eval('global.tttdatabc3' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Success')
            }
            if (await eval('tttdata1a' + sender.toString().replace(/\D/g, '') + '[3] == true') && await eval('tttdata1a' + sender.toString().replace(/\D/g, '') + '[4] == true') && await eval('tttdata1a' + sender.toString().replace(/\D/g, '') + '[5] == true')) {
                winner = '<@' + sender.toString().replace(/\D/g, '') + '>'
                await eval('global.tttdatabc4' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Success')
                await eval('global.tttdatabc5' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Success')
                await eval('global.tttdatabc6' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Success')
            }
            if (await eval('tttdata1a' + sender.toString().replace(/\D/g, '') + '[6] == true') && await eval('tttdata1a' + sender.toString().replace(/\D/g, '') + '[7] == true') && await eval('tttdata1a' + sender.toString().replace(/\D/g, '') + '[8] == true')) {
                winner = '<@' + sender.toString().replace(/\D/g, '') + '>'
                await eval('global.tttdatabc7' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Success')
                await eval('global.tttdatabc8' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Success')
                await eval('global.tttdatabc9' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Success')
            }
            if (await eval('tttdata1a' + sender.toString().replace(/\D/g, '') + '[0] == true') && await eval('tttdata1a' + sender.toString().replace(/\D/g, '') + '[3] == true') && await eval('tttdata1a' + sender.toString().replace(/\D/g, '') + '[6] == true')) {
                winner = '<@' + sender.toString().replace(/\D/g, '') + '>'
                await eval('global.tttdatabc1' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Success')
                await eval('global.tttdatabc4' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Success')
                await eval('global.tttdatabc7' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Success')
            }
            if (await eval('tttdata1a' + sender.toString().replace(/\D/g, '') + '[1] == true') && await eval('tttdata1a' + sender.toString().replace(/\D/g, '') + '[4] == true') && await eval('tttdata1a' + sender.toString().replace(/\D/g, '') + '[7] == true')) {
                winner = '<@' + sender.toString().replace(/\D/g, '') + '>'
                await eval('global.tttdatabc2' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Success')
                await eval('global.tttdatabc5' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Success')
                await eval('global.tttdatabc8' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Success')
            }
            if (await eval('tttdata1a' + sender.toString().replace(/\D/g, '') + '[2] == true') && await eval('tttdata1a' + sender.toString().replace(/\D/g, '') + '[5] == true') && await eval('tttdata1a' + sender.toString().replace(/\D/g, '') + '[8] == true')) {
                winner = '<@' + sender.toString().replace(/\D/g, '') + '>'
                await eval('global.tttdatabc3' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Success')
                await eval('global.tttdatabc6' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Success')
                await eval('global.tttdatabc9' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Success')
            }
            if (await eval('tttdata1a' + sender.toString().replace(/\D/g, '') + '[0] == true') && await eval('tttdata1a' + sender.toString().replace(/\D/g, '') + '[4] == true') && await eval('tttdata1a' + sender.toString().replace(/\D/g, '') + '[8] == true')) {
                winner = '<@' + sender.toString().replace(/\D/g, '') + '>'
                await eval('global.tttdatabc1' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Success')
                await eval('global.tttdatabc5' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Success')
                await eval('global.tttdatabc9' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Success')
            }
            if (await eval('tttdata1a' + sender.toString().replace(/\D/g, '') + '[6] == true') && await eval('tttdata1a' + sender.toString().replace(/\D/g, '') + '[4] == true') && await eval('tttdata1a' + sender.toString().replace(/\D/g, '') + '[2] == true')) {
                winner = '<@' + sender.toString().replace(/\D/g, '') + '>'
                await eval('global.tttdatabc3' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Success')
                await eval('global.tttdatabc5' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Success')
                await eval('global.tttdatabc7' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Success')
            }
            if (await eval('tttdata2a' + sender.toString().replace(/\D/g, '') + '[0] == true') && await eval('tttdata2a' + sender.toString().replace(/\D/g, '') + '[1] == true') && await eval('tttdata2a' + sender.toString().replace(/\D/g, '') + '[2] == true')) {
                winner = '<@' + reciever.toString().replace(/\D/g, '') + '>'
                await eval('global.tttdatabc1' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Success')
                await eval('global.tttdatabc2' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Success')
                await eval('global.tttdatabc3' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Success')
            }
            if (await eval('tttdata2a' + sender.toString().replace(/\D/g, '') + '[3] == true') && await eval('tttdata2a' + sender.toString().replace(/\D/g, '') + '[4] == true') && await eval('tttdata2a' + sender.toString().replace(/\D/g, '') + '[5] == true')) {
                winner = '<@' + reciever.toString().replace(/\D/g, '') + '>'
                await eval('global.tttdatabc4' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Success')
                await eval('global.tttdatabc5' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Success')
                await eval('global.tttdatabc6' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Success')
            }
            if (await eval('tttdata2a' + sender.toString().replace(/\D/g, '') + '[6] == true') && await eval('tttdata2a' + sender.toString().replace(/\D/g, '') + '[7] == true') && await eval('tttdata2a' + sender.toString().replace(/\D/g, '') + '[8] == true')) {
                winner = '<@' + reciever.toString().replace(/\D/g, '') + '>'
                await eval('global.tttdatabc7' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Success')
                await eval('global.tttdatabc8' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Success')
                await eval('global.tttdatabc9' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Success')
            }
            if (await eval('tttdata2a' + sender.toString().replace(/\D/g, '') + '[0] == true') && await eval('tttdata2a' + sender.toString().replace(/\D/g, '') + '[3] == true') && await eval('tttdata2a' + sender.toString().replace(/\D/g, '') + '[6] == true')) {
                winner = '<@' + reciever.toString().replace(/\D/g, '') + '>'
                await eval('global.tttdatabc1' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Success')
                await eval('global.tttdatabc4' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Success')
                await eval('global.tttdatabc7' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Success')
            }
            if (await eval('tttdata2a' + sender.toString().replace(/\D/g, '') + '[1] == true') && await eval('tttdata2a' + sender.toString().replace(/\D/g, '') + '[4] == true') && await eval('tttdata2a' + sender.toString().replace(/\D/g, '') + '[7] == true')) {
                winner = '<@' + reciever.toString().replace(/\D/g, '') + '>'
                await eval('global.tttdatabc2' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Success')
                await eval('global.tttdatabc5' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Success')
                await eval('global.tttdatabc8' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Success')
            }
            if (await eval('tttdata2a' + sender.toString().replace(/\D/g, '') + '[2] == true') && await eval('tttdata2a' + sender.toString().replace(/\D/g, '') + '[5] == true') && await eval('tttdata2a' + sender.toString().replace(/\D/g, '') + '[8] == true')) {
                winner = '<@' + reciever.toString().replace(/\D/g, '') + '>'
                await eval('global.tttdatabc3' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Success')
                await eval('global.tttdatabc6' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Success')
                await eval('global.tttdatabc9' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Success')
            }
            if (await eval('tttdata2a' + sender.toString().replace(/\D/g, '') + '[0] == true') && await eval('tttdata2a' + sender.toString().replace(/\D/g, '') + '[4] == true') && await eval('tttdata2a' + sender.toString().replace(/\D/g, '') + '[8] == true')) {
                winner = '<@' + reciever.toString().replace(/\D/g, '') + '>'
                await eval('global.tttdatabc1' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Success')
                await eval('global.tttdatabc5' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Success')
                await eval('global.tttdatabc9' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Success')
            }
            if (await eval('tttdata2a' + sender.toString().replace(/\D/g, '') + '[6] == true') && await eval('tttdata2a' + sender.toString().replace(/\D/g, '') + '[4] == true') && await eval('tttdata2a' + sender.toString().replace(/\D/g, '') + '[2] == true')) {
                winner = '<@' + reciever.toString().replace(/\D/g, '') + '>'
                await eval('global.tttdatabc3' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Success')
                await eval('global.tttdatabc5' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Success')
                await eval('global.tttdatabc7' + sender.toString().replace(/\D/g, '') + ' = ButtonStyle.Success')
            }

            // Answer Timeout Function
            eval('global.ttttf' + sender.toString().replace(/\D/g, '') + ' = true')
            eval('delete tttlc' + sender.replace(/\D/g, ''))    

            // Transfer Money
            const betwon = parseInt(bet) * 2
            if (winner != '**Noone**' && winner != '**Niemand**') {
                bals.add(winner.toString().replace(/\D/g, ''), parseInt(betwon))
            } else {
                bals.add(sender.toString().replace(/\D/g, ''), parseInt(bet))
                bals.add(reciever.toString().replace(/\D/g, ''), parseInt(bet))
            }

            // Create Buttons
            row1 = new ActionRowBuilder()
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
            row2 = new ActionRowBuilder()
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
            row3 = new ActionRowBuilder()
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
            message = new EmbedBuilder()
                .setTitle('» TICTACTOE')
                .setDescription('» <@' + sender.toString().replace(/\D/g, '') + '> is playing Tic Tac Toe with <@' + reciever.toString().replace(/\D/g, '') + '>!\nThe Bet is **$' + bet + '**\n\n🔵 » <@' + sender.toString().replace(/\D/g, '') + '>\n🔴 » <@' + reciever.toString().replace(/\D/g, '') + '>\n\n' + winner + ' has won **$' + betwon + '**!')
                .setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang.toString() == "de") {
                message = new EmbedBuilder()
                    .setTitle('» TICTACTOE')
                    .setDescription('» <@' + sender.toString().replace(/\D/g, '') + '> spielt mit <@' + reciever.toString().replace(/\D/g, '') + '> Tic Tac Toe!\nDie Wette ist **' + bet + '€**\n\n🔵 » <@' + sender.toString().replace(/\D/g, '') + '>\n🔴 » <@' + reciever.toString().replace(/\D/g, '') + '>\n\n' + winner + ' hat **' + betwon + '€** gewonnen!')
                    .setFooter({ text: '» ' + vote + ' » ' + version });
            }

            // Delete Variables
            eval('delete tttdatatu' + sender.toString().replace(/\D/g, ''))
            eval('delete tttdatatuf' + sender.toString().replace(/\D/g, ''))

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
                if (buttoncount == 10) {
                    donebutton = true
                    return
                }
            }
        }
        await abtn()

        // Create Buttons
        row1 = new ActionRowBuilder()
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
        row2 = new ActionRowBuilder()
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
        row3 = new ActionRowBuilder()
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

        // Update Message
        return interaction.message.edit({ embeds: [message.toJSON()], components: [row1, row2, row3], ephemeral: true })
    }
}