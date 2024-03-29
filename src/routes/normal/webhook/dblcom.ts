import { HTTPRouteFile } from "@/interfaces/Webserver"

interface Body {
	id?: string
}

import { EmbedBuilder } from "discord.js"

export = {
	method: 'POST',
	path: '/webhook/dblcom',

	async code(ctr) {
		// Check Authorization
		if (ctr.headers.get('authorization') !== ctr['@'].config.web.keys.dbl.webkey) return ctr.status(401).print({ success: false, message: 'WRONG AUTHORIZATION' })
		if (!ctr.body.id) return

		const random = ctr['@'].bot.random(7500, 15000)

		// Calculate Extra
		let extra: number
		if ((await ctr['@'].bot.votes.get(ctr.body.id + '-A')+1) % 10 === 0) extra = ((await ctr['@'].bot.votes.get(ctr.body.id + '-A')+1) * 10000)/2

		// Create Embeds
		let message = new EmbedBuilder().setColor(0x37009B)
			.setTitle('» VOTING')
			.setDescription(`» Thanks for Voting! You got **\$${random}** from me :)\n» Danke fürs Voten! Du hast **${random}€** von mir erhalten :)`)
			.setFooter({ text: '» ' + ctr['@'].config.version })
		if (await ctr['@'].bot.language.get(ctr.body.id) === 'de') {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('» VOTING')
				.setDescription(`» Danke fürs Voten! Du hast **${random}€** von mir erhalten :)`)
				.setFooter({ text: '» ' + ctr['@'].config.version })
		} else {
			message = new EmbedBuilder().setColor(0x37009B)
				.setTitle('» VOTING')
				.setDescription(`» Thanks for Voting! You got **\$${random}** from me :)`)
				.setFooter({ text: '» ' + ctr['@'].config.version })
		}; let messageBonus = new EmbedBuilder().setColor(0x37009B)
			.setTitle('» VOTING')
			.setDescription(`» Thanks for Voting **${(await ctr['@'].bot.votes.get(ctr.body.id + '-A')) + 1}** times!\nAs A Gift I give you extra **\$${extra}**!`)
			.setFooter({ text: '» ' + ctr['@'].config.version })
		if (await ctr['@'].bot.language.get(ctr.body.id) === 'de') {
			messageBonus = new EmbedBuilder().setColor(0x37009B)
				.setTitle('» VOTING')
				.setDescription(`» Danke, dass du **${(await ctr['@'].bot.votes.get(ctr.body.id + '-A')) + 1}** mal gevotet hast!\nAls Geschenk gebe ich dir extra **${extra}€**!`)
				.setFooter({ text: '» ' + ctr['@'].config.version })
		}

		// Add Money
		await ctr['@'].bot.money.add(false, ctr.body.id, random)
		console.log(`[0xBOT] [i] [${new Date().toLocaleTimeString('en-US', { hour12: false })}] [WEB] VOTED : ${ctr.body.id} : ${random}€ : DBLCOM`)

		// Send Message
		ctr['@'].client.users.send(ctr.body.id, { embeds: [message] })

		// Count to Stats
		if ((await ctr['@'].bot.votes.get(ctr.body.id + '-A')+1) % 10 === 0) {
			ctr['@'].bot.money.add(false, ctr.body.id, extra)
			ctr['@'].client.users.send(ctr.body.id, { embeds: [messageBonus] })
		}; ctr['@'].bot.votes.add(ctr.body.id + '-A', 1)
		ctr['@'].bot.votes.set(ctr.body.id + '-T', Date.now())

		// Return Result
		return ctr.print({ success: true, message: 'VOTE RECIEVED' })
	}
} as HTTPRouteFile<Body>