module.exports = {
    data: {
        name: 'poll'
    },
    async execute(interaction, client, lang, vote, choice) {
        // Get Choices
        const cache = interaction.message.components[0]
        let yes = parseInt((cache.components[0].data.label.split(' ['))[0])
        let no = parseInt((cache.components[1].data.label.split(' ['))[0])

        // Count Choice
        const dbChoice = await bot.polls.get(interaction.message.id, interaction.user.id)
        if (dbChoice === '') {
            if (choice === 'yes') yes++
            if (choice === 'no') no++

            bot.polls.set(interaction.message.id, interaction.user.id, (choice === 'yes'))
        } else {
            if ((choice === 'yes') === dbChoice) {
                if (dbChoice) yes--
                if (!dbChoice) no--

                bot.polls.del(interaction.message.id, interaction.user.id)
            } else {
                if (dbChoice) yes--
                if (!dbChoice) no--

                if (choice === 'yes') yes++
                if (choice === 'no') no++

                bot.polls.set(interaction.message.id, interaction.user.id, (choice === 'yes'))
            }
        }

        // Edit Buttons
        if (yes === 0) interaction.message.components[0].components[0].data.label = `0 [0%]`
        else interaction.message.components[0].components[0].data.label = `${yes} [${Math.round(100 * yes / (yes + no))}%]`
        if (no === 0) interaction.message.components[0].components[1].data.label = `0 [0%]`
        else interaction.message.components[0].components[1].data.label = `${no} [${Math.round(100 * no / (yes + no))}%]`

        // Send Message
        bot.log(false, interaction.user.id, interaction.guild.id, '[BTN] POLL : ' + choice.toUpperCase())
        return interaction.update({ components: interaction.message.components })
    }
}