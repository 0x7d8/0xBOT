import { ctr as WebserverInterface } from "rjweb-server/interfaces"
import * as bot from "@functions/bot.js"
import * as api from "@functions/api.js"
import config from "@config"
import { Client } from "discord.js"
import { PoolClient } from "pg"

interface Custom {
	config: typeof config
	client: Client
	api: typeof api
	bot: typeof bot
	db: PoolClient
}

export default interface Webserver extends WebserverInterface<Custom> {
	error?: Error
}