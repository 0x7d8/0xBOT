import { ModalSubmitInteraction } from "discord.js"
import Client from "@interfaces/Client.js"
import * as bot from "@functions/bot.js"
import { PoolClient } from "pg"

export default interface Interface {
	interaction: ModalSubmitInteraction
	client: Client

	db: PoolClient
	bot: typeof bot
	log: (type: boolean, text: string) => void

	metadata: {
		vote: {
			text: string
			time: number
			valid: boolean
		}

		language: 'de' | 'en'
	}
}