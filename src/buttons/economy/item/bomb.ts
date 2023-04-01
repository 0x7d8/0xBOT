import { EmbedBuilder, ButtonStyle } from "discord.js"

import { ChannelType } from "discord.js"
import ButtonInteraction from "@/interfaces/ButtonInteraction"
export default {
	data: {
		name: 'item-bomb'
	},

	async execute(ctx: ButtonInteraction, solution: string, choice: string, solbutton: string, button: string, itemid: string, reciever: string) {
		// Check if Channel is wrong type
		if (ctx.interaction.channel.type === ChannelType.GuildStageVoice) return

		// Check if User is Authorized
		if (ctx.interaction.user.id !== reciever) {
			// Create Embed
			let message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  			.setDescription(`» This choice is up to <@${reciever}>!`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				.setDescription(`» Diese Frage ist für <@${reciever}>!`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
			
			// Send Message
			ctx.log(false, `[BTN] ITEMUSE : NOTSENDER`)
			return ctx.interaction.reply({ embeds: [message], ephemeral: true })
		}

		// Answer Timeout Function
		ctx.bot.bomb.delete('TIMEOUT-' + reciever + '-' + ctx.interaction.guild.id)

		// Edit Buttons
		ctx.components.rows[0].components[0].setDisabled(true)
		ctx.components.rows[0].components[1].setDisabled(true)
		ctx.components.rows[0].components[2].setDisabled(true)
		ctx.components.rows[0].components[3].setDisabled(true)
		ctx.components.rows[0].components[Number(button)-1].setStyle(4)
		ctx.components.rows[0].components[Number(solbutton)-1].setStyle(3)

		// Create Embed
		let message: EmbedBuilder
		if (solution === choice) {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:BOXOPEN:1024395281460101213> » USE ITEM')
  			.setDescription(`» <@${reciever}> has diffused the Bomb! YAY`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:BOXOPEN:1024395281460101213> » GEGENSTAND NUTZEN')
  				.setDescription(`» <@${reciever}> hat die Bombe entschärft! YAY`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
		} else {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('<:BOXOPEN:1024395281460101213> » USE ITEM')
  			.setDescription(`» <@${reciever}> has failed to diffuse the Bomb! OHNO`)
				.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })

			if (ctx.metadata.language === 'de') {
				message = new EmbedBuilder().setColor(0x37009B)
					.setTitle('<:BOXOPEN:1024395281460101213> » GEGENSTAND NUTZEN')
  				.setDescription(`» <@${reciever}> hat es nicht geschafft, die Bombe zu entschärfen! OH`)
					.setFooter({ text: '» ' + ctx.metadata.vote.text + ' » ' + ctx.client.config.version })
			}
		}

		// Punish User if Lost
		const messages = ctx.bot.bomb.get('MESSAGES-' + reciever + '-' + ctx.interaction.guild.id)
		ctx.bot.bomb.delete('MESSAGES-' + reciever + '-' + ctx.interaction.guild.id)
		if (solution !== choice) {
			if (itemid === 'nbomb') {
				const member = await ctx.interaction.guild.members.fetch(ctx.interaction.user.id)
				member.timeout(15 * 1000, `BOMB TIMEOUT FROM ${ctx.interaction.user.id}`).catch(() => {})
			}; if (itemid === 'mbomb') {
				const member = await ctx.interaction.guild.members.fetch(ctx.interaction.user.id)
				member.timeout(30 * 1000, `BOMB TIMEOUT FROM ${ctx.interaction.user.id}`).catch(() => {})
			}; if (itemid === 'hbomb') {
				const member = await ctx.interaction.guild.members.fetch(ctx.interaction.user.id)
				member.timeout(45 * 1000, `BOMB TIMEOUT FROM ${ctx.interaction.user.id}`).catch(() => {})
			}; if (itemid === 'cbomb') {
				const filtered = []
				let i = 0

				{(await messages).filter((m: any) => {
					if (m.author.id === ctx.interaction.user.id && 1 > i) {
						filtered.push(m)
						i++
					}
				})}

				await ctx.interaction.channel.bulkDelete(filtered, true)
			}
		}

		// Send Message
		ctx.log(false, `[BTN] ITEMUSE : BOMB : ${choice} : ${solution}`)
		return ctx.interaction.update({ content: '', embeds: [message], components: (ctx.components.getAPI()) })
	}
}