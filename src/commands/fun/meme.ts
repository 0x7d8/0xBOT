import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import * as bot from "@functions/bot.js"
import Client from "@interfaces/Client.js"
import { CommandInteraction } from "discord.js"
export default {
    data: new SlashCommandBuilder()
        .setName('meme')
    	.setDMPermission(false)
        .setDescription('GET A MEME')
        .setDescriptionLocalizations({
            de: 'BEKOMME EIN MEME'
        }),

    async execute(interaction: CommandInteraction, client: Client, lang: string, vote: string) {
        const axios = (await import('axios')).default

        // Check if Meme is Enabled in Server
        if (!await bot.settings.get(interaction.guild.id, 'meme')) {
            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» The **`/meme`** Command is disabled on this Server!')
        		.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Der **`/meme`** Befehl ist auf diesem Server deaktiviert!')
        		    .setFooter({ text: '» ' + vote + ' » ' + client.config.version })
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] MEME : DISABLED')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Set Variables
        const result = bot.random(1, 4)

        // Set Subreddit
        let subreddit: string
        if (result === 1) subreddit = 'memes'
        if (result === 2) subreddit = 'me_irl'
        if (result === 3) subreddit = 'CrappyDesign'
        if (result === 4) subreddit = 'Gittertiere'

        // Get Initial Meme
        const req = await axios.get(`https://www.reddit.com/r/${subreddit}/random/.json`)
        const random = req.data

        let upvotes = random[0].data.children[0].data.ups
        let comments = random[0].data.children[0].data.num_comments

        // 187 Easter Egg
        if (upvotes === 187) upvotes = upvotes + ' 🐊'
        if (comments === 187) comments = comments + ' 🐊'
        
        // Create Embed
        let message = new EmbedBuilder().setColor(0x37009B)
            .setTitle(`<:IMAGE:1024405297579696179> » ${random[0].data.children[0].data.title.toUpperCase()}`)
            .setDescription('» SUBREDDIT:\n`r/' + subreddit + '`\n\n» UPVOTES:\n`' + upvotes + '`\n\n» COMMENTS:\n`' + comments + '`')
            .setImage(random[0].data.children[0].data.url)
        	.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

        if (lang === 'de') {
            message = new EmbedBuilder().setColor(0x37009B)
                .setTitle(`<:IMAGE:1024405297579696179> » ${random[0].data.children[0].data.title.toUpperCase()}`)
                .setDescription('» SUBREDDIT:\n`r/' + subreddit + '`\n\n» UPVOTES:\n`' + upvotes + '`\n\n» KOMMENTARE:\n`' + comments + '`')
                .setImage(random[0].data.children[0].data.url)
        	    .setFooter({ text: '» ' + vote + ' » ' + client.config.version })
        }
        
        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] MEME : ' + subreddit.toUpperCase() + ' : ' + upvotes + '^ : ' + comments)
        return interaction.reply({ embeds: [message] })
    }
}