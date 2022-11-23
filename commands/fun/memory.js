const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('memory')
        .setDescription('PLAY MEMORY')
        .setDescriptionLocalizations({
            de: 'SPIELE MEMORY'
        })
    	.setDMPermission(false)
        .addUserOption(option =>
            option.setName('user')
                .setNameLocalizations({
                    de: 'nutzer'
                })
                .setDescription('THE USER')
                .setDescriptionLocalizations({
                    de: 'DER NUTZER'
                })
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('bet')
                .setNameLocalizations({
                    de: 'wette'
                })
                .setDescription('THE AMOUNT OF MONEY')
                .setDescriptionLocalizations({
                    de: 'DIE ANZAHL VON GELD'
                })
                .setRequired(false)),
    async execute(interaction, client, lang, vote) {
        // Set Variables
        const user = interaction.options.getUser("user")
        let bet = interaction.options.getInteger("bet")
        
        const money = await bot.money.get(interaction.user.id)
        const othermoney = await bot.money.get(user.id)

        // Check if Target is Bot
        if (user.bot) {
            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» You cant play Memory with a Bot!')
        		.setFooter({ text: '» ' + vote + ' » ' + config.version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Du kannst Memory nicht mit einem Bot spielen!')
        		    .setFooter({ text: '» ' + vote + ' » ' + config.version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] MEMORY : ' + user.id + ' : BOT')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Check if Sender is already in a Lobby
        if (bot.game.has('PLAYING-' + interaction.user.id)) {
            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» You are already in a Lobby!')
        		.setFooter({ text: '» ' + vote + ' » ' + config.version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Du bist schon in einer Lobby!')
        		    .setFooter({ text: '» ' + vote + ' » ' + config.version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] MEMORY : ' + user.id + ' : ALREADYLOBBY')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Check if Reciever is already in a Lobby
        if (bot.game.has('PLAYING-' + user.id)) {
            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» <@' + user.id + '> is already in a Lobby!')
        		.setFooter({ text: '» ' + vote + ' » ' + config.version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» <@' + user.id + '> ist schon in einer Lobby!')
        		    .setFooter({ text: '» ' + vote + ' » ' + config.version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] MEMORY : ' + user.id + ' : ALREADYLOBBY')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Check if Bet is Negative
        if (bet < 0 && bet !== null) {
            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» You cant bet negative Money!')
        		.setFooter({ text: '» ' + vote + ' » ' + config.version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Du kannst kein negatives Geld wetten!')
        		    .setFooter({ text: '» ' + vote + ' » ' + config.version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] MEMORY : ' + user.id + ' : NEGATIVEMONEY : ' + bet + '€')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Check if User is Author
        if (interaction.user.id == user.id) {
            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
            	.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  				.setDescription('» You cant play Memory with yourself?')
            	.setFooter({ text: '» ' + vote + ' » ' + config.version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
            	    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				    .setDescription('» Du kannst Memory nicht mit dir alleine spielen?')
            	    .setFooter({ text: '» ' + vote + ' » ' + config.version });
            }

            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] MEMORY : ' + user.id + ' : ' + bet + '€ : SAMEPERSON')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Check for Enough Money
        if (money < bet && bet !== null) {
            const missing = bet - money
            
            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
            	.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  				.setDescription('» You dont have enough Money for that, you are missing **$' + missing + '**!')
            	.setFooter({ text: '» ' + vote + ' » ' + config.version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
            	    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				    .setDescription('» Du hast dafür nicht genug Geld, dir fehlen **' + missing + '€**!')
            	    .setFooter({ text: '» ' + vote + ' » ' + config.version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] MEMORY : ' + user.id + ' : NOTENOUGHMONEY')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }
        if (othermoney < bet && bet !== null) {
            const missing = bet - othermoney
            
            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
            	.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  				.setDescription('» <@' + user.id + '> doesnt have enough Money for that, he is Missing **$' + missing + '**!')
            	.setFooter({ text: '» ' + vote + ' » ' + config.version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
            	    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				    .setDescription('» <@' + user.id + '> hat dafür nicht genug Geld, im fehlen **' + missing + '€**!')
            	    .setFooter({ text: '» ' + vote + ' » ' + config.version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] MEMORY : ' + user.id + ' : NOTENOUGHMONEY')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Create Buttons
        if (bet === null) { bet = 0 }
        let row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('YES')
                    .setCustomId('MEMORY-YES-' + bet)
                    .setEmoji('1024382942153285632')
					.setStyle(ButtonStyle.Success),

                new ButtonBuilder()
					.setLabel('NO')
                    .setCustomId('MEMORY-NO-' + bet)
                    .setEmoji('1024382939020152982')
					.setStyle(ButtonStyle.Danger),
			);
        if (lang === 'de') {
            row = new ActionRowBuilder()
			    .addComponents(
			    	new ButtonBuilder()
			    		.setLabel('JA')
                        .setCustomId('MEMORY-YES-' + bet)
                        .setEmoji('1024382942153285632')
			    		.setStyle(ButtonStyle.Success),

                    new ButtonBuilder()
			    		.setLabel('NEIN')
                        .setCustomId('MEMORY-NO-' + bet)
                        .setEmoji('1024382939020152982')
			    		.setStyle(ButtonStyle.Danger),
			    );
        }
        
        // Create Embed
        let message = new EmbedBuilder().setColor(0x37009B)
        	.setTitle('<:GAMEPAD:1024395990679167066> » MEMORY')
  			.setDescription('» <@' + interaction.user.id + '> challenges you, <@' + user.id + '> to a battle of Memory! The Bet is **$' + bet + '**.\nDo you accept?\n\n» This Request expires <t:' + (Math.floor(+new Date() / 1000) + 29) + ':R>')
        	.setFooter({ text: '» ' + vote + ' » ' + config.version });

        if (lang === 'de') {
            message = new EmbedBuilder().setColor(0x37009B)
        	    .setTitle('<:GAMEPAD:1024395990679167066> » MEMORY')
  			    .setDescription('» <@' + interaction.user.id + '> fordert dich, <@' + user.id + '> zu einem Spiel von Memory heraus! Die Wette ist **' + bet + '€**.\nAkzeptierst du?\n\n» Diese Anfrage wird ungültig <t:' + (Math.floor(+new Date() / 1000) + 29) + ':R>')
        	    .setFooter({ text: '» ' + vote + ' » ' + config.version });
        }

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] MEMORY : ' + user.id + ' : ' + bet + '€')
        const msg = await interaction.reply({ content: '<@' + user.id + '>', embeds: [message], components: [row], fetchReply: true })

        // Init Timeout Function
        bot.memory.set('TIMEOUT-' + interaction.user.id + '-' + msg.id, true)

        const expiration = async () => {
            // Check if Message wasnt already answered
            if (!bot.memory.has('TIMEOUT-' + interaction.user.id + '-' + msg.id)) return
            bot.memory.delete('TIMEOUT-' + interaction.user.id + '-' + msg.id)

            // Edit Buttons
            msg.components[0].components[0].data.disabled = true
            msg.components[0].components[1].data.disabled = true
            msg.components[0].components[0].data.style = 2
            msg.components[0].components[1].data.style = 2

            message = new EmbedBuilder().setColor(0x37009B)
                .setTitle('<:GAMEPAD:1024395990679167066> » MEMORY')
                .setDescription('» The Request expired.')
                .setFooter({ text: '» ' + vote + ' » ' + config.version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:GAMEPAD:1024395990679167066> » MEMORY')
                    .setDescription('» Die Anfrage ist abgelaufen.')
                    .setFooter({ text: '» ' + vote + ' » ' + config.version });
            }

            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] MEMORY : ' + user.id + ' : EXPIRED')
            interaction.editReply({ content: '', embeds: [message], components: msg.components }).catch((error) => {})
        }

        setTimeout(() => expiration(), 27000)
    }
}