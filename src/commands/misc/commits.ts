import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js"
import { SlashCommandBuilder, EmbedBuilder } from "discord.js"
import simpleGit from "simple-git"

const git = simpleGit()

import CommandInteraction from "@interfaces/CommandInteraction.js"
export default {
	data: new SlashCommandBuilder()
		.setName('commits')
		.setDMPermission(false)
		.setDescription('SEE ALL COMMITS')
		.setDescriptionLocalizations({
			de: 'SEHE ALLE COMMITS'
		}),

	async execute(ctx: CommandInteraction) {
		// Get all Commits
		let embedDesc = ''
		const gitInfos = await git.log({
			'--pretty': 'format:{"hash":"%h","subject":"%s","author":"%aN","authorDate":"%ad"}'
		}); const commits = gitInfos.all as any[]

		// Sort commits by authorDate
		commits.sort((a: { authorDate: string }, b: { authorDate: string }) => {
			const dateA = new Date(a.authorDate).getTime()
			const dateB = new Date(b.authorDate).getTime()
			return dateA - dateB
		})

		let index = 0
		commits.reverse().forEach((commit) => {
			commits[index++] = { ...commit, count: index }
		})

		// Get the start and end indices for the current page
		const startIndex = (Number((commits.length / 10).toFixed(0)) - 1) * 10
		const endIndex = Math.min(startIndex + 10, commits.length)

		// Iterate over the elements on the current page
		for (const element of commits.slice(startIndex, endIndex).reverse()) {
			const count = element.count
			let formattedCount = count.toString()
			if (count < 100) formattedCount = '0' + count
			if (count < 10) formattedCount = '00' + count
			embedDesc += `**\`${formattedCount}.\`** » ${element.message}\n`
		}

		// Create Buttons
		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setEmoji('1055826473442873385')
					.setCustomId(`COMMITS-REFRESH-${commits.length}`)
					.setStyle(ButtonStyle.Secondary),

				new ButtonBuilder()
					.setEmoji('1055825023987888169')
					.setCustomId(`COMMITS-BACK-${commits.length}-${(commits.length / 10).toFixed(0)}`)
					.setStyle(ButtonStyle.Secondary),

				new ButtonBuilder()
					.setEmoji('1055825050126786590')
					.setCustomId(`COMMITS-NEXT-${commits.length}-${(commits.length / 10).toFixed(0)}`)
					.setStyle(ButtonStyle.Secondary)
					.setDisabled(true),
			)
		
		// Create Embed
		let message = new EmbedBuilder().setColor(0x37009B)
			.setTitle('<:GLOBE:1024403680503529583> » GIT COMMITS')
  		.setDescription(embedDesc)
			.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version + ' » PAGE ' + (commits.length / 10).toFixed(0) })

		if (ctx.metadata.language === 'de') {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:GLOBE:1024403680503529583> » GIT COMMITS')
  			.setDescription(embedDesc)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version + ' » SEITE ' + (commits.length / 10).toFixed(0) })
		}

		// Send Message
		ctx.log(false, `[CMD] COMMITS : ${commits.length} : ${(commits.length / 10).toFixed(0)}`)
		return ctx.interaction.reply({ embeds: [message], components: [row as any] }).catch(() => {})
	}
}