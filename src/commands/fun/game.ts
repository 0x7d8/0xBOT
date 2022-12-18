import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js"
import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import CommandInteraction from "@interfaces/CommandInteraction.js"
export default {
	data: new SlashCommandBuilder()
		.setName('game')
		.setDMPermission(false)
		.setDescription('SHOW BROWSERGAMES AND RULES')
		.setDescriptionLocalizations({
			de: 'ZEIGE BROWSERSPIELE UND REGELN'
		})
		.addStringOption((option: any) =>
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

	async execute(ctx: CommandInteraction) {
		// Set Variables
		const spiel = ctx.getOption('game') as string

		// Create Buttons
		const slfB = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('LOBBY ERSTELLEN')
					.setURL('https://stopots.com/de/')
					.setStyle(ButtonStyle.Link),
			)
		const sioB = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('LOBBY ERSTELLEN')
					.setURL('https://skribbl.io/')
					.setStyle(ButtonStyle.Link),
			)
		const gtfB = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('LOBBY ERSTELLEN')
					.setURL('https://garticphone.com/de')
					.setStyle(ButtonStyle.Link),
			)
		const jklB = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('LOBBY ERSTELLEN')
					.setURL('https://jklm.fun/')
					.setStyle(ButtonStyle.Link),
			)
			
		// Create Embeds
		const slf = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:GAMEPAD:1024395990679167066> » STADT LAND FLUSS REGELN')
				.setDescription('**»» PERSONEN**\n» 100000+ ABONNENTEN\n» DEUTSCHE PERSON\n\n**»» STÄDTE**\n» 5000+ BEWOHNER\n» DEUTSCHE STADTNAMEN\n\n**»» SÄTZE**\n» KONTEXT WICHTIG\n» NUR DEUTSCH')
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
		const sio = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:GAMEPAD:1024395990679167066> » SCRIBBL.IO REGELN')
				.setDescription('**»» MALEN**\n» KEINEN TEXT\n\n**»» WÖRTER**\n» WÖRTER DIE JEDER KENNT\n\n**»» CHAT**\n» KEIN SPAMMING')
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
		const gtf = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:GAMEPAD:1024395990679167066> » GARTICPHONE REGELN')
				.setDescription('**»» MALEN**\n» KEINEN TEXT\n» MUSS ZUM SATZ PASSEN\n\n**»» SÄTZE**\n» SÄTZE DIE JEDER VERSTEHT')
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
		const jkl = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:GAMEPAD:1024395990679167066> » JKLM.FUN REGELN')
				.setDescription('**»» GENERELL**\n» KEINE REGELN')
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

		// Send Message
		ctx.log(false, '[CMD] GAME : ' + spiel.toUpperCase())
		if (spiel == 'stadtlandfluss') {
			await ctx.interaction.reply({ embeds: [slf.toJSON()], components: [slfB as any] })
		}; if (spiel == 'scribblio') {
			await ctx.interaction.reply({ embeds: [sio.toJSON()], components: [sioB as any] })
		}; if (spiel == 'garticphone') {
			await ctx.interaction.reply({ embeds: [gtf.toJSON()], components: [gtfB as any] })
		}; if (spiel == 'jklm') {
			await ctx.interaction.reply({ embeds: [jkl.toJSON()], components: [jklB as any] })
		}
	}
}