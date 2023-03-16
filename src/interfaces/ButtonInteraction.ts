import { ButtonInteraction, ButtonBuilder, ActionRowData } from "discord.js"
import Client from "@/interfaces/Client"
import * as bot from "@/functions/bot"
import { PoolClient } from "pg"

export default interface Interface {
	interaction: ButtonInteraction
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

	components: {
		rows: {
			components: ButtonBuilder[]
		}[]
		getAPI: () => ActionRowData<any>[]
	}
}