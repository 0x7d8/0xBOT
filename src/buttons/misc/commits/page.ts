import { EmbedBuilder } from "discord.js"
import simpleGit from "simple-git"

const git = simpleGit()

import ButtonInteraction from "@interfaces/ButtonInteraction.js"
export default {
	data: {
		name: 'commits-page'
	},

	async execute(ctx: ButtonInteraction, commitCount: number, pageNumber: number, type: 'back' | 'next') {
		// Set Variables
		if (type === 'back') pageNumber--
		if (type === 'next') pageNumber++

		// Check for Invalid Value
    if (pageNumber === 0) return

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
		}); if (commits.length - commitCount > 0) commits.splice(commitCount, commits.length - commitCount)

		// Get the start and end indices for the current page
		const startIndex = (pageNumber - 1) * 10
		const endIndex = Math.min(startIndex + 10, commits.length)

		// Iterate over the elements on the current page
		for (const element of commits.slice(startIndex, endIndex).reverse()) {
			const count = element.count
			let formattedCount = count.toString()
			if (count < 100) formattedCount = '0' + count
			if (count < 10) formattedCount = '00' + count
			embedDesc += `**\`${formattedCount}.\`** » ${element.message}\n`
		}

		// Edit Buttons
		ctx.components.rows[0].components[0].setCustomId(`COMMITS-REFRESH-${commitCount}-${pageNumber}`)
		ctx.components.rows[0].components[1].setCustomId(`COMMITS-BACK-${commitCount}-${pageNumber}`)
		ctx.components.rows[0].components[2].setCustomId(`COMMITS-NEXT-${commitCount}-${pageNumber}`)
		if (!ctx.components.rows[0].components[1].data.disabled && pageNumber <= 1) ctx.components.rows[0].components[1].setDisabled(true)
		else ctx.components.rows[0].components[1].setDisabled(false)
		if (!ctx.components.rows[0].components[2].data.disabled && pageNumber >= Math.ceil(commits.length / 10)) ctx.components.rows[0].components[2].setDisabled(true)
		else ctx.components.rows[0].components[2].setDisabled(false)

		// Create Embed
		let message = new EmbedBuilder().setColor(0x37009B)
			.setTitle('<:GLOBE:1024403680503529583> » GIT COMMITS')
			.setDescription(embedDesc)
			.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version + ' » PAGE ' + pageNumber })

		if (ctx.metadata.language === 'de') {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:GLOBE:1024403680503529583> » GIT COMMITS')
				.setDescription(embedDesc)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version + ' » SEITE ' + pageNumber })
		}

		// Send Message
		ctx.log(false, `[BTN] COMMITS : ${type.toUpperCase()} : ${commits.length} : ${pageNumber}`)
		return ctx.interaction.update({ embeds: [message], components: (ctx.components.getAPI()) })
	}
}