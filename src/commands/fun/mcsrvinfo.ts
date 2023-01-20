import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import { default as axios } from "axios"

import CommandInteraction from "@interfaces/CommandInteraction.js"
export default {
	data: new SlashCommandBuilder()
		.setName('mcsrvinfo')
		.setDMPermission(false)
		.setDescription('GET INFO ABOUT A MINECRAFT SERVER')
		.setDescriptionLocalizations({
			de: 'BEKOMME INFO ÜBER EINEN MINECRAFT SERVER'
		})
		.addStringOption((option: any) =>
			option.setName('address')
				.setNameLocalizations({
					de: 'adresse'
				})
				.setDescription('THE ADDRESS')
				.setDescriptionLocalizations({
					de: 'DIE ADRESSE'
				})
				.setRequired(true)),

	async execute(ctx: CommandInteraction) {
		// Defer Reply
		await ctx.interaction.deferReply()

		// Set Variables
		const address = ctx.getOption('address') as string
		const req = await axios({
			method: 'GET',
			url: `https://api.mcsrvstat.us/2/${encodeURIComponent(address)}`,
			validateStatus: false as any,
			headers: {}
		}); const info = req.data

		// Check if Server exists
		if (info.ip === '127.0.0.1') {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:CUBE:1024404832452350032> » MINECRAFT SERVER INFO')
				.setDescription(`» The Server **${address}** was not found!`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:CUBE:1024404832452350032> » MINECRAFT SERVER INFO')
					.setDescription(`» Der Server **${address}** wurde nicht gefunden!`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}

			// Send Message
			ctx.log(false, `[CMD] MCSRVINFO : ${address.toUpperCase()} : NOTEXIST`)
			return ctx.interaction.editReply({ embeds: [message] })
		}

		// Get Infos
		let status = '🟡 UNKNOWN'
		if ('online' in info && info.online) status = '🟢 ONLINE'
		if ('online' in info && !info.online) status = '🔴 OFFLINE'

		let players = { online: '?', slots: '?' }
		if ('players' in info) players = { online: info.players.online.toString(), slots: info.players.max.toString() }

		// Create Embed
		let message = new EmbedBuilder().setColor(0x37009B)
			.setTitle('<:CUBE:1024404832452350032> » MINECRAFT SERVER INFO')
			.setThumbnail(`https://api.mcsrvstat.us/icon/${encodeURIComponent(address)}`)
  		.setDescription(`
				${status}

				» IP
				\`\`\`${info.ip}:${info.port}\`\`\`
				» Players
				\`\`\`${players.online}/${players.slots}\`\`\`
			`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

		if (ctx.metadata.language === 'de') {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:CUBE:1024404832452350032> » MINECRAFT SERVER INFO')
				.setThumbnail(`https://api.mcsrvstat.us/icon/${encodeURIComponent(address)}`)
				.setDescription(`
					${status}

					» IP
					\`\`\`${info.ip}:${info.port}\`\`\`
					» Spieler
					\`\`\`${players.online}/${players.slots}\`\`\`
				`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
		}

		// Send Message
		ctx.log(false, `[CMD] MCSRVINFO : ${address.toUpperCase()}`)
		return ctx.interaction.editReply({ embeds: [message] })
	}
}