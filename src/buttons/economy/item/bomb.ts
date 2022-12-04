import { EmbedBuilder, ButtonStyle } from "discord.js"

import * as bot from "@functions/bot.js"
import Client from "@interfaces/Client.js"
import { ButtonInteraction, Message } from "discord.js"
export default {
    data: {
        name: 'item-bomb'
    },

    async execute(interaction: ButtonInteraction, client: Client, lang: string, vote: string, solution: string, choice: string, solbutton: string, button: string, itemid: string, reciever: string) {
        // Check if User is Authorized
        if (interaction.user.id !== reciever) {
            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
            	.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  				.setDescription('» This choice is up to <@' + reciever + '>!')
            	.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
            	    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				    .setDescription('» Diese Frage ist für <@' + reciever + '>!')
            	    .setFooter({ text: '» ' + vote + ' » ' + client.config.version })
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] ITEMUSE : NOTSENDER')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Answer Timeout Function
        bot.bomb.delete('TIMEOUT-' + reciever + '-' + interaction.guild.id)

        // Edit Buttons
        {
            (interaction.message.components[0].components[0].data.disabled as boolean) = true;
            (interaction.message.components[0].components[1].data.disabled as boolean) = true;
            (interaction.message.components[0].components[2].data.disabled as boolean) = true;
            (interaction.message.components[0].components[3].data.disabled as boolean) = true;
            (interaction.message.components[0].components[parseInt(button)-1] as any).data.style = ButtonStyle.Danger;
            (interaction.message.components[0].components[parseInt(solbutton)-1] as any).data.style = ButtonStyle.Success;
        }

        // Create Embed
        let message
        if (solution == choice) {
            message = new EmbedBuilder().setColor(0x37009B)
            	.setTitle('<:BOXOPEN:1024395281460101213> » USE ITEM')
  		    	.setDescription('» <@' + reciever + '> has diffused the Bomb! YAY')
            	.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
            	    .setTitle('<:BOXOPEN:1024395281460101213> » GEGENSTAND NUTZEN')
  		    	    .setDescription('» <@' + reciever + '> hat die Bombe entschärft! YAY')
            	    .setFooter({ text: '» ' + vote + ' » ' + client.config.version })
            }
        } else {
            message = new EmbedBuilder().setColor(0x37009B)
            	.setTitle('<:BOXOPEN:1024395281460101213> » USE ITEM')
  		    	.setDescription('» <@' + reciever + '> has failed to diffuse the Bomb! OHNO')
            	.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
            	    .setTitle('<:BOXOPEN:1024395281460101213> » GEGENSTAND NUTZEN')
  		    	    .setDescription('» <@' + reciever + '> hat es nicht geschafft, die Bombe zu entschärfen! OH')
            	    .setFooter({ text: '» ' + vote + ' » ' + client.config.version })
            }
        }

        // Punish User if Lost
        const messages = bot.bomb.get('MESSAGES-' + reciever + '-' + interaction.guild.id)
        bot.bomb.delete('MESSAGES-' + reciever + '-' + interaction.guild.id)
        if (solution !== choice) {
            if (itemid === 'nbomb') {
                const member = await interaction.guild.members.fetch(interaction.user.id)
                member.timeout(15 * 1000, 'BOMB TIMEOUT FROM ' + interaction.user.id).catch(() => {})
            }
            if (itemid === 'mbomb') {
                const member = await interaction.guild.members.fetch(interaction.user.id)
                member.timeout(30 * 1000, 'BOMB TIMEOUT FROM ' + interaction.user.id).catch(() => {})
            }
            if (itemid === 'hbomb') {
                const member = await interaction.guild.members.fetch(interaction.user.id)
                member.timeout(45 * 1000, 'BOMB TIMEOUT FROM ' + interaction.user.id).catch(() => {})
            }
            if (itemid === 'cbomb') {
                const filtered = []
                let i = 0

                {(await messages).filter((m: Message) => {
                    if (m.author.id === interaction.user.id && 1 > i) {
                        filtered.push(m)
                        i++
                    }
                })}

                await interaction.channel.bulkDelete(filtered, true)
            }
        }

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] ITEMUSE : BOMB : ' + choice + ' : ' + solution)
        return interaction.update({ content: '', embeds: [message], components: interaction.message.components })
    }
}