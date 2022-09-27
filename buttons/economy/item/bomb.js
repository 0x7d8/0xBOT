const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { EmbedBuilder } = require('@discordjs/builders');
const { version } = require('../../../config.json');

module.exports = {
    data: {
        name: 'item-bomb'
    },
    async execute(interaction, client, lang, vote, solution, choice, solbutton, button, itemid, reciever) {
        // Check if User is Authorized
        if (interaction.user.id !== reciever) {
            // Create Embed
            let message = new EmbedBuilder()
            	.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
  				.setDescription('» This choice is up to <@' + reciever + '>!')
            	.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang == "de") {
                message = new EmbedBuilder()
            	    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
  				    .setDescription('» Diese Frage ist für <@' + reciever + '>!')
            	    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] ITEMUSE : NOTSENDER')
            return interaction.reply({ embeds: [message.toJSON()], ephemeral: true })
        }

        // Answer Timeout Function
        eval('delete bombtf' + interaction.user.id)

        // Edit Buttons
        interaction.message.components[0].components[0].data.disabled = true
        interaction.message.components[0].components[1].data.disabled = true
        interaction.message.components[0].components[2].data.disabled = true
        interaction.message.components[0].components[3].data.disabled = true
        interaction.message.components[0].components[parseInt(button)-1].data.style = ButtonStyle.Danger
        interaction.message.components[0].components[parseInt(solbutton)-1].data.style = ButtonStyle.Success

        // Create Embed
        let message
        if (solution == choice) {
            message = new EmbedBuilder()
            	.setTitle('<:BOXOPEN:1024395281460101213> » USE ITEM')
  		    	.setDescription('» <@' + reciever + '> has diffused the Bomb! YAY')
            	.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang == "de") {
                message = new EmbedBuilder()
            	    .setTitle('<:BOXOPEN:1024395281460101213> » GEGENSTAND NUTZEN')
  		    	    .setDescription('» <@' + reciever + '> hat die Bombe entschärft! YAY')
            	    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
        } else {
            message = new EmbedBuilder()
            	.setTitle('<:BOXOPEN:1024395281460101213> » USE ITEM')
  		    	.setDescription('» <@' + reciever + '> has failed to diffused the Bomb! OHNO')
            	.setFooter({ text: '» ' + vote + ' » ' + version });

            if (lang == "de") {
                message = new EmbedBuilder()
            	    .setTitle('<:BOXOPEN:1024395281460101213> » GEGENSTAND NUTZEN')
  		    	    .setDescription('» <@' + reciever + '> hat es nicht geschafft, die Bombe zu entschärfen! OH')
            	    .setFooter({ text: '» ' + vote + ' » ' + version });
            }
        }

        // Punish User if Lost
        if (solution != choice) {
            if (itemid == 'nbomb') {
                const member = await interaction.guild.members.fetch(interaction.user.id)
                member.timeout(30 * 1000, 'BOMB TIMEOUT FROM ' + interaction.user.id).catch((error) => {})
            }
            if (itemid == 'mbomb') {
                const member = await interaction.guild.members.fetch(interaction.user.id)
                member.timeout(60 * 1000, 'BOMB TIMEOUT FROM ' + interaction.user.id).catch((error) => {})
            }
            if (itemid == 'hbomb') {
                const member = await interaction.guild.members.fetch(interaction.user.id)
                member.timeout(90 * 1000, 'BOMB TIMEOUT FROM ' + interaction.user.id).catch((error) => {})
            }
            if (itemid == 'cbomb') {
                const messages = bombcache[interaction.user.id]
                bombcache.splice(interaction.user.id, interaction.user.id)

                let i = 0;
                const filtered = [];

                (await messages).filter((m) => {
                    if(m.author.id === interaction.user.id && 1 > i) {
                        filtered.push(m)
                        i++
                    }
                })

                await interaction.channel.bulkDelete(filtered, true)
            }
        }

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] ITEMUSE : BOMB : ' + choice + ' : ' + solution)
        return interaction.update({ content: '', embeds: [message.toJSON()], components: interaction.message.components })
    }
}