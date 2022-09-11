const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
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
    async execute(interaction, client) {
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
        		.setDescription('» You cant play Rock Paper Scissors with a Bot!')
        		.setFooter({ text: '» ' + version });

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
        		    .setTitle('» FEHLER')
        		    .setDescription('» Du kannst Schere Stein Papier nicht mit einem Bot spielen!')
        		    .setFooter({ text: '» ' + version });
            }
            
            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] RPS : ' + user.toString().replace(/\D/g, '') + ' : BOT')
            await return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Check if Sender is already in a Lobby
        let lobby
        try {
            eval('rpss' + interaction.user.id.toString().replace(/\D/g, ''))
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
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] RPS : ' + user.toString().replace(/\D/g, '') + ' : ALREADYLOBBY')
            await return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Check if Reciever is already in a Lobby
        try {
            eval('rpss' + user.toString().replace(/\D/g, ''))
            lobby = true
        } catch (e) {
            lobby = false
        }
        if (lobby) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('» ERROR')
        		.setDescription('» <@' + user.toString().replace(/\D/g, '') + '> is already in a Lobby!')
        		.setFooter({ text: '» ' + version });

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
        		    .setTitle('» FEHLER')
        		    .setDescription('» <@' + user.toString().replace(/\D/g, '') + '> ist schon in einer Lobby!')
        		    .setFooter({ text: '» ' + version });
            }
            
            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] RPS : ' + user.toString().replace(/\D/g, '') + ' : ALREADYLOBBY')
            await return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Check if Bet is Negative
        if (bet < 0 && bet != null) {
            // Create Embed
            let message = new EmbedBuilder()
        		.setTitle('» ERROR')
        		.setDescription('» You cant bet negative Money!')
        		.setFooter({ text: '» ' + version });

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
        		    .setTitle('» FEHLER')
        		    .setDescription('» Du kannst kein negatives Geld wetten!')
        		    .setFooter({ text: '» ' + version });
            }
            
            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] RPS : ' + user.toString().replace(/\D/g, '') + ' : NEGATIVEMONEY : ' + bet + '€')
            await return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Check if User is Author
        if (interaction.user.id == user.toString().replace(/\D/g, '')) {
            // Create Embed
            let message = new EmbedBuilder()
            	.setTitle('» ERROR')
  				.setDescription('» You cant play Rock Paper Scissors with yourself?')
            	.setFooter({ text: '» ' + version });

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
            	    .setTitle('» FEHLER')
  				    .setDescription('» Du kannst Schere Stein Papier nicht mit dir alleine spielen?')
            	    .setFooter({ text: '» ' + version });
            }

            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] RPS : ' + reciever.toString().replace(/\D/g, '') + ' : ' + amount + '€ : SAMEPERSON')
            await return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Check for Enough Money
        if (money < bet && bet != null) {
            const missing = bet - money
            
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
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] RPS : ' + user.toString().replace(/\D/g, '') + ' : NOTENOUGHMONEY')
            await return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }
        if (othermoney < bet && bet != null) {
            const missing = bet - othermoney
            
            // Create Embed
            let message = new EmbedBuilder()
            	.setTitle('» ERROR')
  				.setDescription('» <@' + user.toString().replace(/\D/g, '') + '> doesnt have enough Money for that, he is Missing **$' + missing + '**!')
            	.setFooter({ text: '» ' + version });

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
            	    .setTitle('» FEHLER')
  				    .setDescription('» <@' + user.toString().replace(/\D/g, '') + '> hat dafür nicht genug Geld, im fehlen **' + missing + '€**!')
            	    .setFooter({ text: '» ' + version });
            }
            
            // Send Message
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] RPS : ' + user.toString().replace(/\D/g, '') + ' : NOTENOUGHMONEY')
            await return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Create Buttons
        if (bet == null) { bet = 0 }
        let row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('YES')
                    .setCustomId('RPS-YES-' + bet)
                    .setEmoji('1017050442431209543')
					.setStyle(ButtonStyle.Success),

                new ButtonBuilder()
					.setLabel('NO')
                    .setCustomId('RPS-NO-' + bet)
                    .setEmoji('1017050508252418068')
					.setStyle(ButtonStyle.Danger),
			);
        if (interaction.guildLocale == "de") {
            row = new ActionRowBuilder()
			    .addComponents(
			    	new ButtonBuilder()
			    		.setLabel('JA')
                        .setCustomId('RPS-YES-' + bet)
                        .setEmoji('1017050442431209543')
			    		.setStyle(ButtonStyle.Success),

                    new ButtonBuilder()
			    		.setLabel('NEIN')
                        .setCustomId('RPS-NO-' + bet)
                        .setEmoji('1017050508252418068')
			    		.setStyle(ButtonStyle.Danger),
			    );
        }
        
        // Create Embed
        let message = new EmbedBuilder()
        	.setTitle('» ROCK PAPER SCISSORS')
  			.setDescription('» <@' + interaction.user.id.replace(/\D/g, '') + '> challenges you, <@' + user.toString().replace(/\D/g, '') + '> to a battle of Rock Paper Scissors! The Bet is **$' + bet + '**.\nDo you accept?')
        	.setFooter({ text: '» ' + version });

        if (interaction.guildLocale == "de") {
            message = new EmbedBuilder()
        	    .setTitle('» SCHERE STEIN PAPIER')
  			    .setDescription('» <@' + interaction.user.id.replace(/\D/g, '') + '> fordert dich, <@' + user.toString().replace(/\D/g, '') + '> zu einem Spiel von Schere Stein Papier heraus! Die Wette ist **' + bet + '€**.\nAkzeptierst du?')
        	    .setFooter({ text: '» ' + version });
        }

        // Send Message
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] RPS : ' + user.toString().replace(/\D/g, '') + ' : ' + bet + '€')
        await return interaction.reply({ embeds: [message.toJSON()], components: [row] })
    },
};