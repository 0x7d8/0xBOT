const { EmbedBuilder } = require('@discordjs/builders')

module.exports = {
    data: {
        name: 'rps-choice'
    },
    async execute(interaction, client, lang, vote, bet, choice) {
        // Get Users
        const cache = interaction.message.embeds
        const description = cache[0].description.toString().replace(/[^\d@!]/g, '').split('!')[0].substring(1).split("@");
        const [sender, reciever] = description

        // Check if User is playing
        if (sender.toString().replace(/\D/g, '') !== interaction.user.id && reciever.toString().replace(/\D/g, '') !== interaction.user.id) {
            // Create Embed
            let message = new EmbedBuilder().setColor(0x37009B)
        		.setTitle('<:EXCLAMATION:1024407166460891166> » ERROR')
        		.setDescription('» You arent playing!')
        		.setFooter({ text: '» ' + vote + ' » ' + config.version });

            if (lang === 'de') {
                message = new EmbedBuilder().setColor(0x37009B)
        		    .setTitle('<:EXCLAMATION:1024407166460891166> » FEHLER')
        		    .setDescription('» Du spielst garnicht mit!')
        		    .setFooter({ text: '» ' + vote + ' » ' + config.version });
            }
            
            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] RPS : NOTPLAYING')
            return interaction.reply({ embeds: [message], ephemeral: true })
        }

        // Create Embed
        let choiceen
        if (choice === 'ROCK') { choiceen = '🪨 ROCK' }
        if (choice === 'PAPER') { choiceen = '📝 PAPER' }
        if (choice === 'SCISSORS') { choiceen = '✂️ SCISSORS' }

        let message = new EmbedBuilder().setColor(0x37009B)
            .setTitle('<:GAMEPAD:1024395990679167066> » ROCK PAPER SCISSORS')
            .setDescription('» You selected **' + choiceen + '**!')
            .setFooter({ text: '» ' + vote + ' » ' + config.version });

        if (lang === 'de') {
            let choicede
            if (choice === 'ROCK') { choicede = '🪨 STEIN' }
            if (choice === 'PAPER') { choicede = '📝 PAPIER' }
            if (choice === 'SCISSORS') { choicede = '✂️ SCHERE' }

            message = new EmbedBuilder().setColor(0x37009B)
                .setTitle('<:GAMEPAD:1024395990679167066> » SCHERE STEIN PAPIER')
                .setDescription('» Du hast **' + choicede + '** ausgewählt!')
                .setFooter({ text: '» ' + vote + ' » ' + config.version });
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
            if (psc === 'ROCK' && prc === 'PAPER') { win = 'pr' }
            if (psc === 'ROCK' && prc === 'SCISSORS') { win = 'ps' }
            if (psc === 'SCISSORS' && prc === 'ROCK') { win = 'pr' }
            if (psc === 'SCISSORS' && prc === 'PAPER') { win = 'ps' }
            if (psc === 'PAPER' && prc === 'ROCK') { win = 'ps' }
            if (psc === 'PAPER' && prc === 'SCISSORS') { win = 'pr' }
            let winner
            if (win === 'ps') { winner = '<@' + sender + '>' }
            if (win === 'pr') { winner = '<@' + reciever + '>' }
            if (win === 'none') { winner = '**Noone**' }
            if (win === 'none' && lang === 'de') { winner = '**Niemand**' }

            // Transfer Money
            const betwon = parseInt(bet) * 2
            if (winner !== '**Noone**' && winner !== '**Niemand**') {
                bot.money.add(interaction, winner.toString().replace(/\D/g, ''), parseInt(betwon))
            } else {
                bot.money.add(interaction, sender.toString().replace(/\D/g, ''), parseInt(bet))
                bot.money.add(interaction, reciever.toString().replace(/\D/g, ''), parseInt(bet))
            }

            // Create Embed
            let send
            let reci
            if (psc === 'SCISSORS') { send = '✂️ SCISSORS' }
            if (psc === 'PAPER') { send = '📝 PAPER' }
            if (psc === 'ROCK') { send = '🪨 ROCK' }
            if (prc === 'ROCK') { reci = '🪨 ROCK' }
            if (prc === 'PAPER') { reci = '📝 PAPER' }
            if (prc === 'SCISSORS') { reci = '✂️ SCISSORS' }

            message = new EmbedBuilder().setColor(0x37009B)
                .setTitle('<:GAMEPAD:1024395990679167066> » ROCK PAPER SCISSORS')
                .setDescription('» <@' + sender.toString().replace(/\D/g, '') + '> selected **' + bot.rps.get('CHOICE-' + sender) + '**\n» <@' + reciever.toString().replace(/\D/g, '') + '> selected **' + bot.rps.get('CHOICE-' + reciever) + '**\n\n<:AWARD:1024385473524793445> ' + winner + ' won **$' + betwon + '**.')
                .setFooter({ text: '» ' + config.version });

            if (lang === 'de') {
                if (psc === 'SCISSORS') { send = '✂️ SCHERE' }
                if (psc === 'PAPER') { send = '📝 PAPIER' }
                if (psc === 'ROCK') { send = '🪨 STEIN' }
                if (prc === 'ROCK') { reci = '🪨 STEIN' }
                if (prc === 'PAPER') { reci = '📝 PAPIER' }
                if (prc === 'SCISSORS') { reci = '✂️ SCHERE' }

                message = new EmbedBuilder().setColor(0x37009B)
                    .setTitle('<:GAMEPAD:1024395990679167066> » SCHERE STEIN PAPIER')
                    .setDescription('» <@' + sender.toString().replace(/\D/g, '') + '> wählte **' + send + '**\n» <@' + reciever.toString().replace(/\D/g, '') + '> wählte **' + reci + '**\n\n<:AWARD:1024385473524793445> ' + winner + ' hat **' + betwon + '€** gewonnen.')
                    .setFooter({ text: '» ' + config.version });
            }

            // Delete Variables
            bot.rps.delete('CHOICE-' + sender)
            bot.rps.delete('CHOICE-' + reciever)

            // Edit Buttons
            interaction.message.components[0].components[0].data.disabled = true
            interaction.message.components[0].components[1].data.disabled = true
            interaction.message.components[0].components[2].data.disabled = true

            // Send Message
            bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] RPS : DONE')
            return interaction.message.edit({ embeds: [message], components: interaction.message.components, ephemeral: true })
        }
    }
}