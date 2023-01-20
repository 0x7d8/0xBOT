import { EmbedBuilder } from "discord.js"

import { default as axios } from "axios"

import ButtonInteraction from "@interfaces/ButtonInteraction.js"
export default {
	data: {
		name: 'showerthought'
	},

	async execute(ctx: ButtonInteraction, type: string) {
		// Check if Showerthought is Enabled in Server
		if (!await ctx.bot.settings.get(ctx.interaction.guild.id, 'showerthought')) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
				.setDescription(`» The **\`/showerthought\`** Command is disabled on this Server!`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
					.setDescription(`» Der **\`/showerthought\`** Befehl ist auf diesem Server deaktiviert!`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}

			// Send Message
			ctx.log(false, `[BTN] SHOWERTHOUGHT : DISABLED`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Defer Reply
		await ctx.interaction.deferUpdate()

		// Get Initial Showerthought
		const req = await axios.get(`https://www.reddit.com/r/Showerthoughts/random/.json`)
		const res = req.data

		let upvotes = res[0].data.children[0].data.ups

		// 187 Easter Egg
		if (upvotes === 187) upvotes += ' 🐊'

		// Edit Buttons
		ctx.components.rows[0].components[1].setLabel(String(upvotes))
		
		// Create Embed
		let message = new EmbedBuilder().setColor(0x37009B)
			.setTitle('<:IMAGE:1024405297579696179> » SHOWERTHOUGHT')
			.setDescription(`
				» Thought
				\`\`\`${res[0].data.children[0].data.title}\`\`\`
			`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

		if (ctx.metadata.language === 'de') {
			const germanThought = (await axios({
				method: 'POST',
				url: 'https://api-free.deepl.com/v2/translate',
				headers: {
					"Authentication": `DeepL-Auth-Key ${ctx.client.config.keys.deepl}`,
					"User-Agent": `0xBOT/${ctx.client.config.version}`,
					"Content-Type": 'application/x-www-form-urlencoded'
				}, data: `auth_key=${ctx.client.config.keys.deepl}&text=${encodeURIComponent(res[0].data.children[0].data.title)}&target_lang=DE`
			})).data
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:IMAGE:1024405297579696179> » DUSCH-PHILOSOPHIE')
				.setDescription(`
					» Gedanke
					\`\`\`${germanThought.translations[0].text}\`\`\`
				`).setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
		}
		
		// Send Message
		ctx.log(false, `[BTN] SHOWERTHOUGHT : ${upvotes}^`)
		return ctx.interaction.editReply({ embeds: [message], components: (ctx.components.getAPI()) })
	}
}