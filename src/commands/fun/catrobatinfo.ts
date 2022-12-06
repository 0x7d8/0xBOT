import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import * as bot from "@functions/bot.js"
import Client from "@interfaces/Client.js"
import { CommandInteraction } from "discord.js"
export default {
    data: new SlashCommandBuilder()
        .setName('catrobatinfo')
    	.setDMPermission(false)
        .setDescription('GET INFO ABOUT A CATROBAT PROJECT')
        .setDescriptionLocalizations({
            de: 'BEKOMME INFO ÜBER EIN CATROBAT PROJEKT'
        })
        .addStringOption((option: any) =>
            option.setName('id')
                .setDescription('THE ID')
                .setDescriptionLocalizations({
                    de: 'DIE ID'
                })
                .setRequired(true)),

    async execute(interaction: CommandInteraction, client: Client, lang: string, vote: string) {
        const axios = (await import('axios')).default

        // Set Variables
        const id = bot.getOption(interaction, 'id') as string
        const req = await axios({
            method: 'GET',
            url: `https://share.catrob.at/api/project/${id}`,
            validateStatus: false as any,
            headers: {}
        }); const info = req.data

        // Check if Project exists
        if (req.status !== 200) {
            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
                .setTitle('<:CUBE:1024404832452350032> » CATROBAT PROJECT INFO')
                .setDescription(`» The Project **${id}** was not found!`)
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version })

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:CUBE:1024404832452350032> » CATROBAT PROJEKT INFO')
                    .setDescription(`» Das Projekt **${id}** wurde nicht gefunden!`)
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version })
            }

            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] CATROBATINFO : ' + id.toUpperCase() + ' : NOTEXIST')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Create Embed
        let message = new EmbedBuilder().setColor(0x37009B)
        	.setTitle('<:CUBE:1024404832452350032> » CATROBAT PROJECT INFO')
            .setThumbnail(info.screenshot_small)
  			.setDescription(`${info.name}\n\n» Description\n\`${info.description.replace('`', '"')}\`\n\n» Size\n\`${Number(info.filesize).toFixed(2)}MB\``)
            .setFooter({ text: '» ' + vote + ' » ' + client.config.version })

        if (lang === 'de') {
            message = new EmbedBuilder().setColor(0x37009B)
        	    .setTitle('<:CUBE:1024404832452350032> » CATOBAT PROJEKT INFO')
                .setThumbnail(info.screenshot_small)
                .setDescription(`${info.name}\n\n» Beschreibung\n\`${info.description.replace('`', '"')}\`\n\n» Größe\n\`${Number(info.filesize).toFixed(2)}MB\``)
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version })
        }

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] CATROBATINFO : ' + id.toUpperCase())
        return interaction.reply({ embeds: [message] })
    }
}