import { CommandInteraction, Client } from "discord.js"

export default interface Interface {
    data: {
        name: string
        description: string
        options: any
        toJSON: () => object
    }
    execute: (client: Client, interaction: CommandInteraction) => void
}