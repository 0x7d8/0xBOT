import ButtonInteraction from "@interfaces/ButtonInteraction.js"
export default {
	data: {
		name: 'poll'
	},

	async execute(ctx: ButtonInteraction, choice: string) {
		// Get Choices
		const cache = ctx.interaction.message.components[0]
		let yes = Number(((cache.components[0] as any).data.label.split(' ['))[0])
		let no = Number(((cache.components[1] as any).data.label.split(' ['))[0])

		// Count Choice
		const dbChoice = await ctx.bot.polls.get(ctx.interaction.message.id, ctx.interaction.user.id)
		if (dbChoice === '') {
			if (choice === 'yes') yes++
			if (choice === 'no') no++

			ctx.bot.polls.set(ctx.interaction.message.id, ctx.interaction.user.id, (choice === 'yes'))
		} else {
			if ((choice === 'yes') === dbChoice) {
				if (dbChoice) yes--
				if (!dbChoice) no--

				ctx.bot.polls.del(ctx.interaction.message.id, ctx.interaction.user.id)
			} else {
				if (dbChoice) yes--
				if (!dbChoice) no--

				if (choice === 'yes') yes++
				if (choice === 'no') no++

				ctx.bot.polls.set(ctx.interaction.message.id, ctx.interaction.user.id, (choice === 'yes'))
			}
		}

		// Edit Buttons
		if (yes + no === 0) {
			(ctx.interaction.message.components[0].components[0] as any).data.label = `0 [0%]`;
			(ctx.interaction.message.components[0].components[1] as any).data.label = `0 [0%]`;
		} else {
			(ctx.interaction.message.components[0].components[0] as any).data.label = `${yes} [${Math.round(100 * yes / (yes + no))}%]`;
			(ctx.interaction.message.components[0].components[1] as any).data.label = `${no} [${Math.round(100 * no / (yes + no))}%]`;
		}

		// Send Message
		ctx.log(false, `[BTN] POLL : ${choice.toUpperCase()}`)
		return ctx.interaction.update({ components: ctx.interaction.message.components })
	}
}