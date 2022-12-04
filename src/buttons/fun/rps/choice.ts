import { EmbedBuilder } from "discord.js"

import * as bot from "@functions/bot.js"
import Client from "@interfaces/Client.js"
import { ButtonInteraction } from "discord.js"
export default {
    data: {
        name: 'rps-choice'
    },

    async execute(interaction: ButtonInteraction, client: Client, lang: string, vote: string, bet: number, choice: string) {
        // Get Users
        const cache = interaction.message.embeds
        const description = cache[0].description.toString().replace(/[^\d@!]/g, '').split('!')[0].substring(1).split("@")
        const [ sender, reciever ] = description

        // Check if User is playing
        if (sender !== interaction.user.id && reciever !== interaction.user.id) {
            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» You arent playing!')
        		.setFooter({ text: '» ' + vote + ' » ' + client.config.version })

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Du spielst garnicht mit!')
        		    .setFooter({ text: '» ' + vote + ' » ' + client.config.version })
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] RPS : NOTPLAYING')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Create Embed
        let choiceen: string
        if (choice === 'ROCK') choiceen = '🪨 ROCK'
        if (choice === 'PAPER') choiceen = '📝 PAPER'
        if (choice === 'SCISSORS') choiceen = '✂️ SCISSORS'

        let message = new EmbedBuilder().setColor(0x37009B)
            .setTitle('<:GAMEPAD:1024395990679167066> » ROCK PAPER SCISSORS')
            .setDescription('» You selected **' + choiceen + '**!')
            .setFooter({ text: '» ' + vote + ' » ' + client.config.version })

        if (lang === 'de') {
            let choicede: string
            if (choice === 'ROCK') choicede = '🪨 STEIN'
            if (choice === 'PAPER') choicede = '📝 PAPIER'
            if (choice === 'SCISSORS') choicede = '✂️ SCHERE'

            message = new EmbedBuilder().setColor(0x37009B)
                .setTitle('<:GAMEPAD:1024395990679167066> » SCHERE STEIN PAPIER')
                .setDescription('» Du hast **' + choicede + '** ausgewählt!')
                .setFooter({ text: '» ' + vote + ' » ' + client.config.version })
        }

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] RPS : ' + choice)
        interaction.reply({ embeds: [message], ephemeral: true })

        // Set Variable
        bot.rps.set('CHOICE-' + interaction.user.id, choice)

        // Check if Game is Done
        if (bot.rps.has('CHOICE-' + sender) && bot.rps.has('CHOICE-' + reciever)) {
            // Calculate Winner
            const psc = bot.rps.get('CHOICE-' + sender)
            const prc = bot.rps.get('CHOICE-' + reciever)
            let win = 'none'
            if (psc === 'ROCK' && prc === 'PAPER') win = 'pr'
            if (psc === 'ROCK' && prc === 'SCISSORS') win = 'ps'
            if (psc === 'SCISSORS' && prc === 'ROCK') win = 'pr'
            if (psc === 'SCISSORS' && prc === 'PAPER') win = 'ps'
            if (psc === 'PAPER' && prc === 'ROCK') win = 'ps'
            if (psc === 'PAPER' && prc === 'SCISSORS') win = 'pr'

            let winner: string
            if (win === 'ps') winner = '<@' + sender + '>'
            if (win === 'pr') winner = '<@' + reciever + '>'
            if (win === 'none') winner = '**Noone**'
            if (win === 'none' && lang === 'de') winner = '**Niemand**'

            // Transfer Money
            const betwon = bet * 2; let transaction: any
            if (winner !== '**Noone**' && winner !== '**Niemand**') {
                bot.money.add(interaction.guild.id, winner, betwon)

                // Log Transaction
                if (betwon > 0) transaction = await bot.transactions.log({
                    success: true,
                    sender: {
                        id: (winner === sender ? reciever : sender),
                        amount: betwon,
                        type: 'negative'
                    }, reciever: {
                        id: winner,
                        amount: betwon,
                        type: 'positive'
                    }
                })
            } else {
                bot.money.add(interaction.guild.id, sender, bet)
                bot.money.add(interaction.guild.id, reciever, bet)
            }

            // Create Embed
            let send: string, reci: string
            if (psc === 'SCISSORS') send = '✂️ SCISSORS'
            if (psc === 'PAPER') send = '📝 PAPER'
            if (psc === 'ROCK') send = '🪨 ROCK'
            if (prc === 'ROCK') reci = '🪨 ROCK'
            if (prc === 'PAPER') reci = '📝 PAPER'
            if (prc === 'SCISSORS') reci = '✂️ SCISSORS'

            message = new EmbedBuilder().setColor(0x37009B)
                .setTitle('<:GAMEPAD:1024395990679167066> » ROCK PAPER SCISSORS')
                .setDescription('» <@' + sender + '> selected **' + bot.rps.get('CHOICE-' + sender) + '**\n» <@' + reciever + '> selected **' + bot.rps.get('CHOICE-' + reciever) + '**\n\n<:AWARD:1024385473524793445> ' + winner + ' won **$' + betwon + '**.' + ((typeof transaction === 'object') ? `\nID: ${transaction.id}` : ''))
                .setFooter({ text: '» ' + client.config.version })

            if (lang === 'de') {
                if (psc === 'SCISSORS') send = '✂️ SCHERE'
                if (psc === 'PAPER') send = '📝 PAPIER'
                if (psc === 'ROCK') send = '🪨 STEIN'
                if (prc === 'ROCK') reci = '🪨 STEIN'
                if (prc === 'PAPER') reci = '📝 PAPIER'
                if (prc === 'SCISSORS') reci = '✂️ SCHERE'

                message = new EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:GAMEPAD:1024395990679167066> » SCHERE STEIN PAPIER')
                    .setDescription('» <@' + sender + '> wählte **' + send + '**\n» <@' + reciever + '> wählte **' + reci + '**\n\n<:AWARD:1024385473524793445> ' + winner + ' hat **' + betwon + '€** gewonnen.' + ((typeof transaction === 'object') ? `\nID: ${transaction.id}` : ''))
                    .setFooter({ text: '» ' + client.config.version })
            }

            // Delete Variables
            bot.rps.delete('CHOICE-' + sender)
            bot.rps.delete('CHOICE-' + reciever)

            // Edit Buttons
            {
                (interaction.message.components[0].components[0].data.disabled as boolean) = true;
                (interaction.message.components[0].components[1].data.disabled as boolean) = true;
                (interaction.message.components[0].components[2].data.disabled as boolean) = true;
            }

            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] RPS : DONE')
            return interaction.message.edit({ embeds: [message], components: interaction.message.components, ephemeral: true } as any)
        }
    }
}