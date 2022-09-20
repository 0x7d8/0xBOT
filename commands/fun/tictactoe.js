const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { version } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tictactoe')
        .setDescription('PLAY TICTACTOE')
        .setDescriptionLocalizations({
            de: 'SPIELE TICTACTOE'
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
        		.setTitle('» ERROR')
        		.setDescription('» Minigames are disabled on this Server!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang.toString() == "de") {
                message = new EmbedBuilder()
        		    .setTitle('» FEHLER')
        		    .setDescription('» Minispiele sind auf diesem Server deaktiviert!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] TICTACTOE : DISABLED')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Set Variables
        const user = interaction.options.getUser("user")
        let bet = interaction.options.getInteger("bet")
        const money = await bals.get(interaction.user.id.replace(/\D/g, ''));
        const othermoney = await bals.get(user.toString().replace(/\D/g, ''));

        // Check if Target is Bot
        const userinfo = await client.users.fetch(user);
        if (userinfo.bot == true) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('» ERROR')
        		.setDescription('» You cant play Tic Tac Toe with a Bot!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang.toString() == "de") {
                message = new EmbedBuilder()
        		    .setTitle('» FEHLER')
        		    .setDescription('» Du kannst Tic Tac Toe nicht mit einem Bot spielen!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] TICTACTOE : ' + user.toString().replace(/\D/g, '') + ' : BOT')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Check if Sender is already in a Lobby
        let lobby
        try {
            eval('ttts' + interaction.user.id.toString().replace(/\D/g, ''))
            lobby = true
        } catch (e) {
            lobby = false
        }
        try {
            eval('tttlc' + interaction.user.id.replace(/\D/g, ''))
            lobby = true
        } catch (e) {
            if (lobby) { lobby = false }
        }
        if (lobby) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('» ERROR')
        		.setDescription('» You are already in a Lobby!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang.toString() == "de") {
                message = new EmbedBuilder()
        		    .setTitle('» FEHLER')
        		    .setDescription('» Du bist schon in einer Lobby!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] TICTACTOE : ' + user.toString().replace(/\D/g, '') + ' : ALREADYLOBBY')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Check if Reciever is already in a Lobby
        try {
            eval('ttts' + user.toString().replace(/\D/g, ''))
            lobby = true
        } catch (e) {
            lobby = false
        }
        if (lobby) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('» ERROR')
        		.setDescription('» <@' + user.toString().replace(/\D/g, '') + '> is already in a Lobby!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang.toString() == "de") {
                message = new EmbedBuilder()
        		    .setTitle('» FEHLER')
        		    .setDescription('» <@' + user.toString().replace(/\D/g, '') + '> ist schon in einer Lobby!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] TICTACTOE : ' + user.toString().replace(/\D/g, '') + ' : ALREADYLOBBY')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Check if Bet is Negative
        if (bet < 0 && bet != null) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('» ERROR')
        		.setDescription('» You cant bet negative Money!')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang.toString() == "de") {
                message = new EmbedBuilder()
        		    .setTitle('» FEHLER')
        		    .setDescription('» Du kannst kein negatives Geld wetten!')
        		    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] TICTACTOE : ' + user.toString().replace(/\D/g, '') + ' : NEGATIVEMONEY : ' + bet + '€')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Check if User is Author
        if (interaction.user.id == user.toString().replace(/\D/g, '')) {
            // Create Embed
            let message = new EmbedBuilder()
            	.setTitle('» ERROR')
  				.setDescription('» You cant play Tic Tac Toe with yourself?')
            	.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang.toString() == "de") {
                message = new EmbedBuilder()
            	    .setTitle('» FEHLER')
  				    .setDescription('» Du kannst Tic Tac Toe nicht mit dir alleine spielen?')
            	    .setFooter({ text: '» ' + vote + ' » ' + version });
            }

            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] TICTACTOE : ' + user.toString().replace(/\D/g, '') + ' : ' + bet + '€ : SAMEPERSON')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Check for Enough Money
        if (money < bet && bet != null) {
            const missing = bet - money
            
            // Create Embed
            let message = new EmbedBuilder()
            	.setTitle('» ERROR')
  				.setDescription('» You dont have enough Money for that, you are missing **$' + missing + '**!')
            	.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang.toString() == "de") {
                message = new EmbedBuilder()
            	    .setTitle('» FEHLER')
  				    .setDescription('» Du hast dafür nicht genug Geld, dir fehlen **' + missing + '€**!')
            	    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] TICTACTOE : ' + user.toString().replace(/\D/g, '') + ' : NOTENOUGHMONEY')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }
        if (othermoney < bet && bet != null) {
            const missing = bet - othermoney
            
            // Create Embed
            let message = new EmbedBuilder()
            	.setTitle('» ERROR')
  				.setDescription('» <@' + user.toString().replace(/\D/g, '') + '> doesnt have enough Money for that, he is Missing **$' + missing + '**!')
            	.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang.toString() == "de") {
                message = new EmbedBuilder()
            	    .setTitle('» FEHLER')
  				    .setDescription('» <@' + user.toString().replace(/\D/g, '') + '> hat dafür nicht genug Geld, im fehlen **' + missing + '€**!')
            	    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] TICTACTOE : ' + user.toString().replace(/\D/g, '') + ' : NOTENOUGHMONEY')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Create Buttons
        if (bet == null) { bet = 0 }
        let row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('YES')
                    .setCustomId('TTT-YES-' + bet)
                    .setEmoji('1017050442431209543')
					.setStyle(ButtonStyle.Success),

                new ButtonBuilder()
					.setLabel('NO')
                    .setCustomId('TTT-NO-' + bet)
                    .setEmoji('1017050508252418068')
					.setStyle(ButtonStyle.Danger),
			);
        if (lang.toString() == "de") {
            row = new ActionRowBuilder()
			    .addComponents(
			    	new ButtonBuilder()
			    		.setLabel('JA')
                        .setCustomId('TTT-YES-' + bet)
                        .setEmoji('1017050442431209543')
			    		.setStyle(ButtonStyle.Success),

                    new ButtonBuilder()
			    		.setLabel('NEIN')
                        .setCustomId('TTT-NO-' + bet)
                        .setEmoji('1017050508252418068')
			    		.setStyle(ButtonStyle.Danger),
			    );
        }

        eval('global.tttlc' + interaction.user.id.replace(/\D/g, '') + ' = true')
        
        // Create Embed
        let message = new EmbedBuilder()
        	.setTitle('» TICTACTOE')
  			.setDescription('» <@' + interaction.user.id.replace(/\D/g, '') + '> challenges you, <@' + user.toString().replace(/\D/g, '') + '> to a battle of Tic Tac Toe! The Bet is **$' + bet + '**.\nDo you accept?\n\n» This Request expires <t:' + (Math.floor(+new Date() / 1000) + 29) + ':R>')
        	.setFooter({ text: '» ' + vote + ' » ' + version });

        if (lang.toString() == "de") {
            message = new EmbedBuilder()
        	    .setTitle('» TICTACTOE')
  			    .setDescription('» <@' + interaction.user.id.replace(/\D/g, '') + '> fordert dich, <@' + user.toString().replace(/\D/g, '') + '> zu einem Spiel von Tic Tac Toe heraus! Die Wette ist **' + bet + '€**.\nAkzeptierst du?\n\n» Diese Anfrage wird ungültig <t:' + (Math.floor(+new Date() / 1000) + 29) + ':R>')
        	    .setFooter({ text: '» ' + vote + ' » ' + version });
        }

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] TICTACTOE : ' + user.toString().replace(/\D/g, '') + ' : ' + bet + '€')
        interaction.reply({ embeds: [message.toJSON()], components: [row] })

        const expiration = async () => {
            let run
            try {
                eval('ttts' + interaction.user.id.toString().replace(/\D/g, ''))
                run = false
            } catch (e) {
                run = true
            }
            if (!run) return

            // Check if Message wasnt already answered with NO
            let sno
            try {
                eval('ttttf' + interaction.user.id.replace(/\D/g, ''))
                sno = true
            } catch (e) {
                sno = false
            }
            let ano = false
            if (sno) {
                if (eval('ttttf' + interaction.user.id.replace(/\D/g, '') + ' == true')) { eval('delete ttttf' + interaction.user.id.replace(/\D/g, '')); ano = true }
                if (ano) return
            }

            eval('delete tttlc' + interaction.user.id.replace(/\D/g, ''))

            // Create Buttons
            row = new ActionRowBuilder()
			    .addComponents(
			    	new ButtonBuilder()
			    		.setLabel('YES')
                        .setCustomId('TTT-YES-' + bet)
                        .setEmoji('1017050442431209543')
			    		.setStyle(ButtonStyle.Success)
                        .setDisabled(true),

                    new ButtonBuilder()
			    		.setLabel('NO')
                        .setCustomId('TTT-NO-' + bet)
                        .setEmoji('1017050508252418068')
			    		.setStyle(ButtonStyle.Danger)
                        .setDisabled(true),
			    );
            if (lang.toString() == "de") {
                row = new ActionRowBuilder()
			        .addComponents(
			        	new ButtonBuilder()
			        		.setLabel('JA')
                            .setCustomId('TTT-YES-' + bet)
                            .setEmoji('1017050442431209543')
			        		.setStyle(ButtonStyle.Success)
                            .setDisabled(true),

                        new ButtonBuilder()
			        		.setLabel('NEIN')
                            .setCustomId('TTT-NO-' + bet)
                            .setEmoji('1017050508252418068')
			        		.setStyle(ButtonStyle.Danger)
                            .setDisabled(true),
			        );
            }

            message = new EmbedBuilder()
                .setTitle('» TICTACTOE')
                .setDescription('» The Request expired.')
                .setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang.toString() == "de") {
                message = new EmbedBuilder()
                    .setTitle('» TICTACTOE')
                    .setDescription('» Die Anfrage ist abgelaufen.')
                    .setFooter({ text: '» ' + vote + ' » ' + version });
            }

            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] TICTACTOE : ' + user.toString().replace(/\D/g, '') + ' : EXPIRED')
            interaction.editReply({ embeds: [message.toJSON()], components: [row] }).catch((error) => {})
        }

        setTimeout(() => expiration(), 27000)
    },
};