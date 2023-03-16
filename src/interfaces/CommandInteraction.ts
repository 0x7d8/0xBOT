import { CommandInteraction } from "discord.js"
import Client from "@/interfaces/Client"
import * as bot from "@/functions/bot"
import { PoolClient } from "pg"

export default interface Interface {
	interaction: CommandInteraction
	client: Client

	db: PoolClient
	bot: typeof bot
	log: (type: boolean, text: string) => void
	getOption: (option: string) => string | number | null

	metadata: {
		vote: {
			text: string
			time: number
			valid: boolean
		}

		language: 'de' | 'en'
	}
}