const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { version } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rps')
        .setDescription('PLAY ROCK-PAPER-SCISSORS')
        .setDescriptionLocalizations({
            de: 'SPIELE SCHERE-STEIN-PAPIER'
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
        // Check if Minigames are Enabled in Server
        const mes = await gopt.get(interaction.guild.id + '-MINIGAMES')
        if (parseInt(mes) == 1) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» Minigames are disabled on this Server!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang === 'de') {
                message = new EmbedBuilder()
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Minispiele sind auf diesem Server deaktiviert!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] RPS : DISABLED')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Set Variables
        const user = interaction.options.getUser("user")
        let bet = interaction.options.getInteger("bet")
        const money = await bot.money.get(interaction.user.id);
        const othermoney = await bot.money.get(user.id);

        // Check if Target is Bot
        const userinfo = await client.users.fetch(user);
        if (user.bot) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» You cant play Rock Paper Scissors with a Bot!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang === 'de') {
                message = new EmbedBuilder()
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Du kannst Schere Stein Papier nicht mit einem Bot spielen!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] RPS : ' + user.id + ' : BOT')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Check if Sender is already in a Lobby
        if (bot.game.has('PLAYING-' + interaction.user.id)) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» You are already in a Lobby!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang === 'de') {
                message = new EmbedBuilder()
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Du bist schon in einer Lobby!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] RPS : ' + user.id + ' : ALREADYLOBBY')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Check if Reciever is already in a Lobby
        if (bot.game.has('PLAYING-' + user.id)) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» <@' + user.id + '> is already in a Lobby!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang === 'de') {
                message = new EmbedBuilder()
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» <@' + user.id + '> ist schon in einer Lobby!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] RPS : ' + user.id + ' : ALREADYLOBBY')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Check if Bet is Negative
        if (bet < 0 && bet != null) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» You cant bet negative Money!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang === 'de') {
                message = new EmbedBuilder()
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Du kannst kein negatives Geld wetten!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] RPS : ' + user.id + ' : NEGATIVEMONEY : ' + bet + '€')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Check if User is Author
        if (interaction.user.id == user.id) {
            // Create Embed
            let message = new EmbedBuilder()
            	.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  				.setDescription('» You cant play Rock Paper Scissors with yourself?')
            	.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang === 'de') {
                message = new EmbedBuilder()
            	    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				    .setDescription('» Du kannst Schere Stein Papier nicht mit dir alleine spielen?')
            	    .setFooter({ text: '» ' + vote + ' » ' + version });
            }

            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] RPS : ' + user.id + ' : ' + bet + '€ : SAMEPERSON')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Check for Enough Money
        if (money < bet && bet != null) {
            const missing = bet - money
            
            // Create Embed
            let message = new EmbedBuilder()
            	.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  				.setDescription('» You dont have enough Money for that, you are missing **$' + missing + '**!')
            	.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang === 'de') {
                message = new EmbedBuilder()
            	    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				    .setDescription('» Du hast dafür nicht genug Geld, dir fehlen **' + missing + '€**!')
            	    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] RPS : ' + user.id + ' : NOTENOUGHMONEY')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }
        if (othermoney < bet && bet != null) {
            const missing = bet - othermoney
            
            // Create Embed
            let message = new EmbedBuilder()
            	.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  				.setDescription('» <@' + user.id + '> doesnt have enough Money for that, he is Missing **$' + missing + '**!')
            	.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang === 'de') {
                message = new EmbedBuilder()
            	    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				    .setDescription('» <@' + user.id + '> hat dafür nicht genug Geld, im fehlen **' + missing + '€**!')
            	    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] RPS : ' + user.id + ' : NOTENOUGHMONEY')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Create Buttons
        if (bet == null) { bet = 0 }
        let row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('YES')
                    .setCustomId('RPS-YES-' + bet)
                    .setEmoji('1024382942153285632')
					.setStyle(ButtonStyle.Success),

                new ButtonBuilder()
					.setLabel('NO')
                    .setCustomId('RPS-NO-' + bet)
                    .setEmoji('1024382939020152982')
					.setStyle(ButtonStyle.Danger),
			);
        if (lang === 'de') {
            row = new ActionRowBuilder()
			    .addComponents(
			    	new ButtonBuilder()
			    		.setLabel('JA')
                        .setCustomId('RPS-YES-' + bet)
                        .setEmoji('1024382942153285632')
			    		.setStyle(ButtonStyle.Success),

                    new ButtonBuilder()
			    		.setLabel('NEIN')
                        .setCustomId('RPS-NO-' + bet)
                        .setEmoji('1024382939020152982')
			    		.setStyle(ButtonStyle.Danger),
			    );
        }
        
        // Create Embed
        let message = new EmbedBuilder()
        	.setTitle('<:GAMEPAD:1024395990679167066> » ROCK PAPER SCISSORS')
  			.setDescription('» <@' + interaction.user.id + '> challenges you, <@' + user.id + '> to a battle of Rock Paper Scissors! The Bet is **$' + bet + '**.\nDo you accept?\n\n» This Request expires <t:' + (Math.floor(+new Date() / 1000) + 29) + ':R>')
        	.setFooter({ text: '» ' + vote + ' » ' + version });

        if (lang === 'de') {
            message = new EmbedBuilder()
        	    .setTitle('<:GAMEPAD:1024395990679167066> » SCHERE STEIN PAPIER')
  			    .setDescription('» <@' + interaction.user.id + '> fordert dich, <@' + user.id + '> zu einem Spiel von Schere Stein Papier heraus! Die Wette ist **' + bet + '€**.\nAkzeptierst du?\n\n» Diese Anfrage wird ungültig <t:' + (Math.floor(+new Date() / 1000) + 29) + ':R>')
        	    .setFooter({ text: '» ' + vote + ' » ' + version });
        }

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] RPS : ' + user.id + ' : ' + bet + '€')
        const msg = await interaction.reply({ content: '<@' + user.id + '>', embeds: [message], components: [row], fetchReply: true })

        // Init Timeout Function
        bot.rps.set('TIMEOUT-' + interaction.user.id + '-' + msg.id, true)

        const expiration = async () => {
            // Check if Message wasnt already answered
            if (!bot.rps.has('TIMEOUT-' + interaction.user.id + '-' + msg.id)) return
            bot.rps.delete('TIMEOUT-' + interaction.user.id + '-' + msg.id)

            // Edit Buttons
            msg.components[0].components[0].data.disabled = true
            msg.components[0].components[1].data.disabled = true
            msg.components[0].components[0].data.style = 2
            msg.components[0].components[1].data.style = 2

            message = new EmbedBuilder()
                .setTitle('<:GAMEPAD:1024395990679167066> » ROCK PAPER SCISSORS')
                .setDescription('» The Request expired.')
                .setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang === 'de') {
                message = new EmbedBuilder()
                    .setTitle('<:GAMEPAD:1024395990679167066> » SCHERE STEIN PAPIER')
                    .setDescription('» Die Anfrage ist abgelaufen.')
                    .setFooter({ text: '» ' + vote + ' » ' + version });
            }

            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] RPS : ' + user.id + ' : EXPIRED')
            interaction.editReply({ content: '', embeds: [message], components: msg.components }).catch((error) => {})
        }

        setTimeout(() => expiration(), 27000)
    },
};