import { Ctr as WebserverInterface, CtrFile as WebserverFile } from "rjweb-server/interfaces"
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

	/** Request User */ user: api.GetResponse
}

export default interface Webserver<Body = any, HasError = false> extends WebserverInterface<Custom, HasError, Body> {}
export interface ctrFile<Body = any> extends WebserverFile<Custom, Body> {}