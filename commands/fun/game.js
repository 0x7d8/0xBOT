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
    async execute(interaction, client) {
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
        		.setTitle('» STADT LAND FLUSS REGELN')
        		.setDescription('**»» PERSONEN**\n» 100000+ ABONNENTEN\n» DEUTSCHE PERSON\n\n**»» STÄDTE**\n» 5000+ BEWOHNER\n» DEUTSCHE STADTNAMEN\n\n**»» SÄTZE**\n» KONTEXT WICHTIG\n» NUR DEUTSCH')
        		.setFooter({ text: '» ' + version });
        const sio = new EmbedBuilder()
        		.setTitle('» SCRIBBL.IO REGELN')
        		.setDescription('**»» MALEN**\n» KEINEN TEXT\n\n**»» WÖRTER**\n» WÖRTER DIE JEDER KENNT\n\n**»» CHAT**\n» KEIN SPAMMING')
        		.setFooter({ text: '» ' + version });
        const gtf = new EmbedBuilder()
        		.setTitle('» GARTICPHONE REGELN')
        		.setDescription('**»» MALEN**\n» KEINEN TEXT\n» MUSS ZUM SATZ PASSEN\n\n**»» SÄTZE**\n» SÄTZE DIE JEDER VERSTEHT')
        		.setFooter({ text: '» ' + version });
        const jkl = new EmbedBuilder()
        		.setTitle('» JKLM.FUN REGELN')
        		.setDescription('**»» GENERELL**\n» KEINE REGELN')
        		.setFooter({ text: '» ' + version });

        // Send Message
        console.log('[0xBOT] [i] [' + new Date().toLocaleTimeString('en-US', { hour12: false }) + '] [' + interaction.user.id.replace(/\D/g, '') + ' @ ' + interaction.guild.id + '] [CMD] GAME : ' + spiel.toUpperCase())
        if (spiel == 'stadtlandfluss') {
            await interaction.message.edit({ embeds: [slf.toJSON()], components: [slfB] })
        }
        if (spiel == 'scribblio') {
            await interaction.message.edit({ embeds: [sio.toJSON()], components: [sioB] })
        }
        if (spiel == 'garticphone') {
            await interaction.message.edit({ embeds: [gtf.toJSON()], components: [gtfB] })
        }
        if (spiel == 'jklm') {
            await interaction.message.edit({ embeds: [jkl.toJSON()], components: [jklB] })
        }
    },
};