import { SlashCommandBuilder, EmbedBuilder } from "discord.js"
import { AttachmentBuilder } from "discord.js"

import CommandInteraction from "@interfaces/CommandInteraction.js"
export default {
	data: new SlashCommandBuilder()
		.setName('level')
		.setDMPermission(false)
		.setDescription('VIEW THE LEVELS')
		.setDescriptionLocalizations({
			de: 'SEHE DIE LEVEL'
		})
		.addUserOption((option: any) =>
			option.setName('user')
				.setNameLocalizations({
					de: 'nutzer'
				})
				.setDescription('THE USER')
				.setDescriptionLocalizations({
					de: 'DER NUTZER'
				})
				.setRequired(false)),

	async execute(ctx: CommandInteraction) {
		const canvas = (await import('canvacord')).default

		// Check if Levels are Enabled in Server
		if (!await ctx.bot.settings.get(ctx.interaction.guild.id, 'levels')) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
				.setDescription('» The Level System is disabled on this Server!')
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
					.setDescription('» Das Level System ist auf diesem Server deaktiviert!')
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
			
			// Send Message
			ctx.log(false, `[CMD] LEVEL : DISABLED`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Set Variables
		const user = ctx.interaction.options.getUser('user')
		let userobj: any
		if (!user) userobj = ctx.interaction.user
		else userobj = user

		// Defer Reply
		await ctx.interaction.deferReply()
		
		// Set User ID
		const counts: number[] = []
		if (!user) {
			counts.push(await ctx.bot.stat.get('u-' + ctx.interaction.user.id + '-' + ctx.interaction.guild.id + '-C', 'msg'))
			counts.push(await ctx.bot.stat.get('u-' + ctx.interaction.user.id + '-' + ctx.interaction.guild.id + '-A', 'msg'))
			ctx.log(false, `[CMD] LEVEL : ${counts[0]}`)
		} else {
			counts.push(await ctx.bot.stat.get('u-' + user.id + '-' + ctx.interaction.guild.id + '-C', 'msg'))
			counts.push(await ctx.bot.stat.get('u-' + user.id + '-' + ctx.interaction.guild.id + '-A', 'msg'))
			ctx.log(false, `[CMD] LEVEL : ${user.id} : ${counts[0]}`)
		}

		// Calculate Level
		const XP = Math.round(counts[0] / 5)
		let level = 0, levelXP = XP
		while (levelXP >= 500) {
			level++; levelXP -= 500
		}

		// Generate ctx.metadata.languageuage Text
		let totalxp = 'TOTAL XP'
		if (ctx.metadata.language === 'de') totalxp = 'ALLE XP'

		// Generate Rank Image
		const rankCard = new canvas.Rank()
			.setAvatar(userobj.displayAvatarURL({ format: 'png' }))
			.setCurrentXP(levelXP)
			.setRequiredXP(500)
			.setProgressBar('#90CDF4', 'COLOR')
			.setUsername(userobj.username)
			.setDiscriminator(userobj.discriminator)
			.setOverlay('#00000000')
			.setBackground('COLOR', '#00000000')
			.setProgressBarTrack('#413E4D')
			.setLevel(level, 'LEVEL ', true)
			.setRank(XP, totalxp, true)

		let attachment: any
		const buildCard = async() => {
			await rankCard.build()
				.then((data: any) => {
					attachment = new AttachmentBuilder(data, { name: 'rank.png', description: 'Rank Card Image' })
				}); return
		}; await buildCard()
		
		// Create Embed
		let message: any
		if (!user) {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:GLOBE:1024403680503529583> » YOUR LEVEL')
				.setImage('attachment://rank.png')
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:GLOBE:1024403680503529583> » DEIN LEVEL')
					.setImage('attachment://rank.png')
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
		} else {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:GLOBE:1024403680503529583> » THE LEVEL OF ' + user.username.toUpperCase())
				.setImage('attachment://rank.png')
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:GLOBE:1024403680503529583> » DAS LEVEL VON ' + user.username.toUpperCase())
  					.setImage('attachment://rank.png')
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
		}

		// Send Message
		return ctx.interaction.editReply({ embeds: [message], files: [attachment] })
	}
}