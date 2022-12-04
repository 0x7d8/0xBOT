import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

// Connect to Database
import config from "@config"
import { default as pg } from "pg"
const db = new pg.Pool({
    host: config.database.oxbot.host,
    database: config.database.oxbot.database,
    user: config.database.oxbot.username,
    password: config.database.oxbot.password,
    port: 5432,
    ssl: true
})

import * as bot from "@functions/bot.js"
import Client from "@interfaces/Client.js"
import { CommandInteraction } from "discord.js"
export default {
    data: new SlashCommandBuilder()
        .setName('leveltop')
    	.setDMPermission(false)
        .setDescription('SEE THE TOP LEVELS')
        .setDescriptionLocalizations({
            de: 'SEHE DIE TOP LEVEL'
        }),

    async execute(interaction: CommandInteraction, client: Client, lang: string, vote: string) {
        // Defer Reply
        await interaction.deferReply()

        // Get Top Money
        let embedDesc = ''; let count = 0
        const rawvalues = await db.query(`select * from stats where name like $1 and type = 'msg' order by value desc;`, ['%' + interaction.guild.id + '-C'])
        for (const element of rawvalues.rows) {
            count++
            let formattedcount = count.toString()

            const cache = element.name.split('-')
            // Calculate Level
            const XP = Math.round(element.value / 5)
            let level = 0, levelXP = XP
            while (levelXP >= 500) {
                level++; levelXP -= 500
            }

            if (count < 10) formattedcount = '0' + count
            if (cache[1] !== interaction.user.id) embedDesc += `\`${formattedcount}.\` » <@${cache[1]}> (**LVL ${level}, ${XP} XP**)\n`
            else embedDesc += `**\`${formattedcount}.\`** » <@${cache[1]}> (**LVL ${level}, ${XP} XP**)\n`
        }; if (embedDesc === '') { embedDesc = 'Nothing to Display.'; if (lang === 'de') { embedDesc = 'Nichts zum Anzeigen.' } }
        
        // Create Embed
        let message = new EmbedBuilder().setColor(0x37009B)
        	.setTitle('<:GLOBE:1024403680503529583> » TOP LEVELS')
  			.setDescription(embedDesc)
        	.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

        if (lang === 'de') {
            message = new EmbedBuilder().setColor(0x37009B)
        	    .setTitle('<:GLOBE:1024403680503529583> » TOP LEVEL')
  			    .setDescription(embedDesc)
        	    .setFooter({ text: '» ' + vote + ' » ' + client.config.version })
        }

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] LEVELTOP')
        return interaction.editReply({ embeds: [message] }).catch(() => {})
    }
}