import { ctr as WebserverInterface } from "rjweb-server/interfaces"
import * as bot from "@functions/bot.js"
import * as api from "@functions/api.js"
import config from "@config"
import { Client } from "discord.js"
import { PoolClient } from "pg"

export default interface Webserver extends WebserverInterface {
	error: Error
	config: typeof config
	client: Client
	api: typeof api
	bot: typeof bot
	db: PoolClient
}