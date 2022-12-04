import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import * as bot from "@functions/bot.js"
import Client from "@interfaces/Client.js"
import { CommandInteraction } from "discord.js"
export default {
    data: new SlashCommandBuilder()
        .setName('version')
    	.setDMPermission(false)
        .setDescription('THE BOT VERSION')
        .setDescriptionLocalizations({
            de: 'DIE BOT VERSION'
        }),

    async execute(interaction: CommandInteraction, client: Client, lang: string, vote: string) {
        // Create Embed
        let message = new EmbedBuilder().setColor(0x37009B)
        		.setTitle('<:GEAR:1024404241701417011> » BOT VERSION')
        		.setDescription('» VERSION\n`' + client.config.version + ' (V3)`\n\n» FRAMEWORK\n`discord.js v14 (14.6.0)`\n\n» AUTHOR\n`0x4096#7678`')
        		.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

        if (lang === 'de') {
            message = new EmbedBuilder().setColor(0x37009B)
        		.setTitle('<:GEAR:1024404241701417011> » BOT VERSION')
        		.setDescription('» VERSION\n`' + client.config.version + ' (V3)`\n\n» FRAMEWORK\n`discord.js v14 (14.6.0)`\n\n» AUTOR\n`0x4096#7678`')
        		.setFooter({ text: '» ' + vote + ' » ' + client.config.version })
        }

        // Send Correct Response
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] VERSION')
        return interaction.reply({ embeds: [message], ephemeral: true })
    }
}