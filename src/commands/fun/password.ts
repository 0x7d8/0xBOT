import { SlashCommandBuilder, EmbedBuilder } from "discord.js"
import * as utils from "rjutils-collection"

import * as bot from "@functions/bot.js"
import Client from "@interfaces/Client.js"
import { CommandInteraction } from "discord.js"
export default {
    data: new SlashCommandBuilder()
        .setName('password')
    	.setDMPermission(false)
        .setDescription('GENERATE A PASSWORD')
        .setDescriptionLocalizations({
            de: 'GENERIERE EIN PASSWORT'
        })
        .addIntegerOption((option: any) =>
            option.setName('length')
                .setNameLocalizations({
                    de: 'länge'
                })
                .setDescription('THE length')
                .setDescriptionLocalizations({
                    de: 'DIE LÄNGE'
                })
                .setRequired(true)),

    async execute(interaction: CommandInteraction, client: Client, lang: string, vote: string) {
        // Set Variables
        const length = bot.getOption(interaction, 'length') as number

        // Check length
        if (length > 256) {

            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» The Maximum Size is **256**!')
        		.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Die Maximale Größe ist **128**!')
        		    .setFooter({ text: '» ' + vote + ' » ' + client.config.version })
            }
            
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] PASSWORD : TOOBIG : ' + length)
            return interaction.reply({ embeds: [message], ephemeral: true })

        }

        if (length < 4) {

            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» The Minimum Size is **4**!')
        		.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Die Minimale Größe ist **4**!')
        		    .setFooter({ text: '» ' + vote + ' » ' + client.config.version })
            }
            
            bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] PASSWORD : TOOSMALL : ' + length)
            return interaction.reply({ embeds: [message], ephemeral: true })

        }

        // Generate Password
        const password = utils.randomStr({
            numbers: true,
            uppercase: true,
            symbols: false,
            length
        })
        
        // Create Embed
        let message = new EmbedBuilder().setColor(0x37009B)
        	.setTitle('<:KEY:1024392167130664980> » GENERATE PASSWORD')
  			.setDescription('» This is the Password I choose:\n`' + password + '`')
        	.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

        if (lang === 'de') {
            message = new EmbedBuilder().setColor(0x37009B)
        	    .setTitle('<:KEY:1024392167130664980> » PASSWORT GENERIEREN')
  			    .setDescription('» Das hier ist mein ausgedachtes Passwort:\n`' + password + '`')
        	    .setFooter({ text: '» ' + vote + ' » ' + client.config.version })
        }

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[CMD] PASSWORD : ' + length + ' : SUCCESS')
        return interaction.reply({ embeds: [message], ephemeral: true })
    }
}