const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders')
const { QueryType } = require('discord-player')

module.exports = {
	data: new SlashCommandBuilder()
        .setName('play')
    	.setDMPermission(false)
        .setDescription('PLAY A SONG')
        .setDescriptionLocalizations({
            de: 'SPIELE EINEN SONG'
        })
        .addStringOption(option =>
            option.setName('song')
                .setDescription('THE SONG')
                .setDescriptionLocalizations({
                    de: 'DER SONG'
                })
                .setRequired(true)),
    async execute(interaction, client, lang, vote) {
		const song = interaction.options.getString('song')

        const res = await player.search(song, {
            requestedBy: interaction.member,
            searchEngine: QueryType.AUTO
        })

        if (!res || !res.tracks.length) return interaction.reply({ content: `No results found ${interaction.member}... try again ? ❌`, ephemeral: true })

        const queue = await player.createQueue(interaction.guild, {
            metadata: interaction.channel,
            spotifyBridge: true,
            initialVolume: 75,
            leaveOnEnd: true
        })

        try {
            if (!queue.connection) await queue.connect(interaction.member.voice.channel)
        } catch {
            await player.deleteQueue(interaction.guildId);
            return interaction.reply({ content: `I can't join the voice channel ${interaction.member}... try again ? ❌`, ephemeral: true})
        }

        await interaction.reply({ content:`Loading your ${res.playlist ? 'playlist' : 'track'}... 🎧`})

        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0])
        if (!queue.playing) await queue.play()
	}
}