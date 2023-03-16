import { HTTPRequestContext, RouteFile as HTTPFile } from "rjweb-server"
import * as bot from "@/functions/bot"
import * as api from "@/functions/api"
import config from "@config"
import { Client } from "discord.js"
import { PoolClient } from "pg"

interface Custom {
	config: typeof config
	client: Client
	api: typeof api
	bot: typeof bot
	db: PoolClient

	user: api.GetResponse
}

export type HTTPContext<Body = any> = HTTPRequestContext<Custom, Body>
export type HTTPRouteFile<Body = any> = HTTPFile<Custom, Body>