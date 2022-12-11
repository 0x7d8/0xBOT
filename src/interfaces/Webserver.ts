import WebserverInterface from "rjweb-server/interfaces/ctr.js"
import * as bot from "@functions/bot.js"
import * as api from "@functions/api.js"
import config from "@config"
import { Client } from "discord.js"
import { default as pg } from "pg"
const db = new pg.Pool({
	host: config.database.oxbot.host,
	database: config.database.oxbot.database,
	user: config.database.oxbot.username,
	password: config.database.oxbot.password,
	port: 5432,
	ssl: true
})

export default interface Webserver extends WebserverInterface {
	config: typeof config
	client: Client
	api: typeof api
	bot: typeof bot
	db: typeof db
}