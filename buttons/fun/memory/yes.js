const { EmbedBuilder } = require('@discordjs/builders')
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const { version } = require('../../../config.json')

const wait = require('node:timers/promises').setTimeout

module.exports = {
    data: {
        name: 'memory-yes'
    },
    async execute(interaction, client, lang, vote, bet, sel) {
        // Get Users
        const cache = interaction.message.embeds
        const description = cache[0].description.toString().replace(/[^\d@!]/g, '').split('!')[0].substring(1).split("@");
        const [sender, reciever] = description

        // Set Variables
        const balance = await bals.get(reciever.toString().replace(/\D/g, ''))
        const otherbalance = await bals.get(sender.toString().replace(/\D/g, ''))

        // Check if User is Authorized
        if (interaction.user.id != reciever.toString().replace(/\D/g, '')) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» <@' + reciever.toString().replace(/\D/g, '') + '> has to decide this!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang == "de") {
                message = new EmbedBuilder()
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» <@' + reciever.toString().replace(/\D/g, '') + '> muss das entscheiden!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] MEMORY : YES : NOTALLOWED')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Check if Person is already in a Lobby
        if (bot.game.has('PLAYING-' + reciever)) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» You are already in a Lobby!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang == "de") {
                message = new EmbedBuilder()
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Du bist schon in einer Lobby!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] MEMORY : ' + reciever.toString().replace(/\D/g, '') + ' : ALREADYLOBBY')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Check if Other Person is already in a Lobby
        if (bot.game.has('PLAYING-' + sender)) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» <@' + sender + '> is already in a Lobby!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang == "de") {
                message = new EmbedBuilder()
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» <@' + sender + '> ist schon in einer Lobby!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] MEMORY : ' + sender.toString().replace(/\D/g, '') + ' : ALREADYLOBBY')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Check for enough Money
        if (balance < bet) {
            const missing = bet - balance
            
            // Create Embed
            let message = new EmbedBuilder()
            	.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  				.setDescription('» You dont have enough Money for that, you are missing **$' + missing + '**!')
            	.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang == "de") {
                message = new EmbedBuilder()
            	    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				    .setDescription('» Du hast dafür nicht genug Geld, dir fehlen **' + missing + '€**!')
            	    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] MEMORY : ' + reciever.toString().replace(/\D/g, '') + ' : ' + bet + '€ : NOTENOUGHMONEY')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }
        if (otherbalance < bet) {
            const missing = bet - otherbalance
            
            // Create Embed
            let message = new EmbedBuilder()
            	.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  				.setDescription('» <@' + sender.toString().replace(/\D/g, '') + '> doesnt have enough Money, he is Missing **$' + missing + '**!')
            	.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang == "de") {
                message = new EmbedBuilder()
            	    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				    .setDescription('» <@' + sender.toString().replace(/\D/g, '') + '> hat nicht genug Geld, im fehlen **' + missing + '€**!')
            	    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] MEMORY : ' + reciever.toString().replace(/\D/g, '') + ' : ' + bet + '€ : NOTENOUGHMONEY')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Defer Reply
        await interaction.deferUpdate()

        // Answer Timeout Function
        bot.memory.delete('TIMEOUT-' + sender + '-' + interaction.message.id)

        // Create Buttons
        let row1 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
                    .setEmoji('1020411843644243998')
                    .setCustomId('MEMORY-1-' + bet)
					.setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setEmoji('1020411843644243998')
                    .setCustomId('MEMORY-2-' + bet)
					.setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setEmoji('1020411843644243998')
                    .setCustomId('MEMORY-3-' + bet)
					.setStyle(ButtonStyle.Secondary),
                
                new ButtonBuilder()
                    .setEmoji('1020411843644243998')
                    .setCustomId('MEMORY-4-' + bet)
					.setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setEmoji('1020411843644243998')
                    .setCustomId('MEMORY-5-' + bet)
					.setStyle(ButtonStyle.Secondary),
			);
        let row2 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
                    .setEmoji('1020411843644243998')
                    .setCustomId('MEMORY-6-' + bet)
					.setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setEmoji('1020411843644243998')
                    .setCustomId('MEMORY-7-' + bet)
					.setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setEmoji('1020411843644243998')
                    .setCustomId('MEMORY-8-' + bet)
					.setStyle(ButtonStyle.Secondary),
                
                new ButtonBuilder()
                    .setEmoji('1020411843644243998')
                    .setCustomId('MEMORY-9-' + bet)
					.setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setEmoji('1020411843644243998')
                    .setCustomId('MEMORY-10-' + bet)
					.setStyle(ButtonStyle.Secondary),
			);
        let row3 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
                    .setEmoji('1020411843644243998')
                    .setCustomId('MEMORY-11-' + bet)
					.setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setEmoji('1020411843644243998')
                    .setCustomId('MEMORY-12-' + bet)
					.setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setEmoji('1020411843644243998')
                    .setCustomId('MEMORY-13-' + bet)
					.setStyle(ButtonStyle.Secondary),
                
                new ButtonBuilder()
                    .setEmoji('1020411843644243998')
                    .setCustomId('MEMORY-14-' + bet)
					.setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setEmoji('1020411843644243998')
                    .setCustomId('MEMORY-15-' + bet)
					.setStyle(ButtonStyle.Secondary),
			);
        let row4 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
                    .setEmoji('1020411843644243998')
                    .setCustomId('MEMORY-16-' + bet)
					.setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setEmoji('1020411843644243998')
                    .setCustomId('MEMORY-17-' + bet)
					.setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setEmoji('1020411843644243998')
                    .setCustomId('MEMORY-18-' + bet)
					.setStyle(ButtonStyle.Secondary),
                
                new ButtonBuilder()
                    .setEmoji('1020411843644243998')
                    .setCustomId('MEMORY-19-' + bet)
					.setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setEmoji('1020411843644243998')
                    .setCustomId('MEMORY-20-' + bet)
					.setStyle(ButtonStyle.Secondary),
			);

        // Set Variables
        bot.game.set('PLAYING-' + sender, 'MEMORY')
        bot.game.set('PLAYING-' + reciever, 'MEMORY')

        bot.memory.set('A_PLAYERSELECT-' + sender, 0)
        bot.memory.set('A_PLAYERSELECT-' + reciever, 0)
        bot.memory.set('POINTS-' + sender, 0)
        bot.memory.set('POINTS-' + reciever, 0)

        bot.memory.set('E_PLAYERSELECT-' + sender, [])
        bot.memory.set('E_PLAYERSELECT-' + reciever, [])
        bot.memory.set('B_PLAYERSELECT-' + reciever, [])
        bot.memory.set('B_PLAYERSELECT-' + sender, [])
        bot.memory.set('C_PLAYERSELECT-' + reciever, [])
        bot.memory.set('C_PLAYERSELECT-' + sender, [])

        // Generate Emoji Grid
        const emojis = []
        const emojis2 = []
        const emojilistraw = [
            "1017444934904729611", // :DOGE:
            "1017445104685961236", // :FINE:
            "1017444736610619453", // :HSPY:
            "1017445667347636294", // :HUH:
            "1017445007910772766", // :KAPPA:
            "1017445430310752336", // :KEKDANCE:
            "1017445761291669604", // :OK:
            "1017444837257134100", // :RICK:
            "1017444467353063474", // :SPONGE:
            "1017445246516334653", // :SQUIDWARD:
            "1017445352078590093", // :WHAT:
            "1017847213067604009", // :KID:
            "1018083730688057394", // :NAH:
            "1018079045461741569", // :DUCK:
            "1018079408185163796", // :THX:
            "1018927449368703098", // :SUS:
            "1014209756103184455", // :CATBRUHZ:
            "1014209757214679121", // :KEKW:
            "1018928177353072700", // :CAT:
            "1018930597856559144", // :OMEGAKEKW:
            "1019235162569068615", // :MALDE:
            "1014209765431324733", // :CATPOP:
            "1019238968346284084", // :VENT:
            "1019239168573968385", // :HUNGRY:
            "1019247388587728936", // :YODA:
            "1019247603843596368", // :SAUL:
            "1019247987970560010", // :KIM:
            "1019248618709983283", // :MOTOMOTO:
            "1019248854694109276", // :BURGIR:
            "1019249349890429101", // :AMERICA:
            "1019250108681949315", // :WALTER:
            "1019250327440068671", // :MAN:
            "1019251675644559500", // :SUGIMORI:
            "1019253539471642694", // :CRAZYHAMBURGER
            "1019254370124173352", // :SIMEX:
            "1019254562214903869", // :ZOMBIE:
            "1023932900749627483", // :CRITICAL:
            "1023933347078094891", // :SMASH:
            "790990037982248971", // :PEPEOK:
        ]
        const copied = [...emojilistraw]
        const emojilist = []
        for (let i = 0; i < 10; i++) {
            const randomIndex = Math.floor(
                Math.random() * copied.length
            )
            emojilist.push(
                copied[randomIndex]
            )
            copied.splice(randomIndex, 1)
        }

        let emojistate = false
        let emojinumber = 1
        let skipother = false
        const rdo = async () => {
            while (emojistate == false) {
                const emojirandom = await Math.floor(Math.random() * (10 - 1 + 1)) + 1
                const emoji = await emojilist[emojirandom - 1]
                skipother = false

                if (typeof emoji !== 'undefined' && typeof emojinumber !== 'undefined') {
                    if (!emojis.includes(emoji)) {
                        emojis[emojinumber - 1] = await emoji
                        await wait(25)
                        bot.memory.set('I_EMOJI-' + emojinumber + '-' + sender, emoji.toString())
                        emojinumber = emojinumber + 1
                        if (emojinumber > 20) {
                            emojistate = true
                            return
                        }
                        skipother = true
                    }
                    if (!emojis2.includes(emoji) && skipother != true) {
                        emojis2[emojinumber - 1] = await emoji
                        await wait(25)
                        bot.memory.set('I_EMOJI-' + emojinumber + '-' + sender, emoji.toString())
                        emojinumber = emojinumber + 1
                        if (emojinumber > 20) {
                            emojistate = true
                            return
                        }
                    }
                }

            }
        }
        await rdo()

        // Transfer Money
        bals.rem(sender.toString().replace(/\D/g, ''), bet)
        bals.rem(reciever.toString().replace(/\D/g, ''), bet)

        // Create Embed
        let message = new EmbedBuilder()
            .setTitle('<:GAMEPAD:1024395990679167066> » MEMORY')
            .setDescription('» <@' + sender.toString().replace(/\D/g, '') + '> is playing Memory with <@' + reciever.toString().replace(/\D/g, '') + '>!\nThe Bet is **$' + bet + '**\n\n🔵 » Points of <@' + sender.toString().replace(/\D/g, '') + '> are **0**\n🔴 » Points of <@' + reciever.toString().replace(/\D/g, '') + '> are **0**')
            .setFooter({ text: '» ' + version + ' » CURRENT TURN: 🔵' });

        if (lang == "de") {
            message = new EmbedBuilder()
                .setTitle('<:GAMEPAD:1024395990679167066> » MEMORY')
                .setDescription('» <@' + sender.toString().replace(/\D/g, '') + '> spielt mit <@' + reciever.toString().replace(/\D/g, '') + '> Memory!\nDie Wette ist **' + bet + '€**\n\n🔵 » Punkte von <@' + sender.toString().replace(/\D/g, '') + '> sind **0**\n🔴 » Punkte von <@' + reciever.toString().replace(/\D/g, '') + '> sind **0**')
                .setFooter({ text: '» ' + version + ' » AM ZUG: 🔵' });
        }

        // Set Default Button Values
        bot.memory.set('TURN-' + sender, sender)
        for (i = 0; i < 20; i++) {
            bot.memory.set('STYLE-' + (i+1) + '-' + sender, ButtonStyle.Secondary)
            bot.memory.set('DISABLED-' + (i+1) + '-' + sender, false)
            bot.memory.set('D_EMOJI-' + (i+1) + '-' + sender, { id: '1020411843644243998', name: 'MEMORY' })
        }

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] MEMORY : ' + sender.toString().replace(/\D/g, '') + ' : ACCEPT')
        return interaction.editReply({ content: '', embeds: [message.toJSON()], components: [row1, row2, row3, row4] })
    }
}