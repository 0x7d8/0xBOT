const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { version } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('game')
    	.setDMPermission(false)
        .setDescription('SHOW BROWSERGAMES AND RULES')
		.setDescriptionLocalizations({
			de: 'ZEIGE BROWSERSPIELE UND REGELN'
		})
    	.addStringOption(option =>
            option.setName('game')
                .setNameLocalizations({
                    de: 'spiel'
                })
                .setDescription('THE GAME')
				.setDescriptionLocalizations({
                    de: 'DAS SPIEL'
                })
                .setRequired(true)
    			.addChoices(
            		// Setup Choices
            		{ name: '🗺️ STADT LAND FLUSS', value: 'stadtlandfluss' },
            		{ name: '🤔 SCRIBBL.IO', value: 'scribblio' },
            		{ name: '⭐ GARTIC PHONE', value: 'garticphone' },
            		{ name: '🧠 JKLM', value: 'jklm' },
				)),
    async execute(interaction, client, lang, vote) {
        // Set Variables
        const spiel = interaction.options.getString("game")

        // Create Buttons
		const slfB = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('LOBBY ERSTELLEN')
					.setURL('https://stopots.com/de/')
					.setStyle(ButtonStyle.Link),
			);
		const sioB = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('LOBBY ERSTELLEN')
					.setURL('https://skribbl.io/')
					.setStyle(ButtonStyle.Link),
			);
		const gtfB = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('LOBBY ERSTELLEN')
					.setURL('https://garticphone.com/de')
					.setStyle(ButtonStyle.Link),
			);
		const jklB = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('LOBBY ERSTELLEN')
					.setURL('https://jklm.fun/')
					.setStyle(ButtonStyle.Link),
			);
			
        // Create Embeds
        const slf = new EmbedBuilder()
        		.setTitle('<:GAMEPAD:1024395990679167066> » STADT LAND FLUSS REGELN')
        		.setDescription('**»» PERSONEN**\n» 100000+ ABONNENTEN\n» DEUTSCHE PERSON\n\n**»» STÄDTE**\n» 5000+ BEWOHNER\n» DEUTSCHE STADTNAMEN\n\n**»» SÄTZE**\n» KONTEXT WICHTIG\n» NUR DEUTSCH')
        		.setFooter({ text: '» ' + vote + ' » ' + version });
        const sio = new EmbedBuilder()
        		.setTitle('<:GAMEPAD:1024395990679167066> » SCRIBBL.IO REGELN')
        		.setDescription('**»» MALEN**\n» KEINEN TEXT\n\n**»» WÖRTER**\n» WÖRTER DIE JEDER KENNT\n\n**»» CHAT**\n» KEIN SPAMMING')
        		.setFooter({ text: '» ' + vote + ' » ' + version });
        const gtf = new EmbedBuilder()
        		.setTitle('<:GAMEPAD:1024395990679167066> » GARTICPHONE REGELN')
        		.setDescription('**»» MALEN**\n» KEINEN TEXT\n» MUSS ZUM SATZ PASSEN\n\n**»» SÄTZE**\n» SÄTZE DIE JEDER VERSTEHT')
        		.setFooter({ text: '» ' + vote + ' » ' + version });
        const jkl = new EmbedBuilder()
        		.setTitle('<:GAMEPAD:1024395990679167066> » JKLM.FUN REGELN')
        		.setDescription('**»» GENERELL**\n» KEINE REGELN')
        		.setFooter({ text: '» ' + vote + ' » ' + version });

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] GAME : ' + spiel.toUpperCase())
        if (spiel == 'stadtlandfluss') {
            await interaction.reply({ embeds: [slf.toJSON()], components: [slfB] })
        }
        if (spiel == 'scribblio') {
            await interaction.reply({ embeds: [sio.toJSON()], components: [sioB] })
        }
        if (spiel == 'garticphone') {
            await interaction.reply({ embeds: [gtf.toJSON()], components: [gtfB] })
        }
        if (spiel == 'jklm') {
            await interaction.reply({ embeds: [jkl.toJSON()], components: [jklB] })
        }
    },
};