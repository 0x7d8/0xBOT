import { CommandInteraction } from "discord.js"
import Client from "@interfaces/Client.js"
import * as bot from "@functions/bot.js"
import { PoolClient } from "pg"
import { UserControl } from "@/models/User"

export default interface Interface {
	interaction: CommandInteraction
	client: Client
	user: UserControl

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