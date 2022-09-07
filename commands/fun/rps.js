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
        // Count to Global Commands
        cmds.add('t-all', 1)
        
        // Count Guild Commands and User
        cmds.add('g-' + interaction.guild.id, 1)
        cmds.add('u-' + interaction.user.id.replace(/\D/g, ''), 1)

        // Set Variables
        const user = interaction.options.getUser("user")
        let bet = interaction.options.getInteger("bet")
        const money = await bals.get(interaction.user.id.replace(/\D/g, ''));
        const othermoney = await bals.get(user.toString().replace(/\D/g, ''));

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
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] RPS : ' + user.toString().replace(/\D/g, '') + ' : NEGATIVEMONEY : ' + anzahl + '€')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Check for Enough Money
        if (money < bet && bet != null) {
            const missing = cost - balance
            
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
            console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] STOCKBUY : ' + stock.toUpperCase() + ' : ' + amount + ' : ' + cost + '€ : NOTENOUGHMONEY')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Create Buttons
        if (bet == null) { bet = 0 }
        let rock = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('🪨 ROCK')
                    .setCustomId('RPS-1-' + bet)
					.setStyle(ButtonStyle.Secondary),
			);
        if (interaction.guildLocale == "de") {
            rock = new ActionRowBuilder()
			    .addComponents(
			    	new ButtonBuilder()
			    		.setLabel('🪨 STEIN')
                        .setCustomId('RPS-1-' + bet)
			    		.setStyle(ButtonStyle.Secondary),
			    );
        }

        let paper = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('📝 PAPER')
                    .setCustomId('RPS-2-' + bet)
					.setStyle(ButtonStyle.Secondary),
			);
        if (interaction.guildLocale == "de") {
            paper = new ActionRowBuilder()
			    .addComponents(
			    	new ButtonBuilder()
			    		.setLabel('📝 PAPIER')
                        .setCustomId('RPS-2-' + bet)
			    		.setStyle(ButtonStyle.Secondary),
			    );
        }

        let scissors = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('✂️ SCISSOR')
                    .setCustomId('RPS-3-' + bet)
					.setStyle(ButtonStyle.Secondary),
			);
        if (interaction.guildLocale == "de") {
            scissors = new ActionRowBuilder()
			    .addComponents(
			    	new ButtonBuilder()
			    		.setLabel('✂️ SCHERE')
                        .setCustomId('RPS-3-' + bet)
			    		.setStyle(ButtonStyle.Secondary),
			    );
        }
        
        // Create Embed
        let message
        if (bet == null) {
      	    message = new EmbedBuilder()
                .setTitle('» ROCK PAPER SCISSORS')
  			    .setDescription('» <@' + interaction.user.id.replace(/\D/g, '') + '> is playing Rock Paper Scissors with <@' + user.toString().replace(/\D/g, '') + '>!')
        	    .setFooter({ text: '» ' + version });

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
                    .setTitle('» SCHERE STEIN PAPIER')
                    .setDescription('» <@' + interaction.user.id.replace(/\D/g, '') + '> spielt mit <@' + user.toString().replace(/\D/g, '') + '> Schere Stein Papier!')
                    .setFooter({ text: '» ' + version });
            }
        } else {
            message = new EmbedBuilder()
                .setTitle('» ROCK PAPER SCISSORS')
  			    .setDescription('» <@' + interaction.user.id.replace(/\D/g, '') + '> is playing Rock Paper Scissors with <@' + user.toString().replace(/\D/g, '') + '>!\nThe Bet is **$' + bet + '**')
        	    .setFooter({ text: '» ' + version });

            if (interaction.guildLocale == "de") {
                message = new EmbedBuilder()
                    .setTitle('» SCHERE STEIN PAPIER')
                    .setDescription('» <@' + interaction.user.id.replace(/\D/g, '') + '> spielt mit <@' + user.toString().replace(/\D/g, '') + '> Schere Stein Papier!\nDie Wette ist **' + bet + '€**')
                    .setFooter({ text: '» ' + version });
            }
        }

        // Send Message
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] COUNT')
        return interaction.reply({ embeds: [message.toJSON()], components: [rock, paper, scissors] })
    },
};