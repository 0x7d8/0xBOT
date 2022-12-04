import { Client } from "discord.js"
import config from "@config"

export default interface Interface extends Client {
    commands?: any
    buttons?: any
    modals?: any

    config?: typeof config
    stocks?: {
        refresh?: number

        green: number
        oldgreen?: number

        blue: number
        oldblue?: number

        yellow: number
        oldyellow?: number

        red: number
        oldred?: number

        white: number
        oldwhite?: number

        black: number
        oldblack?: number
    }
}