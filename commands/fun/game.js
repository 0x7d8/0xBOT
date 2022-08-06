const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { version } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('game')
    	.setDMPermission(false)
        .setDescription('ZEIGE BROWSERSPIELE UND REGELN')
    	.addStringOption(option =>
            option.setName('spiel')
                .setDescription('DAS SPIEL')
                .setRequired(true)
    			.addChoices(
            		// Setup Choices
            		{ name: '🗺️ STADT LAND FLUSS', value: 'stadtlandfluss' },
            		{ name: '🤔 SCRIBBL.IO', value: 'scribblio' },
            		{ name: '⭐ GARTIC PHONE', value: 'garticphone' },
            		{ name: '🧠 JKLM', value: 'jklm' },
				)),
    async execute(interaction) {
        // Count to Global Commands
        addcmd('t-all', 1)
        
        // Count Guild Commands and User
        addcmd('g-' + interaction.guild.id, 1)
        addcmd('u-' + interaction.user.id, 1)
        
        // Set Variables
        const spiel = interaction.options.getString("spiel")

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
        console.log('[0xBOT] [i] [' + interaction.user.id + ' @ ' + interaction.guild.id + '] GAME : ' + spiel.toUpperCase())
        if (spiel == 'stadtlandfluss') {
            interaction.reply({ embeds: [slf.toJSON()], components: [slfB] })
        }
        if (spiel == 'scribblio') {
            interaction.reply({ embeds: [sio.toJSON()], components: [sioB] })
        }
        if (spiel == 'garticphone') {
            interaction.reply({ embeds: [gtf.toJSON()], components: [gtfB] })
        }
        if (spiel == 'jklm') {
            interaction.reply({ embeds: [jkl.toJSON()], components: [jklB] })
        }
    },
};