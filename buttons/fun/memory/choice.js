const { EmbedBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, BaseClient } = require('discord.js');
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

        // Set Variables
        await eval('global.memorydataf' + sel + sender.toString().replace(/\D/g, '') + ' = memorydatag' + sel + sender.toString().replace(/\D/g, ''))
        await eval('global.memorydatad' + sel + sender.toString().replace(/\D/g, '') + ' = true')
        await eval('global.memorydatapca' + interaction.user.id.replace(/\D/g, '') + ' = memorydatapca' + interaction.user.id.replace(/\D/g, '') + ' + 1')
        let se = false
        let nums = []
        if (await eval('memorydatapca' + interaction.user.id.replace(/\D/g, '')) + ' < 2') {
            if (await eval('memorydatapc' + interaction.user.id.replace(/\D/g, '') + '.includes("' + await eval('memorydataf' + sel + sender.toString().replace(/\D/g, '')) + '")')) {
                await eval('global.memorydatap' + interaction.user.id.replace(/\D/g, '') + ' = memorydatap' + interaction.user.id.replace(/\D/g, '') + ' + 1')
                nums = []
                nums.push(eval('memorydatapcn' + interaction.user.id.replace(/\D/g, '') + '[0]'))
                nums.push(eval('memorydatapcn' + interaction.user.id.replace(/\D/g, '') + '[1]'))
                await eval('global.memorydatapca' + interaction.user.id.replace(/\D/g, '') + ' = 0')
                await eval('global.memorydatapc' + interaction.user.id.replace(/\D/g, '') + ' = []')
                await eval('global.memorydatapcn' + interaction.user.id.replace(/\D/g, '') + ' = []')
                console.log('1')
                se = true
            }
        }
        if (await eval('memorydatapca' + interaction.user.id.replace(/\D/g, '')) + ' < 2') {
            if (!await eval('memorydatapc' + interaction.user.id.replace(/\D/g, '') + '.includes("' + await eval('memorydataf' + sel + sender.toString().replace(/\D/g, '')) + '")')) {
                await eval('memorydatapc' + interaction.user.id.replace(/\D/g, '') + '.push("' + await eval('memorydataf' + sel + sender.toString().replace(/\D/g, '')) + '")')
                await eval('memorydatapcn' + interaction.user.id.replace(/\D/g, '') + '.push("' + sel + '")')
                await eval('global.memorydatad' + sel + sender.toString().replace(/\D/g, '') + ' = true')
                console.log('2')
                se = false
            }
        }
        if (await eval('memorydatapca' + interaction.user.id.replace(/\D/g, '') + ' > 1')) {
            nums = []
            nums.push(eval('memorydatapcn' + interaction.user.id.replace(/\D/g, '') + '[0]'))
            nums.push(eval('memorydatapcn' + interaction.user.id.replace(/\D/g, '') + '[1]'))
            await eval('global.memorydatapca' + interaction.user.id.replace(/\D/g, '') + ' = 0')
            await eval('global.memorydatapc' + interaction.user.id.replace(/\D/g, '') + ' = []')
            await eval('global.memorydatapcn' + interaction.user.id.replace(/\D/g, '') + ' = []')
            console.log('3')
            se = true
        }
        console.log(await eval('memorydataf' + sel + sender.toString().replace(/\D/g, '')))

        // Create Buttons
        let row1 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
                    .setEmoji(eval('memorydataf1' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-1-' + bet)
					.setStyle(ButtonStyle.Secondary)
                    .setDisabled(eval('memorydatad1' + sender.toString().replace(/\D/g, ''))),

                new ButtonBuilder()
                    .setEmoji(eval('memorydataf2' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-2-' + bet)
					.setStyle(ButtonStyle.Secondary)
                    .setDisabled(eval('memorydatad2' + sender.toString().replace(/\D/g, ''))),

                new ButtonBuilder()
                    .setEmoji(eval('memorydataf3' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-3-' + bet)
					.setStyle(ButtonStyle.Secondary)
                    .setDisabled(eval('memorydatad3' + sender.toString().replace(/\D/g, ''))),
                
                new ButtonBuilder()
                    .setEmoji(eval('memorydataf4' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-4-' + bet)
					.setStyle(ButtonStyle.Secondary)
                    .setDisabled(eval('memorydatad4' + sender.toString().replace(/\D/g, ''))),

                new ButtonBuilder()
                    .setEmoji(eval('memorydataf5' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-5-' + bet)
					.setStyle(ButtonStyle.Secondary)
                    .setDisabled(eval('memorydatad5' + sender.toString().replace(/\D/g, ''))),
			);
        let row2 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
                    .setEmoji(eval('memorydataf6' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-6-' + bet)
					.setStyle(ButtonStyle.Secondary)
                    .setDisabled(eval('memorydatad6' + sender.toString().replace(/\D/g, ''))),

                new ButtonBuilder()
                    .setEmoji(eval('memorydataf7' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-7-' + bet)
					.setStyle(ButtonStyle.Secondary)
                    .setDisabled(eval('memorydatad7' + sender.toString().replace(/\D/g, ''))),

                new ButtonBuilder()
                    .setEmoji(eval('memorydataf8' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-8-' + bet)
					.setStyle(ButtonStyle.Secondary)
                    .setDisabled(eval('memorydatad8' + sender.toString().replace(/\D/g, ''))),
                
                new ButtonBuilder()
                    .setEmoji(eval('memorydataf9' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-9-' + bet)
					.setStyle(ButtonStyle.Secondary)
                    .setDisabled(eval('memorydatad9' + sender.toString().replace(/\D/g, ''))),

                new ButtonBuilder()
                    .setEmoji(eval('memorydataf10' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-10-' + bet)
					.setStyle(ButtonStyle.Secondary)
                    .setDisabled(eval('memorydatad10' + sender.toString().replace(/\D/g, ''))),
			);
        let row3 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
                    .setEmoji(eval('memorydataf11' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-11-' + bet)
					.setStyle(ButtonStyle.Secondary)
                    .setDisabled(eval('memorydatad11' + sender.toString().replace(/\D/g, ''))),

                new ButtonBuilder()
                    .setEmoji(eval('memorydataf12' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-12-' + bet)
					.setStyle(ButtonStyle.Secondary)
                    .setDisabled(eval('memorydatad12' + sender.toString().replace(/\D/g, ''))),

                new ButtonBuilder()
                    .setEmoji(eval('memorydataf13' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-13-' + bet)
					.setStyle(ButtonStyle.Secondary)
                    .setDisabled(eval('memorydatad13' + sender.toString().replace(/\D/g, ''))),
                
                new ButtonBuilder()
                    .setEmoji(eval('memorydataf14' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-14-' + bet)
					.setStyle(ButtonStyle.Secondary)
                    .setDisabled(eval('memorydatad14' + sender.toString().replace(/\D/g, ''))),

                new ButtonBuilder()
                    .setEmoji(eval('memorydataf15' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-15-' + bet)
					.setStyle(ButtonStyle.Secondary)
                    .setDisabled(eval('memorydatad15' + sender.toString().replace(/\D/g, ''))),
			);
        let row4 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
                    .setEmoji(eval('memorydataf16' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-16-' + bet)
					.setStyle(ButtonStyle.Secondary)
                    .setDisabled(eval('memorydatad16' + sender.toString().replace(/\D/g, ''))),

                new ButtonBuilder()
                    .setEmoji(eval('memorydataf17' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-17-' + bet)
					.setStyle(ButtonStyle.Secondary)
                    .setDisabled(eval('memorydatad17' + sender.toString().replace(/\D/g, ''))),

                new ButtonBuilder()
                    .setEmoji(eval('memorydataf18' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-18-' + bet)
					.setStyle(ButtonStyle.Secondary)
                    .setDisabled(eval('memorydatad18' + sender.toString().replace(/\D/g, ''))),
                
                new ButtonBuilder()
                    .setEmoji(eval('memorydataf19' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-19-' + bet)
					.setStyle(ButtonStyle.Secondary)
                    .setDisabled(eval('memorydatad19' + sender.toString().replace(/\D/g, ''))),

                new ButtonBuilder()
                    .setEmoji(eval('memorydataf20' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-20-' + bet)
					.setStyle(ButtonStyle.Secondary)
                    .setDisabled(eval('memorydatad20' + sender.toString().replace(/\D/g, ''))),
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
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [BTN] MEMORY : ' + sel + ' : ' + eval('memorydataf' + sel + sender.toString().replace(/\D/g, '')))
        interaction.update({ embeds: [message.toJSON()], components: [row1, row2, row3, row4], ephemeral: true })

        // Check for Special Conditions
        if (se == false) return
        await wait(2000)

        // Remove Emojis
        console.log(nums)
        await eval('global.memorydataf' + nums[0] + sender.toString().replace(/\D/g, '') + ' = "1017050508252418068"')
        await eval('global.memorydataf' + nums[1] + sender.toString().replace(/\D/g, '') + ' = "1017050508252418068"')
        await wait(50)
        await eval('global.memorydatad' + nums[0] + sender.toString().replace(/\D/g, '') + ' = false')
        await eval('global.memorydatad' + nums[1] + sender.toString().replace(/\D/g, '') + ' = false')

        // Create Buttons
        row1 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
                    .setEmoji(eval('memorydataf1' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-1-' + bet)
					.setStyle(ButtonStyle.Secondary)
                    .setDisabled(eval('memorydatad1' + sender.toString().replace(/\D/g, ''))),

                new ButtonBuilder()
                    .setEmoji(eval('memorydataf2' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-2-' + bet)
					.setStyle(ButtonStyle.Secondary)
                    .setDisabled(eval('memorydatad2' + sender.toString().replace(/\D/g, ''))),

                new ButtonBuilder()
                    .setEmoji(eval('memorydataf3' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-3-' + bet)
					.setStyle(ButtonStyle.Secondary)
                    .setDisabled(eval('memorydatad3' + sender.toString().replace(/\D/g, ''))),
                
                new ButtonBuilder()
                    .setEmoji(eval('memorydataf4' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-4-' + bet)
					.setStyle(ButtonStyle.Secondary)
                    .setDisabled(eval('memorydatad4' + sender.toString().replace(/\D/g, ''))),

                new ButtonBuilder()
                    .setEmoji(eval('memorydataf5' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-5-' + bet)
					.setStyle(ButtonStyle.Secondary)
                    .setDisabled(eval('memorydatad5' + sender.toString().replace(/\D/g, ''))),
			);
        row2 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
                    .setEmoji(eval('memorydataf6' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-6-' + bet)
					.setStyle(ButtonStyle.Secondary)
                    .setDisabled(eval('memorydatad6' + sender.toString().replace(/\D/g, ''))),

                new ButtonBuilder()
                    .setEmoji(eval('memorydataf7' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-7-' + bet)
					.setStyle(ButtonStyle.Secondary)
                    .setDisabled(eval('memorydatad7' + sender.toString().replace(/\D/g, ''))),

                new ButtonBuilder()
                    .setEmoji(eval('memorydataf8' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-8-' + bet)
					.setStyle(ButtonStyle.Secondary)
                    .setDisabled(eval('memorydatad8' + sender.toString().replace(/\D/g, ''))),
                
                new ButtonBuilder()
                    .setEmoji(eval('memorydataf9' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-9-' + bet)
					.setStyle(ButtonStyle.Secondary)
                    .setDisabled(eval('memorydatad9' + sender.toString().replace(/\D/g, ''))),

                new ButtonBuilder()
                    .setEmoji(eval('memorydataf10' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-10-' + bet)
					.setStyle(ButtonStyle.Secondary)
                    .setDisabled(eval('memorydatad10' + sender.toString().replace(/\D/g, ''))),
			);
        row3 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
                    .setEmoji(eval('memorydataf11' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-11-' + bet)
					.setStyle(ButtonStyle.Secondary)
                    .setDisabled(eval('memorydatad11' + sender.toString().replace(/\D/g, ''))),

                new ButtonBuilder()
                    .setEmoji(eval('memorydataf12' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-12-' + bet)
					.setStyle(ButtonStyle.Secondary)
                    .setDisabled(eval('memorydatad12' + sender.toString().replace(/\D/g, ''))),

                new ButtonBuilder()
                    .setEmoji(eval('memorydataf13' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-13-' + bet)
					.setStyle(ButtonStyle.Secondary)
                    .setDisabled(eval('memorydatad13' + sender.toString().replace(/\D/g, ''))),
                
                new ButtonBuilder()
                    .setEmoji(eval('memorydataf14' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-14-' + bet)
					.setStyle(ButtonStyle.Secondary)
                    .setDisabled(eval('memorydatad14' + sender.toString().replace(/\D/g, ''))),

                new ButtonBuilder()
                    .setEmoji(eval('memorydataf15' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-15-' + bet)
					.setStyle(ButtonStyle.Secondary)
                    .setDisabled(eval('memorydatad15' + sender.toString().replace(/\D/g, ''))),
			);
        row4 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
                    .setEmoji(eval('memorydataf16' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-16-' + bet)
					.setStyle(ButtonStyle.Secondary)
                    .setDisabled(eval('memorydatad16' + sender.toString().replace(/\D/g, ''))),

                new ButtonBuilder()
                    .setEmoji(eval('memorydataf17' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-17-' + bet)
					.setStyle(ButtonStyle.Secondary)
                    .setDisabled(eval('memorydatad17' + sender.toString().replace(/\D/g, ''))),

                new ButtonBuilder()
                    .setEmoji(eval('memorydataf18' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-18-' + bet)
					.setStyle(ButtonStyle.Secondary)
                    .setDisabled(eval('memorydatad18' + sender.toString().replace(/\D/g, ''))),
                
                new ButtonBuilder()
                    .setEmoji(eval('memorydataf19' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-19-' + bet)
					.setStyle(ButtonStyle.Secondary)
                    .setDisabled(eval('memorydatad19' + sender.toString().replace(/\D/g, ''))),

                new ButtonBuilder()
                    .setEmoji(eval('memorydataf20' + sender.toString().replace(/\D/g, '')))
                    .setCustomId('MEMORY-20-' + bet)
					.setStyle(ButtonStyle.Secondary)
                    .setDisabled(eval('memorydatad20' + sender.toString().replace(/\D/g, ''))),
			);

        // Update Message
        return interaction.message.edit({ embeds: [message.toJSON()], components: [row1, row2, row3, row4], ephemeral: true })
    }
}