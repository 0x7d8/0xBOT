import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

import * as bot from "@functions/bot.js"
import Client from "@interfaces/Client.js"
import { CommandInteraction } from "discord.js"
export default {
    data: new SlashCommandBuilder()
        .setName('mcsrvinfo')
    	.setDMPermission(false)
        .setDescription('GET INFO ABOUT A MINECRAFT SERVER')
        .setDescriptionLocalizations({
            de: 'BEKOMME INFO ÜBER EINEN MINECRAFT SERVER'
        })
        .addStringOption((option: any) =>
            option.setName('address')
                .setNameLocalizations({
                    de: 'adresse'
                })
                .setDescription('THE ADDRESS')
                .setDescriptionLocalizations({
                    de: 'DIE ADRESSE'
                })
                .setRequired(true)),

    async execute(interaction: CommandInteraction, client: Client, lang: string, vote: string) {
        const axios = (await import('axios')).default

        // Defer Reply
        await interaction.deferReply()

        // Set Variables
        const address = bot.getOption(interaction, 'address') as string
        const req = await axios({
            method: 'GET',
            url: `https://api.mcsrvstat.us/2/${encodeURIComponent(address)}`,
            validateStatus: false as any,
            headers: {}
        }); const info = req.data

        // Check if Server exists
        if (info.ip === '127.0.0.1') {
            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
                .setTitle('<:CUBE:1024404832452350032> » MINECRAFT SERVER INFO')
                .setDescription(`» The Server **${address}** was not found!`)
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version })

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:CUBE:1024404832452350032> » MINECRAFT SERVER INFO')
                    .setDescription(`» Der Server **${address}** wurde nicht gefunden!`)
                    .setFooter({ text: '» ' + vote + ' » ' + client.config.version })
            }

            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] MCSRVINFO : ' + address.toUpperCase() + ' : NOTEXIST')
            return interaction.editReply({ embeds: [message] })
        }

        // Get Infos
        let status = '🟡 UNKNOWN'
        if ('online' in info && info.online) status = '🟢 ONLINE'
        if ('online' in info && !info.online) status = '🔴 OFFLINE'

        let players = { online: '?', slots: '?' }
        if ('players' in info) players = { online: info.players.online.toString(), slots: info.players.max.toString() }

        // Create Embed
        let message = new EmbedBuilder().setColor(0x37009B)
        	.setTitle('<:CUBE:1024404832452350032> » MINECRAFT SERVER INFO')
            .setThumbnail(`https://api.mcsrvstat.us/icon/${encodeURIComponent(address)}`)
  			.setDescription(`${status}\n\n» IP\n\`${info.ip}:${info.port}\`\n\n» Players\n\`${players.online}/${players.slots}\``)
            .setFooter({ text: '» ' + vote + ' » ' + client.config.version })

        if (lang === 'de') {
            message = new EmbedBuilder().setColor(0x37009B)
        	    .setTitle('<:CUBE:1024404832452350032> » MINECRAFT SERVER INFO')
                .setThumbnail(`https://api.mcsrvstat.us/icon/${encodeURIComponent(address)}`)
                .setDescription(`${status}\n\n» IP\n\`${info.ip}:${info.port}\`\n\n» Spieler\n\`${players.online}/${players.slots}\``)
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version })
        }

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] MCSRVINFO : ' + address.toUpperCase())
        return interaction.editReply({ embeds: [message] })
    }
}